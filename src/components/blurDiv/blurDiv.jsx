import { useDispatch, useSelector } from "react-redux";
import { setShowDropdown } from "../../features/header/headerSlice";
import { setShowSearchList } from "../../features/searchInput/showSearchListSlice";
import { setShowCart } from "../../features/cart/cartSlice";
import { setSearchInput } from "../../features/products/productsSlice";
import { setShowBlurDiv } from "../../features/blurDiv/blurDivSlice";

export default function BlurDiv() {
	const { showBlurDiv } = useSelector((state) => state.blurDiv);
	const dispatch = useDispatch();

	function handleClick() {
		dispatch(setShowDropdown(false));
		dispatch(setShowBlurDiv(false));
		dispatch(setShowSearchList(false));
		dispatch(setSearchInput(""));
		dispatch(setShowCart(false));
	}
	return (
		<>
			{showBlurDiv && (
				<div
					onClick={handleClick}
					className="fixed inset-0 bg-black opacity-30 z-40 pointer-events-auto"
				></div>
			)}
		</>
	);
}
