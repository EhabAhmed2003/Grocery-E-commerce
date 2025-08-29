import RecommendCategoriesCard from "./card";
import { RecommentCardsInfo } from "../../../constants/popularCategories";
import useTranslate from "../../../hooks/useTranslate";

export default function PopularCategoriesSection() {
	const translate = useTranslate("categories");
	return (
		<section className="">
			{/*Recommend Categories Title */}
			<div>
				<h2 className="ltr:text-2xl rtl:text-3xl mb-8 font-bold relative before:absolute before:top-0 ltr:pl-[10px] rtl:pr-[10px] ltr:before:left-0 rtl:before:right-0 before:w-[3px] before:h-full before:bg-dark-primary ">
					{translate(`popular_categories.title`)}
				</h2>
			</div>
			{/* Recommend Section Cards */}
			<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{RecommentCardsInfo?.map((product) => {
					return (
						<RecommendCategoriesCard
							key={product.id}
							imgSrc={product.imgSrc}
							title={product.title}
						/>
					);
				})}
			</div>
		</section>
	);
}
