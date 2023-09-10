import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourses } from "../../../../services/operations/paymentAPI";
import { useNavigate } from "react-router-dom";

function RenderTotalAmount() {
	const { total, cart } = useSelector((state) => state.cart);
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleBuyCourse() {
		const courses = cart.map((course) => course._id);

		//TODO: API integrate -> payment gateway COMPLETED
		buyCourses(courses, token, user, navigate, dispatch);

		// console.log("Bought this course-> ", courses);
	}

	return (
		<div className="min-w-[282px] w-[340px]  border border-richblack-700 rounded-lg bg-richblack-800 p-6 ">
			<p className="mb-1 text-lg text-richblack-300 font-semibold">Total:</p>
			<p className="mb-1 text-yellow-100 text-4xl font-bold">₹ {total}</p>
			<p className="mb-6 text-richblack-300 text-xl font-semibold line-through">
				₹ {total + 500}
			</p>
			<button
				onClick={handleBuyCourse}
				className="w-full rounded-lg bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 shadow-[-2px_-2px_0_0_#FFFFFF82_inset] "
			>
				Checkout
			</button>
		</div>
	);
}

export default RenderTotalAmount;
