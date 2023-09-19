import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourses } from "../services/operations/paymentAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { BiInfoCircle, BiLeftArrowAlt } from "react-icons/bi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Footer from "../components/common/Footer";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { ACCOUNT_TYPE } from "../utils/constants";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";
import { addToCart } from "../reducer/slices/cartSlice";
import { FaShareSquare } from "react-icons/fa";

function CourseDetails() {
	const { courseId } = useParams();
	const { token } = useSelector((state) => state.auth);
	const { user, loading } = useSelector((state) => state.profile);
	const { paymentLoading } = useSelector((state) => state.course);
	const { cart } = useSelector((state) => state.cart);
	const [response, setResponse] = useState(null);
	const [confirmationModal, setConfirmationModal] = useState(null);
	const [avgReviewCount, setAvgReviewCount] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleBuyCourse = () => {
		if (token) {
			buyCourses([courseId], token, user, navigate, dispatch);
			return;
		}
		setConfirmationModal({
			text1: "You are not logged in!",
			text2: "Please login to Purchase Course.",
			btn1Text: "Login",
			btn2Text: "Cancel",
			btn1Handler: () => navigate("/login"),
			btn2Handler: () => setConfirmationModal(null),
		});
	};
	const handleShare = () => {
		copy(window.location.href);
		toast.success("Link Copied to Clipboard");
	};

	const handleAddToCart = () => {
		if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast.error("You are an Instructor. You can't buy a course.");
			return;
		}

		if (token) {
			dispatch(addToCart(course));
			return;
		}

		setConfirmationModal({
			text1: "You are not logged in!",
			text2: "Please login to add To Cart",
			btn1Text: "Login",
			btn2Text: "Cancel",
			btn1Handler: () => navigate("/login"),
			btn2Handler: () => setConfirmationModal(null),
		});
	};

	const [isActive, setIsActive] = useState(Array(0));
	const handleActive = (id) => {
		setIsActive(
			!isActive.includes(id)
				? isActive.concat([id])
				: isActive.filter((e) => e !== id)
		);
	};

	//get course full details
	useEffect(() => {
		const getCourseFullDetails = async () => {
			try {
				const result = await fetchCourseDetails(courseId);
				if (result) {
					setResponse(result);
					// console.log("=========>response ", response);
				}
			} catch (error) {
				console.log("Could not fetch Course Details....", error);
			}
		};
		getCourseFullDetails();
	}, [courseId]);

	//get avgerage rating
	useEffect(() => {
		const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
		setAvgReviewCount(count);
	}, [response]);

	//calculate total no of lectures
	const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
	useEffect(() => {
		if (response) {
			let lectures = 0;

			response.data?.courseDetails?.courseContent?.forEach((sec) => {
				lectures += sec.subSection.length || 0;
			});

			setTotalNoOfLectures(lectures);
		}
	}, [response]);

	//spinner
	if (loading || !response || paymentLoading) {
		return (
			<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
				<div className="!w-12 !h-12 spinner2"></div>
			</div>
		);
	}
	//erro
	if (!response.success) {
		return <Error />;
	}
	const course = response.data?.courseDetails;

	return (
		<>
			<div className="relative w-full bg-richblack-800 rounded-b-xl text-richblack-5">
				{/* Hero Section */}
				<div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
					<div className="absolute top-2 text-2xl bg-richblack-600 hover:bg-richblack-700 rounded-full" onClick={()=>navigate(-1)}><BiLeftArrowAlt/></div>
					<div className="mt-4 mx-auto grid min-h-[400px]max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px] ">
						<div className="relative block max-h-[30rem] lg:hidden ">
							<div className="absolute left-0 bottom-0 w-full h-full shadow-[0px_-70px_36px_-28px_#161D29_inset] "></div>
							<img
								src={course?.thumbnail}
								alt="Course Thumbnail"
								className="aspect-auto w-full h-full rounded-2xl "
							/>
						</div>
						<div className=" z-30 my-5 flex flex-col justify-center gap-2 py-5 text-lg">
							<p className="text-4xl font-bold sm:text-[42px] capitalize">
								{course?.courseName}
							</p>
							<p className="text-richblack-200 ">{course?.courseDescription}</p>
							<div className="mt-3 flex flex-wrap items-center gap-x-2 text-sm">
								<span className="text-yellow-25">{avgReviewCount || 0}</span>
								<RatingStars Review_Count={avgReviewCount} Star_Size={24} />
								<span>({course?.ratingAndReviews.length} Reviews)</span>
								<span>{course?.studentsEnrolled.length} Students Enrolled</span>
							</div>
							<p>
								Created By {course?.instructor.firstName}{" "}
								{course?.instructor.lastName}
							</p>
							<div className="mt-3 flex flex-wrap gap-5 text-sm text-richblack-50 ">
								<p className="flex items-center gap-x-2 ">
									<HiOutlineGlobeAlt />
									English
								</p>
								<p className="flex items-center gap-x-2">
									<BiInfoCircle /> Created At {formatDate(course?.createdAt)}
								</p>
							</div>
						</div>
						<div className="w-[90%] max-w-[600px] flex flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden ">
							<div className="flex items-start justify-between gap-x-5">
								<p className=" pb-3 text-3xl font-semibold ">
									₹{course?.price}
								</p>
								<button
									className="mt-1 flex items-center gap-x-2 text-yellow-100"
									onClick={handleShare}
								>
									<FaShareSquare size={15} /> Share
								</button>
							</div>

							<button className="yellowButton" onClick={handleBuyCourse}>
								Buy Now
							</button>
							{!cart.some((item) => item._id === course._id) ? (
								<button className="blackButton" onClick={handleAddToCart}>
									Add to cart
								</button>
							) : (
								<button
									className="blackButton"
									onClick={() => navigate("/dashboard/cart")}
								>
									View Cart
								</button>
							)}
						</div>
					</div>
					{/* Courses Card */}
					<div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block rounded-2xl bg-richblack-700 p-3 ">
						<CourseDetailsCard
							course={course}
							handleBuyCourse={handleBuyCourse}
							handleAddToCart={handleAddToCart}
							handleShare={handleShare}
						/>
					</div>
				</div>
			</div>
			<div className="mx-auto w-[80%] box-content px-4 text-start lg:w-[1260px] text-richblack-5">
				<div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] ">
					{/* What will you learn section */}
					<div className="my-8 border border-richblack-600 p-8">
						<p className="text-3xl font-semibold">What you'll learn</p>
						<div className="mt-5">
							<ReactMarkdown>{course?.whatYouWillLearn}</ReactMarkdown>
						</div>
					</div>
					<div className="max-w-[830px]">
						{/* Course Content Section */}
						<div className="flex flex-col">
							<p className="text-[28px] font-semibold ">Course Content</p>
							<div className="mt-4 flex flex-wrap justify-between gap-2 text-sm">
								<div className="flex items-center gap-2 ">
									<span>{course.courseContent.length} section(s) • </span>
									<span>{totalNoOfLectures} lecture(s) •</span>
									<span>{response.data?.totalDuration}s total length</span>
								</div>
								<button
									className="text-yellow-25 "
									onClick={() => setIsActive([])}
								>
									Collapse all sections
								</button>
							</div>
						</div>
						{/* Course Details Accordion */}
						<div className="py-2">
							{course.courseContent?.map((course, index) => (
								<CourseAccordionBar
									key={index}
									course={course}
									isActive={isActive}
									handleActive={handleActive}
								/>
							))}
						</div>

						{/* Author Details */}
						<div className="mb-12 py-6">
							<p className="text-[28px] font-semibold ">Author</p>
							<div className="flex items-center gap-4 py-4">
								<img
									src={course.instructor.image}
									alt="Author"
									className="w-14 h-14 rounded-full object-cover"
								/>
								<div className="space-y-1">
									<p className="text-lg">
										{`${course.instructor.firstName} 
								${course.instructor.lastName}`}
									</p>
									<p className="text-blue-50 text-sm">
										- {course.instructor?.additionalDetails?.about}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
			{confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
		</>
	);
}

export default CourseDetails;
