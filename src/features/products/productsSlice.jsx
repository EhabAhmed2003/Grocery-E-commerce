import { createSlice } from "@reduxjs/toolkit";
import {
	getAllCategories,
	getPopularProducts,
	getProductDetails,
	getProductsByCategory,
	getRelatedProducts,
	getSearchProducts,
} from "./productsService";

const initialState = {
	searchInput: "",
	currentRequestId: undefined,
	currentProductCategory: "",
	currentProductCode: "",

	// get Popular Products
	popularData: [],
	popularLoading: false,
	popularError: "",

	//get Search Products
	searchData: [],
	searchLoading: false,
	searchError: "",

	//get Categories
	categoriesData: [],
	categoriesLoading: false,
	categoriesError: "",

	// products by Category
	productsData: [],
	productsCount: null,
	productsPerPage: null,
	productsLoading: false,
	productsError: "",

	// product Details
	productDetailsData: [],
	productDetailsLoading: false,
	productDetailsError: "",

	// related Products
	relatedProductsCount: null,
	relatedProductsPerPage: null,
	relatedProductsData: [],
	relatedProductsLoading: false,
	relatedProductsError: "",
};
const getData = createSlice({
	name: "getDataSlice",
	initialState,
	reducers: {
		setSearchInput: (state, action) => {
			state.searchInput = action.payload;
		},

		setCurrentProductCategory: (state, action) => {
			state.currentProductCategory = action.payload;
		},
		setCurrentProductCode: (state, action) => {
			state.currentProductCode = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// get Popular Products Cases
			.addCase(getPopularProducts.pending, (state) => {
				state.popularLoading = true;
				state.popularError = "";
			})
			.addCase(getPopularProducts.fulfilled, (state, action) => {
				state.popularData = action.payload;
				state.popularLoading = false;
			})
			.addCase(getPopularProducts.rejected, (state, action) => {
				state.popularLoading = false;
				state.popularError = action.payload;
			})

			// get Search Products Cases
			.addCase(getSearchProducts.pending, (state, action) => {
				state.searchLoading = true;
				state.searchError = "";
				state.currentRequestId = action.meta.requestId;
			})
			.addCase(getSearchProducts.fulfilled, (state, action) => {
				if (state.currentRequestId !== action.meta.requestId) return;
				state.searchData = action.payload;
				state.searchLoading = false;
				state.currentRequestId = undefined;
			})
			.addCase(getSearchProducts.rejected, (state, action) => {
				if (state.currentRequestId !== action.meta.requestId) return;
				state.searchLoading = false;
				state.currentRequestId = undefined;
				if (!action.payload || action.payload === "Stale result ignored")
					return;
				state.searchError = action.payload;
				state.searchData = [];
			})

			// All Categories Cases
			.addCase(getAllCategories.pending, (state) => {
				state.categoriesLoading = true;
				state.categoriesError = "";
			})
			.addCase(getAllCategories.fulfilled, (state, action) => {
				state.categoriesData = action.payload;
				state.categoriesLoading = false;
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.categoriesError = action.payload;
				state.categoriesLoading = false;
			})
			// get products by Category
			.addCase(getProductsByCategory.pending, (state) => {
				state.productsLoading = true;
				state.productsError = "";
			})
			.addCase(getProductsByCategory.fulfilled, (state, action) => {
				state.productsData = action.payload.products;
				state.productsCount = action.payload?.count;
				state.productsPerPage = action.payload?.page_size;
				state.productsLoading = false;
			})
			.addCase(getProductsByCategory.rejected, (state, action) => {
				state.productsError = action.payload;
				state.productsLoading = false;
			})
			// get product Details
			.addCase(getProductDetails.pending, (state) => {
				state.productDetailsLoading = true;
				state.productDetailsError = "";
			})
			.addCase(getProductDetails.fulfilled, (state, action) => {
				state.productDetailsData = action.payload;
				state.productDetailsLoading = false;
			})
			.addCase(getProductDetails.rejected, (state, action) => {
				state.productDetailsError = action.payload;
				state.productDetailsLoading = false;
			})
			// get related Products
			.addCase(getRelatedProducts.pending, (state) => {
				state.relatedProductsLoading = true;
				state.relatedProductsError = "";
			})
			.addCase(getRelatedProducts.fulfilled, (state, action) => {
				state.relatedProductsLoading = false;
				state.relatedProductsData = action.payload.products;
				state.relatedProductsCount = action.payload.count;
				state.relatedProductsPerPage = action.payload.page_size;
			})
			.addCase(getRelatedProducts.rejected, (state, action) => {
				state.relatedProductsLoading = false;
				state.relatedProductsError = action.payload;
			});
	},
});

export default getData.reducer;
export const {
	setSearchInput,
	setCurrentProductCategory,
	setCurrentProductCode,
} = getData.actions;
