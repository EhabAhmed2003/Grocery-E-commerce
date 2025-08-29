import { Link } from "react-router";
import "./shopNowButton.css";
import useTranslate from "../../../hooks/useTranslate";

export default function ShopNowButton({ pathTo }) {
	const translate = useTranslate("home");
	return (
		<Link to={`${pathTo}`}>
			<button className="button lg:w-[150px] w-[130px]">
				<span className="shadow"></span>
				<span className="edge"></span>
				<div className="front lg:text-[1.3rem] ">
					<span>{translate("hero_section.shop_now")}</span>
				</div>
			</button>
		</Link>
	);
}
