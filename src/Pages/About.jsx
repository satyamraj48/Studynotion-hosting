import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Quote from "../components/core/AboutPage/Quote";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

function About() {
	return (
		<div className="w-full">
			<div className=" mx-auto mt-[100px] w-11/12 max-w-maxContent min-h-[calc(100vh-3.5rem)] text-richblack-5 text-center">
				{/* section 1 */}
				<section className="relative">
					<header className="text-4xl font-semibold">
						Driving inovation in online Education for a
						<p className="mt-1">
							<HighlightText text={"Brighter Future"} />
						</p>
					</header>
					<p className="w-[59%] text-richblack-300 text-md mt-5 mx-auto">
						Studynotion is at the forefront of driving innovation in online
						education. We're passionate about creating a brighter future by
						offering cutting-edge courses, leveraging emerging technologies, and
						nurturing a vibrant learning community.
					</p>

					<div className="flex flex-wrap gap-3 lg:flex-row mt-10 items-center justify-center relative z-10">
						<img
							src={BannerImage1}
							alt="BannerImage1"
							className="h-80 object-contain"
						/>
						<img
							src={BannerImage2}
							alt="BannerImage2"
							className="h-80 object-contain"
						/>
						<img
							src={BannerImage3}
							alt="BannerImage3"
							className="h-80 object-contain"
						/>
					</div>
					{/* orange ellipse */}
					<div className="ellipse-about absolute top-[37%] left-[35%]"></div>
				</section>

				{/* section 2 */}
				<section>
					<div className="px-10 py-10 my-20">
						<Quote />
					</div>
				</section>

				{/* section 3 */}
				<section>
					<div className="flex flex-col text-left">
						<div className=" flex flex-col lg:flex-row gap-32 items-center lg:justify-between px-20 py-16">
							<div className="lg:w-[40%] w-[100%]">
								<h1 className="text-4xl font-semibold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text">
									Our Founding Story
								</h1>
								<p className="text-richblack-300 text-md font-medium mt-6">
									Our e-learning platform was born out of a shared vision and
									passion for transforming education. It all began with a group
									of educators, technologists, and lifelong learners who
									recognized the need for accessible, flexible, and high-quality
									learning opportunities in a rapidly evolving digital world.
								</p>
								<p className="text-richblack-300 text-md font-medium mt-2">
									As experienced educators ourselves, we witnessed firsthand the
									limitations and challenges of traditional education systems.
									We believed that education should not be confined to the walls
									of a classroom or restricted by geographical boundaries. We
									envisioned a platform that could bridge these gaps and empower
									individuals from all walks of life to unlock their full
									potential.
								</p>
							</div>
							<img
								src={FoundingStory}
								alt="Founding Story"
								className="lg:h-80 h-68 object-cover shadow-[0_0_20px_0] shadow-[#fc6767]"
							/>
						</div>
						<div className=" flex flex-col lg:flex-row items-center lg:justify-center gap-36 lg:gap-24 px-20 py-16">
							<div className="">
								<h1 className="text-4xl font-semibold bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">
									Our Vision
								</h1>
								<p className="text-richblack-300 text-md font-medium mt-6">
									With this vision in mind, we set out on a journey to create an
									e-learning platform that would revolutionize the way people
									learn. Our team of dedicated experts worked tirelessly to
									develop a robust and intuitive platform that combines
									cutting-edge technology with engaging content, fostering a
									dynamic and interactive learning experience.
								</p>
							</div>
							<div className="">
								<h1 className="text-4xl font-semibold bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
									Our Mission
								</h1>
								<p className="text-richblack-300 text-md font-medium mt-6">
									Our mission goes beyond just delivering courses online. We
									wanted to create a vibrant community of learners, where
									individuals can connect, collaborate, and learn from one
									another. We believe that knowledge thrives in an environment
									of sharing and dialogue, and we foster this spirit of
									collaboration through forums, live sessions, and networking
									opportunities.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* section 4 */}
				<section className="w-full my-10">
					<Stats />
				</section>

				{/* section 5 */}
				<section className=" my-20">
					<LearningGrid />
				</section>

				{/* section 6 */}
				<section className="sm:w-[70%] md:w-[56%] lg:w-[40%] my-28 mx-auto">
					<ContactFormSection />
				</section>

				{/* section 7 */}
				<section className="my-20 mx-aut flex flex-col items-center justify-between gap-8 bg-richblack-900">
					<h1 className="text-4xl font-semibold">Review from other learners</h1>
					{/* review sliders */}
					<ReviewSlider />
				</section>
			</div>

			{/* footer */}
			<Footer />
		</div>
	);
}

export default About;
