import { Routes, Route } from "react-router";
import HomePage from "../pages/homePage/homaPage";
import ShoppingPage from "../pages/shoppingPage/shoppingPage";
import ProductDetails from "../pages/productDetailsPage/productDetails";
import NotFound from "../pages/notFoundPage/notfoundpage";
import CartPage from "../pages/cartPage/cartPage";
import PaymobCheckout from "../pages/paymentPage/paymentPage";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/shopping/:category" element={<ShoppingPage />} />
		<Route path="/productDetails/:code" element={<ProductDetails />} />
		<Route path="/cart" element={<CartPage />} />
		<Route path="*" element={<NotFound />} />
		<Route path="/payment" element={<PaymobCheckout />} />
	</Routes>
);

export default AppRoutes;
