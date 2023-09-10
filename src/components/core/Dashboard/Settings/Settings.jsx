import React from "react";

import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

function Settings() {
	return (
		<div className="w-11/12 max-w-[1000px] mx-auto text-richblack-5 py-10 tracking-wide">
			<h1 className="mb-14 text-3xl font-medium ">Edit Profile</h1>

			{/* Change Profile Picture */}
			<ChangeProfilePicture />

			{/* Edit Profile */}
			<EditProfile />

			{/* Update Password */}
			<UpdatePassword />

			{/* Delete Account */}
			<DeleteAccount />
		</div>
	);
}

export default Settings;
