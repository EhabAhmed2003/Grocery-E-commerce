import { Link } from "react-router";
import { useDispatch } from "react-redux";

import {
	addCountToProduct,
	deleteProductFromCart,
	minusCountFromProduct,
} from "../../features/cart/cartServices";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";

export default function CartProductCard({ product }) {
	const dispatch = useDispatch();

	return (
		/* Cart Product Card */
		<div className="relative z-50 flex items-start min-h-[130px] py-4 border-b dark:border-gray-700 border-gray-200 group">
			{/* Delete Product Button */}
			<button
				onClick={() => dispatch(deleteProductFromCart(product?.code))}
				className="absolute top-2 ltr:right-2 rtl:left-2 z-10 w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary hover:dark:text-red-600 hover:text-red-600 hover:scale-110 duration-200 transition"
			>
				<ClearIcon fontSize="small" />
			</button>

			{/* Cart Product Image*/}
			<Link to={`/productDetails/${product?.code}`}>
				<img
					className="w-24 h-24 rounded-md object-contain dark:bg-gray-700 bg-gray-100 shrink-0 hover:cursor-pointer"
					src={product?.image_front_url}
					alt="product"
					loading="lazy"
				/>
			</Link>

			{/* Cart Product Details */}
			<div className="flex flex-col justify-between flex-1 min-w-0 ltr:pl-3 rtl:pr-3">
				{/* Cart Product Title + Price*/}
				<div>
					<Link to={`/productDetails/${product?.code}`}>
						<h3 className="text-md sm:text-lg font-semibold ltr:w-[80%] rtl:w-[90%] text-gray-800 dark:text-white truncate">
							{product?.product_name || "Unnamed Product"}
						</h3>
					</Link>
					<strong className="text-xs sm:text-sm dark:text-dark-text-secondary text-light-text-secondary">
						${(product?.price ?? product?.basePrice)?.toFixed(2)}
					</strong>
				</div>

				<div className="flex items-center gap-2 mt-2">
					{/* Add & Minus for Cart Product*/}
					<div className="flex items-center gap-0 flex-shrink-0">
						<button
							onClick={() => dispatch(minusCountFromProduct(product))}
							className="w-7 h-7 flex items-center justify-center border border-light-secondary dark:border-dark-secondary text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary  transition"
						>
							<RemoveIcon fontSize="small" />
						</button>

						<span className="min-w-6 text-sm text-center select-none text-gray-800 dark:text-white font-medium">
							{product?.count}
						</span>

						<button
							onClick={() => dispatch(addCountToProduct(product))}
							className="w-7 h-7 flex items-center justify-center border border-light-secondary dark:border-dark-secondary text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary  transition"
						>
							<AddIcon fontSize="small" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
