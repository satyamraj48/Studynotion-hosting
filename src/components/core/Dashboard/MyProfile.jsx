import React from "react";
import { useSelector } from "react-redux";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

function MyProfile() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);

	return (
		<div className="w-11/12 mx-auto max-w-[1000px] py-10 text-richblack-5 tracking-wide">
			<h1 className="mb-14 text-3xl font-medium">My Profile</h1>
			{/* section 1 */}
			<section>
				<div className=" px-12 py-5 sm:py-8 bg-richblack-800 rounded-lg my-10 flex flex-col items-end sm:flex-row sm:items-center sm:justify-between gap-6 border border-richblack-700 ">
					<div className="flex items-center gap-5">
						<img
							src={user?.image}
							alt={`Profile ${user?.firstName}`}
							className="aspect-square rounded-full object-cover w-[78px] "
						/>
						<div className="space-y-1">
							<p className="text-lg font-semibold">
								{user?.firstName + " " + user?.lastName}
							</p>
							<p className="text-sm text-richblack-300">{user?.email}</p>
						</div>
					</div>

					<IconBtn
						text="Edit"
						customClasses={{ bg: "bg-yellow-50", text: "text-richblack-900" }}
						classes={"w-fit"}
						onClick={() => navigate("/dashboard/settings")}
					>
						<RiEditBoxLine />
					</IconBtn>
				</div>
			</section>

			{/* section 2 */}
			<section>
				<div className="px-12 py-8 bg-richblack-800 rounded-lg my-10 flex flex-col gap-10 border border-richblack-700 ">
					<div className="flex items-center justify-between">
						<p className="text-lg font-semibold">About</p>
						<IconBtn
							text="Edit"
							customClasses={{
								bg: "bg-yellow-50",
								text: "text-richblack-900",
							}}
							onClick={() => {
								navigate("/dashboard/settings");
							}}
						>
							<RiEditBoxLine />
						</IconBtn>
					</div>
					<p
						className={`${
							user?.additionalDetails?.about
								? "text-richblack-5"
								: " text-richblack-300"
						} text-sm font-medium`}
					>
						{user?.additionalDetails?.about ?? "Write Something about Yourself"}
					</p>
				</div>
			</section>

			{/* section 3 */}
			{/* personal details */}
			<section>
				<div className="px-12 py-8 bg-richblack-800 rounded-lg my-10 flex flex-col gap-10 border border-richblack-700">
					<div className=" flex items-center justify-between gap-6">
						<p className="text-lg font-semibold">Personal Details</p>
						<IconBtn
							text="Edit"
							customClasses={{
								bg: "bg-yellow-50",
								text: "text-richblack-900",
							}}
							onClick={() => {
								navigate("/dashboard/settings");
							}}
						>
							<RiEditBoxLine />
						</IconBtn>
					</div>

					<div className="max-w-[500px] flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between text-sm">
						<div className="flex flex-col gap-5">
							<div className="space-y-2">
								<p className="text-richblack-500 text-sm">First Name</p>
								<p className="font-semibold">{user?.firstName}</p>
							</div>
							<div className="space-y-2">
								<p className="text-richblack-500 text-sm">Email</p>
								<p className="font-semibold">{user?.email}</p>
							</div>
							<div className="space-y-2">
								<p className="text-richblack-500 text-sm">Gender</p>
								<p className="font-semibold">
									{user?.additionalDetails?.gender ?? "Add Gender"}
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<div className="space-y-2">
								<p className="text-richblack-500 text-sm">Last Name</p>
								<p className="font-semibold">{user?.lastName}</p>
							</div>
							<div className="space-y-2">
								<p className="text-richblack-500 text-sm">PhoneNumber</p>
								<p className="font-semibold">
									{user?.additionalDetails?.contactNumber ??
										"Add Contact Number"}
								</p>
							</div>
							<div className="space-y-2">
								<p className="text-richblack-500 text-sm">Date of Birth</p>
								<p className="font-semibold">
									{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default MyProfile;
