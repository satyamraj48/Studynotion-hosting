import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { Player } from "video-react";
import "../../../../../App.css";

function Upload({
	name,
	label,
	register,
	setValue,
	errors,
	video = false,
	viewData = null,
	editData = null,
}) {
	const [selectedFile, setSelectedFile] = useState(null);

	const [previewSource, setPreviewSource] = useState(
		viewData ? viewData : editData ? editData : ""
	);
	const inputRef = useRef(null);

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		if (file) {
			previewFile(file);
			setSelectedFile(file);
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: !video
			? { "image/*": [".jpeg", ".jpg", ".png"] }
			: { "video/*": [".mp4"] },
		onDrop,
	});

	useEffect(() => {
		register(name, { required: true });
	}, [register]);

	useEffect(() => {
		setValue(name, selectedFile);
	}, [selectedFile, setValue]);

	return (
		<div className="space-y-2">
			<label className="text-sm" htmlFor={name}>
				{label} {!viewData && <sup className="text-pink-400">*</sup>}
			</label>
			<div
				className={`min-h-[250px] grid place-items-center cursor-pointer border-2 border-dotted border-richblack-500 rounded-lg ${
					isDragActive ? "bg-richblack-600" : "bg-richblack-700"
				}`}
			>
				{previewSource ? (
					<div className="w-full flex flex-col p-6">
						{!video ? (
							<img
								src={previewSource}
								alt="Preview"
								className="w-full h-full rounded-lg object-cover"
							/>
						) : (
							<div className="w-[160px] h-[80px] ">
								<Player
									src={previewSource}
									aspectratio="16:9"
									playsInline
								/>
							</div>
						)}
						{!viewData && (
							<button
								type="button"
								onClick={() => {
									setPreviewSource("");
									setSelectedFile(null);
									setValue(name, null);
								}}
								className="mt-3 text-richblack-300 underline"
							>
								Cancel
							</button>
						)}
					</div>
				) : (
					<div
						className="w-full flex flex-col items-center p-6 "
						{...getRootProps()}
					>
						<input {...getInputProps()} ref={inputRef} />
						<div className="grid place-items-center aspect-square w-14 bg-richblack-900 rounded-full">
							<FiUploadCloud className="text-2xl text-yellow-50" />
						</div>
						<p className="mt-2 max-w-[200px] text-center text-sm text-richblack-300">
							Drag and drop a {video ? "video" : "image"}, or Click to{" "}
							<span className="text-yellow-50 font-semibold">Browse</span> a
							file{" "}
						</p>

						<ul className="mt-10 flex justify-between space-x-12 text-center text-xs text-richblack-300 list-disc">
							<li>Aspect ratio 16:9</li>
							<li>Recommended size 1024x576</li>
						</ul>
					</div>
				)}
			</div>
			{errors[name] && (
				<span className="ml-2 text-xs text-pink-300 tracking-wide">
					{label} is required**
				</span>
			)}
		</div>
	);
}

export default Upload;
