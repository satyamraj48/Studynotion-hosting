import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

function Course_Card({ course }) {
	const [avgReviewCount, setAvgReviewCount] = useState(0);

	useEffect(() => {
		const count = GetAvgRating(course.ratingAndReviews);
		setAvgReviewCount(count);
	}, [course]);

	return (
		<>
			<div className="space-y-1">
				<Link to={`/course/${course._id}`}>
					<img
						src={course?.thumbnail}
						alt="Course Thumbnail"
						className="h-[200px] aspect-video md:w-full md:aspect-video sm:h-[350px] rounded-lg object-cover"
					/>
					<p className="mt-2 text-xl capitalize">{course?.courseName}</p>
				</Link>
				<p className="txt-sm text-richblack-50">
					{course?.instructor?.firstName} {course?.instructor?.lastName}
				</p>
				<div className="flex items-center gap-x-2">
					<span>{avgReviewCount || 0}</span>
					<RatingStars Review_Count={avgReviewCount} />
					<span className="text-richblack-400">
						{course?.ratingAndReviews.length} Ratings
					</span>
				</div>
				<p className="text-xl">₹{course.price}</p>
			</div>
		</>
	);
}

export default Course_Card;
