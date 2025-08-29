import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./scrollButton.css";
import useTranslate from "../../../hooks/useTranslate";
export default function ScrollButton() {
	const translate = useTranslate("home");
	function scrollUp() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
	return (
		<div className="uiverse" onClick={() => scrollUp()}>
			<span className="tooltip">{translate("scroll_up")}</span>
			<span>
				<KeyboardArrowUpIcon
					sx={{
						fontSize: "28px",
						zIndex: "30",
					}}
				/>
			</span>
		</div>
	);
}
