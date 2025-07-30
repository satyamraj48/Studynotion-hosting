import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgSoftwareUpload } from "react-icons/cg";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";

function ChangeProfilePicture() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const [imageFile, setImageFile] = useState(null);
	const [previewSource, setPreviewSource] = useState(null);

	const fileInputRef = useRef(null);

	function handleClick() {
		fileInputRef.current.click();
	}

	function handleFileChange(e) {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			previewFile(file);
		}
	}
	function previewFile(file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	}

	function handleFileUpload() {
		if (!imageFile) {
			handleClick();
			return;
		}
		try {
			setLoading(true);
			const formData = new FormData();
			console.log("image file--> ", imageFile);
			formData.append("displayPicture", imageFile);
			dispatch(updateDisplayPicture(token, formData)).then(() =>
				setLoading(false)
			);
		} catch (error) {
			console.log("Error Message.....", error.message);
		}
	}

	return (
		<div className="px-12 py-8 my-10 border border-richblack-700 rounded-lg bg-richblack-800 flex items-center gap-5">
			<img
				src={previewSource || user?.additionalDetails?.image}
				alt="Profile Image"
				className="aspect-square rounded-full w-[78px]"
			/>

			<div className="space-y-2">
				<p className="font-semibold">Change Profile Picture</p>
				<div className="flex flex-col sm:flex-row sm:items-center gap-3">
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						className="hidden"
						accept="image/png, image/jpg, image/jpeg"
					/>
					<button
						className="bg-richblack-700 text-richblack-50 cursor-pointer font-semibold px-5 py-2 rounded-lg "
						onClick={handleClick}
						disabled={loading}
					>
						Select
					</button>

					<button
						onClick={handleFileUpload}
						className="flex items-center justify-center gap-1 bg-yellow-50 text-richblack-900 font-semibold px-5 py-2 rounded-lg"
					>
						{loading ? "Uploading..." : "Upload"}
						<CgSoftwareUpload
							className={`text-xl ${
								loading && " animate-[bounce_3s_ease-in_infinite] "
							}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChangeProfilePicture;
