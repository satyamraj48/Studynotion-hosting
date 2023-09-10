import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

function Sidebar() {
	const { user, loading: profileLoading } = useSelector(
		(state) => state.profile
	);
	const { loading: authLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [confirmationModal, setConfirmationModal] = useState(null);

	if (authLoading || profileLoading) {
		return (
			<div className="h-[calc(100vh-3.5rem)] min-w-[220px] flex justify-center bg-richblue-900 border-r-[1px] border-r-richblack-700">
				<div className="spinner2"></div>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-[clac(100vh-3.5rem)] bg-richblack-800 min-w-[222px] py-10 px-0 border-r-[1px] border-richblack-700 text-richblack-300 ">
				<div className="flex flex-col">
					{sidebarLinks.map((elem) => {
						if (elem.type && elem.type !== user?.accountType) return null;
						return <SidebarLink key={elem.id} link={elem} />;
					})}
				</div>

				{/* horizontal line in sidebar */}
				<div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700 "></div>

				{/* setting and logout */}
				<div className="flex flex-col">
					<SidebarLink
						link={{
							name: "Settings",
							path: "dashboard/settings",
							icon: "VscSettingsGear",
						}}
					/>

					<button
						onClick={() =>
							setConfirmationModal({
								text1: "Are you sure?",
								text2: "You will be logged out of your account",
								btn1Text: "Logout",
								btn2Text: "Cancel",
								btn1Handler: () => dispatch(logout(navigate)),
								btn2Handler: () => setConfirmationModal(null),
							})
						}
						className="px-8 py-2 text-sm font-medium text-richblack-200"
					>
						<div className="flex items-center gap-2">
							<VscSignOut className="text-lg" />
							<span className="text-sm">Logout</span>
						</div>
					</button>
				</div>
			</div>
			{confirmationModal !== null && <ConfirmationModal modalData={confirmationModal} />}
		</>
	);
}

export default Sidebar;
