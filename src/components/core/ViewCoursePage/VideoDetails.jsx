import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../reducer/slices/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { BigPlayButton, Player } from "video-react";
import { AiFillPlayCircle } from "react-icons/ai";

function VideoDetails() {
	const { courseId, sectionId, subSectionId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const playerRef = useRef();

	const { token } = useSelector((state) => state.auth);
	const { courseSectionData, courseEntireData, completedLectures } =
		useSelector((state) => state.viewCourse);

	const [videoData, setVideoData] = useState([]);
	const [videoEnded, setVideoEnded] = useState(false);
	const [previewSource, setPreviewSource] = useState("");
	const [loading, setLoading] = useState(false);

	const isFirstVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex(
			(data) => data._id === sectionId
		);

		const currentSubSectionIndex = courseSectionData[
			currentSectionIndex
		]?.subSection.findIndex((data) => data._id === subSectionId);

		if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
			return true;
		} else {
			return false;
		}
	};

	const isLastVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex(
			(data) => data._id === sectionId
		);
		const noOfSubSections =
			courseSectionData[currentSectionIndex].subSection.length;

		const currentSubSectionIndex = courseSectionData[
			currentSectionIndex
		].subSection.findIndex((data) => data._id === subSectionId);

		if (
			currentSectionIndex === courseSectionData.length - 1 &&
			currentSubSectionIndex === noOfSubSections - 1
		) {
			return true;
		} else {
			return false;
		}
	};

	const goToNextVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex(
			(data) => data._id === sectionId
		);
		const noOfSubSections =
			courseSectionData[currentSectionIndex].subSection.length;

		const currentSubSectionIndex = courseSectionData[
			currentSectionIndex
		].subSection.findIndex((data) => data._id === subSectionId);

		if (currentSubSectionIndex !== noOfSubSections - 1) {
			//same section ki next video me jao
			const nextSubSectionId =
				courseSectionData[currentSectionIndex].subSection[
					currentSubSectionIndex + 1
				]._id;
			//next video pr jao
			navigate(
				`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
			);
		} else {
			//next section ki first video mei jao
			const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
			const nextSubSectionId =
				courseSectionData[currentSectionIndex + 1].subSection[0]._id;
			//next video pr jao
			navigate(
				`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
			);
		}
	};

	const goToPrevVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex(
			(data) => data._id === sectionId
		);

		const currentSubSectionIndex = courseSectionData[
			currentSectionIndex
		].subSection.findIndex((data) => data._id === subSectionId);

		if (currentSubSectionIndex !== 0) {
			//same section ki previous video me jao
			const prevSubSectionId =
				courseSectionData[currentSectionIndex].subSection[
					currentSubSectionIndex - 1
				]._id;
			//previous video pr jao
			navigate(
				`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
			);
		} else {
			//previous section ki last video mei jao
			const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
			const prevSubSectionLength =
				courseSectionData[currentSectionIndex - 1].subSection.length;
			const prevSubSectionId =
				courseSectionData[currentSectionIndex - 1].subSection[
					prevSubSectionLength - 1
				]._id;
			//last video pr jao
			navigate(
				`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
			);
		}
	};

	const handleLectureCompletion = async () => {
		//dummy code we will replace it with the actual call
		setLoading(true);
		const res = await markLectureAsComplete(
			{
				courseId: courseId,
				subSectionId: subSectionId,
			},
			token
		);
		//state update
		if (res) {
			dispatch(updateCompletedLectures(subSectionId));
		}
		setLoading(false);
	};

	useEffect(() => {
		const setVideoSpecificDetails = async () => {
			if (!courseSectionData.length) return;
			if (!courseId && !sectionId && !subSectionId)
				navigate("/dashboard/enrolled-courses");
			else {
				const filteredSection = courseSectionData.filter(
					(data) => data._id === sectionId
				);

				const filteredVideo = filteredSection[0]?.subSection.filter(
					(data) => data._id === subSectionId
				);

				setVideoData(filteredVideo[0]);
				setPreviewSource(courseEntireData.thumbnail);
				setVideoEnded(false);
			}
		};
		setVideoSpecificDetails();
	}, [courseSectionData, courseEntireData, location.pathname]);

	return (
		<div className="mx-auto w-11/12 max-w-[1500px] h-[calc(100vh-3.5rem)] py-10 text-richblack-5 tracking-wide">
			{!videoData ? (
				<img
					src={previewSource}
					alt="Preview"
					className="w-full h-full rounded-lg object-cover"
				/>
			) : (
				<div className="flex flex-col gap-5">
					<Player
						ref={playerRef}
						aspectRatio="16:9"
						playsInline
						onEnded={() => setVideoEnded(true)}
						src={videoData?.videoUrl}
					>
						<BigPlayButton position="center" />

						{videoEnded && (
							<div
								style={{
									backgroundImage:
										"linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
								}}
								className="w-full h-full absolute inset-0 z-[100] grid place-content-center "
							>
								{!completedLectures.includes(subSectionId) && (
									// mark completed
									<button
										disabled={loading}
										className="yellowButton max-w-max px-4 mx-auto text-xl"
										onClick={handleLectureCompletion}
									>
										{!loading ? "Mark As Completed" : "Loading..."}
									</button>
								)}
								{/* re-watch */}
								<button
									className="yellowButton text-xl max-w-max px-4 mx-auto mt-2"
									disabled={loading}
									onClick={() => {
										if (playerRef?.current) {
											playerRef.current?.play();
											setVideoEnded(false);
										}
									}}
								>
									Re-Watch
								</button>
								<div className="mt-10 min-w-[250px] flex items-center justify-center gap-x-6 text-xl">
									{!isFirstVideo() && (
										<button
											disabled={loading}
											onClick={goToPrevVideo}
											className="blackButton"
										>
											Prev
										</button>
									)}
									{!isLastVideo() && (
										<button
											disabled={loading}
											onClick={goToNextVideo}
											className="blackButton"
										>
											Next
										</button>
									)}
								</div>
							</div>
						)}
					</Player>
				</div>
			)}
			<h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
			<p className="pt-2 pb-6">{videoData?.description}</p>
		</div>
	);
}

export default VideoDetails;
