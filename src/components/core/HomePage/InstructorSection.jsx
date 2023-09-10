import React from "react";
import HighlightText from "./HighlightText";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
	return (
		<div className="my-24">
			<div className="flex flex-col md:flex-row items-center gap-20">
				<div className="w-[80%] md:w-[50%]">
					<img
						src={Instructor}
						alt=""
						className="shadow-[-20px_-20px_0_0] shadow-white"
					/>
				</div>
				<div className="w-[80%] md:w-[50%] flex flex-col items-start gap-2">
					<h1 className="text-4xl tracking-wide font-semibold w-[50%]">
						Become an <HighlightText text={"instructor"} />
					</h1>
					<p className="mt-2 w-[84%] text-richblack-300 text-[16px] mb-10">
						Instructors from around the world teach millions of students on
						StudyNotion. We provide the tools and skills to teach what you love.
					</p>

					<CTAButton linkto={"/signup"} active={true}>
						<div className="flex items-center gap-2">
							Start Teaching Today
							<div className="text-xs">
								<FaArrowRight />
							</div>
						</div>
					</CTAButton>
				</div>
			</div>
		</div>
	);
}

export default InstructorSection;
