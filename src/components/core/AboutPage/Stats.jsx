import React from "react";

const statsData = [
	{ count: "5K", label: "Active Students" },
	{ count: "10+", label: "Mentors" },
	{ count: "200+", label: "Courses" },
	{ count: "50+", label: "Awards" },
];

function Stats() {
	return (
		<div className="w-full h-52 xl:h-60 flex items-center justify-center bg-richblack-800 p-3 ">
			<div className="w-full flex items-center justify-evenly">
				{statsData.map((elem, index) => (
					<div key={index} className="flex flex-col gap-3 px-5">
						<p className="text-richblack-5 text-3xl font-bold">{elem.count}</p>
						<p className="text-richblack-500 text-md font-semibold">
							{elem.label}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Stats;
