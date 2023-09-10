import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import {
	addCourseDetails,
	editCourseDetails,
	fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import RequirementField from "./RequirementField";
import {
	setStep,
	setCourse,
	setEditCourse,
} from "../../../../../reducer/slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ChipInput from "./ChipInput";
import Upload from "../CourseBuilder/Upload";

function CourseInformationForm() {
	const {
		register,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const { course, editCourse } = useSelector((state) => state.course);
	const [loading, setLoading] = useState(false);
	const [courseCategories, setCourseCategories] = useState([]);
	const { token } = useSelector((state) => state.auth);

	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			const categories = await fetchCourseCategories();
			if (categories.length > 0) setCourseCategories(categories);
			setLoading(false);
		};

		if (editCourse) {
			setValue("courseTitle", course.courseName);
			setValue("courseShortDesc", course.courseDescription);
			setValue("coursePrice", course.price);
			setValue("courseTags", course.tag);
			setValue("courseBenefits", course.whatYouWillLearn);
			setValue("courseCategory", course.category);
			setValue("courseRequirements", course.instructions);
			setValue("courseImage", course.thumbnail);
		}

		getCategories();
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();
		if (
			currentValues.courseTitle !== course.courseName ||
			currentValues.courseShortDesc !== course.courseDescription ||
			currentValues.coursePrice !== course.price ||
			currentValues.courseTags.toString() !== course.tag.toString() ||
			currentValues.courseBenefits !== course.whatYouWillLearn ||
			currentValues.courseCategory._id !== course.category._id ||
			currentValues.courseImage !== course.thumbnail ||
			currentValues.courseRequirements.toString() !==
				course.instructions.toString()
		)
			return true;
		else return false;
	};

	//handles next button click
	const onSubmit = async (data) => {
		if (editCourse) {
			if (isFormUpdated()) {
				const currentValues = getValues();
				const formData = new FormData();

				formData.append("courseId", course._id);

				if (currentValues.courseTitle !== course.courseName)
				formData.append("courseName", data.courseTitle);

				if (currentValues.courseShortDesc !== course.courseDescription)
				formData.append("courseDescription", data.courseShortDesc);

				if (currentValues.coursePrice !== course.price)
				formData.append("price", data.coursePrice);

				if (currentValues.courseTags.toString() !== course.tag.toString())
				formData.append("tag", JSON.stringify(data.courseTags));

				if (currentValues.courseBenefits !== course.whatYouWillLearn)
				formData.append("whatYouWillLearn", data.courseBenefits);

				if (currentValues.courseCategory._id !== course.category._id)
				formData.append("category", data.courseCategory);

				if (currentValues.courseImage !== course.thumbnail)
				formData.append("thumbnailImage", data.courseImage);

				if (
				currentValues.courseRequirements.toString() !==
				course.instructions.toString()
				)
				formData.append(
					"instructions",
					JSON.stringify(data.courseRequirements)
				);

				setLoading(true);
				const result = await editCourseDetails(formData, token);
				setLoading(false);

				if (result) {
					dispatch(setStep(2));
					dispatch(setCourse(result));
					dispatch(setEditCourse(false));
				}

				// console.log("PRINTING FORM DATA1....", formData);
				// console.log("PRINTING result1....", result);
			} else toast.error("NO changes made so far");
			return;
		}

		//create a new course
		const formData = new FormData();
		formData.append("courseName", data.courseTitle);
		formData.append("courseDescription", data.courseShortDesc);
		formData.append("price", data.coursePrice);
		formData.append("tag", JSON.stringify(data.courseTags));
		formData.append("whatYouWillLearn", data.courseBenefits);
		formData.append("category", data.courseCategory);
		formData.append("instructions", JSON.stringify(data.courseRequirements));
		formData.append("thumbnailImage", data.courseImage);
		formData.append("status", COURSE_STATUS.DRAFT);

		setLoading(true);
		const result = await addCourseDetails(formData, token);
		if (result) {
			dispatch(setStep(2));
			dispatch(setCourse(result));
		}
		setLoading(false);
		// console.log("PRINTING FORM DATA2....", formData);
		// console.log("PRINTING result2....", result);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="my-10 max-w-[800px] bg-richblack-800 border-richblack-700 rounded-lg p-6 space-y-6"
		>
			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseTitle">
					Course Title <sup className="text-pink-400">*</sup>
				</label>
				<input
					id="courseTitle"
					type="text"
					name="Course"
					placeholder="Course Title"
					className="form-style w-full"
					{...register("courseTitle", { required: true })}
				/>
				{errors.courseTitle && (
					<span className="ml-2 text-xs tracking-wide text-pink-300">
						Course Title is required**
					</span>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
					Course Short Description <sup className="text-pink-400">*</sup>
				</label>
				<textarea
					id="courseShortDesc"
					placeholder="Enter Description"
					className="form-style resize-x-none min-h-[140px] w-full "
					{...register("courseShortDesc", { required: true })}
				/>
				{errors.courseShortDesc && (
					<span className="ml-2 text-xs tracking-wide text-pink-300">
						Course Description is required**
					</span>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="coursePrice">
					Course Price <sup className="text-pink-400">*</sup>
				</label>
				<div className="relative">
					<input
						id="coursePrice"
						placeholder="Enter Course Price"
						className="form-style w-full !pl-12"
						{...register("coursePrice", {
							required: true,
							valueAsNumber: true,
							pattern: {
								value: /^(0|[1-9]\d*)(\.\d+)?$/,
							},
						})}
					/>
					<HiOutlineCurrencyRupee className="absolute top-1/2 left-3 inline-block -translate-y-1/2 text-2xl text-richblack-200" />
				</div>
				{errors.coursePrice && (
					<span className="ml-2 text-xs tracking-wide text-pink-300">
						Course Price is required**
					</span>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseCategory">
					Course Category <sup className="text-pink-400">*</sup>
				</label>
				<select
					id="courseCategory"
					defaultValue={""}
					className="form-style w-full"
					{...register("courseCategory", {
						required: true,
					})}
				>
					<option value="" disabled>
						Select a Category
					</option>
					{!loading &&
						courseCategories.map((category, index) => (
							<option key={index} value={category?._id}>
								{category?.name}
							</option>
						))}
				</select>
				{errors.courseCategory && (
					<span className="ml-2 text-xs tracking-wide text-pink-300">
						Course Category is required**
					</span>
				)}
			</div>

			{/* create a custom component for handling tags input */}
			<ChipInput
				label="Tags"
				name="courseTags"
				placeholder="Enter tags and press Enter"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>

			{/* create a component for uploading and showing preview of media */}
			<Upload
				name="courseImage"
				label="Course Thumbnail"
				register={register}
				errors={errors}
				setValue={setValue}
				editData={editCourse ? course?.thumbnail : null}
			/>

			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseBenefits">
					Benefits of the course
					<sup className="text-pink-400">*</sup>
				</label>
				<textarea
					id="courseBenefits"
					placeholder="Enter benefits of the course"
					{...register("courseBenefits", { required: true })}
					className="form-style w-full min-h-[130px] "
				/>
				{errors.courseBenefits && (
					<span className="ml-2 text-xs tracking-wide text-pink-300">
						Benefits of course are required**
					</span>
				)}
			</div>

			<RequirementField
				name="courseRequirements"
				label="Requirements/Instructions"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>

			<div className="flex gap-2 justify-end">
				{editCourse && (
					<IconBtn
						type="button"
						disabled={loading}
						text="Continue Without Saving"
						onClick={() => dispatch(setStep(2))}
					/>
				)}
				<IconBtn
					type="submit"
					disabled={loading}
					customClasses={{ bg: "bg-yellow-50", text: "text-richblack-900" }}
					text={!editCourse ? "Next" : "Save Changes"}
				>
					<MdNavigateNext />
				</IconBtn>
			</div>
		</form>
	);
}

export default CourseInformationForm;
