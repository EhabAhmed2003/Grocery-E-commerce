import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastWrapper() {
	return (
		<ToastContainer
			position="bottom-left"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover={false}
			theme="colored"
			transition={Slide}
		/>
	);
}
