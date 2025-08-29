import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const features = [
	{
		icon: <VerifiedUserIcon className="text-dark-primary" fontSize="large" />,
		titleKey: "why_choose_us.features.quality_title",
		descriptionKey: "why_choose_us.features.quality_description",
	},
	{
		icon: <LocalShippingIcon className="text-dark-primary" fontSize="large" />,
		titleKey: "why_choose_us.features.delivery_title",
		descriptionKey: "why_choose_us.features.delivery_description",
	},
	{
		icon: <AccessTimeIcon className="text-dark-primary" fontSize="large" />,
		titleKey: "why_choose_us.features.support_title",
		descriptionKey: "why_choose_us.features.support_description",
	},
];
