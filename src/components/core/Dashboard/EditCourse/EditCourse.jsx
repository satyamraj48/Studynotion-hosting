import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { useEffect } from "react";
import {
	setCourse,
	setEditCourse,
} from "../../../../reducer/slices/courseSlice";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import Spinner from "../../../common/Spinner";

function EditCourse() {
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const populateCourseDetails = async () => {
			setLoading(true);
			const result = await getFullDetailsOfCourse(courseId, token);
			if (result?.courseDetails) {
				dispatch(setEditCourse(true));
				dispatch(setCourse(result?.courseDetails));
			}
			setLoading(false);
		};
		populateCourseDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="w-11/12 max-w-[1500px] mx-auto text-richblack-5 py-10 tracking-normal">
			<h1 className="mb-14 text-2xl">Edit Course</h1>
			<div className="mx-auto max-w-[600px] ">
				{course ? <RenderSteps /> : <p>Course Not Found</p>}
			</div>
		</div>
	);
}

export default EditCourse;
