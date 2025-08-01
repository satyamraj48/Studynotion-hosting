import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { setUser } from "../../reducer/slices/profileSlice";

const {
	UPDATE_DISPLAY_PICTURE_API,
	UPDATE_PROFILE_API,
	DELETE_PROFILE_API,
	CHANGE_PASSWORD_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			const response = await apiconnector(
				"PUT",
				UPDATE_DISPLAY_PICTURE_API,
				formData,
				{
					"Content-Type": "multipart/form-data",
					Authorisation: `Bearer ${token}`,
				}
			);

			console.log(
				"UPDATE_DISPLAY_PICTURE API RESPONSE............",
				response.data.updatedUserDetails
			);
			if (!response.data.success) throw new Error(response.data.message);

			const updatedUser = {
				...response.data.updatedUserDetails,
			};

			dispatch(setUser(updatedUser));
			localStorage.setItem("user", JSON.stringify(updatedUser));

			toast.success("Profile Picture Updated Successfully");
		} catch (error) {
			console.log("UPDATE_DISPLAY_PICTURE API ERROR............", error);

			toast.error("Could Not Update Display Picture");
		}
		toast.dismiss(toastId);
	};
}

export function updateProfile(token, formData) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			const response = await apiconnector("PUT", UPDATE_PROFILE_API, formData, {
				Authorisation: `Bearer ${token}`,
			});

			console.log(
				"UPDATE_PROFILE API RESPONSE............",
				response.data.updatedUserDetails
			);
			if (!response.data.success) throw new Error(response.data.message);

			const updatedUser = {
				...response.data.updatedUserDetails,
			};

			dispatch(setUser(updatedUser));
			localStorage.setItem("user", JSON.stringify(updatedUser));

			toast.success("Profile Updated Successfully");
		} catch (error) {
			console.log("UPDATE_PROFILE API ERROR............", error);

			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	};
}

export function deleteProfile(token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			const response = await apiconnector("DELETE", DELETE_PROFILE_API, null, {
				Authorisation: `Bearer ${token}`,
			});

			console.log("DELETE_PROFILE_API API RESPONSE..........", response);
			if (!response.data.success) throw new Error(response.data.message);
			toast.success("Profile Deleted Successfully");
			dispatch(logout(navigate));
		} catch (error) {
			console.log("DELETE_PROFILE_API API ERROR............", error);
			toast.error("Could Not Delete Profile");
		}
		toast.dismiss(toastId);
	};
}

export async function changePassword(token, formData) {
	const toastId = toast.loading("Loading...");
	try {
		const response = await apiconnector("POST", CHANGE_PASSWORD_API, formData, {
			Authorisation: `Bearer ${token}`,
		});

		console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

		if (!response.data.success) throw new Error(response.data.message);
		toast.success("Password Updated Successfully");
	} catch (error) {
		console.log("CHANGE_PASSWORD_API API ERROR............", error);

		toast.error(error.response.data.message);
	}
	toast.dismiss(toastId);
}
