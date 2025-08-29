import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPopularProducts = createAsyncThunk(
	"popularProducts/getPopularProducts",
	async (page = 1, thunkAPI) => {
		try {
			const res = await axios.get(
				"https://world.openfoodfacts.org/api/v2/search",
				{
					params: {
						sort_by: "unique_scans_n",
						fields: "product_name,code,image_front_url,nutriments,quantity",
						page_size: 20,
						page: page,
					},
				}
			);

			return res.data.products;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

let cancelTokenSearch;

export const getSearchProducts = createAsyncThunk(
	"search/getSearchItems",
	async (name, thunkAPI) => {
		if (name === "") return;
		if (cancelTokenSearch) {
			cancelTokenSearch.cancel("Canceled previous search request.");
		}
		cancelTokenSearch = axios.CancelToken.source();
		try {
			const res = await axios.get(
				`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&search_simple=1&action=process&json=1`,
				{ cancelToken: cancelTokenSearch.token }
			);

			const filtered = res.data.products.filter((product) =>
				product.product_name?.toLowerCase().includes(name?.toLowerCase())
			);
			return filtered;
		} catch (error) {
			if (axios.isCancel(error)) return;
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const getAllCategories = createAsyncThunk(
	"categories/getAllCategories",
	async (_, thunkAPI) => {
		try {
			const res = await axios.get(
				"https://corsproxy.io/?https://world.openfoodfacts.org/categories.json"
			);
			return res.data.tags;
		} catch (err) {
			return thunkAPI.rejectWithValue(err?.message || "Request failed");
		}
	}
);

let cancelTokenCategory;

export const getProductsByCategory = createAsyncThunk(
	"products/getProductsByCategory",
	async ({ page = 1, category = "cheeses" }, thunkAPI) => {
		if (cancelTokenCategory) {
			cancelTokenCategory.cancel("Operation canceled due to new request.");
		}

		cancelTokenCategory = axios.CancelToken.source();

		try {
			const res = await axios.get(
				`https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${category}&page=${page}&fields=code,product_name,image_front_url,nutriments,brands,quantity,ingredients_text,categories_tags,labels_tags,countries_tags`,
				{ cancelToken: cancelTokenCategory.token }
			);

			return res.data;
		} catch (err) {
			if (axios.isCancel(err)) return; // تجاهل الخطأ إذا تم إلغاء الطلب
			return thunkAPI.rejectWithValue(err?.message || "Request failed");
		}
	}
);

export const getProductDetails = createAsyncThunk(
	"productDetails/getProductDetails",
	async (code = 3302740050268, thunkAPI) => {
		try {
			const res = await axios.get(
				`https://world.openfoodfacts.org/api/v2/product/${code}.json`
			);
			return res.data.product;
		} catch (err) {
			return thunkAPI.rejectWithValue(err?.message || "Request failed");
		}
	}
);

export const getRelatedProducts = createAsyncThunk(
	"relatedProducts/getRelatedProducts",
	async ({ category = "meats", page = 1, pageSize = 10 }, thunkAPI) => {
		try {
			const response = await axios.get(
				"https://world.openfoodfacts.org/api/v2/search",
				{
					params: {
						categories_tags_en: category,
						page,
						page_size: pageSize,
						fields: "product_name,code,image_front_url,nutriments,quantity",
						sort_by: "popularity",
					},
				}
			);
			return response.data;
		} catch (err) {
			return thunkAPI(err?.message || "Request failed");
		}
	}
);
