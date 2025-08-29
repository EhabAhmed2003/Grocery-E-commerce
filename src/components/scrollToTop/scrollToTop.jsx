import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToUp() {
	const { pathname, search } = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname, search]);
	return null;
}
