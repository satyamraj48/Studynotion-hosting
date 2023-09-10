import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
	position,
	heading,
	subHeading,
	ctabtn1,
	ctabtn2,
	codeblock,
	bgGradient,
	codeColor,
}) {
	return (
		<div
			className={`my-16 flex ${
				position === "flex-row-reverse" ? "flex-col-reverse" : "flex-col"
			} lg:${position} gap-20 lg:gap-60 `}
		>
			{/* Section 1 */}
			<div className="mx-auto lg:mx-0 w-[80%] lg:w-[45%] flex flex-col gap-8">
				<div className=" text-4xl font-semibold ">{heading}</div>
				<div className="text-base w-[85%] -mt-3 font-semibold text-richblack-300">
					{subHeading}
				</div>
				<div className="flex gap-7 mt-8">
					<CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active}>
						<div className="flex items-center gap-2">
							{ctabtn1.btnText}
							<div className=" text-xs ">
								<FaArrowRight />
							</div>
						</div>
					</CTAButton>
					<CTAButton linkto={ctabtn2.linkto} active={ctabtn2.active}>
						<div className="flex items-center justify-center gap-2">
							{ctabtn2.btnText}
							<div className=" text-xs ">
								<FaArrowRight />
							</div>
						</div>
					</CTAButton>
				</div>
			</div>
			{/* Section 2 */}
			<div className="code-border mx-auto lg:mx-0 w-[80%] lg:w-[45%] flex flex-row h-fit text-[16px] py-3 relative sm:leading-6 sm:text-sm leading-[16px] ">
				{/*HW->  BG Gradient */}
				{bgGradient}
				{/* <div className="w-[400px] h-[250px] bg-pink-100 absolute text-xl"> */}
				{/* </div> */}
				<div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
				</div>
				<div
					className={` ${codeColor} flex flex-col w-[90%] font-bold font-mono gap-2 pr-2 `}
				>
					<TypeAnimation
						sequence={[codeblock, 1000, ""]}
						repeat={Infinity}
						cursor={true}
						style={{
							whiteSpace: "pre-line",
							display: "block",
						}}
						omitDeletionAnimation={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default CodeBlocks;
