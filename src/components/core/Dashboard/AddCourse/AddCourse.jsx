import React from "react";
import RenderSteps from "./RenderSteps";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
	setCourse,
	setEditCourse,
} from "../../../../reducer/slices/courseSlice";

function AddCourse() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setEditCourse(false));
		dispatch(setCourse(null));
	}, []);
	return (
		<div className="w-11/12 max-w-[1400px] mx-auto text-richblack-5 py-10 tracking-normal">
			<h1 className="mb-14 text-3xl font-medium ">Add Course</h1>
			<div className="flex flex-col items-center lg:flex-row gap-x-20 gap-y-10">
				<div className="flex-1">
					<RenderSteps />
				</div>
				<div className="max-w-[400px] sticky top-10 hidden flex-1 bg-richblack-800 border border-richblack-700 rounded-lg p-6 xl:block">
					<p className="mb-8 text-lg">⚡Code Upload Tips</p>
					<ul className="ml-5 list-ite list-disc space-y-4 text-xs ">
						<li>Set the Course Price option or make it free.</li>
						<li>Standard size for the course thumbnail is 1024x576.</li>
						<li>Video section controls the course overview video.</li>
						<li>Course Builder is where you create & organize a course.</li>
						<li>
							Add Topics in the Course Builder section to create lessons,
							quizzes, and assignments.
						</li>
						<li>
							Information from the Additional Data section shows up on the
							course single page.
						</li>
						<li>Make Announcements to notify any important</li>
						<li>Notes to all enrolled students at once.</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default AddCourse;
