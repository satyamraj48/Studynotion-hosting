import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiconnector } from "../../../services/apiconnector";
import { contactusEndpoints } from "../../../services/apis";
import { toast } from "react-hot-toast";
import CountryCode from "../../../data/countrycode.json";

function ContactUsForm() {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				email: "",
				firstName: "",
				lastName: "",
				message: "",
				phoneNo: "",
				CountryCode:"",
			});
		}
	}, [reset, isSubmitSuccessful]);

	const submitContactForm = async (data) => {
		console.log("Logging Data-> ", data);
		const toastId = toast.loading("Sending...")
		try {
			setLoading(true);
			const response = await apiconnector(
				"POST",
				contactusEndpoints.CONTACT_US_API,
				data
			);
			console.log("Logging response-> ", response);
			if (!response.data.success) throw new Error("Details Not Sent");
			toast.success("Message sent Successfully");
			setLoading(false);
		} catch (error) {
			console.log("Error: ", error.message);
			toast.error(error.response.data.message);
			setLoading(false);
		}
		toast.dismiss(toastId);
	};

	return (
		<form onSubmit={handleSubmit(submitContactForm)}>
			<div className="flex gap-2 justify-between">
				{/* firstname */}
				<div className="w-[48%] flex flex-col gap-1">
					<label htmlFor="firstName" className="text-sm">First Name</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						placeholder="Enter first name"
						className="form-style tracking-wider"
						{...register("firstName", { required: true })}
					/>
					{errors.firstName && (
						<span className="text-pink-500">Please enter your Name</span>
					)}
				</div>

				{/* lastname */}
				<div className="w-[48%] flex flex-col gap-1">
					<label htmlFor="lastName" className="text-sm">Last Name</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Enter last name"
						className="form-style tracking-wider"
						{...register("lastName")}
					/>
				</div>
			</div>

			{/* email */}
			<div className="flex flex-col gap-1 mt-4">
				<label htmlFor="email" className="text-sm">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Enter email address"
					className="form-style tracking-wider"
					{...register("email", { required: true })}
				/>
				{errors.email && (
					<span className="text-pink-500">Please enter your Email address</span>
				)}
			</div>

			{/* phoneno */}
			<div className="flex flex-col gap-1 mt-4">
				<label htmlFor="phoneNo" className="text-sm">Phone Number</label>
				<div className="flex gap-6 justify-between">
					<div className=" w-[17%] form-style ">
						<select
							name="dropdown"
							id="dropdown"
							className="bg-richblack-700 text-richblack-100 w-full outline-0"
							{...register("countryCode", { required: true })}
						>
							{CountryCode.map((elem, index) => (
								<option key={index} value={elem.code}>
									{elem.code} - {elem.country}
								</option>
							))}
						</select>
					</div>

					<input
						type="number"
						name="phoneNo"
						id="phoneNo"
						placeholder="Enter phone number"
						className="w-[78%] form-style tracking-wider"
						{...register("phoneNo", {
							required: { value: true, message: "Please enter Phone Number" },
							maxLength: { value: 10, message: "Invalid Phone Number" },
							minLength: { value: 8, message: "Invalid Phone Number" },
						})}
					/>
					{errors.phoneNo && (
						<span className="text-pink-500">
							Please enter your phone number
						</span>
					)}
				</div>
			</div>

			{/* message */}
			<div className="flex flex-col gap-1 mt-4">
				<label htmlFor="message" className="text-sm">Message</label>
				<textarea
					name="message"
					id="message"
					cols={30}
					rows={7}
					placeholder="Enter message"
					className="form-style tracking-wider resize-none overflow-hidden"
					{...register("message", { required: true })}
				/>
				{errors.message && (
					<span className="text-pink-500">Please enter message</span>
				)}
			</div>

			<button
				type="submit"
				className="bg-yellow-50 text-richblack-900 font-semibold mt-9 px-5 py-2 rounded-md w-full shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
			>
				{!loading ? "Send Message" : "Sending..."}
			</button>
		</form>
	);
}

export default ContactUsForm;
