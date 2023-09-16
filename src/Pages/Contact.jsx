import React from "react";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import { HiChatBubbleLeftRight, HiGlobeEuropeAfrica } from "react-icons/hi2";
import { IoCallSharp } from "react-icons/io5";
import Footer from "../components/common/Footer";

const contactDetails = [
	{
		icon: HiChatBubbleLeftRight,
		heading: "Chat on us",
		description: "Our friendly team is here to help.",
		contactData: "hello@gmail.com",
	},
	{
		icon: HiGlobeEuropeAfrica,
		heading: "Visit us",
		description: "Come and say hello at our office HQ.",
		contactData: "Here is the location/address",
	},
	{
		icon: IoCallSharp,
		heading: "Call us",
		description: "Mon - Fri From 8am to 5pm",
		contactData: "+91 7845625895",
	},
];

function Contact() {
	return (
		<>
			<div className="mt-[100px] w-11/12 max-w-maxContent min-h-[calc(100vh-3.5rem)] text-richblack-5">
				{/* section 1 */}
				<section className="flex flex-col md:flex-row md:items-start items-center gap-x-10 gap-y-20 md:justify-around">
					<div className="sm:w-[75%] md:w-[42%] lg:w-[37%] h-[50%] p-6 rounded-xl flex flex-col gap-12 bg-richblack-800">
						{contactDetails.map((elem, index) => (
							<div key={index} className="flex flex-col">
								<div className="flex gap-3 items-center">
									<p className="text-2xl text-richblack-100">{<elem.icon />}</p>
									<h1 className="text-xl font-semibold">{elem.heading}</h1>
								</div>
								<p className="pl-10 text-sm text-richblack-200">
									{elem.description}
								</p>
								<p className="pl-10 text-sm text-richblack-200">
									{elem.contactData}
								</p>
							</div>
						))}
					</div>
					<div className="max-w-[650px] sm:w-[80%] md:w-[60%] lg:w-[52%] h-[90%] border-[1px] border-richblack-600 rounded-xl lg:p-12 md:p-8 sm:p-6 p-5">
						<h1 className="text-3xl tracking-tight font-semibold">
							Got a Idea? We’ve got the skills.
						</h1>{" "}
						<h1 className="text-3xl tracking-tight font-semibold">
							Let’s team up
						</h1>
						<p className="text-md text-richblack-300 mt-4">
							Tell us more about yourself and what you’re got in mind.
						</p>
						<div className="mt-3 tracking-wider text-richblack-25">
							<ContactUsForm />
						</div>
					</div>
				</section>

				{/* section 2 */}
				{/* review sliders */}
				<section className="my-[150px]"></section>
			</div>


			{/* footer */}
			<Footer />
		</>
	);
}

export default Contact;
