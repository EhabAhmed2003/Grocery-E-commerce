import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import HeroSection from "../../sections/homeSections/heroSection/heroSection";
import PopularProductsSection from "../../sections/homeSections/popularProductsSection/popularProductsSection";
import PopularCategoriesSection from "../../sections/homeSections/popularCategories/popularCategoriesSection";
import WhyChooseUs from "../../sections/homeSections/whyChooseUsSection/whyChooseUsSection";

import { getPopularProducts } from "../../features/products/productsService";
import CategorySidebar from "../../layouts/categorySidebar/categorySidebar";

export default function HomePage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPopularProducts());
	}, []);

	return (
		<>
			{/* Home Page */}
			<div className="flex lg:flex-row flex-col w-full gap-7">
				{/* Sidebar (Category)*/}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="w-full lg:w-[270px]"
				>
					<CategorySidebar />
				</motion.div>

				{/* Hero + Popular Products */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="flex flex-col gap-y-14 w-full"
				>
					<HeroSection />
					<PopularProductsSection />
				</motion.div>
			</div>

			{/* Recommend Categories Section */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				viewport={{ once: true }}
			>
				<PopularCategoriesSection />
			</motion.div>

			{/* Why Choose Us Section*/}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				viewport={{ once: true }}
			>
				<WhyChooseUs />
			</motion.div>
		</>
	);
}
