import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
	createTheme({
		palette: {
			mode,
			...(mode === "light"
				? {
						background: {
							default: "#ffffff", // أبيض نقي
							paper: "#f5f5f7", // رمادي فاتح جداً (ناعم جداً)
						},
						text: {
							primary: "#1f2937", // رمادي غامق (مريح للقراءة)
							secondary: "#4b5563", // رمادي متوسط
						},
				  }
				: {
						background: {
							default: "#2f343a", // رمادي غامق جداً قريب من الأسود لكنه ناعم
							paper: "#2f343a", // رمادي غامق للكروت والخلفيات
						},
						text: {
							primary: "#e5e7eb", // رمادي فاتح للخطوط
							secondary: "#9ca3af", // رمادي متوسط فاتح
						},
				  }),
		},
	});
