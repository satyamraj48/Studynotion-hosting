import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { VscSignOut, VscDashboard } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

function ProfileDropDown() {
	const { user } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [dropDownMenu, setDropDownMenu] = useState(false);
	const ref = useRef();

	useOnClickOutside(ref, () => setDropDownMenu(false));

	if (!user) return null;

	return (
		<div className="relative ">
			<div
				onClick={() => setDropDownMenu(!dropDownMenu)}
					className="flex items-center gap-1 cursor-pointer transition-all duration-200 hover:bg-richblack-700 p-2 rounded-full" 
			>
				<img
					src={user?.additionalDetails?.image}
					alt="Profile-Image"
					className="rounded-full aspect-square w-[30px] object-cover "
				/>
				{dropDownMenu ? (
					<AiOutlineCaretDown className="text-sm text-richblack-100" />
				) : (
					<AiOutlineCaretUp className="text-sm text-richblack-100" />
				)}
			</div>
			{dropDownMenu && (
				<div
					className="border border-richblack-700 overflow-hidden rounded-lg text-richblack-100 font-medium text-sm bg-richblack-800 absolute top-[110%] right-0 z-[1000]"
					ref={ref}
					onClick={(e) => e.stopPropagation()}
				>
					<Link
						to="/dashboard/my-profile"
						onClick={() => setDropDownMenu(false)}
					>
						<div className=" flex items-center gap-1 px-3 py-[10px] cursor-pointer transition-all duration-200 hover:bg-richblack-700  hover:text-richblack-25">
							<VscDashboard className="text-lg" />
							Dashboard
						</div>
					</Link>

					{/* horizontal line */}
					<div className="bg-richblack-700 w-full h-[1px]"></div>

					<div
						className=" flex items-center gap-1 px-3 py-[10px] cursor-pointer transition-all duration-200 hover:bg-richblack-700  hover:text-richblack-25"
						onClick={() => {
							dispatch(logout(navigate));
							setDropDownMenu(false);
						}}
					>
						<VscSignOut className="text-lg" /> Logout
					</div>
				</div>
			)}
		</div>
	);
}

export default ProfileDropDown;
