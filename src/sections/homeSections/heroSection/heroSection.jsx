import { motion } from "framer-motion";
import ShopNowButton from "../../../components/buttons/shopNowButton/shopNowButton";
import useTranslate from "../../../hooks/useTranslate";

export default function HeroSection() {
	const translate = useTranslate("home");
	return (
		/* Hero Section */
		<section className="min-w-full lg:mt-0 mt-4 lg:h-[700px] ltr:lg:pl-7 lg:p-0 pb-5 rtl:pl-0 rtl:lg:pr-7 flex items-center flex-col lg:flex-row-reverse dark:bg-dark-paper bg-light-paper rounded-xl overflow-hidden">
			{/* Hero Picture */}
			<motion.div
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="lg:w-1/2 w-full h-full"
			>
				<img
					className="w-full lg:h-full h-[400px]"
					src="/images/heroImage.png"
					loading="lazy"
					alt={translate("image")}
				/>
			</motion.div>

			{/* Hero Title & Button */}
			<motion.div
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
				className="lg:w-1/2 h-full w-10/12 flex lg:justify-center flex-col gap-5 lg:text-start text-center"
			>
				{/* Hero Title */}
				<motion.h1
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="lg:text-[45px] text-[35px] font-bold"
				>
					{translate("hero_section.headline")}
				</motion.h1>
				{/* Hero Button */}
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.9 }}
				>
					<ShopNowButton pathTo={"/shopping/Cheeses"} />
				</motion.div>
			</motion.div>
		</section>
	);
}
