import ShopNowButton from "../../../components/buttons/shopNowButton/shopNowButton";
import { motion } from "framer-motion";
import useTranslate from "../../../hooks/useTranslate";

export default function RecommendCategoriesCard({ imgSrc, title }) {
	const translate = useTranslate("categories");
	return (
		/* Recommend Category Card*/
		<div className="group relative w-[90%] m-auto sm:w-full h-[220px] sm:h-[270px] shadow-2xl overflow-hidden rounded-2xl cursor-pointer  ">
			{/* Picture */}
			<img
				className="w-full h-full object-cover object-center blur-sm group-hover:blur-0 transition duration-300"
				src={imgSrc}
				alt={`${title} ${translate("image")}`}
				loading="lazy"
			/>
			{/* Title */}
			<h3 className="absolute  text-white w-[80%] text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[23px] md:text-[28px] font-semibold z-10 group-hover:opacity-0 transition duration-300">
				{translate(`list.${title}`)}
			</h3>
			{/* Button */}
			<div className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100 transition duration-500">
				<ShopNowButton pathTo={`/shopping/${title}`} />
			</div>

			<motion.div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-500 pointer-events-none z-1" />
		</div>
	);
}
