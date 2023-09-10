import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import CoursesTable from "./CoursesTable";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import Spinner from "../../../common/Spinner";

function MyCourses() {
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchCourses() {
			setLoading(true);
			const result = await fetchInstructorCourses(token);
			if (result) {
				setCourses(result);
			}
			setLoading(false);
		}
		fetchCourses();
	}, []);

	return (
		<>
			<div className="w-11/12 max-w-[1000px] mx-auto text-richblack-5 py-10 tracking-normal">
				<h1 className="mb-14 text-3xl font-medium ">My Course</h1>

				<div className="flex justify-end">
					<IconBtn
						text="Add Course"
						onClick={() => navigate("/dashboard/add-course")}
						customClasses={{ bg: "bg-yellow-50", text: "text-richblack-900" }}
					>
						<GrAdd className="text-lg" />
					</IconBtn>
				</div>

				{loading ? (
					<Spinner />
				) : courses?.length > 0 ? (
					<CoursesTable courses={courses} setCourses={setCourses} />
				) : (
					<p className="py-10 text-center font-medium text-2xl text-richblack-100">
						No Courses added yet
					</p>
				)}
			</div>
		</>
	);
}

export default MyCourses;
