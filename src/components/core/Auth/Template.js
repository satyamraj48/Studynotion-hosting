import React from "react";
import frameImage from "../../../assets/Images/frame.png";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { googleSignInSignUp } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";

function Template({ title, desc1, desc2, image, formtype }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const [formData, setFormData] = useState({});

	function generateRandomPassword(length) {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,./;'[]{}()";
		let result = "";
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
			counter += 1;
		}
		return result;
	}

	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			// console.log("token-> ", tokenResponse);

			const response = await axios.get(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
				}
			);

			if (response.status === 200) {
				const userInfo = response.data;

				const randomPassword = generateRandomPassword(10);

				let firstName = userInfo.given_name;
				let lastName = userInfo.family_name;
				let email = userInfo.email;
				let password = randomPassword;
				let confirmPassword = randomPassword;
				let accountType = ACCOUNT_TYPE.STUDENT;

				dispatch(
					googleSignInSignUp(
						firstName,
						lastName,
						email,
						password,
						confirmPassword,
						accountType,
						navigate
					)
				);
				firstName = "";
				lastName = "";
				email = "";
				password = "";
				confirmPassword = "";
			}
		},
		onError: () => {
			toast.error("Error in login, Please Try Again!");
		},
	});

	return (
		<div className="flex flex-col-reverse items-center md:flex-row md:items-start md:justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-12">
			<div className="text-richblack-5 w-full max-w-[450px] ">
				<h1 className="text-[1.875rem] leading-[2.375rem] font-semibold  ">
					{title}
				</h1>
				<p className="text-[1.125rem] leading-[1.625rem] mt-4 ">
					<span className="text-richblack-100 text-[16px] ">{desc1}</span>
					<br />
					<span className="font-edu-sa font-bold text-blue-100 text-[16px] italic">
						{desc2}
					</span>
				</p>
				{formtype === "signup" ? <SignUpForm /> : <SignInForm />}

				<div className="flex w-full my-4 gap-x-2 items-center">
					<div className="w-full h-[1px] bg-richblack-300 "></div>
					<p className="text-richblack-300 text-sm">OR</p>
					<div className="w-full h-[1px] bg-richblack-300 "></div>
				</div>

				<button
					className="w-full flex justify-center items-center rounded-[8px] font-medium bg-black border border-richblack-700 py-[8px] px-[12px] gap-x-2 mt-6 "
					onClick={() => googleLogin()}
				>
					<FcGoogle />
					<p className="text-richblack-25">Sign Up with Google</p>
				</button>
			</div>

			<div className="relative w-11/12 max-w-[450px] md:mx-0 mx-auto ">
				<img
					src={image}
					width={558}
					height={504}
					loading="lazy"
					className="absolute rounded-xl -top-4 right-4"
				></img>
				<img
					src={frameImage}
					width={558}
					height={504}
					loading="lazy"
					className="rounded-xl"
				></img>
			</div>
		</div>
	);
}

export default Template;
