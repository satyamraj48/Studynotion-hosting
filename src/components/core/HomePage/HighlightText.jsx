import React from "react";

function HighlightText({ text }) {
	return (<span className=" font-bold bg-gradient-to-tr from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text ">{" "}{text}</span>);
}

export default HighlightText;

