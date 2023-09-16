import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function RequirementField({
	name,
	label,
	register,
	errors,
	setValue,
	getValues,
}) {
	const { editCourse, course } = useSelector((state) => state.course);
	const [requirementList, setRequirementList] = useState([]);
	const [requirement, setRequirement] = useState("");

	useEffect(() => {
		if (editCourse) {
			setRequirementList(course.instructions);
		}
		register(name, { required: true, validate: (value) => value.length > 0 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setValue(name, requirementList);
	}, [requirementList]);

	const handleAddRequirement = () => {
		if (requirement) setRequirementList([...requirementList, requirement]);
		setRequirement("");
	};

	const handleRemoveRequirement = (index) => {
		const updatedRequirementList = [...requirementList];
		updatedRequirementList.splice(index, 1);
		setRequirementList(updatedRequirementList);
	};

	return (
		<div className="flex flex-col space-y-2">
			<label className="text-sm text-richblack-5" htmlFor={name}>
				{label} <sup className="text-pink-400">*</sup>
			</label>
			<div className="flex flex-col items-start space-y-2">
				<input
					type="text"
					id={name}
					value={requirement}
					onChange={(e) => setRequirement(e.target.value)}
					className="form-style w-full"
				/>
				<button
					type="button"
					onClick={handleAddRequirement}
					className="font-semibold text-yellow-50"
				>
					Add
				</button>
			</div>

			{requirementList.length > 0 && (
				<ul className="mt-2 list-inside list-disc ">
					{requirementList.map((req, index) => (
						<li
							key={index}
							className="w-fit flex items-end gap-x-2 text-richblack-5"
						>
							<span className="ml-2 text-sm">{req}</span>
							<button
								className="text-xs text-richblack-300"
								onClick={() => handleRemoveRequirement(index)}
							>
								clear
							</button>
						</li>
					))}
				</ul>
			)}
			{errors[name] && (
				<span className="ml-2 text-xs tracking-wide text-pink-300">
					{label} is required**
				</span>
			)}
		</div>
	);
}

export default RequirementField;
