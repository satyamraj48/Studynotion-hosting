const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
	try {
		//fetch data
		const { firstName, lastName, email, phoneNo, message, countryCode } =
			req.body;

		//send mail recieved confirmation
		await mailSender(
			email,
			"Your request has been recieved",
			contactUsEmail(email, firstName, lastName, message, phoneNo, countryCode)
		);

		//send mail to codehelp with user contact form details
		await mailSender(
			"yoyer53388@touchend.com",
			`${firstName} want to contact`,
			contactUsEmail(email, firstName, lastName, message, phoneNo,countryCode)
		);

		//return response
		res.status(200).json({
			success: true,
			message: "Contact form recieved and sent email successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in sending email from Contact Form",
		});
	}
};
