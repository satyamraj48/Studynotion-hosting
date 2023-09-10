import React, { useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HiUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

const tabsName = [
	"Free",
	"New to Coding",
	"Most Popular",
	"Skills Paths",
	"Career Paths",
];

function ExploreMore() {
	const [currentTab, setCurrentTab] = useState(tabsName[0]);
	const [courses, setCourses] = useState(HomePageExplore[0].courses);
	const [currentCard, setCurrentCard] = useState(
		HomePageExplore[0].courses[0].heading
	);

	function setMyCards(value) {
		setCurrentTab(value);
		const result = HomePageExplore.filter((course) => course.tag === value);
		setCourses(result[0].courses);
		setCurrentCard(result[0].courses[0].heading);
	}

	return (
		<div className="flex flex-col items-center gap-4 mt-28">
			<div className="text-4xl font-semibold text-center">
				Unlock the <HighlightText text={"Power of Code"} />
			</div>

			<p className="text-center text-richblack-300 text-[16px] mt-3">
				Learn to Build Anything You Can Imagine
			</p>

			{/* Tabs Section */}
			<div className="max-w-max flex flex-wrap justify-center gap-x-5 gap-y-1 bg-richblack-800 rounded-full px-2 py-3 md:py-1 border border-richblack-100 border-opacity-10 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
				{tabsName.map((tab, i) => {
					return (
						<div
							key={i}
							onClick={() => setMyCards(tab)}
							className={`bg-richblack-800 text-[16px] cursor-pointer hover:bg-richblack-900 hover:shadow-2xl transition-all duration-200 rounded-full px-5 py-2 ${
								tab === currentTab
									? "text-richblack-5 bg-richblack-900 font-medium shadow-2xl"
									: "text-richblack-200 hover:text-richblack-100"
							} `}
						>
							{tab}
						</div>
					);
				})}
			</div>
			<div className="hidden lg:block lg:h-[300px]"></div>

			{/* Course 3 Cards */}
			<div className=" w-full flex flex-wrap justify-center gap-12 my-7 px-3 lg:h-[150px] lg:absolute lg:gap-0 lg:justify-between lg:-bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:mb-0 lg:px-0 ">
				{courses.map((card, ind) => {
					return (
						<div
							key={ind}
							className={` w-[360px] lg:w-[30%] h-[300px] box-borde cursor-pointer ${
								card.heading === currentCard
									? "bg-white text-black shadow-[10px_10px_0px_0px_#FFD60A]"
									: "bg-richblack-800 text-richblack-25 "
							}`}
							onClick={() => setCurrentCard(card.heading)}
						>
							<div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3 ">
								<h1 className="text-[20px] font-semibold">{card.heading}</h1>
								<p className=" text-[16px] font-medium text-richblack-400">
									{card.description}
								</p>
							</div>

							<div
								className={`flex items-center justify-between gap-3 text-md ${
									card.heading === currentCard
										? "text-blue-300"
										: "text-richblack-300"
								} font-semibold px-6 py-3`}
							>
								<div className="flex items-center gap-2 text-md">
									<HiUsers />
									<p className="">Beginner</p>
								</div>

								<div className="flex items-center gap-2 text-md">
									<ImTree />
									<p className="">{card.lessonNumber} Lessons</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ExploreMore;
