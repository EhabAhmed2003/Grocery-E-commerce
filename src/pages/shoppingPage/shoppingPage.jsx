import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/loader/loader";
import PaginationRounded from "../../components/pagination/pagination";
import { getProductsByCategory } from "../../features/products/productsService";
import NotFound from "../notFoundPage/notfoundpage";
import CategorySidebar from "../../layouts/categorySidebar/categorySidebar";
import ProductCards from "../../layouts/productCards/productCards";
import useTranslate from "../../hooks/useTranslate";

export default function ShoppingPage() {
	const translate = useTranslate("categories");
	const { category } = useParams();
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1", 10);
	const { productsCount, productsPerPage } = useSelector((state) => state.data);
	const totalPages = Math.ceil(productsCount / productsPerPage);

	const dispatch = useDispatch();
	const { productsData, productsLoading, productsError } = useSelector(
		(state) => state.data
	);

	/* Get Products from API by Category */
	useEffect(() => {
		if (category && page) {
			dispatch(getProductsByCategory({ category, page }));
		}
	}, [category, page, dispatch]);

	return (
		/* Shopping || Products Page */
		<div className="container mx-auto">
			<div className="flex flex-col justify-start lg:flex-row gap-6">
				{/* Sidebar (Categories) */}
				<aside className="w-full lg:w-[270px]">
					<CategorySidebar />
				</aside>

				{/* Shopping Products Section */}
				<section className="flex-1 flex flex-col gap-10 self-start">
					{/* Shopping Title */}
					<div>
						<h2 className="font-bold lg:text-3xl text-2xl ltr:pl-3 rtl:pr-3  relative before:absolute before:top-0 ltr:before:left-0 rtl:before:right-0 before:w-[2px] before:h-full before:bg-dark-primary">
							{translate("products")} {translate(`list.${category}`)}
						</h2>
					</div>

					{/*	handle Loading */}
					{productsLoading && (
						<div className="flex justify-center items-center">
							<Loader />
						</div>
					)}

					{/*	handle Error */}
					{productsError && (
						<div className="text-center text-red-600">
							Error: {productsError}
						</div>
					)}

					{/* handle No Data */}
					{!productsLoading &&
						!productsError &&
						productsData?.length === 0 &&
						translate("no_products")}

					{/* Product Cards */}
					{!productsLoading && !productsError && productsData?.length > 0 && (
						<div className="grid lg:gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
							<ProductCards products={productsData} />
						</div>
					)}

					{/* Pagination */}
					{!productsLoading && !productsError && productsData?.length > 0 && (
						<div className="m-auto">
							<PaginationRounded totalPages={totalPages} page={page} />
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
