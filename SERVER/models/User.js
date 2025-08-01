const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		accountType: {
			type: String,
			required: true,
			enum: ["Admin", "Student", "Instructor"],
		},
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Course",
			},
		],
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "CourseProgress",
			},
		],
	},
	{ timestamps: true } // Add timestamps for when the document is created and last modified
);

module.exports = mongoose.model("User", userSchema);
