import React from "react";
import ContactUsForm from "../ContactPage/ContactUsForm";

function ContactFormSection() {
	return (
		<div>
			<h1 className="text-4xl font-semibold">Get in Touch</h1>
			<p className="text-md text-richblack-300 mt-4">We’d love to here for you, Please fill out this form.</p>
			<div className="my-16 tracking-wider text-richblack-25 text-left">
				<ContactUsForm />
			</div>
		</div>
	);
}

export default ContactFormSection;
