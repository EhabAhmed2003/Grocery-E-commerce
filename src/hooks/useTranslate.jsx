import { useTranslation } from "react-i18next";

export default function useTranslate(namespace) {
	const { t, i18n } = useTranslation(namespace);
	const currentLang = i18n.language; // ⬅️ يسبب إعادة تشغيل hook لما اللغة تتغير
	return (key) => t(key, { lng: currentLang });
}
