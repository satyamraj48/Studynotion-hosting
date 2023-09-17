const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//sendOTP for Email Verification
exports.sendOTP = async (req, res) => {
	try {
		const { email } = req.body;
		const checkUserPresent = await User.findOne({ email });
		console.log(checkUserPresent);
		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: "User already registered",
			});
		}
		//generate otp
		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		console.log("OTP ->  ", otp);

		//check unique otp or not
		let result = await OTP.findOne({ otp: otp });
		while (result) {
			otp = otpGenerator(6, {
				upperCaseAlphabets: false,
				lowerCaseAlphabets: false,
				specialChars: false,
			});
			result = await OTP.findOne({ otp: otp });
		}

		const otpPayload = { email, otp };
		//create entry in DB
		const otpBody = await OTP.create(otpPayload);
		console.log(otpBody);
		res.status(200).json({
			success: true,
			message: "OTP Sent Successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			success: false,
			message: "Error in sending OTP",
		});
	}
};

//signup
exports.signUp = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			otp,
			contactNumber,
		} = req.body;
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).json({
				success: false,
				message: "All field are required",
			});
		}
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Passwords does not match",
			});
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User is already registered",
			});
		}

		const recentOtp = await OTP.find({ email })
			.sort({ createdAt: -1 })
			.limit(1);

		if (recentOtp.length == 0) {
			return res.status(400).json({
				success: false,
				message: "OTP Not Found",
			});
		} else if (otp !== recentOtp[0].otp) {
			return res.status(200).json({
				success: true,
				message: "OTP is not valid",
				otpVerify: false,
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});
		return res.status(200).json({
			success: true,
			message: "User is registered Successfully",
			otpVerify: true,
			user,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again",
		});
	}
};

//login
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(403).json({
				success: false,
				message: "All fields are required",
			});
		}
		const user = await User.findOne({ email }).populate("additionalDetails");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User is not registered, please signup first",
			});
		}
		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				email: user.email,
				id: user._id,
				accountType: user.accountType,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "2h",
			});
			user.token = token;
			user.password = undefined;
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: "Logged in Successfully",
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "Password is incorrect",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Login Failure. Please try again",
		});
	}
};

//changePassword
exports.changePassword = async (req, res) => {
	try {
		const { email, currentPassword, newPassword, confirmPassword } = req.body;
		if (!email || !currentPassword || !newPassword || !confirmPassword) {
			return res.status(401).json({
				success: false,
				message: "All fields are required",
			});
		}
		if (newPassword !== confirmPassword) {
			return res.status(403).json({
				success: false,
				message: "Password does not match",
			});
		}
		const user = await User.findOne({ email });
		if (await bcrypt.compare(currentPassword, user.password)) {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			const updatedUser = await User.findOneAndUpdate(
				{ email },
				{ password: hashedPassword },
				{ new: true }
			);
			await mailSender(
				email,
				"Study Notion - Password Changed Successfully",
				`Request for changing Password is completed`
			);
			res.status(200).json({
				success: true,
				message: "Password Changed successfully",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(403).json({
			success: false,
			message: "Error in Changing Password",
		});
	}
};
