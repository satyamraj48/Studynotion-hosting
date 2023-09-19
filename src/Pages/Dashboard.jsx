import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
	const { loading: authLoading } = useSelector((state) => state.auth);
	const { loading: profileLoading } = useSelector((state) => state.profile);



	if (authLoading || profileLoading) {
		return (
			<div className="mt-10">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="w-full min-h-[calc(100vh-3.5rem)] fle">
			{/* Sidebar */}
			<Sidebar />

			{/* nested route for dashboard */}
			<div className=" mt-2 h-[calc(100vh-3.5rem)] overflow-auto">
				<Outlet />
			</div>
		</div>
	);
}

export default Dashboard;
