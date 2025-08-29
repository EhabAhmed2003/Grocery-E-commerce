import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "../../features/products/productsService";
import Loader from "../../components/loader/loader";
import NotFound from "../notFoundPage/notfoundpage";
import RelatedProducts from "../../sections/relatedProducts/relatedProducts";
import {
	setCurrentProductCode,
	setCurrentProductCategory,
} from "../../features/products/productsSlice";
import { addProductToCart } from "../../features/cart/cartServices";
import useTranslate from "../../hooks/useTranslate";

function ProductDetailsElement({ label, value }) {
	return (
		<p className="text-sm text-[0.9rem] lg:text-[0.95rem] leading-6 lg:w-[90%] w-[100%]">
			<strong className="text-dark-primary text-[1rem] lg:text-[1.1rem]">
				{label}
			</strong>
			{value}
		</p>
	);
}

export default function ProductDetails() {
	const translate = useTranslate("product_details");
	const dispatch = useDispatch();
	const { productDetailsData, productDetailsLoading, productDetailsError } =
		useSelector((state) => state.data);
	const [mainImage, setMainImage] = useState("");
	const { code } = useParams();
	const { pathname } = useLocation();

	/* Delete Category / Code if page changed */
	useEffect(() => {
		dispatch(setCurrentProductCategory(""));
		dispatch(setCurrentProductCode(""));
	}, [pathname]);

	/* get product Details from API */
	useEffect(() => {
		dispatch(getProductDetails(code));
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [code, dispatch]);

	/*set the CurrentProduct Code & category  & Set product Picture to Show it if thereis Data*/
	useEffect(() => {
		if (!productDetailsData) return;

		if (productDetailsData.code === code) {
			dispatch(
				setCurrentProductCategory(productDetailsData.categories_tags?.at(-1))
			);
			dispatch(setCurrentProductCode(productDetailsData.code));
		}

		if (productDetailsData.image_front_url) {
			setMainImage(productDetailsData.image_front_url);
		}
	}, [productDetailsData, code]);

	// Destructuring for easier access
	const {
		image_front_url,
		image_ingredients_url,
		image_nutrition_url,
		product_name,
		nutriments,
		categories,
		brands,
		quantity,
		ingredients_text,
		labels_tags,
		packaging,
		origins,
		countries,
		allergens_tags,
		additives_tags,
	} = productDetailsData;

	const productDetailsArray = [
		{ label: `${translate("brand")}: `, value: brands || translate("unknown") },
		{ label: `${translate("quantity")}: `, value: quantity || translate("na") },
		{
			label: `${translate("calories")}: `,
			value: nutriments?.["energy-kcal"]
				? `${nutriments["energy-kcal"]} ${translate("kcal")}`
				: translate("na"),
		},
		{
			label: `${translate("sugars")}: `,
			value: nutriments?.sugars
				? `${nutriments.sugars} ${translate("g")}`
				: translate("na"),
		},
		{
			label: `${translate("fat")}: `,
			value: nutriments?.fat
				? `${nutriments.fat}  ${translate("g")}`
				: translate("na"),
		},
		{
			label: `${translate("protein")}: `,
			value: nutriments?.proteins
				? `${nutriments.proteins}  ${translate("g")}`
				: translate("na"),
		},
		{
			label: `${translate("salt")}: `,
			value: nutriments?.salt
				? `${nutriments.salt}  ${translate("g")}`
				: translate("na"),
		},
		{
			label: `${translate("ingredients")}: `,
			value: ingredients_text || translate("no_data"),
		},
		{
			label: `${translate("labels")}: `,
			value: labels_tags?.length ? labels_tags.join(", ") : translate("none"),
		},
		{
			label: `${translate("packaging")}: `,
			value: packaging?.length
				? packaging.split(",").join(", ")
				: translate("na"),
		},
		{
			label: `${translate("origins")}: `,
			value: origins || translate("none"),
		},
		{
			label:
				countries?.split(",").length > 1
					? `${translate("countries")}: `
					: `${translate("country")}: `,
			value: countries?.length
				? countries.split(",").join(", ")
				: translate("unknown"),
		},
		{
			label: `${translate("allergens")}: `,
			value: allergens_tags?.length
				? allergens_tags.join(", ")
				: translate("none"),
		},
		{
			label: `${translate("additives")}: `,
			value: additives_tags?.length
				? additives_tags.join(", ")
				: translate("none"),
		},
	];

	/* Handle Loading */
	if (productDetailsLoading) {
		return (
			<div className="text-center">
				<Loader />
			</div>
		);
	}

	/* Handle Error */
	if (productDetailsError) {
		return (
			<p className="text-center text-red-600">Error: {productDetailsError}</p>
		);
	}

	/* Handle No Data */
	if (!productDetailsData) {
		return (
			<div className="text-center text-xl">
				<NotFound />
			</div>
		);
	}
	return (
		/* product Details Content */
		<div className="container mx-auto px-4 py-8 flex flex-col gap-14">
			{/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-14 items-start h-full"> */}
			<div className="flex gap-x-6 gap-y-14 rtl:lg:flex-row-reverse ltr:lg:flex-row flex-col">
				{/* Product Image */}
				<div
					className={`flex gap-2 lg:w-[700px] w-full rtl:sm:flex-row ltr:sm:flex-row-reverse flex-col`}
				>
					{/* Main Image */}
					<div className="w-full">
						<img
							src={mainImage || image_front_url}
							alt={`Image of ${product_name}`}
							className="w-full h-[500px] sm:h-[600px] lg:h-[800px] rounded-xl shadow-md"
							loading="lazy"
						/>
					</div>

					{/* Thumbnails */}
					<div
						className={`flex gap-3 sm:flex-col sm:justify-start flex-row justify-center`}
					>
						{[image_front_url, image_ingredients_url, image_nutrition_url].map(
							(image, index) =>
								image && (
									<img
										key={index}
										src={image}
										onClick={() => setMainImage(image)}
										className="w-[80px] h-[100px] object-cover hover:cursor-pointer border border-transparent hover:border-dark-primary rounded"
										alt={`Thumbnail ${index}`}
										loading="lazy"
									/>
								)
						)}
					</div>
				</div>

				{/* Product Details */}
				<div className="flex flex-col gap-4 lg:w-[60%] w-[90%]">
					<h1 className="text-[1.7rem] lg:text-[2rem] font-bold leading-snug lg:w-[90%] w-full">
						{product_name}
					</h1>

					<p className="flex flex-wrap gap-2 w-full text-[11px] lg:text-[12px] mb-2">
						{categories?.split(",").map((category, index) => (
							<Link
								to={`/shopping/${category}`}
								key={index}
								className="dark:bg-dark-paper bg-light-paper px-3 py-2 rounded-md"
							>
								{category}
							</Link>
						))}
					</p>

					{productDetailsArray?.map((item, index) => (
						<ProductDetailsElement
							key={index}
							label={item.label}
							value={item.value}
						/>
					))}

					{/* AddToCart Button */}
					<button
						onClick={() => dispatch(addProductToCart(productDetailsData))}
						className="inline-block w-[200px] h-[60px] mt-4 rounded-l-xl text-white rounded-t-xl hover:bg-transparent hover:border-dark-primary border-solid border-2 border-transparent hover:text-light-primary bg-light-primary font-bold leading-loose transition duration-200"
					>
						{translate("add_to_cart")}
					</button>
				</div>
			</div>
			{/* Show Related Products */}
			<RelatedProducts />
		</div>
	);
}
