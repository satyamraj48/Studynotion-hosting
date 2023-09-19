import React from "react";
import { HiClock } from "react-icons/hi";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../../services/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
	deleteCourse,
	fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { Table, Thead, Tr, Th, Tbody, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../utils/constants";

function CoursesTable({ courses, setCourses }) {
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(false);
	const [confirmationModal, setConfirmationModal] = useState(null);

	const handleCourseDelete = async (courseId) => {
		setLoading(true);
		setConfirmationModal(null);

		await deleteCourse({ courseId }, token);
		const result = await fetchInstructorCourses(token);
		if (result) {
			setCourses(result);
		}

		setLoading(false);
	};

	return (
		<>
			<Table className="my-5 ">
				<Thead>
					<Tr className="flex items-center justify-between gap-x-10 lg:gap-x-16 px-6 pb-3 border-b border-b-richblack-700 text-sm text-left font-medium text-richblack-100 my-5 uppercase">
						<Th className="">Courses</Th>
						<Th>Duration</Th>
						<Th>Price</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody className="space-y-16 sm:space-y-8">
					{courses?.map((course) => (
						<Tr
							key={course._id}
							className="flex items-start justify-between gap-x-10 lg:gap-x-16 border-b border-b-richblack-700 px-6 pb-6"
						>
							<Td className="flex flex-col lg:flex-row gap-y-3 gap-x-4 text-richblack-100 bg-pink-10">
								<img
									src={course?.thumbnail}
									alt="Course Thumbnail"
									className="w-[220px] h-[124px] rounded-lg object-cover "
								/>

								<div className=" flex flex-col gap-y-2 justify-between pr-16">
									<p className="text-lg font-semibold text-richblack-5 capitalize">
										{course?.courseName}
									</p>
									<p className="text-sm text-richblack-25 capitalize">
										{course.courseDescription?.split(" ").length > 30
											? course.courseDescription
													?.split(" ")
													.slice(0, 30)
													.join(" ") + "..."
											: course.courseDescription}
									</p>
									<p className="text-xs text-richblack-50">
										Created: {formatDate(course?.createdAt)}
									</p>

									{/* status */}
									<div
										className={`w-fit flex items-center gap-x-2 bg-richblack-600 rounded-full text-xs font-medium px-2 py-1  ${
											course?.status === COURSE_STATUS.PUBLISHED
												? "text-yellow-100"
												: "text-pink-100"
										} `}
									>
										{course?.status === COURSE_STATUS.PUBLISHED ? (
											<HiMiniCheckCircle className="text-lg !m-0" />
										) : (
											<HiClock className="text-lg" />
										)}
										<p className="uppercase">{course?.status}</p>
									</div>
								</div>
							</Td>

							<Td className="mt-2 text-sm font-medium text-richblack-100">
								100hrs
							</Td>
							<Td className="mt-2 text-sm font-medium text-richblack-100 ">
								₹{course.price}
							</Td>

							{/* edit and delete button */}
							<Td className="text-xl text-richblack-100">
								<button
									disabled={loading}
									onClick={() =>
										navigate(`/dashboard/edit-course/${course._id}`)
									}
									className=" p-2 transition-all duration-200 hover:text-caribbeangreen-300 hover:scale-110"
								>
									<FiEdit2 />
								</button>
								<button
									disabled={loading}
									className=" p-2 transition-all duration-200 hover:text-[#ff0000] hover:scale-110"
									onClick={() => {
										setConfirmationModal({
											text1: "Do you want to delete this course?",
											text2:
												"All the data related to this course will be deleted",
											btn1Text: !loading ? "Delete" : "Loading...  ",
											btn2Text: "Cancel",
											btn1Handler: !loading
												? () => handleCourseDelete(course._id)
												: () => {},
											btn2Handler: !loading
												? () => setConfirmationModal(null)
												: () => {},
										});
									}}
								>
									<RiDeleteBin6Line />
								</button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
			{confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
		</>
	);
}

export default CoursesTable;
