import React, { useEffect, useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	resetCourseState,
	setStep,
} from "../../../../../reducer/slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

function PublishCourse() {
	const { register, handleSubmit, setValue, getValues } = useForm();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(false);

	const goBack = () => {
		dispatch(setStep(2));
	};

	const gotToCourses = () => {
		dispatch(resetCourseState());
		navigate("/dashboard/my-courses");
	};

	const handleCoursePublish = async () => {
		if (
			(course?.status === COURSE_STATUS.PUBLISHED &&
				getValues("public") === true) ||
			(course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
		) {
			//no updation in form
			//no need to make api call
			gotToCourses();
			return;
		}
		//if form updated
		const formData = new FormData();
		formData.append("courseId", course._id);
		const courseStatus = getValues("public")
			? COURSE_STATUS.PUBLISHED
			: COURSE_STATUS.DRAFT;
		formData.append("status", courseStatus);

		//api call
		setLoading(true);
		
		const result = await editCourseDetails(formData, token);
		if (result) gotToCourses();

		setLoading(false);
	};

	const onSubmit = (data) => {
		console.log("Publish course ->  ", data);
		handleCoursePublish();
	};

	useEffect(() => {
		if (course?.status === COURSE_STATUS.PUBLISHED) setValue("public", true);
	}, []);

	return (
		<div className="my-10 bg-richblack-800 border border-richblack-700 rounded-lg p-6 space-y-6">
			<h1 className="text-2xl font-semibold">Publish Settings</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-6 mb-8">
					<label
						className="inline-flex items-center gap-x-2 text-richblack-400 text-lg"
						htmlFor="public"
					>
						<input
							type="checkbox"
							id="public"
							{...register("public")}
							className=" w-4 h-4 rounded focus:ring-2 focus:ring-richblack-5"
						/>
						Make this course as public
					</label>
				</div>

				<div className="flex justify-end gap-x-3">
					<IconBtn
						disabled={loading}
						type="button"
						text="Back"
						customClasses={{
							bg: "bg-richblack-300",
							text: "text-richblack-800",
						}}
						onClick={goBack}
					/>
					<IconBtn
						disabled={loading}
						type="submit"
						text="Save Changes"
						customClasses={{ bg: "bg-yellow-50", text: "text-richblack-900" }}
					/>
				</div>
			</form>
		</div>
	);
}

export default PublishCourse;
