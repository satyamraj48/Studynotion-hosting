import React from "react";
import HighlightText from "../HomePage/HighlightText";

function Quote() {
	return (
		<div className="text-4xl font-semibold text-richblack-100 leading-tight">
			❝ We are passionate about revolutionizing the way we learn. Our innovative
			platform <HighlightText text={"combines technology"} />,
			<span className="bg-gradient-to-tr from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">
				{" "}
				expertise
			</span>
			, and community to create an
			<span className="bg-gradient-to-tr from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text ">
				{" "}unparalleled educational experience.
			</span>{" "}
			❞
		</div>
	);
}

export default Quote;
