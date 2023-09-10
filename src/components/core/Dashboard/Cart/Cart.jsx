import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
	const { total, totalItems } = useSelector((state) => state.cart);

	return (
		<div className="w-11/12 max-w-[1500px] mx-auto text-richblack-5 py-10 tracking-normal">
			<h1 className="mb-14 text-3xl font-medium ">Your Cart</h1>

			<p className="border-b border-b-richblack-500 pb-3 font-semibold text-richblack-400">
				{totalItems} Courses in Cart
			</p>

			{total > 0 ? (
				<div className="w-full my-10 flex flex-col-reverse lg:flex-row items-start justify-between gap-x-10 gap-y-16  ">
					<RenderCartCourses />
					<RenderTotalAmount />
				</div>
			) : (
				<p className="mt-14 text-center text-3xl text-richblack-100">
					Your Cart is Empty
				</p>
			)}
		</div>
	);
}

export default Cart;
