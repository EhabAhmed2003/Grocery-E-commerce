import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showDropdown: false,
	isFixedHeader: false,
};
const headerSlice = createSlice({
	name: "dropdownSlice",
	initialState,
	reducers: {
		setShowDropdown: (state, action) => {
			state.showDropdown = action.payload;
		},
		setIsFixedHeader: (state, action) => {
			state.isFixedHeader = action.payload;
		},
	},
});

export default headerSlice.reducer;
export const { setShowDropdown, setIsFixedHeader } = headerSlice.actions;
