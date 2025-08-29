import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showSearchList: false,
};

const showSearchList = createSlice({
	initialState,
	name: "showSearchList",
	reducers: {
		setShowSearchList: (state, action) => {
			state.showSearchList = action.payload;
		},
	},
});

export default showSearchList.reducer;
export const { setShowSearchList } = showSearchList.actions;
