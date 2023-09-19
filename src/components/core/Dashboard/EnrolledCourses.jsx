import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../common/Spinner";

function EnrolledCourses() {
	const navigate = useNavigate();

	const { token } = useSelector((state) => state.auth);
	const [enrolledCourses, setEnrolledCourses] = useState(null);

	const getEnrolledCourses = async () => {
		try {
			const response = await getUserEnrolledCourses(token);
			if (response) setEnrolledCourses(response);
		} catch (error) {
			console.log("Unable to fetch enrolled courses");
		}
	};

	useEffect(() => {
		getEnrolledCourses();
	}, []);

	return (
		<div className="w-11/12 max-w-[1000px] mx-auto text-richblack-5 py-10">
			<h1 className="mb-14 text-3xl font-medium ">Enrolled Courses</h1>

			{!enrolledCourses ? (
				<Spinner />
			) : !enrolledCourses.length ? (
				<p className="grid h-[10vh] w-full place-content-center ">
					You have not enrolled in any course yet
				</p>
			) : (
				<div className="w-full my-10 border border-richblack-700 rounded-lg bg-richblack-800">
					<div className="flex items-center justify-between bg-richblack-700 rounded-t-lg p-4">
						<p className="w-[45%]">Course Name </p>
						<p className="w-1/4">Durations </p>
						<p className="flex-1 text-center">Progress </p>
					</div>

					<div className="space-y-0">
						{/* enrolled course card */}
						{enrolledCourses.map((course, index) => (
							<div key={index}>
								<div className="flex items-center justify-between p-4 py-5">
									<div
										className="w-[45%] flex items-center gap-3 cursor-pointer"
										onClick={() =>
											navigate(
												`/view-course/${course?._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].subSection?.[0]?._id}`
											)
										}
									>
										<img
											src={course.thumbnail}
											alt="Course Thumbnail"
											className="w-10 h-10 sm:w-16 sm:h-16 aspect-square rounded-full object-cover "
										/>

										<div className="max-w-xs space-y-1">
											<p className="font-semibold">{course.courseName}</p>
											<p className="text-richblack-200 text-sm">
												{course.courseDescription.length > 50
													? course.courseDescription.slice(0, 50) + "..."
													: course.courseDescription}
											</p>
										</div>
									</div>

									<div className="ml-5 w-1/4 ">{course?.totalDuration}</div>

									<div className="w-1/5 flex flex-1 flex-col gap-2">
										<p className=" text-yellow-5">
											Progress: {course.progressPercentage || 0}%
										</p>
										{/* progress bar */}
										<ProgressBar
											completed={course.progressPercentage || 0}
											height="8px"
											isLabelVisible={false}
										/>
									</div>
								</div>

								{/* horizontal line */}
								{index !== enrolledCourses.length - 1 && (
									<div className="mt-1 mb-1 h-[1px] bg-richblack-700"></div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default EnrolledCourses;
