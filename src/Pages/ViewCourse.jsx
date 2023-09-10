import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
	setCompletedLectures,
	setCourseSectionData,
	setEntireCourseData,
	setTotalNoOfLectures,
} from "../reducer/slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCoursePage/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCoursePage/CourseReviewModal";

function ViewCourse() {
	const [reviewModal, setReviewModal] = useState(false);
	const { token } = useSelector((state) => state.auth);
	const { courseId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		const setCourseSpecificDetails = async () => {
			const courseData = await getFullDetailsOfCourse(courseId, token);
			if (courseData) {
				dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
				dispatch(setEntireCourseData(courseData.courseDetails));
				dispatch(setCompletedLectures(courseData.completedVideos));
				let lectures = 0;
				courseData.courseDetails?.courseContent?.forEach((sec) => {
					lectures += sec.subSection.length;
				});
				dispatch(setTotalNoOfLectures(lectures));
			}
		};
		setCourseSpecificDetails();
	}, []);

	return (
		<>
			<div className="w-full flex min-h-[calc(100vh-3.5rem)] ">
				{/* sidebar */}
				<VideoDetailsSidebar setReviewModal={setReviewModal} />

				{/* video element */}
				<div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
					<Outlet />
				</div>
			</div>

			{reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
		</>
	);
}

export default ViewCourse;
