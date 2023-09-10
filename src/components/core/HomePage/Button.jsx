import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, linkto }) {
	return (
		<Link to={linkto}>
			<div
				className={`text-center text-[16px] px-6 py-3 rounded-md font-bold ${
					active
						? "bg-yellow-50 text-richblack-900"
						: "bg-richblack-800 text-white shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset]"
				}`}
			>
				{children}
			</div>
		</Link>
	);
}

export default Button;
