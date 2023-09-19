import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
	addToCart,
	removeFromCart,
} from "../../../../reducer/slices/cartSlice";

function RenderCartCourses() {
	const { cart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	return (
		<div className="max-w-[1000px] w-full">
			{cart.map((course, index) => (
				<div
					key={index}
					className={`w-full flex flex-col items-center sm:flex-row sm:items-start sm:justify-between gap-6 ${
						index !== 0 && "mt-8"
					} ${
						index !== cart.length - 1 && "border-b border-b-richblack-700 pb-8"
					} `}
				>
					<div className="flex flex-col xl:flex-row gap-4">
						<img
							src={course.thumbnail}
							alt="Course Thumbnail"
							className="h-[124px] w-[220px] rounded-lg object-cover "
						/>
						<div className="flex flex-col space-y-2">
							<p className="text-lg font-medium text-richblack-5">
								{course?.coursename}
							</p>
							<p className="text-sm text-richblack-300">
								{course?.category?.name}
							</p>
							<div className="flex items-center gap-2">
								<span className="text-[#ffd700] font-semibold">4.8</span>
								<ReactStars
									count={5}
									value={2 || course?.ratingAndReviews?.length}
									size={16}
									edit={false}
									emptyIcon={<FaStar />}
									filledIcon={<FaStar />}
								/>
								<span className="text-richblack-400">
									{course?.ratingAndReviews?.length} Ratings
								</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col-reverse items-center sm:flex-col sm:items-end gap-y-2 sm:gap-y-4">
						<button
							onClick={() => dispatch(removeFromCart(course._id))}
							className="flex items-center gap-x-1 bg-richblack-700 rounded-md border border-richblack-600 px-3 py-2 text-pink-200"
						>
							<RiDeleteBin6Line />
							<span>Remove</span>
						</button>

						<p className="sm:mb-6 text-3xl font-medium text-yellow-100">
							₹ {course?.price}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default RenderCartCourses;
