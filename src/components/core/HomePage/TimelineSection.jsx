import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const Timeline = [
	{
		Logo: Logo1,
		Heading: "Leadership",
		Description: "Fully committed to the success company",
	},
	{
		Logo: Logo2,
		Heading: "Responsibility",
		Description: "Students will alwaysbe our top priority",
	},
	{
		Logo: Logo3,
		Heading: "Flexibility",
		Description: "The ability to switch is an important skills",
	},
	{
		Logo: Logo4,
		Heading: "Solve the problem",
		Description: "Code your way to a solution",
	},
];

function TimelineSection() {
	return (
		<div className="mb-20 w-full flex flex-col lg:flex-row items-center justify-center gap-16 py-3 ">
			<div className="w-[80%] md:w-[70%] lg:w-[50%] flex flex-col items-start xl:gap-2">
				{Timeline.map((elem, i) => {
					return (
						<div
							key={i}
							className="flex flex-col xl:gap-2"
						>
							<div className="flex items-center gap-x-6">
								<div className="h-[56px] aspect-square shadow-[0px_0px_60px_0px_#0000001F] bg-white flex items-center justify-center rounded-full relative z-10 ">
									<img src={elem.Logo} alt="" className="" />
								</div>
								<div>
									<h2 className="font-semibold text-lg">{elem.Heading}</h2>
									<p className="text-[14px] font-medium text-richblack-700">
										{elem.Description}
									</p>
								</div>
							</div>
							{/* Connecting Dashed Border */}
							<div
								className={` ${
									Timeline.length - 1 === i ? "hidden" : "block"
								} h-10 md:h-12 lg:h-14 border-dotted border-r-2 border-richblack-100 bg-richblack-400/0 w-[28px]`}
							></div>
						</div>
					);
				})}

				{/* <div className=" h-[300px] border-r-2 border-dotted border-richblack-25 absolute hidden lg:block left-7 mt-4 "></div> */}
			</div>

			<div className=" relative">
				<img
					src={timelineImage}
					alt="timelineImage"
					className="shadow-[20px_20px_0px_0px] shadow-white object-cover h-fit relative z-10"
				/>

				{/* Ellipse behind Image */}
				<div className=" ellipse absolute !top-0 !left-0 !w-28 "></div>

				<div className=" bg-caribbeangreen-700 flex text-white absolute uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%] z-20">
					<div className="flex gap-5 items-center border-r-2 border-caribbeangreen-300 px-7">
						<p className="text-3xl font-bold">10</p>
						<p className="text-caribbeangreen-300 text-sm">
							Years of Experience
						</p>
					</div>

					<div className="flex gap-5 items-center px-7">
						<p className="text-3xl font-bold">250</p>
						<p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TimelineSection;
