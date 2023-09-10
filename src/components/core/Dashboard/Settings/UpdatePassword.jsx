import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();

	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				currentPassword: "",
				newPassword: "",
			});
		}
	}, [reset, isSubmitSuccessful]);

	const submitPasswordForm = async (formData) => {
		formData = {
			email: user.email,
			...formData,
			confirmPassword: formData.newPassword,
		};
		// console.log("data-> ", formData);
		try {
			await changePassword(token, formData);
		} catch (error) {
			console.log("Error Message.....", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(submitPasswordForm)}>
			<div className="px-12 py-8 my-10 border border-richblack-700 rounded-lg bg-richblack-800 text-richblack-5 flex flex-col gap-6">
				<h2 className="text-lg font-semibold">Password</h2>
				<div className="flex flex-col gap-6 lg:flex-row">
					{/* current password */}
					<div className="relative flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="currentPassword" className="label-style">
							Current Password
						</label>
						<input
							type={showCurrentPassword ? "text" : "password"}
							name="currentPassword"
							id="currentPassword"
							placeholder="Enter Current Password"
							className="form-style"
							{...register("currentPassword", { required: true })}
						/>
						<span
							className="absolute right-3 top-[38px] cursor-pointer z-[10]"
							onClick={() => setShowCurrentPassword(!showCurrentPassword)}
						>
							{showCurrentPassword ? (
								<AiOutlineEye fontSize={24} />
							) : (
								<AiOutlineEyeInvisible fontSize={24} />
							)}
						</span>
						{errors.currentPassword && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter current password
							</span>
						)}
					</div>

					{/* new password */}
					<div className="relative flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="newPassword" className="label-style">
							New Password
						</label>
						<input
							type={showNewPassword ? "text" : "password"}
							name="newPassword"
							id="newPassword"
							placeholder="Enter New Password"
							className="form-style"
							{...register("newPassword", { required: true })}
						/>
						<span
							className="absolute right-3 top-[38px] cursor-pointer z-[10]"
							onClick={() => setShowNewPassword(!showNewPassword)}
						>
							{showNewPassword ? (
								<AiOutlineEye fontSize={24} />
							) : (
								<AiOutlineEyeInvisible fontSize={24} />
							)}
						</span>
						{errors.newPassword && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter new password
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<button
					className="blackButton bg-white"
					onClick={() => navigate("/dashboard/my-profile")}
				>
					Cancel
				</button>
				<button type="submit" className="yellowButton">
					Update
				</button>
			</div>
		</form>
	);
}

export default UpdatePassword;
