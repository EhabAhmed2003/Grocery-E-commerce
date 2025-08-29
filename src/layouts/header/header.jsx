import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { headerList } from "../../constants/headerList";
import useWidth from "../../hooks/useWidth";
import DropdownList from "./dropdownList";
import ThemeButton from "../../components/buttons/themeButton/themeButton";
import { setShowCart } from "../../features/cart/cartSlice";
import {
	setIsFixedHeader,
	setShowDropdown,
} from "../../features/header/headerSlice";
import { setShowBlurDiv } from "../../features/blurDiv/blurDivSlice";
import useTranslate from "../../hooks/useTranslate";
import LanguageSwitcher from "../../components/languageSwitcher/languageSwitcher";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const MotionMenuIcon = motion.create(MenuIcon);

const headerVariants = {
	hidden: {
		y: 30,
		opacity: 0,
	},
	fixedHidden: {
		y: -50,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.4, ease: "easeOut" },
	},
	fixedVisible: {
		clipPath: "inset(0% 0% 0% 0%)",
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
	exit: {
		clipPath: "inset(0% 0% 100% 0%)",
		opacity: 0,
		transition: { duration: 0.3, ease: "easeIn" },
	},
};

export default function Header() {
	const translate = useTranslate("header");
	const width = useWidth();
	const dispatch = useDispatch();
	const prevY = useRef();
	const { pathname } = useLocation();
	const { showDropdown, isFixedHeader } = useSelector((state) => state.header);

	/* Handle Show Dropdown && blurDiv */
	const handleShowDropdown = () => {
		dispatch(setShowDropdown(true));
		dispatch(setShowBlurDiv(true));
	};

	/* handle Close Dropdown && BlurDiv */
	const handleCloseDropdown = () => {
		dispatch(setShowDropdown(false));
		dispatch(setShowBlurDiv(false));
	};
	/* Close Dropdown for Big Screens */
	useEffect(() => {
		width >= 640 && showDropdown && handleCloseDropdown();
	}, [width]);

	/* Close Dropdown && blurDiv if Page Changed */
	useEffect(() => {
		dispatch(setShowDropdown(false));
		dispatch(setShowBlurDiv(false));
	}, [pathname]);

	/* Close Dropdown && blurDiv while Scroll */
	useEffect(() => {
		function handleScroll() {
			const currentY = window.pageYOffset;
			dispatch(setIsFixedHeader(true));
			if (currentY < 60) {
				dispatch(setIsFixedHeader(false));
			}

			prevY.current = currentY;
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<AnimatePresence>
			<motion.header
				key={isFixedHeader ? "fixed" : "normal"}
				variants={headerVariants}
				initial={isFixedHeader ? "fixedHidden" : "hidden"}
				animate={isFixedHeader ? "fixedVisible" : "visible"}
				exit="exit"
				className={`${
					isFixedHeader
						? "fixed w-11/12 self-center top-0 min-h-20 sm:px-10 px-3 border-b dark:border-dark-secondary border-light-secondary"
						: "pt-5 sm:pt-3 relative"
				} dark:bg-dark-background bg-light-background flex justify-between items-center z-40`}
			>
				{/* Title */}
				<div>
					<Link to={`/`}>
						<h2 className="text-2xl lg:text-3xl font-bold cursor-pointer">
							{translate("grocery")}
						</h2>
					</Link>
				</div>

				{/* Header List */}
				<nav className="items-center justify-evenly w-1/2 hidden sm:flex sm:w-2/3 xl:w-1/2 h-full">
					{headerList.map((item) => (
						<li key={item.id} className="list-none text-sm">
							<Link
								to={item.path}
								className="block h-full w-full p-4 hover:shadow-lg drop-shadow-lg hover:bg-light-paper hover:rounded-md hover:dark:bg-dark-paper"
							>
								{translate(`${item.value}`)}
							</Link>
						</li>
					))}
				</nav>

				{/* Header Icons */}
				<div className="flex items-center justify-between gap-4">
					<ThemeButton />
					{!isFixedHeader && <LanguageSwitcher />}

					<ShoppingCartOutlinedIcon
						onClick={() => {
							dispatch(setShowCart(true));
							dispatch(setShowBlurDiv(true));
						}}
						sx={{
							fontSize: "25px",
							transition: "scale 0.1s linear",
							"&:hover": {
								scale: "1.05",
								cursor: "pointer",
							},
						}}
					/>
					{/* Dropdown Icons for small screens */}

					<MotionMenuIcon
						onClick={handleShowDropdown}
						sx={{
							fontSize: "30px",
							transition: "scale 0.1s linear",
							display: width >= 639 ? "none" : "block",
							"&:hover": {
								scale: "1.05",
								cursor: "pointer",
							},
						}}
					/>
				</div>

				{/* Dropdown Header List for Small Screens */}
			</motion.header>
			{!isFixedHeader && (
				<DropdownList handleCloseFunction={handleCloseDropdown} />
			)}
			{isFixedHeader && (
				<DropdownList handleCloseFunction={handleCloseDropdown} />
			)}
		</AnimatePresence>
	);
}
