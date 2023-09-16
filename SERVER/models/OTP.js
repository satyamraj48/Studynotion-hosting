const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 5 * 60 * 1000, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email from StudyNotion",
			otpTemplate(otp)
		);
		console.log("Email Sent Successfully", mailResponse);
	} catch (error) {
		console.log("Error occured while sending Mail", error);
	}
}

OTPSchema.pre("save", async function (next) {
	await sendVerificationEmail(this.email, this.otp);
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);
