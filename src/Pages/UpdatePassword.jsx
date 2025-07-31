import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
	AiOutlineReload,
} from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../components/common/Spinner";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading } = useSelector((state) => state.auth);

	const token = location.pathname.split("/").at(-1);
	const { password, confirmPassword } = formData;

	const handleOnChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Password does not match");
			return;
		}
		dispatch(resetPassword(password, confirmPassword, token, navigate));
	};

	return (
		<div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center text-white">
			{loading ? (
				<Spinner />
			) : (
				<div className="max-w-[500px] p-4 lg:p-8 ">
					<h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
						Choose new password
					</h1>
					<p className="my-6 text-[1.125rem] leading-[1.625rem] text-richblack-100">
						Almost done. Enter your new password and youre all set.
					</p>
					<form onSubmit={handleOnSubmit}>
						<label className="relative">
							<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
								New Password <sup className="text-pink-400">*</sup>
							</p>
							<input
								required
								type={showPassword ? "text" : "password"}
								value={password}
								name="password"
								onChange={handleOnChange}
								placeholder="Enter Password"
								className="form-style w-full !pr-10"
							/>
							<span
								className="absolute right-3 top-[38px] z-[10] cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<AiOutlineEye fontSize={24} fill="#AFB2BF" />
								) : (
									<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
								)}
							</span>
						</label>
						<label className="relative mt-3 block">
							<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
								Confirm new Password <sup className="text-pink-400">*</sup>
							</p>
							<input
								required
								type={showConfirmPassword ? "text" : "password"}
								value={confirmPassword}
								name="confirmPassword"
								onChange={handleOnChange}
								placeholder="Confirm Password"
								className="form-style w-full !pr-10"
							/>
							<span
								className="absolute right-3 top-[38px] z-[10] cursor-pointer"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? (
									<AiOutlineEye fontSize={24} />
								) : (
									<AiOutlineEyeInvisible fontSize={24} />
								)}
							</span>
						</label>

						<button
							type="submit"
							className="bg-yellow-50 w-full font-medium text-richblack-900 block mt-6 px-[12px] py-[11px] rounded-lg"
						>
							Reset Password
						</button>
					</form>

					<div className="flex items-center mt-7 justify-between">
						<Link to="/login">
							<p className="flex items-center gap-2 text-richblack-5">
								<BsArrowLeft />
								Back to login
							</p>
						</Link>
						<Link to="/forgot-password">
							<p className="flex items-center gap-1 text-blue-100 underline">
								<AiOutlineReload className="text-lg rotate-45" /> Resend Link
							</p>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
export default UpdatePassword;
