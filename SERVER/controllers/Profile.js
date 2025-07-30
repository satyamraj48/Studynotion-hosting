const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req, res) => {
	try {
		//get data
		const {
			firstName = "",
			lastName = "",
			dateOfBirth = "",
			gender = "",
			about = "",
			contactNumber = "",
		} = req.body;
		//get userId
		const userId = req.user.id;

		//find profile
		const userDetails = await User.findById(userId);
		//update profile
		const profileId = userDetails.additionalDetails;
		const profileDetails = await Profile.findById(profileId);

		userDetails.firstName = firstName;
		userDetails.lastName = lastName;
		if (profileDetails.image.includes("api.dicebear.com"))
			profileDetails.image = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`; //TODO check for manual upload dp

		profileDetails.gender = gender;
		profileDetails.dateOfBirth = dateOfBirth;
		profileDetails.about = about;
		profileDetails.contactNumber = contactNumber;
		//save in db
		await profileDetails.save();

		const updatedUserDetails = await User.findById(userId)
			.populate("additionalDetails")
			.exec();
		updatedUserDetails.password = undefined;

		//return response
		return res.status(200).json({
			success: true,
			message: "Profile Updated Successfully",
			updatedUserDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in updating Profile",
			error: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
	try {
		//get data
		const displayPicture = req.files.displayPicture;
		//get userId
		const userId = req.user.id;
		//validation
		if (!userId)
			return res.status(403).json({
				success: false,
				message: "User Not Found",
			});

		//upload to cloudinary
		console.log("displayPicture--> ", displayPicture);
		const uploadedImage = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		);

		//find profile
		const updatedUserDetails = await User.findById(userId)
			.populate("additionalDetails")
			.exec();

		const profileId = updatedUserDetails.additionalDetails;
		const updatedProfileDetails = await Profile.findById(profileId);

		updatedProfileDetails.image = uploadedImage?.secure_url;
		//save in db
		await updatedProfileDetails.save();

		updatedUserDetails.password = undefined;

		//return response
		return res.status(200).json({
			success: true,
			message: "Profile Picture Updated Successfully",
			updatedUserDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in updating Profile Picture",
			error: error.message,
		});
	}
};

//deleteAccount
//TODO -> How can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
	try {
		//get id
		const id = req.user.id;
		//validation
		const userDetails = await User.findById(id);
		if (!userDetails)
			return res.status(404).json({
				success: false,
				message: "User not found for Account deletion",
			});
		//delete profile
		await Profile.findByIdAndDelete(userDetails.additionalDetails);
		//TODO : uneroll user from all enrolled courses COMPLETED
		for (const courseId of userDetails.courses) {
			await Course.findByIdAndDelete(courseId, {
				$pull: {
					studentsEnrolled: id,
				},
			});
		}
		//delete user
		await User.findByIdAndDelete(id);
		//return response
		res.status(200).json({
			success: true,
			message: "User Deleted Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in deleting Account",
			error: error.message,
		});
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		if (!userDetails)
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		res.status(200).json({
			success: true,
			message: "User details fetched Successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in getting User details",
			error: error.message,
		});
	}
};

//get user enrolled courses
exports.getEnrolledCourses = async (req, res) => {
	try {
		const userId = req.user.id;
		if (!userId)
			res.status(401).json({
				success: false,
				message: "UserId is not available",
			});

		let userDetails = await User.findById(userId)
			.populate({
				path: "courses",
				populate: { path: "courseContent", populate: { path: "subSection" } },
			})
			.exec();

		userDetails = userDetails.toObject();
		var subSectionLength = 0;
		for (var i = 0; i < userDetails.courses.length; i++) {
			let totalDurationInSeconds = 0;
			subSectionLength = 0;
			for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
				totalDurationInSeconds += userDetails.courses[i].courseContent[
					j
				].subSection.reduce(
					(acc, curr) => acc + parseInt(curr.timeDuration),
					0
				);

				userDetails.courses[i].totalDuration = convertSecondsToDuration(
					totalDurationInSeconds
				);

				subSectionLength +=
					userDetails.courses[i].courseContent[j].subSection.length;
			}

			let courseProgressCount = await CourseProgress.findOne({
				courseId: userDetails.courses[i]._id,
				userId: userId,
			});
			courseProgressCount = courseProgressCount?.completedVideos.length;
			if (subSectionLength === 0)
				userDetails.courses[i].progressPercentage = 100;
			else {
				const multiplier = Math.pow(10, 2);
				userDetails.courses[i].progressPercentage =
					Math.round(
						(courseProgressCount / subSectionLength) * 100 * multiplier
					) / multiplier;
			}
		}

		if (!userDetails)
			res.status(401).json({
				success: false,
				message: "User Not Found",
			});

		return res.status(200).json({
			success: true,
			message: "User enrolled courses is Available",
			data: userDetails.courses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in getting User enrolled courses",
		});
	}
};

exports.instructorDashboard = async (req, res) => {
	try {
		const userId = req.user.id;
		const courseDetails = await Course.find({ instructor: userId });

		const courseData = courseDetails.map((course) => {
			const totalStudentsEnrolled = course.studentsEnrolled.length;
			const totalAmountGenerated = totalStudentsEnrolled * course.price;

			//create a new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			};

			return courseDataWithStats;
		});

		return res.status(200).json({
			success: true,
			message: "Instructor Dashboard fetched successfully",
			data: courseData,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in instructor dashboard",
			error: error.message,
		});
	}
};
