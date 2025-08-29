import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import useWidth from "../../hooks/useWidth";
import { categories } from "../../constants/categories";
import Loader from "../../components/loader/loader";
import { getAllCategories } from "../../features/products/productsService";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTranslate from "../../hooks/useTranslate";

export default function CategorySidebar() {
	const translate = useTranslate("categories");
	const [rangeIndex, setRangeIndex] = useState(0);
	const [accordionOpen, setAccordionOpen] = useState(false);
	const {
		categoriesData = [],
		categoriesLoading,
		categoriesError,
	} = useSelector((state) => state.data);
	const width = useWidth();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	/* Get The Categories From Api */
	useEffect(() => {
		if (!categoriesData || categoriesData.length === 0) {
			dispatch(getAllCategories());
		}
	}, []);

	/* Check if we Use Api Data or Constant Data */
	const isUsingFallback = !categoriesData || categoriesData.length === 0;
	/* Slice Categories Data */
	function handleCategoriesNumber(num) {
		return isUsingFallback
			? categories.slice(0, num)
			: categoriesData.slice(0, num);
	}
	/* Slice Data by rangeIndex */
	const options = [10, 30, 50, 70, 100];
	const chooseCategories = handleCategoriesNumber(options[rangeIndex]);

	/* handle rangeIndex (counter) */
	const maxIndex = isUsingFallback ? 2 : 4;
	function handleClick() {
		const isLast = rangeIndex === maxIndex;
		setRangeIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
		if (isLast) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		if (width <= 1023 && isLast) {
			setAccordionOpen(false);
		}
	}
	/* handle Accordion on Small Screens & Back the index to 0 when change the width*/
	useEffect(() => {
		if (width <= 1023) {
			setAccordionOpen(false);
			setRangeIndex(0);
		} else if (width > 1023) {
			setRangeIndex(0);
		}
	}, [pathname]);

	return (
		/* Categories Aside */
		<aside
			className="w-full lg:w-[270px] shadow-xl rounded-lg dark:bg-dark-paper  bg-light-paper"
			style={{ maxHeight: "fit-content" }}
		>
			{/* Category Title */}
			{(!categoriesData || categoriesLoading || width >= 1023) && (
				<h2 className="ltr:text-2xl rtl:text-3xl font-bold ltr:pl-3 rtl:pr-3 pt-4">
					{translate("categories")}
				</h2>
			)}
			{/* Handle Loading */}
			{categoriesLoading ? (
				<Loader />
			) : chooseCategories.length === 0 || !chooseCategories ? (
				<p className="text-red-600 text-center mt-3">
					{/* Error: {categoriesError} */}
					Something went Wrong
				</p>
			) : chooseCategories.length > 0 ? (
				width >= 1023 ? (
					<div className="rounded-lg ltr:pl-3 rtl:pr-3 py-4 flex flex-col gap-6">
						{/* Show Categories in Big Screens */}
						<nav className="flex flex-col gap-2">
							{chooseCategories.map((category) => (
								<Link
									to={`/shopping/${category?.name}`}
									key={category?.id}
									className="w-fit max-w-[100%] px-4"
								>
									<li className="relative overflow-hidden text-ellipsis text-nowrap ">
										{translate(`list.${category?.name}`)}
									</li>
								</Link>
							))}
						</nav>
						{/* handle show more Categories in Big Screens */}
						<button
							onClick={handleClick}
							className="inline-block text-white ltr:ml-3 rtl:mr-3 py-2 px-6 w-fit rounded-l-xl rounded-t-xl hover:bg-transparent hover:border-dark-primary border-solid border-2 border-transparent hover:text-light-primary bg-light-primary font-bold leading-loose transition duration-200"
						>
							{isUsingFallback
								? rangeIndex === 2
									? translate("see_less")
									: translate("see_more")
								: rangeIndex === 4
								? translate("see_less")
								: translate("see_more")}
						</button>
					</div>
				) : (
					/* Accordion for Small Screens */
					<Accordion
						expanded={accordionOpen}
						onChange={() => setAccordionOpen(!accordionOpen)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
						>
							<Typography component="span">
								{/* Category Title */}
								<h2 className="ltr:text-2xl rtl:text-3xl font-bold ">
									{translate("categories")}
								</h2>
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{/* Show Categories in small Screens */}
							<nav className=" flex flex-col gap-2">
								{chooseCategories?.map((category) => (
									<Link
										to={`/shopping/${category?.name}`}
										key={category?.id}
										className="w-fit px-4"
									>
										<li className="text-ellipsis text-nowrap overflow-hidden">
											{translate(`list.${category?.name}`)}
										</li>
									</Link>
								))}
							</nav>
						</AccordionDetails>
						{/* handle Show more Categories for Small Screens */}
						<button
							onClick={handleClick}
							className="inline-block mb-3 ltr:ml-6 rtl:mr-6 py-2 px-6 rounded-l-xl text-white rounded-t-xl hover:bg-transparent hover:border-dark-primary border-solid border-2 border-transparent hover:text-light-primary bg-light-primary font-bold leading-loose transition duration-200"
						>
							{isUsingFallback
								? rangeIndex === 2
									? translate("see_less")
									: translate("see_more")
								: rangeIndex === 4
								? translate("see_less")
								: translate("see_more")}
						</button>
					</Accordion>
				)
			) : null}
		</aside>
	);
}
