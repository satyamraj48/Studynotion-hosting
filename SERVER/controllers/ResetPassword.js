const bcrypt = require("bcrypt");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.json({
				success: false,
				message: "Email is required",
			});
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({
				success: false,
				message: "Account Not Found",
			});
		}

		const token = crypto.randomUUID();
		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 5 * 60 * 1000,
			},
			{ new: true }
		);

		//create url
		const url = process.env.FRONTEND_URL + "/update-password/" + token;
		await mailSender(
			email,
			"Password Reset Link",
			`Password Reset Link : <a href=${url}>Reset Password</a>`
		);

		return res.json({
			success: true,
			message:
				"Email sent successfully, Please check your email and create password",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Something went wrong while sending reset pwd mail",
			error: error.message,
		});
	}
};

//resetPassword
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (!token && !password && !confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Required",
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Passwords not matching",
			});
		}
		// console.log("token---> ", token);
		const user = await User.findOne({ token });

		if (!user) {
			return res.status(403).json({
				success: false,
				message: "Token is invalid",
			});
		}
		// console.log("User->  ", user);
		if (user.resetPasswordExpires < Date.now()) {
			return res.status(403).json({
				success: false,
				message: "Link is expired, Please resend the email  ",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const updatedUser = await User.findOneAndUpdate(
			{ token: token },
			{ password: hashedPassword },
			{ new: true }
		);
		// console.log("UpdatedUser->  ", updatedUser);
		return res.status(200).json({
			success: true,
			message: "Password Resetted Successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(403).json({
			success: false,
			message: "Error in resetting password, please try again",
		});
	}
};
