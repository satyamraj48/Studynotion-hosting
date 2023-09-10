import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {
	deleteSection,
	deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import SubSectionModal from "./SubSectionModal";
import { setCourse } from "../../../../../reducer/slices/courseSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

function NestedView({ handleChangeEditSectionName }) {
	const dispatch = useDispatch();
	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);

	const [addSubSection, setAddSubSection] = useState(null);
	const [viewSubSection, setViewSubSection] = useState(null);
	const [editSubSection, setEditSubSection] = useState(null);

	const [confirmationModal, setConfirmationModal] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleDeleteSection = async (sectionId) => {
		setLoading(true);
		setConfirmationModal(null);
		const result = await deleteSection(
			{ sectionId, courseId: course._id },
			token
		);
		if (result) {
			dispatch(setCourse(result));
		}
		setLoading(false);
	};

	const handleDeleteSubSection = async (subSectionId, sectionId) => {
		setLoading(true);
		setConfirmationModal(null);
		const result = await deleteSubSection({ subSectionId, sectionId }, token);
		if (result) {
			const updatedCourseContent = course.courseContent.map((section) =>
				section._id === sectionId ? result : section
			);
			const updatedCourse = { ...course, courseContent: updatedCourseContent };
			dispatch(setCourse(updatedCourse));
		}
		setLoading(false);
	};

	return (
		<>
			{loading ? (
				<div className="!w-10 !h-10 mx-auto spinner2"></div>
			) : (
				<div className="rounded-lg space-y-3">
					{/* section */}
					{course?.courseContent?.map((section) => (
						<details
							key={section._id}
							className="bg-richblack-700 rounded-lg px-8 py-6"
							open
						>
							<summary className="flex items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 cursor-pointer ">
								<div className="flex items-center gap-x-3">
									<RxDropdownMenu className="text-2xl text-richblack-50 " />
									<p className="text-lg text-richblack-50 font-semibold capitalize">
										{section.sectionName}
									</p>
								</div>
								<div className="flex items-center gap-x-3 text-richblack-300 text-lg">
									<button
										onClick={() =>
											handleChangeEditSectionName(
												section._id,
												section.sectionName
											)
										}
									>
										<MdEdit />
									</button>
									<button
										onClick={() =>
											setConfirmationModal({
												text1: "Are you sure ?",
												text2:
													"All the lectures in this section will be deleted",
												btn1Text: "Delete",
												btn2Text: "Cancel",
												btn1Handler: () => handleDeleteSection(section._id),
												btn2Handler: () => setConfirmationModal(null),
											})
										}
									>
										<RiDeleteBin6Line className="text-lg" />
									</button>
									<span>|</span>
									{false ? (
										<AiFillCaretUp className="text-lg" />
									) : (
										<AiFillCaretDown className="text-lg" />
									)}
								</div>
							</summary>

							{/* subSection */}
							<div className="px-6 py-2 space-y-2">
								{section?.subSection?.map((subSection) => (
									<div
										key={subSection._id}
										className="flex items-center justify-between cursor-pointer gap-x-3 border-b-2 py-2 border-b-richblack-600"
										onClick={() => setViewSubSection(subSection)}
									>
										<div className="flex items-center gap-x-3 py-2">
											<RxDropdownMenu className="text-2xl text-richblack-50" />

											<p className="text-richblack-50 font-semibold capitalize">
												{subSection.title}
											</p>
										</div>

										<div
											className="flex items-center gap-x-3 text-richblack-300 text-lg"
											onClick={(e) => e.stopPropagation()}
										>
											<button
												onClick={() =>
													setEditSubSection({
														...subSection,
														sectionId: section._id,
													})
												}
											>
												<MdEdit className="text-lg" />
											</button>
											<button
												onClick={() =>
													setConfirmationModal({
														text1: "Are you sure ?",
														text2: "This lecture will be deleted",
														btn1Text: "Delete",
														btn2Text: "Cancel",
														btn1Handler: () =>
															handleDeleteSubSection(
																subSection._id,
																section._id
															),
														btn2Handler: () => setConfirmationModal(null),
													})
												}
											>
												<RiDeleteBin6Line className="text-lg" />
											</button>
										</div>
									</div>
								))}
							</div>

							<button
								className="mt-3 flex items-center gap-x-2 text-yellow-50 text-lg "
								onClick={() => setAddSubSection(section._id)}
							>
								<FaPlus className="text-sm" />
								<p className="text-md">Add Lecture</p>
							</button>
						</details>
					))}
				</div>
			)}
			{addSubSection ? (
				<SubSectionModal
					modalData={addSubSection}
					setModalData={setAddSubSection}
					add={true}
				/>
			) : viewSubSection ? (
				<SubSectionModal
					modalData={viewSubSection}
					setModalData={setViewSubSection}
					view={true}
				/>
			) : editSubSection ? (
				<SubSectionModal
					modalData={editSubSection}
					setModalData={setEditSubSection}
					edit={true}
				/>
			) : (
				<div></div>
			)}
			{confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
		</>
	);
}

export default NestedView;
