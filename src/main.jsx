import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./i18n/i18n";
import ThemeWrapper from "./app/themeWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<ThemeWrapper />
		</BrowserRouter>
	</Provider>
);
