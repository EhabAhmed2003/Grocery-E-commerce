import { createSlice } from "@reduxjs/toolkit";

const saveThemeToLocalStorage = (mode) => {
	localStorage.setItem("theme", JSON.stringify(mode));
};

const setHtmlClass = (mode) => {
	const html = document.documentElement;
	if (mode === "dark") {
		html.classList.add("dark");
	} else {
		html.classList.remove("dark");
	}
};

const initialMode = JSON.parse(localStorage.getItem("theme")) || "light";
setHtmlClass(initialMode);

const initialState = {
	mode: initialMode,
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleMode: (state) => {
			const newMode = state.mode === "light" ? "dark" : "light";
			saveThemeToLocalStorage(newMode);
			setHtmlClass(newMode);
			state.mode = newMode;
		},
		setMode: (state, action) => {
			saveThemeToLocalStorage(action.payload);
			setHtmlClass(action.payload);
			state.mode = action.payload;
		},
	},
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
