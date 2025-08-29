import { useSelector } from "react-redux";
import Loader from "../../../components/loader/loader";
import ProductCards from "../../../layouts/productCards/productCards";
import useTranslate from "../../../hooks/useTranslate";

export default function PopularProductsSection() {
	const translate = useTranslate("home");
	const { popularData, popularLoading, popularError } = useSelector(
		(state) => state.data
	);

	return (
		/* Popular Section */
		<section>
			<div className="mb-8">
				{/* Popular Section Title */}
				<h2 className="ltr:text-2xl rtl:text-3xl mb-8 ltr:pl-3 rtl:pr-3 font-bold relative before:absolute before:top-0 ltr:before:left-0 rtl:before:right-0 before:w-[3px] before:h-full before:bg-dark-primary">
					{translate("popular_products")}
				</h2>
			</div>
			{/* Popular Products Cards */}
			<div className="cardsContainer grid gap-3 px-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
				{popularLoading && <Loader />}
				{popularError && (
					<div className="text-red-500 text-center py-10 font-semibold">
						Error: {popularError}
					</div>
				)}
				{/* Show Popular Products */}
				{popularData.length > 0 && !popularError && !popularLoading && (
					<ProductCards products={popularData} />
				)}
			</div>
		</section>
	);
}
