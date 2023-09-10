import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";

function SidebarLink({ link }) {
	const Icon = Icons[link.icon];
	const location = useLocation();
	

	const matchRoute = (route) => {
		return matchPath( route , location.pathname);
	};

	return (
		<NavLink

			to={link.path}
			className={`${
				matchRoute(link.path) ? "bg-yellow-800 text-yellow-50 " : "bg-opacity-0 text-richblack-300"
			} relative px-8 py-2 text-sm font-medium transition-all duration-200`}
		>

			<span
				className={`absolute h-full top-0 left-0 w-[0.15rem] bg-yellow-50 ${
					matchRoute(link.path) ? "opacity-100" : "opacity-0"
				}`}
			></span>

            <div className="flex items-center gap-2">
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>

		</NavLink>
	);
}

export default SidebarLink;
