import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../reducer/slices/authSlice";
import { setUser } from "../../reducer/slices/profileSlice";
import { resetCart } from "../../reducer/slices/cartSlice";

const {
	SENDOTP_API,
	SIGNUP_API,
	LOGIN_API,
	RESET_PASSWORD_TOKEN_API,
	RESET_PASSWORD_API,
} = authEndpoints;

export function sendOtp(email, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const response = await apiconnector("POST", SENDOTP_API, {
				email,
			});

			console.log("SEND OTP API RESPONSE.........", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("OTP Sent Successful");
			navigate("/verify-email");
		} catch (error) {
			console.log("SEND OTP API ERROR.........", error);
			toast.error("Could Not Send OTP");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function signUp(
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
	accountType,
	otp,
	navigate
) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const response = await apiconnector("POST", SIGNUP_API, {
				email,
				password,
				confirmPassword,
				accountType,
				firstName,
				lastName,
				otp,
			});

			console.log("SIGNUP API RESPONSE.........", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("SignUp Successful");
			navigate("/login");
		} catch (error) {
			console.log("SIGNUP API ERROR.........", error);
			toast.error("Signup Failed");
			navigate("/signup");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function login(email, password, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiconnector("POST", LOGIN_API, {
				email,
				password,
			});

			console.log("LOGIN API RESPONSE.........", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Login Successful");

			//set token for auth
			dispatch(setToken(response.data.token));
			localStorage.setItem("token", JSON.stringify(response.data.token));

			//set user for profile
			dispatch(setUser(response.data.user));
			localStorage.setItem("user", JSON.stringify(response.data.user));

			navigate("/dashboard/my-profile");
		} catch (error) {
			console.log("LOGIN API ERROR.........", error);
			setTimeout(() => toast(`**${error.response.data.message}`), 1000);
			toast.error("Login Failed!");
		}
		dispatch(setLoading(false));
	};
}

export function getPasswordResetToken(email, setSentEmail) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const response = await apiconnector("POST", RESET_PASSWORD_TOKEN_API, {
				email,
			});
			console.log("RESET PASSWORD TOKEN RESPONSE.....", response);
			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success("Reset Email Sent");
			setSentEmail(true);
		} catch (error) {
			console.log("Reset Password Token Error", error);
			toast.error("Failed To Send Reset Email");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function resetPassword(password, confirmPassword, token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const response = await apiconnector("POST", RESET_PASSWORD_API, {
				password,
				confirmPassword,
				token,
			});

			console.log("RESET PASSWORD RESPONSE....", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Password Reset Successfully");
			navigate("/login");
		} catch (error) {
			console.log("RESETTING PASSWORD ERROR....", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
		dispatch(setLoading(false));
	};
}

export function logout(navigate) {
	return (dispatch) => {
		dispatch(setToken(null));
		dispatch(setUser(null));
		dispatch(resetCart());
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		toast.success("Logged Out");
		navigate("/");
	};
}
