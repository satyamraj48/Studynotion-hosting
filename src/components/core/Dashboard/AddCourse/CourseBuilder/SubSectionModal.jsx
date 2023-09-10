import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
	createSubSection,
	updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../reducer/slices/courseSlice";
import { RxCross2 } from "react-icons/rx";
import Upload from "./Upload";
import IconBtn from "../../../../common/IconBtn";
import { current } from "@reduxjs/toolkit";

function SubSectionModal({
	modalData,
	setModalData,
	add = false,
	view = false,
	edit = false,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		getValues,
	} = useForm();

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { token } = useSelector((state) => state.auth);
	const { course } = useSelector((state) => state.course);

	useEffect(() => {
		if (view || edit) {
			setValue("lectureTitle", modalData.title);
			setValue("lectureDesc", modalData.description);
			setValue("lectureVideo", modalData.videoUrl);
		}
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();
		if (
			currentValues.lectureTitle !== modalData.title ||
			currentValues.lectureDesc !== modalData.description ||
			currentValues.lectureVideo !== modalData.videoUrl
		)
			return true;
		else return false;
	};

	const handleUpdateSubSection = async () => {
		const currentValues = getValues();
		const formData = new FormData();
		formData.append("sectionId", modalData.sectionId);
		formData.append("subSectionId", modalData._id);

		if (currentValues.lectureTitle !== modalData.title)
			formData.append("title", currentValues.lectureTitle);

		if (currentValues.lectureDesc !== modalData.description)
			formData.append("description", currentValues.lectureDesc);

		if (currentValues.lectureVideo !== modalData.videoUrl)
			formData.append("videoFile", currentValues.lectureVideo);

		//API Call
		setLoading(true);
		const result = await updateSubSection(formData, token);

		if (result) {
			// update the structure of course
			const updatedCourseContent = course.courseContent.map((section) =>
				section._id === modalData.sectionId ? result : section
			);
			const updatedCourse = { ...course, courseContent: updatedCourseContent };
			dispatch(setCourse(updatedCourse));
		}

		//close modal
		setModalData(null);
		setLoading(false);
	};

	const onSubmit = async (data) => {
		if (view) return;

		if (edit) {
			if (!isFormUpdated()) {
				toast.error("No changes made");
			} else {
				//edit kr do store mei
				handleUpdateSubSection();
			}
			return;
		}

		//add
		//create subSection
		const formData = new FormData();
		formData.append("sectionId", modalData);
		formData.append("title", data.lectureTitle);
		formData.append("description", data.lectureDesc);
		formData.append("videoFile", data.lectureVideo);

		//API Call
		setLoading(true);
		const result = await createSubSection(formData, token);
		if (result) {
			// update the structure of course
			const updatedCourseContent = course.courseContent.map((section) =>
				section._id === modalData ? result : section
			);
			const updatedCourse = { ...course, courseContent: updatedCourseContent };
			dispatch(setCourse(updatedCourse));
		}
		//close modal
		setModalData(null);
		setLoading(false);
	};

	return (
		<div className="!mt-0 bg-white bg-opacity-10 backdrop-blur-sm z-[1000] flex items-center justify-center overflow-auto inset-0 fixed ">
			<div className="my-10 w-11/12 max-w-[700px] bg-richblack-800 rounded-lg border border-richblack-400">
				<div className="flex items-center justify-between bg-richblack-700 text-richblack-25 rounded-t-lg gap-6 p-5">
					<p className="text-xl font-semibold p-1 ">
						{view && "Viewing"}
						{add && "Adding"}
						{edit && "Editing"} Lecture
					</p>
					<button
						onClick={() => !loading && setModalData(null)}
						className="hover:bg-richblack-500 hover:text-white text-2xl rounded-full p-1"
					>
						<RxCross2 />
					</button>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-8 px-8 py-10"
				>
					<Upload
						name="lectureVideo"
						label="Lecture Video"
						register={register}
						setValue={setValue}
						errors={errors}
						video={true}
						viewData={view ? modalData.videoUrl : null}
						editData={edit ? modalData.videoUrl : null}
					/>
					<div className="space-y-2">
						<label className="text-sm" htmlFor="lectureTitle">
							Lecture Title <sup className="text-pink-400">*</sup>{" "}
						</label>
						<input
							disabled={view || loading}
							id="lectureTitle"
							placeholder="Enter Lecture Title"
							className="form-style w-full"
							{...register("lectureTitle", { required: true })}
						/>
						{errors.lectureTitle && (
							<span className="ml-2 text-xs text-pink-300 tracking-wide">
								Lecture title is required**
							</span>
						)}
					</div>
					<div className="space-y-2">
						<label className="text-sm" htmlFor="lectureDesc">
							Lecture Description <sup className="text-pink-500">*</sup>
						</label>
						<textarea
							disabled={view || loading}
							id="lectureDesc"
							placeholder="Enter Lecture Description"
							className="form-style w-full min-h-[140px] "
							{...register("lectureDesc", { required: true })}
						/>
						{errors.lectureDesc && (
							<span className="ml-2 text-xs text-pink-300 tracking-wide">
								Lecture description is required**
							</span>
						)}
					</div>
					{!view && (
						<div className="flex justify-end">
							<IconBtn
								disabled={loading}
								type="submit"
								text={loading ? "Loading..." : add ? "Save" : "Save Changes"}
								customClasses={{
									bg: "bg-yellow-100",
									text: "text-richblack-900",
								}}
							/>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default SubSectionModal;
