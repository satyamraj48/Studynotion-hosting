import React, { useEffect, useState } from "react";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import InstructorChart from "./InstructorChart";
import { Link, useNavigate } from "react-router-dom";

function InstructorDashboard() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [instructorData, setInstructorData] = useState(null);
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const getCourseDataWithStats = async () => {
			setLoading(true);

			const result = await getInstructorData(token);
			if (result) {
				setInstructorData(result);
			}

			const response = await fetchInstructorCourses(token);
			if (response) {
				setCourses(response);
			}

			// console.log("instructorData-> ", instructorData);
			// console.log("courses-> ", courses);

			setLoading(false);
		};
		getCourseDataWithStats();
	}, []);

	const totalAmount = instructorData?.reduce(
		(acc, curr) => acc + curr.totalAmountGenerated,
		0
	);

	const totalStudents = instructorData?.reduce(
		(acc, curr) => acc + curr.totalStudentsEnrolled,
		0
	);

	return (
		<div className="w-11/12 max-w-[1000px] mx-auto text-richblack-5 py-10 mb-20 tracking-normal">
			<h1 className="mb-14 text-3xl font-medium ">Dashboard</h1>
			{loading ? (
				<div className="!w-12 !h-12 !mx-auto spinner2"></div>
			) : (
				<div className="flex flex-col gap-4">
					<div className="space-y-1">
						<p className="text-2xl font-bold">Hi {user?.firstName} 👋</p>
						<p className="text-md text-richblack-200">
							Let's start something new
						</p>
					</div>

					{/* courses */}
					{!courses.length > 0 ? (
						<>
							<div className="h-[550px] lg:h-[600px] flex gap-6">
								{totalAmount > 0 || totalStudents > 0 ? (
										<InstructorChart instructorData={instructorData} />
								) : (
									<div className="flex-1 bg-richblack-800 rounded-lg p-6 text-xl text-richblack-50">
										Not Enough Data To Visualize
									</div>
								)}

								{/* statistics */}
								<div className="h-fit min-w-[250px] min-h-[350px] flex flex-col gap-4 bg-richblack-800 rounded-lg p-6">
									<p className="text-lg font-semibold">Statistics</p>
									<div className="">
										<p className="text-lg text-richblack-200">Total Courses</p>
										<p className="text-3xl font-semibold text-richblack-50">{courses.length}</p>
									</div>
									<div>
										<p className="text-lg text-richblack-200">Total Students</p>
										<p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
									</div>
									<div>
										<p className="text-lg text-richblack-200">Total Income</p>
										<p className="text-3xl font-semibold text-richblack-50">₹{totalAmount}</p>
									</div>
								</div>
							</div>

							<div className="bg-richblack-800 rounded-lg px-8 py-6">
								<div className="flex items-center justify-between gap-6">
									<p className="text-lg font-bold">Your Courses</p>
									<button
										className="text-sm font-semibold text-yellow-50"
										onClick={() => navigate("/dashboard/my-courses")}
									>
										View All
									</button>
								</div>

								{/* course card */}
								<div className="my-6 mx-2 flex items-center gap-6">
									{courses?.slice(0, 3).map((course, index) => (
										<div key={index} className="w-1/3 flex flex-col gap-1">
											<img
												src={course.thumbnail}
												alt={course.courseName}
												className="w-full h-[140px] xl:h-[170px] aspect-video rounded-lg object-cover"
											/>
											<div>
												<p className="text-sm font-semibold text-richblack-50">
													{course.courseName}
												</p>
												<p className="text-sm text-richblack-300">
													{course.studentsEnrolled.length} students | ₹
													{course.price}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</>
					) : (
						<div className="flex flex-col gap-3 items-center bg-richblack-800 rounded-md p-6 py-20">
							<p className="text-2xl font-bold">You have not created any courses yet</p>
							<Link to="/dashboard/add-course">
								<button className="yellowButton">Create a Course</button>
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default InstructorDashboard;
