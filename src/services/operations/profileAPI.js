import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiconnector } from "../apiconnector";

const {
	GET_USER_DETAILS_API,
	GET_USER_ENROLLED_COURSES_API,
	GET_INSTRUCTOR_DASHBOARD_API,
} = profileEndpoints;



//get user enrolled courses
export async function getUserEnrolledCourses(token) {
	const toastId = toast.loading("Loading...");
	let result = [];
	try {
		const response = await apiconnector(
			"GET",
			GET_USER_ENROLLED_COURSES_API,
			null,
			{
				Authorisation: `Bearer ${token}`,
			}
		);

		console.log("GET_USER_ENROLLED_COURSES_API RESPONSE.........", response);

		if (!response.data.success) {
			throw new Error(response.data.message);
		}

		result = response.data.data;
	} catch (error) {
		console.log("GET_USER_ENROLLED_COURSES_API ERROR.........", error);
		toast.error("Could Not Get Enrolled Courses");
	}
	toast.dismiss(toastId);
	return result;
}

//get instructor data
export async function getInstructorData(token) {
	const toastId = toast.loading("Loading...");
	let result = [];
	try {
		const response = await apiconnector(
			"GET",
			GET_INSTRUCTOR_DASHBOARD_API,
			null,
			{ Authorisation: `Bearer ${token}` }
		);

		// console.log("GET_INSTRUCTOR_DASHBOARD_API RESPONSE.........", response);

		if (!response.data.success) {
			throw new Error(response.data.message);
		}

		result = response?.data?.data;
	} catch (error) {
		console.log("GET_INSTRUCTOR_DASHBOARD_API ERROR.........", error);
		toast.error("Could Not Get Instructor Dashboard");
	}
	toast.dismiss(toastId);
	return result;
}
