import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { paymentEndpoints } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { resetCart } from "../../reducer/slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_SUCCESS_EMAIL_API } =
	paymentEndpoints;

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;

		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}

export const buyCourses = async (
	courses,
	token,
	userDetails,
	navigate,
	dispatch
) => {
	const toastId = toast.loading("Loading...");
	try {
		//load the script
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			toast.error("Razorpay SDK failed to load");
			return;
		}

		//initiate the order
		const orderResponse = await apiconnector(
			"POST",
			COURSE_PAYMENT_API,
			{
				courses,
			},
			{ Authorisation: `Bearer ${token}` }
		);

		console.log("+++++++++>", orderResponse);
		if (!orderResponse?.data?.success)
			throw new Error(orderResponse.data.message);

		//options
		const options = {
			key: process.env.RAZORPAY_KEY,
			currency: orderResponse.data.data.currency,
			amount: orderResponse.data.data.amount,
			order_id: orderResponse.data.data.id,
			name: "StudyNotion",
			description: "Thank You for Purchasing the Course",
			image: rzpLogo,
			prefill: {
				name: `${userDetails.firstName} ${userDetails.lastName}`,
				email: userDetails.email,
			},
			handler: function (response) {
				//send successful wala mail
				sendPaymentSuccessEmail(
					response,
					orderResponse.data.data.amount,
					token
				);
				//verify payment
				verifyPayment({ ...response, courses }, token, navigate, dispatch);
			},
		};

		//miss ho gya tha
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
		paymentObject.on("payment.failed", function (response) {
			toast.error("oops, payment failed");
			console.log(response.error);
		});
	} catch (error) {
		console.log("PAYMENT_API ERROR ......", error);
		console.log("PAYMENT_API ERROR MESSAGE ......", error.message);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
};

async function sendPaymentSuccessEmail(response, amount, token) {
	try {
		await apiconnector(
			"POST",
			SEND_SUCCESS_EMAIL_API,
			{
				orderId: response.razorpay_order_id,
				paymentId: response.razorpay_payment_id,
				amount,
			},
			{
				Authorisation: `Bearer ${token}`,
			}
		);
	} catch (error) {
		console.log("PAYMENT SUCCESS EMAIL ERROR ", error);
	}
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
	const toastId = toast.loading("Verifying Payment....");
	// dispatch(setPaymentLoading(true));
	try {
		//verify the payment
		const response = await apiconnector("POST", COURSE_VERIFY_API, bodyData, {
			Authorisation: `Bearer ${token}`,
		});

		if (!response?.data?.success) throw new Error(response.data.message);

		toast.success("Payment Successful");
		navigate("/dashboard/enrolled-courses");
		dispatch(resetCart());
	} catch (error) {
		console.log("PAYMENT VERIFY ERROR....", error);
		toast.error("Could not verify Payment");
	}
	toast.dismiss(toastId);
	// dispatch(setPaymentLoading(false));
}
