import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";

function SignInForm() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const { email, password } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	function changeHandler(event) {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}));
	}
	function submitHandler(event) {
		event.preventDefault();
		dispatch(login(email, password, navigate));
	}

	return (
		<div>
			<form
				onSubmit={submitHandler}
				className="flex flex-col w-full gap-y-4 mt-6"
			>
				<label className="w-full">
					<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
						Email Address
						<sup className="text-pink-400">*</sup>
					</p>
					<input
						type="email"
						onChange={changeHandler}
						name="email"
						value={formData.email}
						placeholder="Enter email address"
						className="form-style w-full"
						required
					/>
				</label>
				<label className="w-full relative">
					<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
						Password
						<sup className="text-pink-400">*</sup>
					</p>
					<input
						type={showPassword ? "text" : "password"}
						onChange={changeHandler}
						name="password"
						value={formData.password}
						placeholder="Enter Password"
						className="form-style w-full !pr-10"
						required
					/>
					<span
						className="absolute right-3 top-[38px] cursor-pointer z-[10] "
						onClick={() => setShowPassword((prev) => !prev)}
					>
						{showPassword ? (
							<AiOutlineEye fontSize={24} fill="#AFB2BF" />
						) : (
							<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
						)}
					</span>

					<p className="text-blue-100 text-xs mt-1 max-w-max ml-auto">
						<Link to="/forgot-password">Forgot Password</Link>
					</p>
				</label>
				<button
					type="submit"
					className="bg-yellow-100 rounded-[8px] text-richblack-900 shadow-[-1px_-1px_0px_0px_#0000001F_inset] px-[12px] py-[8px] mt-6 "
				>
					Sign in
				</button>
			</form>
		</div>
	);
}

export default SignInForm;
