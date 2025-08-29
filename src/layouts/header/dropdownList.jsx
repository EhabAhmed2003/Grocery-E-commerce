import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import { headerList } from "../../constants/headerList";

import CloseIcon from "@mui/icons-material/Close";
import useTranslate from "../../hooks/useTranslate";

const MotionCloseIcon = motion.create(CloseIcon);

export default function DropdownList({ handleCloseFunction }) {
	const translate = useTranslate("header");
	const { showDropdown, isFixedHeader } = useSelector((state) => state.header);

	return (
		<AnimatePresence mode="wait">
			{showDropdown && (
				<motion.div
					initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
					animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
					exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
					transition={{ duration: 0.4 }}
					className={`${
						isFixedHeader
							? "fixed top-[80px] left-1/2 -translate-x-1/2 w-[87%]"
							: "fixed top-[115px] left-1/2 -translate-x-1/2 w-[87%]"
					} z-50 shadow-2xl min-h-fit rounded-lg p-5 flex flex-col items-center dark:bg-dark-paper bg-light-paper`}
				>
					<MotionCloseIcon
						className="absolute sm:none block z-50 ltr:right-2 rtl:left-2 top-2 hover:cursor-pointer hover:scale-110 duration-100 transition"
						onClick={handleCloseFunction}
						sx={{ fontSize: "30px" }}
					/>
					{headerList.map((item) => (
						<li key={item.id} className="list-none text-sm w-fit">
							<Link
								to={item.path}
								className="block h-full w-full p-4 hover:shadow-lg drop-shadow-lg hover:bg-light-paper hover:rounded-md hover:dark:bg-dark-paper"
							>
								{translate(item.value)}
							</Link>
						</li>
					))}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
