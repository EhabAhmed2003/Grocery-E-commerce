import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cart/cartServices";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useTranslate from "../../hooks/useTranslate";

export default function ProductCard({ product }) {
	const translate = useTranslate("home");
	const { image_front_url, product_name, nutriments, code, quantity } = product;
	const dispatch = useDispatch();

	return (
		/* Product Card */
		<div className="w-full pb-3 m-auto h-[350px] flex flex-col gap-1.5">
			{/* Product Image */}
			<div className="relative group w-full h-[70%] bg-light-paper dark:bg-dark-paper rounded-xl overflow-hidden">
				<img
					className="w-full h-full object-contain transition-all duration-500 group-hover:blur-md group-hover:opacity-30"
					src={image_front_url}
					alt="img"
					loading="lazy"
				/>

				{/* Add to Cart Button */}
				<button
					onClick={() => dispatch(addProductToCart(product))}
					className="w-[60px] h-[30px] z-10 text-dark-text-primary bg-dark-primary hover:bg-transparent hover:text-light-primary border border-transparent hover:border-dark-primary rounded-full absolute hover:cursor-pointer right-3 bottom-3 transition-transform duration-200"
				>
					<AddShoppingCartIcon fontSize="small" />
				</button>

				{/* View Details Button */}
				<div className="absolute inset-0 flex items-center justify-center">
					<Link to={`/productDetails/${code}`}>
						<button
							className="opacity-0 h-12 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300   
							px-4 py-2 text-sm font-semibold rounded-md border border-light-secondary   
							dark:border-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-secondary  
							bg-opacity-80 backdrop-blur-md text-dark dark:text-light"
						>
							{translate("product_card.view_details")}
						</button>
					</Link>
				</div>
			</div>

			{/* Card Title */}
			<Link
				to={`/productDetails/${code}`}
				className="text-md hover:underline truncate w-fit max-w-[90%]"
			>
				<strong>{product_name || "Unnamed Product"}</strong>
			</Link>
			{/* Card Details: kcal & Quantity */}
			<div>
				<p className="text-sm dark:text-dark-text-secondary text-light-text-secondary">
					<strong>{translate("product_card.quantity")} : </strong>
					{quantity || "N/A"}
				</p>
				<p className="text-sm dark:text-dark-text-secondary text-light-text-secondary">
					<strong>{translate("product_card.kcal")} : </strong>
					{Math.round(nutriments?.["energy-kcal"]) || "N/A"}
				</p>
			</div>
		</div>
	);
}
