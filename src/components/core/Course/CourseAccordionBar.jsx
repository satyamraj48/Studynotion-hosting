import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

function CourseAccordionBar({ course, isActive, handleActive }) {
	const contentEl = useRef(null);

	const [active, setActive] = useState(false);
	useEffect(() => {
		setActive(isActive?.includes(course._id));
	}, [isActive, course._id]);

	const [sectionHeight, setSectionHeight] = useState(0);
	useEffect(() => {
		setSectionHeight(active ? contentEl.current.scrollHeight : 0);
	}, [active]);

	return (
		<div className="overflow-hidden border border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
			
			<div
				className="flex items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s] cursor-pointer "
				onClick={() => handleActive(course._id)}
			>
				<div className="flex items-center gap-x-2">
					<i
						className={
							isActive.includes(course._id) ? "rotate-180" : "rotate-0"
						}
					>
						<AiOutlineDown />
					</i>
					<p className="">{course?.sectionName}</p>
				</div>

				<div className="space-x-4">
					<span className="text-yellow-25 text-sm">
						{course.subSection.length || 0} lectures(s)
					</span>
				</div>
			</div>

			<div
				className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease] "
				style={{
					height: sectionHeight,
				}}
				ref={contentEl}
			>
				<div className="text-md flex flex-col gap-y-2 px-7 py-6 font-semibold">
					{course?.subSection?.map((subSec, i) => (
						<CourseSubSectionAccordion key={i} subSec={subSec} />
					))}
				</div>
			</div>
		</div>
	);
}

export default CourseAccordionBar;
