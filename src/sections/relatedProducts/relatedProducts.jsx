import { useEffect, useMemo, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import ProductCards from "../../layouts/productCards/productCards";
import { getRelatedProducts } from "../../features/products/productsService";
import Loader from "../../components/loader/loader";
import PaginationRounded from "../../components/pagination/pagination";
import useTranslate from "../../hooks/useTranslate";

export default function RelatedProducts() {
	const translate = useTranslate("product_details");
	const {
		relatedProductsData,
		relatedProductsLoading,
		relatedProductsError,
		relatedProductsCount,
		relatedProductsPerPage,
		currentProductCategory,
		currentProductCode,
	} = useSelector((state) => state.data);

	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1", 10);
	const relatedRef = useRef(null);
	const totalPages = Math.ceil(relatedProductsCount / relatedProductsPerPage);
	const dispatch = useDispatch();
	const { code } = useParams();

	/* Filter Related Products to dont show Current Product again */
	const filterProducts = useMemo(() => {
		return relatedProductsData?.filter((product) => {
			return String(product?.code) !== String(currentProductCode);
		});
	}, [relatedProductsData]);

	/* get Related Products from API */
	useEffect(() => {
		if (currentProductCategory && currentProductCode === code) {
			dispatch(
				getRelatedProducts({
					category: currentProductCategory,
					page,
					pageSize: 10,
				})
			);
		}
	}, [currentProductCategory, currentProductCode, code, page]);

	/* Scroll To Related Products if Page changed */
	useEffect(() => {
		if (!relatedProductsLoading && relatedRef.current) {
			relatedRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	}, [page]);

	/* Scroll Up If Product Changed */
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);
	return (
		<section ref={relatedRef} className="flex flex-col gap-8">
			{/* Related Products Title */}
			<h2 className="ltr:text-2xl rtl:text-3xl  ltr:pl-3 rtl:pr-3 font-bold relative before:absolute before:top-0 ltr:before:left-0 rtl:before:right-0 before:w-[3px] before:h-full before:bg-dark-primary">
				{translate("related_products.title")}
			</h2>

			{/* Related Products Cards */}
			{relatedProductsLoading ? (
				<Loader />
			) : !filterProducts || filterProducts.length === 0 ? (
				<p className=" text-2xl text-center">
					{translate("related_products.no_products")}
				</p>
			) : relatedProductsError ? (
				<p className=" text-2xl text-center">Error: {relatedProductsError}</p>
			) : (
				<div className="flex flex-col gap-5">
					<ProductCards products={relatedProductsData} />
					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex justify-center">
							<PaginationRounded totalPages={totalPages} page={page} />
						</div>
					)}
				</div>
			)}
		</section>
	);
}
