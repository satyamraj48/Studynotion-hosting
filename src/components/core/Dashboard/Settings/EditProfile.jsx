import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";

const genderList = [
	"Male",
	"Female",
	"Non-Binary",
	"Prefer Not to say",
	"Other",
];

function EditProfile() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitProfileForm = async (formData) => {
		// console.log(formData);
		try {
			dispatch(updateProfile(token, formData));
		} catch (error) {
			console.log("Error Message.....", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(submitProfileForm)}>
			<div className="px-12 py-8 my-10 border border-richblack-700 rounded-lg bg-richblack-800 text-richblack-5 flex flex-col gap-6">
				<h2 className="text-lg font-semibold">Profile Information</h2>
				<div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap">
					{/* firstname */}
					<div className="flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="firstName" className="label-style">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							placeholder="Enter First Name"
							className="form-style"
							{...register("firstName", { required: true })}
							defaultValue={user?.firstName}
						/>
						{errors.firstName && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your first name
							</span>
						)}
					</div>
					{/* lastname */}
					<div className="flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="lastName" className="label-style">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Enter Last Name"
							className="form-style"
							{...register("lastName", { required: true })}
							defaultValue={user?.lastName}
						/>
						{errors.lastName && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your last name
							</span>
						)}
					</div>
					{/* dob */}
					<div className="flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="dateOfBirth" className="label-style">
							Date of Birth
						</label>
						<input
							type="date"
							name="dateOfBirth"
							id="dateOfBirth"
							className="form-style"
							{...register("dateOfBirth", {
								required: {
									value: false,
									message: "Please enter your Date Of Birth",
								},
								max: {
									value: new Date().toISOString().split("T")[0],
									message: "Date of Birth cannot be in the future",
								},
							})}
							defaultValue={user?.additionalDetails?.dateOfBirth}
						/>
						{errors.dateOfBirth && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								{errors.dateOfBirth.message}
							</span>
						)}
					</div>
					{/* gender */}
					<div className="flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="gender" className="label-style">
							Gender
						</label>
						<select
							name="gender"
							id="gender"
							className="form-style"
							{...register("gender", { required: true })}
							defaultValue={user?.additionalDetails?.gender}
						>
							{genderList.map((elem, i) => (
								<option key={i} value={elem}>
									{elem}
								</option>
							))}
						</select>
						{errors.gender && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter gender
							</span>
						)}
					</div>
					{/* contact number */}
					<div className="flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="contactNumber" className="label-style">
							Contact Number
						</label>
						<input
							type="tel"
							name="contactNumber"
							id="contactNumber"
							placeholder="Enter Contact Number"
							className="form-style"
							{...register("contactNumber", {
								required: {
									value: true,
									message: "Please enter your Contact Number",
								},
								maxLength: { value: 12, message: "Invalid Contact Number" },
								minLength: { value: 10, message: "Invalid Contact Number" },
							})}
							defaultValue={user?.additionalDetails?.contactNumber}
						/>
						{errors.contactNumber && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								{errors.contactNumber.message}
							</span>
						)}
					</div>
					{/* about */}
					<div className="flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="about" className="label-style">
							About
						</label>
						<input
							type="text"
							name="about"
							id="about"
							placeholder="Enter Bio Details"
							className="form-style"
							{...register("about")}
							defaultValue={user?.additionalDetails?.about}
						/>
						{errors.about && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please enter your bio details
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
					Save
				</button>
			</div>
		</form>
	);
}

export default EditProfile;
