import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { setShowCart } from "../../features/cart/cartSlice";
import CartProductCard from "./cartProductCard";
import { getCartProductsFromLocalStorage } from "../../features/cart/cartServices";
import AlertDialogSlide from "./dialog";

import CloseIcon from "@mui/icons-material/Close";
import useTranslate from "../../hooks/useTranslate";
import { setShowBlurDiv } from "../../features/blurDiv/blurDivSlice";

export default function CartDrawer() {
	const translate = useTranslate("home");
	const dispatch = useDispatch();
	const [checkHeight, setCheckHeight] = useState(false);
	const { showCart, cartProducts, totalPrice } = useSelector(
		(state) => state.cart
	);
	const { pathname } = useLocation();

	/* Change Height while Scrolling */
	useEffect(() => {
		function checkScrollY() {
			if (window.scrollY > 25) {
				setCheckHeight(true);
			} else {
				setCheckHeight(false);
			}
		}
		window.addEventListener("scroll", checkScrollY);
		return () => {
			window.removeEventListener("scroll", checkScrollY);
		};
	}, []);

	/* Close CartDrawer when Page changed */
	useEffect(() => {
		dispatch(setShowCart(false));
	}, [pathname]);
	
	/* get Cart products from LocalStorage */
	useEffect(() => {
		dispatch(getCartProductsFromLocalStorage());
	}, []);
	return (
		/* Cart Drawer */
		<AnimatePresence>
			{showCart && (
				<motion.section
					initial={{ x: "100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
					exit={{ x: "100%", opacity: 0 }}
					className={`fixed z-50  right-0  w-full sm:w-[350px] ${
						checkHeight ? "h-[100vh] top-0" : "border-t h-[96.5vh] top-[40px]"
					} bg-light-paper  dark:bg-dark-background  flex flex-col border-l dark:border-dark-secondary border-light-secondary`}
				>
					{/* Header: Title + Products Number*/}
					<div className="p-4 border-b dark:border-dark-secondary flex justify-between items-center">
						<h2 className="text-lg font-bold">
							{translate("cart.your_cart")} ({cartProducts?.length}{" "}
							{cartProducts?.length === 1
								? translate("cart.product")
								: translate("cart.products")}
							)
						</h2>
						{/* Close CartDrawer Button */}
						<span
							onClick={() => {
								dispatch(setShowCart(false));
								dispatch(setShowBlurDiv(false));
							}}
							className=" hover:cursor-pointer"
						>
							<CloseIcon style={{ fontSize: "30px" }} />
						</span>
					</div>
					{/* Cart Products List */}
					<div className="scrollbar flex flex-col gap-3 overflow-y-auto py-4 px-2 mb-36 sm:mb-24">
						{cartProducts?.map((cartProduct) => {
							return (
								<CartProductCard
									key={cartProduct?.code}
									product={cartProduct}
								/>
							);
						})}
					</div>
					{/* Footer : total & Buttons */}
					<div className="absolute bottom-0 w-full p-4 border-t dark:border-dark-secondary dark:bg-dark-background bg-light-background flex flex-col gap-3 z-50">
						<div>
							<p className="flex gap-2 text-lg">
								<strong>{translate("cart.total_price")} : </strong>
								<span>{totalPrice} $</span>
							</p>
						</div>
						{/* Buttons (Got to CartPage & clear cartDrawer)*/}
						<div className="flex gap-3 flex-col sm:flex-row">
							<Link to={"/cart"} className="w-full">
								<button className="w-full uppercase py-2 bg-dark-primary text-white rounded-sm hover:bg-opacity-90 transition">
									{translate("cart.checkout")}
								</button>
							</Link>
							{/* Dialog to Sure if u want to delete Products from Cart */}
							<div className="w-full">
								<AlertDialogSlide />
							</div>
						</div>
					</div>
				</motion.section>
			)}
		</AnimatePresence>
	);
}
