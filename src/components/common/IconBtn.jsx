import React from "react";

function IconBtn({
	text,
	onClick,
	children,
	disabled = false,
	outline = false,
	customClasses={},
	classes,
	type="",
}) {
	return (
		<button disabled={disabled} onClick={onClick} type={type} className={`${customClasses.bg ?? "bg-richblack-500"} ${customClasses.text} font-semibold rounded-md px-5 py-2 ${classes}`}>
			{children ? (
				<div className="flex items-center gap-x-2">
					<span>{text}</span>
					{children}
				</div>
			) : (text)
            }
		</button>
	);
}

export default IconBtn;
