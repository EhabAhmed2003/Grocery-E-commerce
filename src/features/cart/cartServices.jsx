import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import i18next from "i18next";

// Get Total Price
const calculateTotal = (products) =>
	products.reduce((total, item) => total + (item.price ?? 0), 0);

//  Add Product to Cart Products
export const addProductToCart = createAsyncThunk(
	"cart/addProductToCart",
	async (product, { getState }) => {
		const current = getState().cart.cartProducts || [];

		const alreadyExists = current.some((item) => item.code === product.code);
		if (alreadyExists) {
			toast.info(i18next.t("cart.toaster.product_already_in_cart"));
			return null;
		}

		const updatedCart = [
			...current,
			{ ...product, count: 1, basePrice: 100, price: 100 },
		];

		localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
		toast.success(i18next.t("cart.toaster.add_product"));

		return {
			cartProducts: updatedCart,
			totalPrice: calculateTotal(updatedCart),
		};
	}
);

//  Get Products from LocalStorage
export const getCartProductsFromLocalStorage = createAsyncThunk(
	"cart/getCartProducts",
	async () => {
		const currentProducts =
			JSON.parse(localStorage.getItem("cartProducts")) || [];

		return {
			cartProducts: currentProducts,
			totalPrice: calculateTotal(currentProducts),
		};
	}
);

//  Delete Product from Cart Products
export const deleteProductFromCart = createAsyncThunk(
	"cart/deleteProductFromCart",
	async (code, { getState }) => {
		const current = getState().cart.cartProducts || [];

		const updatedCart = current.filter((item) => item.code !== code);
		localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
		toast.success(i18next.t("cart.toaster.delete_product"));

		return {
			cartProducts: updatedCart,
			totalPrice: calculateTotal(updatedCart),
		};
	}
);

//  Clear All Cart Products
export const deleteAllProductsFromCart = createAsyncThunk(
	"cart/clearProducts",
	() => {
		const getCurrent = localStorage.getItem("cartProducts");
		if (getCurrent) {
			localStorage.removeItem("cartProducts");
			toast.success(i18next.t("cart.toaster.delete_all_Products"));
			return {
				cartProducts: [],
				totalPrice: 0,
			};
		} else {
			toast.info(i18next.t("cart.toaster.cart_empty"));
			return;
		}
	}
);

//  Add for Product
export const addCountToProduct = createAsyncThunk(
	"cart/addCount",
	async (product, { getState }) => {
		const current = getState().cart.cartProducts || [];

		const updatedCart = current.map((item) =>
			item.code === product.code
				? {
						...item,
						count: item.count + 1,
						price: item.basePrice * (item.count + 1),
				  }
				: item
		);

		localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
		toast.success(i18next.t("cart.toaster.increase"));

		return {
			cartProducts: updatedCart,
			totalPrice: calculateTotal(updatedCart),
		};
	}
);

//  Minus from Product
export const minusCountFromProduct = createAsyncThunk(
	"cart/minusCount",
	async (product, { getState }) => {
		const current = getState().cart.cartProducts || [];

		const updatedCart = current.map((item) => {
			if (item.code === product.code) {
				const newCount = item.count > 1 ? item.count - 1 : 1;
				const newPrice =
					item.count > 1 ? item.basePrice * (item.count - 1) : item.basePrice;

				if (item.count <= 1) {
					toast.info(i18next.t("cart.toaster.min_limit"));
				} else {
					toast.success(i18next.t("cart.toaster.decrease"));
				}

				return {
					...item,
					count: newCount,
					price: newPrice,
				};
			}
			return item;
		});

		localStorage.setItem("cartProducts", JSON.stringify(updatedCart));

		return {
			cartProducts: updatedCart,
			totalPrice: calculateTotal(updatedCart),
		};
	}
);
