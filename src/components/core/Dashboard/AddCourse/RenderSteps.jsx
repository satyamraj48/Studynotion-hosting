import React from "react";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import { useSelector } from "react-redux";
import PublishCourse from "./PublishCourse/PublishCourse";

const steps = [
	{
		id: 1,
		title: "Course Information",
	},
	{
		id: 2,
		title: "Course Builder",
	},
	{
		id: 3,
		title: "Publish",
	},
];

function RenderSteps() {
	const { step } = useSelector((state) => state.course);
	return (
		<>
			<div className="mb-5 relative flex justify-center ">
				{steps.map((item) => (
					<div key={item.id} className="flex text-richblack-5 ">
						<div className="bg-pink-30 min-h-[80px] flex flex-col items-center space-y-1  ">
							<button
								className={`${
									step === item.id
										? "bg-yellow-900 text-yellow-50 border-yellow-50"
										: "border-richblack-700 bg-richblack-800 text-richblack-300"
								} ${
									step > item.id && "bg-yellow-50"
								} rounded-full aspect-square flex items-center justify-center w-[34px]  font-medium text-lg border-[1px] cursor-default `}
							>
								{step > item.id ? (
									<FaCheck className="font-bold text-richblack-900" />
								) : (
									item.id
								)}
							</button>

							{/* course type */}
							<p
								className={` ${
									step >= item.id ? "text-richblack-5" : "text-richblack-500"
								} min-w-[130px] text-center text-xl`}
							>
								{item.title}
							</p>
						</div>
						{/* dashed line in middle */}
						{item.id < steps.length && (
							<div
								className={`bg-pink-10 w-[10px] sm:w-[100px] h-[16px] border-b border-dashed ${
									step > item.id
										? "bg-pink-20 border-yellow-50"
										: "border-richblack-50"
								}`}
							></div>
						)}
					</div>
				))}
			</div>

			{step === 1 && <CourseInformationForm />}
			{step === 2 && <CourseBuilderForm />}
			{step === 3 && <PublishCourse />}
		</>
	);
}

export default RenderSteps;
