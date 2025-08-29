import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useTranslate from "../../../hooks/useTranslate";
import { features } from "../../../constants/whyChooseUsFeatures";

export default function WhyChooseUs() {
	const translate = useTranslate("home");
	const [current, setCurrent] = useState(0);

	/* use setInterval To Change Feature */
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % features.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		/* Why Choose Us Section */
		<section className="pt-16 pb-20 bg-light-background dark:bg-dark-background">
			<div className="max-w-xl mx-auto px-4 text-center">
				{/* Title */}
				<h2 className="text-2xl sm:text-3xl font-bold mb-10 text-dark-primary dark:text-white">
					{translate("why_choose_us.title")}
				</h2>
				{/* Card */}
				<div className="relative min-h-[200px]">
					<AnimatePresence mode="wait">
						<motion.div
							key={current}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ duration: 0.4 }}
							className="bg-light-paper dark:bg-dark-paper rounded-xl p-6 shadow-md w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
						>
							<div className="mb-4">{features[current].icon}</div>
							<h3 className="text-lg font-semibold text-dark-primary dark:text-white mb-2">
								{translate(features[current].titleKey)}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-300">
								{translate(features[current].descriptionKey)}
							</p>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Dots Navigation */}
				<div className="flex justify-center gap-2 mt-6">
					{features?.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrent(index)}
							className={`w-3 h-3 rounded-full transition ${
								current === index
									? "bg-dark-primary"
									: "bg-gray-400 dark:bg-gray-600"
							}`}
						></button>
					))}
				</div>
			</div>
		</section>
	);
}
