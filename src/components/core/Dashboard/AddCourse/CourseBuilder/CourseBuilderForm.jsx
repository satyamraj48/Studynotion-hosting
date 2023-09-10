import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { MdNavigateNext, MdAddCircleOutline } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setCourse,
	setEditCourse,
	setStep,
} from "../../../../../reducer/slices/courseSlice";
import NestedView from "./NestedView";
import { toast } from "react-hot-toast";
import {
	createSection,
	updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

function CourseBuilderForm() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const { course } = useSelector((state) => state.course);
	const [editSectionName, setEditSectionName] = useState(null);
	const [loading, setLoading] = useState(false);

	const cancelEdit = () => {
		setEditSectionName(null);
		setValue("sectionName", "");
	};

	const goToNext = () => {
		if (course.courseContent.length === 0) {
			toast.error("Please add atleast one Section");
			return;

		}
		if (
			course.courseContent.some((section) => section.subSection.length === 0)
		) {
			toast.error("Please add atleast one Lecture in each Section");
			return;
		}
		//if everything is good
		dispatch(setStep(3));
	};

	const onSubmit = async (data) => {
		setLoading(true);
		let result;
		if (editSectionName) {
			//we are editing the section name
			result = await updateSection(
				{
					sectionName: data.sectionName,
					sectionId: editSectionName,
					courseId: course._id,
				},
				token
			);
		} else {
			//create a section
			result = await createSection(
				{
					sectionName: data.sectionName,
					courseId: course._id,
				},
				token
			);
		}

		//update values
		if (result) {
			dispatch(setCourse(result));
			setEditSectionName(null);
			setValue("sectionName", "");
		}

		setLoading(false);
	};

	const handleChangeEditSectionName = (sectionId, sectionName) => {
		if (editSectionName === sectionId) {
			cancelEdit();
			return;
		}
		setEditSectionName(sectionId);
		setValue("sectionName", sectionName);
	};

	return (
		<div className="my-10 bg-richblack-800 border border-richblack-700 rounded-lg p-6 space-y-6">
			<h1 className="text-2xl font-medium">Course Builder</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
				<label className="text-sm " htmlFor="sectionName">
					Section Name <sup className="text-pink-400">*</sup>
				</label>
				<input
					type="text"
					id="sectionName"
					placeholder="Add Section Name"
					className="form-style w-full"
					{...register("sectionName", { required: true })}
				/>
				{errors.sectionName && (
					<span className="text-xs text-pink-400 tracking-wide">
						Section name is required**
					</span>
				)}

				{/* add section button */}
				<div className="mt-4 flex items-end gap-x-6">
					<button
						type="submit"
						className="border border-yellow-50 rounded-md text-yellow-50 font-semibold px-4 py-2 "
					>
						<div className="flex items-center gap-2">
							{!editSectionName ? "Create Section" : "Edit Section Name"}
							<MdAddCircleOutline className="text-xl text-yellow-50" />
						</div>
					</button>

					{/* cancel edit button */}
					{editSectionName && (
						<button
							className=" text-sm text-richblack-300 underline"
							onClick={cancelEdit}
						>
							Cancel Edit
						</button>
					)}
				</div>
			</form>

			{/* nested view */}
			{loading ? <div className="mx-auto spinner2"></div> : course?.courseContent?.length > 0 && (
				<NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
			)}

			{/* back and next button */}
			<div className="flex justify-end gap-x-3">
				<IconBtn
					type="button"
					text="Back"
					onClick={() => {
						dispatch(setStep(1));
						dispatch(setEditCourse(true));
					}}
				/>

				<IconBtn
					type="button"
					text="Next"
					customClasses={{ bg: "bg-yellow-50", text: "text-richblack-900" }}
					onClick={goToNext}
				>
					<MdNavigateNext />
				</IconBtn>
			</div>
		</div>
	);
}

export default CourseBuilderForm;
