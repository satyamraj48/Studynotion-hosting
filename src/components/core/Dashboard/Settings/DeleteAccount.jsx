import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { deleteProfile } from "../../../../services/operations/settingsAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";

function DeleteAccount() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [confirmationModal, setConfirmationModal] = useState(null);

	const { token } = useSelector((state) => state.auth);

	async function handleDeleteAccount() {
		try {
			setConfirmationModal({
				text1: "Are you sure?",
				text2: "Your account will be deleted permanently.",
				btn1Text: "Delete",
				btn2Text: "Cancel",
				btn1Handler: () => dispatch(deleteProfile(token, navigate)),
				btn2Handler: () => setConfirmationModal(null),
			});
		} catch (error) {
			console.log("Delete account message.....", error.message);
		}
	}

	return (
		<div className="px-12 py-8 my-10 border border-pink-700 rounded-lg bg-pink-900 text-richblack-5 flex gap-5">
			<div className=" w-14 h-14 aspect-square flex items-center justify-center bg-pink-700 rounded-full ">
				<FiTrash2 className="text-3xl text-pink-200" />
			</div>
			<div className="w-[80%] sm:w-[45%] space-y-2">
				<h2 className="text-lg font-semibold">Delete Account</h2>
				<p className="text-pink-25">Would you like to delete account?</p>
				<p className="text-md text-pink-25">
					This account contains Paid Courses. Deleting your account will remove
					all the contain associated with it.
				</p>
				<button
					onClick={handleDeleteAccount}
					className="w-fit cursor-pointer text-pink-300 text-lg text-left italic"
				>
					I want to delete my account.
				</button>
			</div>
			{confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
		</div>
	);
}

export default DeleteAccount;
