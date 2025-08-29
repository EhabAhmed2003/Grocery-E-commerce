import { useDispatch, useSelector } from "react-redux";

import {
	addCountToProduct,
	minusCountFromProduct,
	deleteProductFromCart,
} from "../../features/cart/cartServices";

import ClearIcon from "@mui/icons-material/Clear";
import useTranslate from "../../hooks/useTranslate";
import PaymobCheckout from "../paymentPage/paymentPage";
import { Link } from "react-router";

export default function CartPage() {
	const translate = useTranslate("home");
	const { cartProducts, totalPrice } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleIncrease = (product) => {
		dispatch(addCountToProduct(product));
	};

	const handleDecrease = (product) => {
		dispatch(minusCountFromProduct(product));
	};

	const handleDelete = (code) => {
		dispatch(deleteProductFromCart(code));
	};

	return (
		/* Cart Page */
		<section className="min-h-screen px-4 md:px-8 py-8 bg-gray-50 dark:bg-dark-background rounded-xl">
			<div className="max-w-5xl mx-auto flex flex-col gap-6">
				{/* Header: Title & Count */}
				<div className="flex justify-between items-center">
					{/* Title */}
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
						{translate("cart.your_cart")}
					</h1>
					{/* Products count */}
					<span className="text-lg text-gray-600 dark:text-gray-300">
						{cartProducts?.length}{" "}
						{cartProducts?.length > 1
							? translate("cart.products")
							: translate("cart.product")}
					</span>
				</div>

				{!cartProducts || cartProducts.length === 0 ? (
					<p className="text-center text-lg">{translate("cart.cart_empty")}</p>
				) : (
					/* CartPage products */
					<div className="flex flex-col gap-6">
						{cartProducts?.map((product) => (
							<div
								key={product.code}
								className="relative bg-white dark:bg-dark-paper rounded-xl shadow-md p-4 w-full flex flex-col sm:flex-row gap-4 hover:dark:bg-dark-background hover:dark:border-dark-text-secondary border border-transparent"
							>
								{/* Delete button */}
								<button
									onClick={() => handleDelete(product.code)}
									className="absolute hover:scale-110 top-3 ltr:right-3 rtl:left-3 text-light-text-secondary dark:text-dark-secondary hover:dark:text-red-500 hover:text-red-500 transition"
								>
									<ClearIcon />
								</button>

								{/* Image */}
								<div className="w-full sm:w-32 flex-shrink-0">
									<img
										src={product?.image_front_url}
										alt={product?.product_name}
										className="w-full h-40 sm:h-32 object-contain dark:bg-dark-background bg-light-paper rounded-lg"
									/>
								</div>

								{/* Content */}
								<div className="flex flex-col gap-2 w-full">
									{/* Name */}
									<h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
										{product?.product_name || "Unnamed Product"}
									</h2>

									{/* Info & Actions */}
									<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
										{/* Product Info */}
										<div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
											<p>
												{translate("cart.card.quantity")}:{" "}
												<span className="font-medium">
													{product?.quantity || "N/A"}
												</span>
											</p>
											<p>
												{translate("cart.card.base_price")}:{" "}
												<span className="font-medium">
													${product?.basePrice}
												</span>
											</p>
											{/* Product Total Price */}
											<p className="font-semibold text-gray-800 dark:text-white">
												{translate("cart.card.total")}: ${product?.price}
											</p>
										</div>

										{/*  Add & Minus Buttons */}
										<div className="flex items-center gap-3 self-end sm:self-auto mt-2">
											{/* Add Button */}
											<button
												onClick={() => handleDecrease(product)}
												className="w-8 h-8 border border-gray-400 text-gray-700 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
											>
												-
											</button>
											{/* Counter */}
											<span className="font-semibold text-lg">
												{product.count}
											</span>
											{/* Minus Button */}
											<button
												onClick={() => handleIncrease(product)}
												className="w-8 h-8 border border-gray-400 text-gray-700 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
											>
												+
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
				{/* Footer :  Total Price & Buy All Button */}
				{cartProducts?.length > 0 && (
					<div className="flex flex-col gap-4 items-end mt-6">
						{/* Total Price */}
						<p className="text-xl font-bold text-gray-800 dark:text-white">
							{translate("cart.total_price")}:{" "}
							<span className="text-primary"> {totalPrice} $</span>
						</p>
						{/* Buy ALL Button */}
						<Link
							to="/payment"
							className="self-center flex justify-center items-center ltr:text-xl rtl:text-2xl w-[200px] h-[60px] mt-4 rounded-l-xl text-white rounded-t-xl  hover:bg-transparent hover:border-dark-primary border-solid border-2 border-transparent hover:text-light-primary bg-light-primary font-bold leading-loose transition duration-200"
						>
							<button className="">{translate("cart.buy_all")}</button>
						</Link>
					</div>
				)}
			</div>
		</section>
	);
}
