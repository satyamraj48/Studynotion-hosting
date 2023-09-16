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

function LearningGrid() {
	return (
		<div className="mx-auto grid grid-cols-1 min-w-[300px] w-[60%] md:w-[50%] lg:w-[45%] xl:w-fit xl:grid-cols-4 mb-12 text-left">
			{LearningGridArray.map((elem, index) => (
				<div
					key={index}
					className={`${index === 0 && "xl:col-span-2 xl:h-[294px] xl:mb-0 mb-6 "} ${
						elem.order % 2 !== 0 ? "bg-richblack-700 h-[294px]" : "bg-richblack-800 h-[294px]"
					} ${elem.order === 3 && "xl:col-start-2"} ${
						elem.order < 0 && "bg-transparent"
					} `}
				>
					{elem.order < 0 ? (
						<div className="xl:w-[90%] h-fit flex flex-col pb-10 gap-3 xl:pb-0 ">
							<h1 className=" text-4xl font-semibold">
								{elem.heading}{" "}
								<p className="bg-gradient-to-tr from-[#5433FF] via-[#20BDFF] to-[#A5FECB] text-transparent bg-clip-text">
									{elem.highlightText}
								</p>
							</h1>

							<p className="text-richblack-300 font-medium">
								{elem.description}
							</p>

							<div className="w-fit mt-2">
								<CTAButton linkto={elem.BtnLink} active={true}>
									{elem.BtnText}
								</CTAButton>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-8 p-8 ">
							<h1 className="text-lg font-semibold text-richblack-25">
								{elem.heading}
							</h1>
							<p className="text-richblack-300 text-sm font-base mt-6">
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
