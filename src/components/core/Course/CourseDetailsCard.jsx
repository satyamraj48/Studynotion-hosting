import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useSelector } from "react-redux";

function CourseDetailsCard({
	course,
	handleBuyCourse,
	handleAddToCart,
	handleShare,
}) {
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();

	const { thumbnail: ThumnailImage, price: CurrentPrice } = course;

	return (
		<div className="space-y-2">
			<img
				src={ThumnailImage}
				alt={course.courseName}
				className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full "
			/>

			<div className="mt-1 px-4">
				<p className=" pb-4 text-3xl font-semibold">₹{CurrentPrice}</p>
				<div className="flex flex-col gap-y-4">
					<button
						className="yellowButton"
						onClick={
							user && course?.studentsEnrolled.includes(user?._id)
								? () => navigate("/dashboard/enrolled-courses")
								: handleBuyCourse
						}
					>
						{user && course?.studentsEnrolled.includes(user?._id)
							? "Go To Course"
							: "Buy Now"}
					</button>
					{(!user || !course?.studentsEnrolled.includes(user?._id)) && (
						<button onClick={handleAddToCart} className="blackButton">
							Add To Cart
						</button>
					)}
				</div>
				<div>
					<p className="pb-3 pt-6 text-center text-sm text-richblack-25">
						30-Days Money-Back Guarantee
					</p>
				</div>
				<div>
					<p className="my-2 text-xl font-semibold">This Course Includes :</p>
					<div className="flex flex-col gap-y-3 ">
						{course?.instructions?.map((item, i) => (
							<p
								className="flex items-center gap-x-2 text-sm text-caribbeangreen-100"
								key={i}
							>
								<BsFillCaretRightFill />
								<span>{item}</span>
							</p>
						))}
					</div>
				</div>
				<div className="text-center">
					<button
						className="mx-auto flex items-center gap-x-2 py-6 text-yellow-100"
						onClick={handleShare}
					>
						<FaShareSquare size={15} /> Share
					</button>
				</div>
			</div>
		</div>
	);
}

export default CourseDetailsCard;
