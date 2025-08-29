import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showScrollButton: false,
};

const scrollButtonSlice = createSlice({
	name: "scrollUpSlice",
	initialState,
	reducers: {
		setShowScrollButton: (state, action) => {
			state.showScrollButton = action.payload;
		},
	},
});

export const { setShowScrollButton } = scrollButtonSlice.actions;
export default scrollButtonSlice.reducer;
