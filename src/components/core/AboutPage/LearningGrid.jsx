import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../../core/HomePage/Button";

const LearningGridArray = [
	{
		order: -2,
		heading: "World-Class Learning for",
		highlightText: "Anyone, Anywhere",
		description:
			"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
		BtnText: "Learn More",
		BtnLink: "/",
	},
	{
		order: 1,
		heading: "Curriculum Based on Industry Needs",
		description:
			"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
	},
	{
		order: 2,
		heading: "Our Learning Methods",
		description:
			"Studynotion partners with more than 275+ leading universities and companies to bring",
	},
	{
		order: 3,
		heading: "Certification",
		description:
			"Studynotion partners with more than 275+ leading universities and companies to bring",
	},
	{
		order: 4,
		heading: `Rating "Auto-grading"`,
		description:
			"Studynotion partners with more than 275+ leading universities and companies to bring",
	},
	{
		order: 5,
		heading: "Ready to Work",
		description:
			"Studynotion partners with more than 275+ leading universities and companies to bring",
	},
];

function 
LearningGrid() {
	return (
		<div className=" grid grid-cols-1 lg:grid-cols-4 mb-10 px-16 my-3 w-fit text-left">
			{LearningGridArray.map((elem, index) => (
				<div
					key={index}
					className={`${index === 0 && "lg:col-span-2 "} ${
						elem.order % 2 !== 0 ? "bg-richblack-700" : "bg-richblack-800"
					} ${elem.order === 3 && "lg:col-start-2"} ${
						elem.order < 0 && "bg-transparent"
					} lg:h-[280px]`}
				>
					{elem.order < 0 ? (
						<div className="lg:w-[90%] flex flex-col p-3 gap-5 ">
							<h1 className=" text-4xl font-semibold">
								{elem.heading}{" "}
								<p className="bg-gradient-to-tr from-[#5433FF] via-[#20BDFF] to-[#A5FECB] text-transparent bg-clip-text">
									{elem.highlightText}
								</p>
							</h1>

							<p className="text-richblack-300 font-medium">
								{elem.description}
							</p>

							<div className="w-fit">
								<CTAButton linkto={elem.BtnLink} active={true}>
									{elem.BtnText}
								</CTAButton>
							</div>
						</div>
					) : (
						<div className="lg:w-[90%] flex flex-col gap-4 px-5 py-7 ">
							<p className="text-lg font-semibold text-richblack-25">{elem.heading}</p>
							<p className="text-richblack-100 text-sm font-base mt-6">
								{elem.description}
							</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default LearningGrid;
