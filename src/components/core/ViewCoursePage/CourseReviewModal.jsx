import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";

function CourseReviewModal({ setReviewModal }) {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const { courseEntireData } = useSelector((state) => state.viewCourse);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("courseExperience", "");
		setValue("courseRating", 0);
	});

	const ratingChanged = (newRating) => {
		setValue("courseRating", newRating);
	};

	const onSubmit = async (data) => {
		const success = await createRating(
			{
				courseId: courseEntireData._id,
				rating: data.courseRating,
				review: data.courseExperience,
			},
			token
		);
		setReviewModal(false);
	};

	return (
		<div className="bg-white bg-opacity-10 flex items-center justify-center fixed inset-0 backdrop-blur-sm overflow-auto z-[1000]">
			<div className="w-[60%] max-w-[600px] bg-richblack-800 rounded-lg border border-richblack-600 text-richblack-5 ">
				{/* Modal Header */}
				<div className="bg-richblack-700 rounded-t-lg border-b border-richblack-600 px-4 py-2">
					<div className="flex items-center justify-between gap-x-5 p-1">
						<p className="text-xl font-semibold">Add Review</p>
						<button
							className="hover:bg-richblack-600 rounded-full p-1 "
							onClick={() => setReviewModal(false)}
						>
							<RxCross2 className="text-lg" />
						</button>
					</div>
				</div>

				{/* Modal Body */}
				<div className="w-full mt-6 flex flex-col items-center">
					<div className="flex items-center gap-x-3">
						<img
							src={user?.additionalDetails?.image}
							alt="User Image"
							className="w-[60px] aspect-square rounded-full"
						/>
						<div className="space-y-">
							<p>
								{user.firstName} {user.lastName}
							</p>
							<p className="text-sm text-richblack-50">Posting Publicly</p>
						</div>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="my-6 w-[80%] flex flex-col items-center gap-y-3"
					>
						<ReactStars count={5} onChange={ratingChanged} size={36} />
						<div className="my-3 w-full flex flex-col gap-y-2">
							<label htmlFor="courseExperience" className="label-style">
								Add Your Experience
							</label>
							<textarea
								id="courseExperience"
								placeholder="Add your experience here"
								className="min-h-[150px] max-h-[250px] form-style"
								{...register("courseExperience", { required: true })}
							/>
							{errors.courseExperience && (
								<span className="ml-2 text-pink-400 text-sm tracking-wide">
									Please add your experience**
								</span>
							)}
						</div>
						{/* cancel and save button */}
						<div className="w-full mt-4 flex items-center justify-end gap-x-3">
							<IconBtn text="Cancel" onClick={() => setReviewModal(false)} />

							<button type="submit" className="yellowButton">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CourseReviewModal;
