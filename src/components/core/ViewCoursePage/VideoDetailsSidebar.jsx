import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function VideoDetailsSidebar({ setReviewModal }) {
	const {
		courseSectionData,
		courseEntireData,
		completedLectures,
		totalNoOfLectures,
	} = useSelector((state) => state.viewCourse);

	const [activeStatus, setActiveStatus] = useState("");
	const [videoBarActive, setVideoBarActive] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const { sectionId, subSectionId } = useParams();

	useEffect(() => {
		(() => {
			if (!courseSectionData.length) return;

			const currentSectionIndex = courseSectionData.findIndex(
				(data) => data._id === sectionId
			);
			const currentSubSectionIndex = courseSectionData[
				currentSectionIndex
			]?.subSection.findIndex((data) => data._id === subSectionId);

			const activeSubSectionId =
				courseSectionData[currentSectionIndex]?.subSection[
					currentSubSectionIndex
				]?._id;

			//set current section here
			setActiveStatus(courseSectionData[currentSectionIndex]?._id);
			//set current sub-section here
			setVideoBarActive(activeSubSectionId);
		})();
	}, [courseSectionData, courseEntireData, location.pathname]);

	return (
		<div className="min-w-[250px] bg-richblack-800 border-r border-r-richblack-700 text-richblack-5">
			{/* for buttons */}
			<div className="mt-6 m-3 flex items-center justify-between gap-x-3">
				<button
					className="grid place-items-center bg-richblack-400 w-8 h-8 rounded-full transition-all duration-200 hover:scale-95 hover:shadow-[1px_1px_8px_1px_#ffffff3a]"
					onClick={() => navigate("/dashboard/enrolled-courses")}
				>
					<IoIosArrowBack className="text-xl" />
				</button>
				<button className="yellowButton" onClick={() => setReviewModal(true)}>
					Add Review
				</button>
			</div>
			{/* for headings */}
			<div className="mt-8 m-3 border-b border-b-richblack-600 pb-2">
				<p className="text-richblack-50 text-md font-semibold">
					Dot Batch MERN Stack
				</p>
				<p className="text-richblack-200 font-semibold text-sm">
					{completedLectures.length} / {totalNoOfLectures}
				</p>
			</div>

			{/* for sections and sub-sections */}
			<div className="mt-5 flex flex-col gap-y-3">
				{courseSectionData.map((section, index) => (
					<div key={index} className="">
						{/* section */}
						<div
							className={`cursor-pointer bg-richblack-700 px-4 py-3 flex items-center justify-between`}
							onClick={() =>
								activeStatus === section?._id
									? setActiveStatus("")
									: setActiveStatus(section?._id)
							}
						>
							<p>{section?.sectionName}</p>
							<i
								className={
									activeStatus === section?._id ? "rotate-0" : "rotate-180"
								}
							>
								<IoIosArrowDown />
							</i>
						</div>

						{/* sub-sections */}
						{activeStatus === section?._id && (
							<div className={`mt-2 space-y-2`}>
								{/* video */}
								{section?.subSection?.map((subSec, index) => (
									<div
										key={index}
										className={`space-x-2 mx-3 px-3 py-2 cursor-pointer ${
											subSec?._id === videoBarActive
												? "bg-yellow-200 text-richblack-900"
												: "bg-richblack-900"
										}`}
										onClick={() => {
											navigate(
												`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSec._id}`
											);
											setVideoBarActive(subSec?._id);
										}}
									>
										<input
											type="checkbox"
											checked={completedLectures.includes(subSec?._id)}
											onChange={() => {}}
										/>
										<span>{subSec.title}</span>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default VideoDetailsSidebar;
