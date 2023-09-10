import React, { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

function InstructorChart({ instructorData }) {
	const [currChart, setCurrChart] = useState("students");

	//function to generate random colors
	const getRandomColors = (numColors) => {
		const colors = [];

		for (let i = 0; i < numColors; i++) {
			const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
				Math.random() * 256
			)},${Math.floor(Math.random() * 256)})`;

			colors.push(color);
		}

		return colors;
	};

	//create data for chart displaying student info
	const studentChartData = {
		labels: instructorData.map((data) => data.courseName),
		datasets: [
			{
				// label: "Student Dataset",
				data: instructorData.map((data) => data.totalStudentsEnrolled),
				backgroundColor: getRandomColors(instructorData.length),
				hoverOffset: 4,
			},
		],
	};

	//create data for chart displaying income info
	const incomeChartData = {
		labels: instructorData.map((data) => data.courseName),
		datasets: [
			{
				// label: "Income Dataset",
				data: instructorData.map((data) => data.totalAmountGenerated),
				backgroundColor: getRandomColors(instructorData.length),
				hoverOffset: 4,
			},
		],
	};

	//create options
	const options = {
		maintainAspectRatio: false,
	};

	return (
		<div className="flex flex-1 flex-col gap-y-4 bg-richblack-800 rounded-lg p-6 ">
			<p className="text-lg font-bold">Visualize</p>

			<div className="flex items-center gap-4">
				<button
					className={`rounded-sm p-1 px-3 transition-all duration-200 ${
						currChart === "students"
							? "bg-richblack-700 text-yellow-50"
							: "text-yellow-400"
					}`}
					onClick={() => setCurrChart("students")}
				>
					Student
				</button>
				<button
					className={`rounded-sm p-1 px-3 transition-all duration-200 ${
						currChart === "income"
							? "bg-richblack-700 text-yellow-50"
							: "text-yellow-400"
					}`}
					onClick={() => setCurrChart("income")}
				>
					Income
				</button>
			</div>

			<div className="my-4 w-full h-full aspect-square flex justify-center p-4">
				<Pie
					data={currChart === "students" ? studentChartData : incomeChartData}
					options={options}
				/>
			</div>
		</div>
	);
}

export default InstructorChart;
