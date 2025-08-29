import * as React from "react";
import { useDispatch } from "react-redux";

import { deleteAllProductsFromCart } from "../../features/cart/cartServices";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useTranslate from "../../hooks/useTranslate";
import { setShowCart } from "../../features/cart/cartSlice";
import { setShowBlurDiv } from "../../features/blurDiv/blurDivSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
	const translate = useTranslate("home");
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				fullWidth
				sx={{
					paddingY: "8px",
					borderColor: "red",
					color: "red",
					"&:hover": {
						backgroundColor: "rgba(255, 0, 0, 0.08)",
						borderColor: "red",
					},
				}}
			>
				{translate("cart.clear")}
			</Button>

			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{translate("cart.dialog.massege")}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{translate("cart.dialog.massege_sure")}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						{translate("cart.dialog.massege_disagree")}
					</Button>
					<Button
						onClick={() => {
							handleClose();
							dispatch(deleteAllProductsFromCart());
							dispatch(setShowCart(false));
							dispatch(setShowBlurDiv(false));
						}}
						color="error"
					>
						{translate("cart.dialog.massege_agree")}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
