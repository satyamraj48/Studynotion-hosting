const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// Import the required controllers and middleware functions
const {
	login,
	signUp,
	sendOTP,
	changePassword,
} = require("../controllers/Auth");

const {
	resetPasswordToken,
	resetPassword,
} = require("../controllers/ResetPassword");

// Routes for Login, Signup, and Authentication
//***********************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signUp);

// Route for user login
router.post("/sendotp", sendOTP);

// Route for user login
router.post("/changepassword", auth, changePassword);

// Routes for Reset Password
//***********************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;
// exports.router = router;
