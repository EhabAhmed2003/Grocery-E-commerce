import plugin from "tailwindcss/plugin";

export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Light Mode
				"light-background": "#ffffff",
				"light-paper": "#f5f5f7",
				"light-text-primary": "#1f2937",
				"light-text-secondary": "#4b5563",
				"light-primary": "hsl(122, 61%, 44%)",
				"light-secondary": "#d1d5db",
				"light-header-background": "#f9fafb",
				"light-list-background": "#e5e7eb",

				// Dark Mode
				"dark-background": "#2f343a",
				"dark-paper": "#393f46",
				"dark-text-primary": "#e5e7eb",
				"dark-text-secondary": "#9ca3af",
				"dark-primary": "hsl(122, 61%, 44%)",
				"dark-secondary": "#6b7280",
				"dark-header-background": "#353a42",
				"dark-list-background": "#3f454f",
			},
		},
	},
	plugins: [
		// ✅ إضافة دعم RTL
		require("tailwindcss-rtl"),
	],
};
