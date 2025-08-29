import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

const MotionCloseIcon = motion.create(CloseIcon);
const MotionlanguageIcon = motion.create(LanguageIcon);

export default function LanguageSwitcher() {
	const { t: translate, i18n } = useTranslation("header");
	const [currentLang, setCurrentLang] = useState("en");
	const [open, setOpen] = useState(false);
	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang);
		if (currentLang !== lang) {
			toast.success(
				`${
					lang === "ar"
						? translate("languages.toast_arabic")
						: translate("languages.toast_english")
				}`
			);
		}
		setOpen(false);
	};
	const { pathname } = useLocation();
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<div className="relative ">
			<button
				key={open ? "1" : "2"}
				className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
				title={translate("languages.icon_title")}
			>
				{open ? (
					<MotionCloseIcon
						initial={{}}
						animate={{ rotate: "90deg" }}
						onClick={() => setOpen(false)}
					/>
				) : (
					<MotionlanguageIcon
						initial={{}}
						animate={{ rotate: "90deg" }}
						onClick={() => setOpen(true)}
					/>
				)}
			</button>

			{open && (
				<div className="absolute left-[-110%] mt-2 w-32 bg-light-paper dark:bg-dark-paper border border-light-secondary dark:border-dark-secondary rounded shadow-md z-50">
					<button
						onClick={() => {
							changeLanguage("en");
							setCurrentLang("en");
						}}
						className="w-full text-center py-2 hover:bg-light-secondary dark:hover:bg-dark-secondary"
					>
						{translate("languages.english")}
					</button>
					<button
						onClick={() => {
							changeLanguage("ar");
							setCurrentLang("ar");
						}}
						className="w-full text-center py-2  hover:bg-light-secondary dark:hover:bg-dark-secondary"
					>
						{translate("languages.arabic")}
					</button>
				</div>
			)}
		</div>
	);
}
