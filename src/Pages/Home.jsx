import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from "../components/common/Footer";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

function Home() {
	return (
		<div className="mt-16 w-full">
			{/* Section 1 */}
			<div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
				<Link to="/signup">
					<div className=" group p-1 mx-auto rounded-full bg-richblack-800 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
						<div className="flex items-center gap-3 rounded-full px-6 py-2 transition-all duration-200 group-hover:bg-richblack-900 ">
							<p>Become an Instructor</p>
							<div className="text-xs">
								<FaArrowRight />
							</div>
						</div>
					</div>
				</Link>

				<div className="text-center text-4xl font-semibold mt-8 ">
					Empower Your Future with
					<HighlightText text={"Coding Skills"} />
				</div>

				<div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
					With our online coding courses, you can learn at your own pace, from
					anywhere in the world, and get access to a wealth of resources,
					including hands-on projects, quizzes, and personalized feedback from
					instructors.
				</div>

				<div className=" flex gap-7 mt-8 ">
					<CTAButton linkto={"/signup"} active={true}>
						Learn More
					</CTAButton>
					<CTAButton linkto={"/login"} active={false}>
						Book a Demo
					</CTAButton>
				</div>

				<div className=" mx-3 my-16 relative ">
					<video
						className=" shadow-[20px_20px_0px_5px] z-10 relative "
						muted
						loop
						autoPlay
					>
						<source src={Banner} type="video/mp4" />
					</video>
					{/* Ellipse behind Image */}
					<div className=" ellipse2 absolute -top-8 left-64 "></div>
				</div>

				{/* Code Section 1 */}
				<div>
					<CodeBlocks
						position={"flex-row"}
						heading={
							<div>
								Unlock your <HighlightText text={"coding potential"} /> with our
								online courses.
							</div>
						}
						subHeading={
							"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
						}
						ctabtn1={{
							btnText: "Try it Yourself",
							linkto: "/signup",
							active: true,
						}}
						ctabtn2={{
							btnText: "Learn More",
							linkto: "/login",
							active: false,
						}}
						codeblock={`<!DOCTYPE>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
						bgGradient={<div className="codeblock1 absolute"></div>}
						codeColor={"text-yellow-25"}
					/>
				</div>

				{/* Code Section 2 */}
				<div>
					<CodeBlocks
						position={"flex-row-reverse"}
						heading={
							<div>
								Start <HighlightText text={"coding"} />
								<p>
									<HighlightText text={"in seconds"} />
								</p>
							</div>
						}
						subHeading={
							"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
						}
						ctabtn1={{
							btnText: "Continue Lesson",
							linkto: "/signup",
							active: true,
						}}
						ctabtn2={{
							btnText: "Learn More",
							linkto: "/login",
							active: false,
						}}
						codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\nconst Home = () => {\nreturn (\n<div>Home</div>\n)}\nexport default Home;`}
						bgGradient={<div className="codeblock2 z-1 absolute"></div>}
						codeColor={"text-white"}
					/>
				</div>

				<ExploreMore />
			</div>

			{/* Section 2 */}
			<div className="bg-pure-greys-5 text-richblack-700">
				<div className=" homepage_bg h-[310px] ">
					<div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto ">
						<div className="h-[160px]"></div>
						<div className="flex flex-row gap-9">
							<CTAButton linkto={"/signup"} active={true}>
								<div className="flex items-center gap-3">
									Explore Full Catalog
									<div className="text-xs">
										<FaArrowRight />
									</div>
								</div>
							</CTAButton>

							<CTAButton linkto={"/login"} active={false}>
								<div className="flex items-center gap-2">Learn More</div>
							</CTAButton>
						</div>
					</div>
				</div>

				<div className=" w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7">
					<div className="flex flex-row justify-between gap-16 mb-10 mt-[95px]">
						<div className="w-[40%] lg:w-[45%] text-4xl font-semibold">
							Get the Skills you need for a{" "}
							<HighlightText text={"Job that is in demand."} />
						</div>

						<div className="flex flex-col gap-5 w-[40%] items-start ">
							<div className="text-[16px] text-richblack-700 ">
								The modern StudyNotion is the dictates its own terms. Today, to
								be a competitive specialist requires more than professional
								skills.
							</div>
							<CTAButton linkto={"/login"} active={true}>
								<div>Learn More</div>
							</CTAButton>
						</div>
					</div>

					<TimelineSection />
					<LearningLanguageSection />
				</div>
			</div>

			{/* Section 3 */}
			<div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white ">
				<InstructorSection />

				<h1 className="text-center text-4xl font-semibold mt-10">
					Reviews from other learners
				</h1>

				{/* Review Slider */}
				<ReviewSlider />
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
}

export default Home;
