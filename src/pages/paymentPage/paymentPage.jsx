// PaymobCheckout.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";

const PaymobCheckout = () => {
	const [paymentToken, setPaymentToken] = useState("");

	const apiKey =
		"ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBMk1UTTRNU3dpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5kTmg0NUxvcWJ0TTRQRV9UM19waWFsWE9WbU1yTXFTMFJsVGx5OXVjV0F4cnJNcHY1aWs3NVdfc0hzbDlKZzlrNk4wTjlTY2x6OW5FcjNWQjVJdnhoUQ=="; // ← اختصرته هنا لكن إنت استخدم كامل السطر

	const iframeId = 941129;
	const integrationId = 5197920;

	useEffect(() => {
		const initiatePayment = async () => {
			try {
				// ✅ الخطوة 1: الحصول على auth token
				const { data: authData } = await axios.post(
					"https://accept.paymob.com/api/auth/tokens",
					{ api_key: apiKey }
				);
				const authToken = authData.token;

				// ✅ الخطوة 2: إنشاء الطلب Order
				const { data: orderData } = await axios.post(
					"https://accept.paymob.com/api/ecommerce/orders",
					{
						auth_token: authToken,
						delivery_needed: false,
						amount_cents: 10000, // يعني 100 جنيه
						currency: "EGP",
						items: [],
					}
				);
				const orderId = orderData.id;

				// ✅ الخطوة 3: إنشاء payment key
				const { data: paymentData } = await axios.post(
					"https://accept.paymob.com/api/acceptance/payment_keys",
					{
						auth_token: authToken,
						amount_cents: 10000,
						expiration: 3600,
						order_id: orderId,
						billing_data: {
							apartment: "NA",
							email: "test@example.com",
							floor: "NA",
							first_name: "Ehab",
							street: "NA",
							building: "NA",
							phone_number: "+201000000000",
							shipping_method: "NA",
							postal_code: "NA",
							city: "Cairo",
							country: "EG",
							last_name: "Ahmed",
							state: "NA",
						},
						currency: "EGP",
						integration_id: integrationId,
					}
				);
				const paymentKey = paymentData.token;

				// ✅ حفظ الـ payment token لعرض الـ iframe
				setPaymentToken(paymentKey);
			} catch (error) {
				console.error("خطأ أثناء تهيئة الدفع:", error);
			}
		};

		initiatePayment();
	}, []);

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			{paymentToken ? (
				<iframe
					src={`https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`}
					width="100%"
					className="rounded-xl h-[900px]"
					frameBorder="0"
					title="Paymob Checkout"
					allowFullScreen
				></iframe>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default PaymobCheckout;
