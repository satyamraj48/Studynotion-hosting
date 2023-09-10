import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { setSignupData } from "../../../reducer/slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";

function SignUpForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { firstName, lastName, email, password, confirmPassword } = formData;

	function changeHandler(event) {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}));
	}
	function submitHandler(event) {
		event.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		
		const signupData = { ...formData, accountType };
		console.log("signupData-> ", signupData);

		// Setting signup data to state
		// To be used after otp verification
		dispatch(setSignupData(signupData));
		
		//Send OTP to user for verification
		dispatch(sendOtp(formData.email, navigate));

		//Reset
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setAccountType(ACCOUNT_TYPE.STUDENT);
	}

	// data to pass to Tab component
	const tabData = [
		{
			id: 1,
			tabName: "Student",
			type: ACCOUNT_TYPE.STUDENT,
		},
		{
			id: 2,
			tabName: "Instructor",
			type: ACCOUNT_TYPE.INSTRUCTOR,
		},
	];

	return (
		<div>
			{/* Tab */}
			<div className="flex p-1 gap-x-1 my-6 max-w-max bg-richblack-800 rounded-full mt-3 shadow-[0px_-1px_0px_rgba(255,255,255,0.2)_inset] ">
				{tabData.map((elem) => (
					<button key={elem.id}
						onClick={() => setAccountType(elem.type)}
						className={`${
							accountType === elem.type
								? "bg-black text-richblack-5"
								: "bg-transparent text-richblack-200"
						} py-2 px-5 rounded-full translate-all duration-200 `}
					>
						{elem?.tabName}
					</button>
				))}
			</div>

			<form
				onSubmit={submitHandler}
				className="flex flex-col w-full gap-y-4 mt-6"
			>
				<div className="flex gap-x-5">
					<label>
						<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
							First Name<sup className="text-pink-400">*</sup>
						</p>
						<input
							type="text"
							name="firstName"
							onChange={changeHandler}
							placeholder="Enter First Name"
							value={firstName}
							className="w-full form-style"
							required

						/>
					</label>
					<label>
						<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
							Last Name<sup className="text-pink-400">*</sup>
						</p>
						<input
							type="text"
							name="lastName"
							onChange={changeHandler}
							placeholder="Enter Last Name"
							value={lastName}
							className="w-full form-style"
							required
						/>
					</label>
				</div>
				<label>
					<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
						Email<sup className="text-pink-400">*</sup>
					</p>
					<input
						type="email"
						name="email"
						onChange={changeHandler}
						placeholder="Enter Email"
						value={email}
						className="w-full form-style"
						required
					/>
				</label>
				<div className="flex gap-x-5">
					<label className="relative">
						<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
							Create Password<sup className="text-pink-400">*</sup>
						</p>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							onChange={changeHandler}
							placeholder="Enter Password"
							value={password}
							className="w-full form-style !pr-10"
							required
						/>
						<span
							className="absolute right-3 top-[38px] cursor-pointer z-[10] "
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />}
						</span>
					</label>
					<label className="relative">
						<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
							Confirm Password<sup className="text-pink-400">*</sup>
						</p>
						<input
							type={showConfirmPassword ? "text" : "password"}
							name="confirmPassword"
							onChange={changeHandler}
							placeholder="Enter Password"
							value={confirmPassword}
							className="w-full form-style !pr-10"
							required
						/>
						<span
							className="absolute right-3 top-[38px] cursor-pointer "
							onClick={() => setShowConfirmPassword((prev) => !prev)}
						>
							{showConfirmPassword ? (
								<AiOutlineEye fontSize={24} fill="#AFB2BF" />
							) : (
								<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
							)}
						</span>
					</label>
				</div>
				<button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 shadow-[-1px_-1px_0px_0px_#0000001F_inset] px-[12px] py-[8px] mt-6 ">
					Create Account
				</button>
			</form>
		</div>
	);
}

export default SignUpForm;
