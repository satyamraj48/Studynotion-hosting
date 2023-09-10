import React, { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

function ChipInput({
	label,
	name,
	placeholder,
	register,
	errors,
	setValue,
	getValues,
}) {
	const { editCourse, course } = useSelector((state) => state.course);
	const [tagList, setTagList] = useState([]);

	useEffect(() => {
		if (editCourse) {
			setTagList(course?.tag);
		}
		register(name, { required: true, validate: (value) => value.length > 0 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(() => {
		setValue(name, tagList);
	}, [tagList]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();

			const tagValue = e.target.value.trim();

			if (tagValue && !tagList.includes(tagValue)) {
				setTagList([...tagList, tagValue]);
				e.target.value = "";
			}
		}
	};

	const handleTagRemove = (tagIndex) => {
		const updatedTagList = [...tagList];
		updatedTagList.splice(tagIndex, 1);
		setTagList(updatedTagList);
	};

	return (
		<div className="flex flex-col space-y-2">
			<label className="text-sm text-richblack-5" htmlFor={name}>
				{label} <sup className="text-pink-400">*</sup>
			</label>
			{tagList.length > 0 && (
				<div className="w-full flex flex-wrap">
					{tagList.map((elem, index) => (
						<div
							key={index}
							className="m-1 flex items-center bg-yellow-400 rounded-full text-sm px-2 py-1 "
						>
							{elem}
							<button
								type="button"
								className="ml-2 focus:outline-none"
								onClick={() => handleTagRemove(index)}
							>
								<MdClose className="text-sm" />
							</button>
						</div>
					))}
				</div>
			)}
			<input
				id={name}
				name={name}
				type="text"
				placeholder={placeholder}
				onKeyDown={handleKeyDown}
				className="form-style w-full"
			/>
			{errors[name] && (
				<span className="ml-2 text-xs tracking-wide text-pink-300">
					{label} is required**
				</span>
			)}
		</div>
	);
}

export default ChipInput;
