const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

//create Course handler function
exports.createCourse = async (req, res) => {
	try {
		//fetch data
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			instructions,
			status,
		} = req.body;

		const thumbnail = req.files.thumbnailImage;
		//convert the tag and instrutctions from stringified Array to Array
		tag = JSON.parse(tag);
		instructions = JSON.parse(instructions);
		//validation
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!category ||
			!instructions ||
			!thumbnail
		)
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		if (!status || status === undefined) status = "Draft";

		//check the instructor
		const userId = req.user.id;
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails)
			return res.status(404).json({
				success: false,
				message: "Instructor details not found",
			});

		//check given category is valid or not
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails)
			return res.status(404).json({
				success: false,
				message: "Category details not found",
			});

		//Upload Image to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);

		//Create an entry for new Course
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn,
			price,
			tag,
			category: categoryDetails._id,
			instructions,
			status,
			thumbnail: thumbnailImage.secure_url,
		});

		//add the newCourse to User schema of Instructor
		await User.findByIdAndUpdate(
			{ _id: instructorDetails._id },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		//update the Category ka schema
		//TODO completed
		await Category.findByIdAndUpdate(
			category,
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Course Created Successfully",
			data: newCourse,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in creating Course",
			error: error.message,
		});
	}
};

//edit Course handler function
exports.editCourse = async (req, res) => {
	try {
		//fetch data
		const { courseId } = req.body;
		const updates = req.body;

		//check the instructor
		const userId = req.user.id;
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails)
			return res.status(404).json({
				success: false,
				message: "Instructor details not found",
			});

		//check given category is valid or not
		if (updates["category"]) {
			const categoryDetails = await Category.findById(updates["category"]);
			if (!categoryDetails)
				return res.status(404).json({
					success: false,
					message: "Category details not found",
				});
		}

		//course validation
		const course = await Course.findById(courseId);
		if (!course)
			return res.status(400).json({
				success: false,
				message: "Course not found",
			});

		//if thumbnail image is found, update it
		if (req.files) {
			const thumbnail = req.files.thumbnailImage;
			//Upload Image to Cloudinary
			const thumbnailImage = await uploadImageToCloudinary(
				thumbnail,
				process.env.FOLDER_NAME
			);
			course.thumbnail = thumbnailImage.secure_url;
		}

		//update only the fields that are present in the request body
		for (const key in updates) {
			if (updates.hasOwnProperty(key)) {
				if (key === "tag" || key === "instructions")
					course[key] = JSON.parse(updates[key]);
				else course[key] = updates[key];
			}
		}

		//save in db
		await course.save();

		//Update Course
		const updatedCourse = await Course.findByIdAndUpdate(courseId)
			.populate({
				path: "instructor",
				populate: { path: "additionalDetails" },
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		return res.status(200).json({
			success: true,
			message: "Course Updated Successfully",
			data: updatedCourse,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in updating Course",
			error: error.message,
		});
	}
};

//delete Course handler function
exports.deleteCourse = async (req, res) => {
	try {
		//fetch data
		const { courseId } = req.body;

		//check the instructor
		const userId = req.user.id;
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails)
			return res.status(404).json({
				success: false,
				message: "Instructor details not found",
			});

		//course validation
		const course = await Course.findById(courseId);
		if (!course)
			return res.status(400).json({
				success: false,
				message: "Course not found",
			});

		//uneroll students from the course
		const studentsEnrolled = course.studentsEnrolled;
		for (const studentId of studentsEnrolled) {
			await User.findByIdAndUpdate(studentId, {
				$pull: { courses: courseId },
			});
		}

		//delete sections and subSections
		const courseSections = course.courseContent;
		for (const sectionId of courseSections) {
			//delete subSections of the section
			const section = await Section.findById(sectionId);
			if (section) {
				const subSections = section.subSection;
				for (const subSectionId of subSections) {
					await SubSection.findByIdAndDelete(subSectionId);
				}
			}
			//delete the section
			await Section.findByIdAndDelete(sectionId);
		}

		//delete the course
		await Course.findByIdAndDelete(courseId);

		//return updated Courses
		const updatedCourses = await Course.find(
			{},
			{
				courseName: true,
				thumbnail: true,
				price: true,
				instructor: true,
				ratingAndReviews: true,
				studentEnrolled: true,
				status: true,
			}
		)
			.populate({
				path: "instructor",
				populate: { path: "additionalDetails" },
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		return res.status(200).json({
			success: true,
			message: "Course Deleted Successfully",
			data: updatedCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in deleting Course",
			error: error.message,
		});
	}
};

//getAllCourse handler function
exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{ status: "Published" },
			{
				courseName: true,
				thumbnail: true,
				price: true,
				instructor: true,
				ratingAndReviews: true,
				studentEnrolled: true,
				status: true,
			}
		)
			.populate({
				path: "instructor",
				populate: { path: "additionalDetails" },
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		return res.status(200).json({
			success: true,
			message: "Data for all courses fetched successfully",
			data: allCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in showing All Courses",
			error: error.message,
		});
	}
};

exports.getCourseDetails = async (req, res) => {
	try {
		//get id
		const { courseId } = req.body;
		//find course details
		const courseDetails = await Course.findById(courseId)
			.populate({ path: "instructor", populate: { path: "additionalDetails" } })
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
					select: "-videoUrl",
				},
			})
			.populate("ratingAndReviews")
			.populate("category")
			.exec();

		if (!courseDetails)
			return res.status(400).json({
				success: false,
				message: `Could not find course with ${courseId}`,
			});

		let totalDuration = 0;
		for (const val of courseDetails.courseContent) {
			for (const video of val.subSection) {
				totalDuration += video.timeDuration;
			}
		}
		totalDuration = convertSecondsToDuration(totalDuration);

		return res.status(200).json({
			success: true,
			message: "All Course in Detail is fetched successfully",
			data: { courseDetails, totalDuration },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in getting getCourseDetails",
			error: error.message,
		});
	}
};

//get course for a given Instructor handler function
exports.getInstructorCourses = async (req, res) => {
	try {
		const userId = req.user.id;

		//validation
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});
		if (!instructorDetails)
			return res.status(404).json({
				success: false,
				message: "Instructor details not found",
			});

		const instructorCourses = await Course.find({ instructor: userId }).sort({
			created: -1,
		});

		return res.status(200).json({
			success: true,
			message: "All Instructor Courses fetched Successfully",
			data: instructorCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in fetching Instructor Courses",
			error: error.message,
		});
	}
};

exports.getFullCourseDetails = async (req, res) => {
	try {
		//get id
		const { courseId } = req.body;
		const userId = req.user.id;
		//find course details
		const courseDetails = await Course.findById(courseId)
			.populate({ path: "instructor", populate: { path: "additionalDetails" } })
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.populate("ratingAndReviews")
			.populate("category")
			.exec();

		if (!courseDetails)
			return res.status(400).json({
				success: false,
				message: `Could not find course with ${courseId}`,
			});

		const completedVideosCount = await CourseProgress.findOne({
			courseId: courseId,
			userId: userId,
		});

		const completedVideos = completedVideosCount?.completedVideos ?? [];

		return res.status(200).json({
			success: true,
			message: "All Course in Detail is fetched successfully",
			data: { courseDetails, completedVideos },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in getting fullCourseDetails",
			error: error.message,
		});
	}
};
