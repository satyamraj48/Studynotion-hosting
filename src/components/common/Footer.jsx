import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
	"Articles",
	"Blog",
	"Chart Sheet",
	"Code Challenges",
	"Docs",
	"Projects",
	"Videos",
	"Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

function Footer() {
	return (
		<div className="w-full bg-richblack-800 border-t border-t-richblack-700 ">
			<div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 text-left mx-auto relative leading-6 py-6">
				<div className="w-full flex flex-col gap-6 lg:flex-row border-richblack-700 border-b py-11">
					{/* Left Part */}
					<div className=" lg:w-[50%] flex flex-wrap lg:flex-nowrap justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-8 ">
						{/* 1st Column */}
						<div className=" -[48%] lg:w-[30%] flex flex-col gap-3 mb-7 lg:pl-0 ">
							<img
								src={Logo}
								alt="StudyNotion Logo"
								className="object-contain"
							/>
							<h1 className="text-richblack-100 font-semibold text-[16px]">
								Company
							</h1>
							{["About", "Careers", "Affiliates"].map((elem, index) => {
								return (
									<div
										key={index}
										className="text-[14px] cursor-pointer hover:text-richblack-100 transition-all duration-200"
									>
										<Link to={elem.toLowerCase()}>{elem}</Link>
									</div>
								);
							})}

							<div className="flex gap-3 text-lg ">
								<div className=" hover:text-richblack-100 ">
									<a href="https://facebook.com" target="_blank">
										<FaFacebook />
									</a>
								</div>
								<div className=" hover:text-richblack-100 ">
									<a href="https://google.com" target="_blank">
										<FaGoogle />
									</a>
								</div>
								<div className=" hover:text-richblack-100 ">
									<a href="https://twitter.com" target="_blank">
										<FaTwitter />
									</a>
								</div>
								<div className=" hover:text-richblack-100 ">
									<a href="https://youtube.com" target="_blank">
										<FaYoutube />
									</a>
								</div>
							</div>
						</div>

						{/* 2nd Column */}
						<div className="-[48%] lg:w-[30%] mb-7 lg:pl-0 ">
							<h1 className="text-richblack-100 font-semibold text-[16px]">
								Resources
							</h1>
							<div className="flex flex-col gap-2 mt-2">
								{Resources.map((elem, index) => {
									return (
										<div
											key={index}
											className="text-[14px] cursor-pointer hover:text-richblack-100 transition-all duration-200"
										>
											<Link to={elem.split(" ").join("-").toLowerCase()}>
												{elem}
											</Link>
										</div>
									);
								})}
							</div>

							<h1 className="text-richblack-100 font-semibold text-[16px] mt-7">
								Support
							</h1>
							<div className="text-[14px] cursor-pointer hover:text-richblack-100 transition-all duration-200 mt-2">
								<Link to={"/help-center"}>
									<p>Help Center</p>
								</Link>
							</div>
						</div>

						{/* 3rd Column */}
						<div className="-[48%] lg:w-[30%] mb-7 lg:pl-0">
							<h1 className="text-richblack-100 font-semibold text-[16px]">
								Plans
							</h1>
							<div className="flex flex-col gap-2 mt-2">
								{Plans.map((elem, index) => {
									return (
										<div
											key={index}
											className="text-[14px] cursor-pointer hover:text-richblack-100 transition-all duration-200"
										>
											<Link to={elem.split(" ").join("-").toLowerCase()}>
												{elem}
											</Link>
										</div>
									);
								})}
							</div>

							<h1 className="text-richblack-100 font-semibold text-[16px] mt-7">
								Community
							</h1>
							<div className="flex flex-col gap-2 mt-2">
								{Community.map((elem, index) => {
									return (
										<div
											key={index}
											className="text-[14px] cursor-pointer hover:text-richblack-100 transition-all duration-200"
										>
											<Link to={elem.split(" ").join("-").toLowerCase()}>
												{elem}
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Right Part */}
					<div className=" lg:w-[50%] flex flex-wrap lg:flex-nowrap justify-between pl-0 lg:pl-5 gap-3 ">
						{/* 1st, 2nd, 3rd Column */}
						{FooterLink2.map((obj, i) => {
							return (
								<div key={i} className="-[48%] lg:w-[30%] mb-7 lg:pl-0 ">
									<h1 className="text-richblack-100 font-semibold text-[16px]">
										{obj.title}
									</h1>
									<div className="flex flex-col gap-2 mt-2">
										{obj.links.map((elem, index) => {
											return (
												<div
													key={index}
													className="text-[14px] cursor-pointer hover:text-richblack-100 transition-all duration-200"
												>
													<Link to={elem.link}>{elem.title}</Link>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Bottom Footer */}
			<div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-300 mx-auto text-sm pt-8 pb-14">
				<div className="w-full flex flex-col lg:flex-row lg:items-start items-center justify-between gap-2">
					<div className="flex flex-row">
						{BottomFooter.map((elem, index) => {
							return (
								<div
									key={index}
									className={`${
										index === BottomFooter.length - 1
											? ""
											: "border-r border-richblack-700 cursor-pointer  "
									} ${
										index === 0 ? "" : "pl-3"
									} pr-3 hover:text-richblack-100 transition-all duration-200`}
								>
									<Link to={elem.split(" ").join("-").toLocaleLowerCase()}>
										{elem}
									</Link>
								</div>
							);
						})}
					</div>
					<div className="text-center">
						Made with ❤️ Codehelp © 2023 StudyNotion
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
