import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { setSearchInput } from "../../features/products/productsSlice";
import { getSearchProducts } from "../../features/products/productsService";
import { setShowSearchList } from "../../features/searchInput/showSearchListSlice";
import { Link, useLocation } from "react-router";
import Loader from "../loader/loader";
import useTranslate from "../../hooks/useTranslate";
import { setShowBlurDiv } from "../../features/blurDiv/blurDivSlice";

export default function SearchInput() {
	const dispatch = useDispatch();
	const translate = useTranslate("header");
	const { showSearchList } = useSelector((state) => state.searchList);
	const { searchData, searchInput, searchError, searchLoading } = useSelector(
		(state) => state.data
	);

	/* Close Searchlist && blur Div if the page Changed*/
	const { pathname } = useLocation();
	useEffect(() => {
		if (searchInput && showSearchList) {
			dispatch(setShowSearchList(false));
			dispatch(setShowBlurDiv(false));
			dispatch(setSearchInput(""));
		}
	}, [pathname]);

	/* Handle set Input */
	function handleInputChange(e) {
		const input = e.target.value.trim();
		dispatch(setSearchInput(input));
	}

	/* setSearchInput & Show List & get products */
	useEffect(() => {
		const delay = setTimeout(() => {
			if (searchInput !== "") {
				dispatch(setSearchInput(searchInput));
				dispatch(getSearchProducts(searchInput));
				dispatch(setShowSearchList(true));
				dispatch(setShowBlurDiv(true));
			} else {
				dispatch(setShowSearchList(false));
				dispatch(setShowBlurDiv(false));
			}
		}, 300);

		return () => clearTimeout(delay);
	}, [searchInput]);

	return (
		/* Search Input Style */
		<div className="relative flex items-center leading-7 shadow-2xl">
			<svg
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="absolute left-4 w-4 h-4 z-30"
			>
				<g>
					<path
						className=" fill-light-primary"
						d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
					></path>
				</g>
			</svg>
			<input
				className={`w-full h-[50px] leading-7 px-4 pl-10 border-2 border-transparent rounded-lg outline-none ${
					showSearchList ? "z-50" : "z-10"
				} dark:bg-dark-paper bg-light-paper focus:dark:bg-dark-background focus:shadow-xl focus:bg-light-background placeholder:text-[#9e9ea7]`}
				type="search"
				placeholder={translate(`search_input.search_product`)}
				onChange={handleInputChange}
				value={searchInput}
			/>
			{/* Search List */}
			{showSearchList && (
				<motion.ul
					initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
					animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
					transition={{ duration: 0.2 }}
					className="scrollbar absolute w-full min-h-[100px] max-h-[300px] top-[110%] rounded-lg dark:border-dark-paper border-light-paper border-solid border-2 shadow-xl z-50 flex flex-col gap-1 overflow-y-scroll overflow-x-hidden dark:bg-dark-paper bg-light-paper"
				>
					{searchLoading ? (
						<Loader />
					) : searchError ? (
						<p className="m-auto text-red-600">{searchError}</p>
					) : searchData?.length > 0 ? (
						searchData.map((product) => (
							<Link key={product?.code} to={`/productDetails/${product.code}`}>
								<li className="dark:bg-dark-background w-full h-fit flex gap-3 items-center bg-light-background px-3 py-3 rounded-lg hover:cursor-pointer">
									<span>
										<img
											className="w-[50px] h-[60px] rounded-lg text-[12px]"
											src={
												product?.image_url ||
												product?.image_front_thumb_url ||
												product?.image_small_url ||
												product?.image_front_small_url
											}
											alt={`${product?.product_name} image`}
											loading="lazy"
										/>
									</span>
									<span className="overflow-hidden text-ellipsis whitespace-nowrap">
										{product?.product_name || "Unknown"}{" "}
									</span>
								</li>
							</Link>
						))
					) : (
						searchInput !== "" && (
							<p className="m-auto">{translate("search_input.no_products")}</p>
						)
					)}
				</motion.ul>
			)}
		</div>
	);
}
