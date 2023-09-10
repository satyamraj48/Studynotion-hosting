import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi2";

function CourseSubSectionAccordion({ subSec }) {
	return (
		<div className="flex justify-between py-2">
			<div className="flex items-center gap-x-2">
				<span>
					<HiOutlineVideoCamera />
				</span>
				<p>{subSec.title}</p>
			</div>
		</div>
	);
}

export default CourseSubSectionAccordion;
