import { createSlice } from "@reduxjs/toolkit";
import {
	addProductToCart,
	getCartProductsFromLocalStorage,
	deleteProductFromCart,
	deleteAllProductsFromCart,
	addCountToProduct,
	minusCountFromProduct,
} from "./cartServices";

const initialState = {
	cartProducts: [],
	totalPrice: 0,
	showCart: false,
};

const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {
		setShowCart: (state, action) => {
			state.showCart = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addProductToCart.fulfilled, (state, action) => {
				if (action.payload) {
					state.cartProducts = action.payload.cartProducts;
					state.totalPrice = action.payload.totalPrice;
				}
			})
			.addCase(getCartProductsFromLocalStorage.fulfilled, (state, action) => {
				state.cartProducts = action.payload.cartProducts;
				state.totalPrice = action.payload.totalPrice;
			})
			.addCase(deleteProductFromCart.fulfilled, (state, action) => {
				state.cartProducts = action.payload.cartProducts;
				state.totalPrice = action.payload.totalPrice;
			})
			.addCase(deleteAllProductsFromCart.fulfilled, (state, action) => {
				state.cartProducts = action.payload?.cartProducts;
				state.totalPrice = action.payload?.totalPrice;
			})
			.addCase(addCountToProduct.fulfilled, (state, action) => {
				state.cartProducts = action.payload.cartProducts;
				state.totalPrice = action.payload.totalPrice;
			})
			.addCase(minusCountFromProduct.fulfilled, (state, action) => {
				state.cartProducts = action.payload.cartProducts;
				state.totalPrice = action.payload.totalPrice;
			});
	},
});

export const { setShowCart } = cartSlice.actions;
export default cartSlice.reducer;
