import { motion } from "framer-motion";
import ProductCard from "../productCard/productCard";

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};
export default function ProductCards({ products }) {
	return (
		/* Product Cards List */
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			className="grid lg:gap-5 gap-2 gap-y-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
		>
			{products?.map((product) => (
				<ProductCard key={product?.code} product={product} />
			))}
		</motion.div>
	);
}
