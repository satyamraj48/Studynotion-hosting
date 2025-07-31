const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
	try {
		// console.log("--->", req.header("Authorisation"));
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorisation").replace("Bearer ", "");
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Authentication Error",
			});
		}

		//Verify token
		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			// console.log("decode---> ", decode);
			req.user = decode;
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "Token is invalid",
			});
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			success: false,
			message: "Something went wrong while validating the token",
		});
	}
};

//isStudent
exports.isStudent = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "Cannot access, This is protected route for Student only",
			});
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "Cannot access, This is protected route for Admin only",
			});
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "Cannot access, This is protected route for Instructor only",
			});
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};
