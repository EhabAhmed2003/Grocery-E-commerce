import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import headerEN from "./locales/en/header.json";
import footerEN from "./locales/en/footer.json";
import homeEN from "./locales/en/home.json";
import categoriesEN from "./locales/en/categories.json";
import productDetailsEN from "./locales/en/productDetailsPage.json";

import headerAR from "./locales/ar/header.json";
import footerAR from "./locales/ar/footer.json";
import homeAR from "./locales/ar/home.json";
import categoriesAR from "./locales/ar/categories.json";
import productDetailsAR from "./locales/ar/productDetailsPage.json";

const resources = {
	en: {
		header: headerEN,
		footer: footerEN,
		home: homeEN,
		categories: categoriesEN,
		product_details: productDetailsEN,
	},
	ar: {
		header: headerAR,
		footer: footerAR,
		home: homeAR,
		categories: categoriesAR,
		product_details: productDetailsAR,
	},
};

i18n
	// .use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: "ar",
		resources,
		fallbackLng: "en",

		defaultNS: "home",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
