import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../components/common/Spinner";

const ForgotPassword = () => {
	const [sentEmail, setSentEmail] = useState(false);
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);

	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(getPasswordResetToken(email, setSentEmail));
	};

	return (
		<div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center text-white">
			{loading ? (
				<Spinner />
			) : (
				<div className="max-w-[500px] p-4 lg:p-8">
					<h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
						{!sentEmail ? "Reset your Password" : "Check Your Email"}
					</h1>
					<p className="my-8 text-[1.125rem] leading-[1.625rem] text-richblack-100">
						{!sentEmail
							? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
							: `We have sent the reset email to ${email}`}
					</p>
					<form onSubmit={handleOnSubmit}>
						{!sentEmail && (
							<label className="w-full">
								<p className="mb-2 text-[1rem] leading-[1.375rem] text-richblack-5">
									Email Address <sup className="text-pink-400">*</sup>
								</p>
								<input
									required
									type="email"
									value={email}
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter email address"
									className="form-style w-full"
								/>
							</label>
						)}

						<button
							type="submit"
							className="bg-yellow-50 w-full text-richblack-900 mt-7 py-[10px] px-[12px] text-lg font-medium rounded-lg"
						>
							{!sentEmail ? "Submit" : "Resend Email"}
						</button>
					</form>

					<div className="flex items-center justify-between mt-6">
						<Link to="/login">
							<p className="flex items-center gap-x-2 text-richblack-5">
								<BsArrowLeft />
								Back to login
							</p>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;
