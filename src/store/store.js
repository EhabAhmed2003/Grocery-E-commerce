import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice.jsx";
import scrollButtonReducer from "../features/scrollUpButton/scrollUpSlice.jsx";
import headerReducer from "../features/header/headerSlice.jsx";
import getDataReducer from "../features/products/productsSlice.jsx";
import searchListReducer from "../features/searchInput/showSearchListSlice.jsx";
import cartReducer from "../features/cart/cartSlice.jsx";
import blurDivReducer from "../features/blurDiv/blurDivSlice.jsx";

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		scrollButton: scrollButtonReducer,
		header: headerReducer,
		data: getDataReducer,
		searchList: searchListReducer,
		cart: cartReducer,
		blurDiv: blurDivReducer,
	},
});
