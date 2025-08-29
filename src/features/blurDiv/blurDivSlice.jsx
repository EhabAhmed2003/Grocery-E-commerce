import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showBlurDiv: false,
};

const blurDivSlice = createSlice({
	initialState,
	name: "blurDivSlice",
	reducers: {
		setShowBlurDiv: (state, action) => {
			state.showBlurDiv = action.payload;
		},
	},
});
export default blurDivSlice.reducer;
export const { setShowBlurDiv } = blurDivSlice.actions;
