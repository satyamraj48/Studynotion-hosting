import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signUp } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

export default function VerifyEmail() {
	const [otp, setOtp] = useState("");
	const { loading, signupData } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { email, password, confirmPassword, accountType, firstName, lastName } =
		signupData;

	useEffect(() => {
		if (!signupData) navigate("/signup");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleOnSubmit(e) {
		e.preventDefault();
		dispatch(
			signUp(
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				accountType,
				otp,
				navigate
			)
		);
	}

	return (
		<div className="flex min-h-[calc(100vh-6rem)] items-center justify-center text-white">
			{loading ? (
				<Spinner />
			) : (
				<div className="max-w-[500px] p-4 lg:p-8 ">
					<h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
						Verify Email
					</h1>
					<p className="text-[1.125rem] leading-[1.625rem] my-6 text-richblack-100">
						A verification code has been sent to you. Enter the code below
					</p>
					<form onSubmit={handleOnSubmit} className="">
						<OTPInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							inputType="tel"
							shouldAutoFocus={true}
							renderSeparator={<span>-</span>}
							renderInput={(props) => (
								<input
									{...props}
									className=" text-richblack-5 text-2xl rounded-xl bg-richblack-700 mx-auto shadow-[0px_-1px_0px_rgba(255,255,255,0.2)_inset] focus:border-0 focus:outline-2 focus:outline-yellow-50"
								/>
							)}
							inputStyle={{ width: "50px", height: "50px" }}
						/>
						<button
							type="submit"
							className="bg-yellow-50 w-full font-medium text-richblack-900 mt-7 px-[12px] py-[11px] rounded-lg"
						>
							Verify Email
						</button>
					</form>
					<div className="flex items-center justify-between mt-6">
						<Link to="/login">
							<p className="flex items-center gap-x-2 text-richblack-5">
								<BsArrowLeft />
								Back to login
							</p>
						</Link>
						<button
							onClick={() => dispatch(sendOtp("l", navigate))}
							className=" flex items-center gap-x-2 text-blue-100"
						>
							<RxCountdownTimer />
							Resend it
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
