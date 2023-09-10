import React from "react";
import IconBtn from "./IconBtn";

function ConfirmationModal({ modalData }) {
	return (
		<div
			className={`!mt-0 bg-white bg-opacity-10 backdrop-blur-sm z-[1000] flex items-center justify-center overflow-auto inset-0 fixed `}
		>
			<div className="w-fit max-w-[350px] bg-richblack-900 px-8 py-4 border border-richblack-400 rounded-lg ">
				<p className="text-richblack-5 text-2xl text-center">
					{modalData.text1}
				</p>

				<p className="mt-3 leading-6 text-richblack-200 text-center">
					{modalData.text2}
				</p>

				<div className="mt-6 flex items-center justify-around gap-x-8">
					<IconBtn
						text={modalData?.btn1Text}
						onClick={modalData?.btn1Handler}
						customClasses={{ bg: "bg-richblack-100", text: "text-[#cf0000]" }}
					/>

					<button
						onClick={modalData?.btn2Handler}
						className="bg-richblack-100 text-richblack-900 rounded-md cursor-pointer px-5 py-2 font-semibold"
					>
						{modalData?.btn2Text}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationModal;
