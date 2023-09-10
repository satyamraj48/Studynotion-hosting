import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from '../HomePage/Button';

function LearningLanguageSection() {
	return (
		<div className="mt-[130px] mb-24">
			<div className=" flex flex-col items-center gap-5">
				<div className="text-4xl font-semibold text-center">
					Your Swiss Knife for <HighlightText text={"learning any language"} />
				</div>
				<div className=" w-[70%] text-center text-richblack-600 font-bold text-base mx-auto mt-2">
					Using spin making learning multiple languages easy. with 20+ languages
					realistic voice-over, progress tracking, custom schedule and more.
				</div>

				<div className="flex flex-col xl:flex-row items-center gap-y-4 xl:justify-center mt-5">
					<img
						src={know_your_progress}
						alt=""
						className="object-contain xl:-mr-32 "
					/>
					<img src={compare_with_others} alt="" className="object-contain" />
					<img
						src={plan_your_lessons}
						alt=""
						className="object-contain xl:-ml-36"
					/>
				</div>

				<div className="w-fit mt-10">
					<CTAButton linkto={"/signup"} active={true}>
						<div className="text-[16px]">Learn More</div>
					</CTAButton>
				</div>
			</div>
		</div>
	);
}

export default LearningLanguageSection;
