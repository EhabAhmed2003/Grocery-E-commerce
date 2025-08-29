// src/app/App.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import Header from "../layouts/header/header";
import Footer from "../layouts/footer/footer";
import SearchInput from "../components/searchInput/searchInput";
import ScrollToUp from "../components/scrollToTop/scrollToTop";
import BlurDiv from "../components/blurDiv/blurDiv";
import ScrollButton from "../components/buttons/scrollUpButton/scrollButton";
import CartDrawer from "../layouts/cartDrawer/cartDrawer";
import ToastWrapper from "../layouts/toastWrapper/toastWrapper";
import AppRoutes from "../routes/appRoutes";
import { setShowScrollButton } from "../features/scrollUpButton/scrollUpSlice";
import { setShowSearchList } from "../features/searchInput/showSearchListSlice";
import { setSearchInput } from "../features/products/productsSlice";
import "./app.css";
import { setShowBlurDiv } from "../features/blurDiv/blurDivSlice";

function App() {
	const dispatch = useDispatch();
	const { i18n } = useTranslation();
	const { pathname } = useLocation();

	const { searchInput } = useSelector((state) => state.data);
	const { showScrollButton } = useSelector((state) => state.scrollButton);
	const { showDropdown } = useSelector((state) => state.header);
	const checkProductDetailsPage = !pathname.includes("productDetails");

	// Handle scroll logic
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			dispatch(setShowScrollButton(scrollY > 150));
			if (scrollY > 200 && searchInput !== "") {
				dispatch(setShowSearchList(false));
				dispatch(setShowBlurDiv(false));
				dispatch(setSearchInput(""));
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [dispatch, searchInput, showDropdown]);

	// Handle direction (rtl/ltr)
	useEffect(() => {
		document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
	}, [i18n.language]);

	return (
		<>
			{showScrollButton && <ScrollButton />}
			<CartDrawer />
			<ToastWrapper />
			<main className="max-w-full overflow-hidden dark:bg-dark-paper bg-light-paper text-light-text-primary dark:text-dark-text-primary">
				<div className="w-11/12 flex flex-col gap-7 m-auto my-10 pb-5 px-3 min-h-screen dark:bg-dark-background bg-light-background rounded-3xl overflow-hidden sm:px-10">
					<div className="flex flex-col gap-4">
						{checkProductDetailsPage && <ScrollToUp />}
						<Header />
						<SearchInput />
						<BlurDiv />
					</div>
					<AppRoutes />
				</div>
			</main>
			<Footer />
		</>
	);
}

export default App;
