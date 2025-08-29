import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import { getTheme } from "../features/theme/theme";

const ThemeWrapper = () => {
	const mode = useSelector((state) => state.theme.mode);
	const theme = getTheme(mode);
	useEffect(() => {
		const html = document.documentElement;
		if (mode === "dark") {
			html.classList.add("dark");
		} else {
			html.classList.remove("dark");
		}
	}, [mode]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	);
};

export default ThemeWrapper;
