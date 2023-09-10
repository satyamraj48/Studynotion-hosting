const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
	try {
		//fetch data
		const { rating, review, courseId } = req.body;
		//get user id
		const userId = req.user.id;
		//check if user enrolled or not
		const courseDetails = await Course.findOne({
			_id: courseId,
			studentsEnrolled: { $elemMatch: { $eq: userId } },
		});
		if (!courseDetails)
			return res.status(404).json({
				success: false,
				message: "Student is not enrolled in the course",
			});
		//check if user already reviewed the course
		const alreadyReviewed = await RatingAndReview.findOne({
			user: userId,
			course: courseId,
		});
		if (alreadyReviewed)
			return res.status(403).json({
				success: false,
				message: "Course is already reviewed by the user",
			});
		//create rating and review
		const ratingReview = await RatingAndReview.create({
			rating,
			review,
			course: courseId,
			user: userId,
		});
		//update course with this rating/review
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					ratingAndReviews: ratingReview._id, //TODO: (added ._id)) needed?
				},
			},
			{ new: true }
		);
		console.log(updatedCourse);
		//return response
		return res.status(200).json({
			success: true,
			message: "Rating and Review Created Successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in creating Rating and Review",
		});
	}
};

//getAverageRating
exports.getAverageRating = async (req, res) => {
	try {
		//get course ID
		const { courseId } = req.body;

		//calculate avg rating
		const result = await RatingAndReview.aggregate([
			{
				$match: {
					course: new mongoose.Types.ObjectId(courseId),
				},
			},
			{
				$group: {
					_id: null,
					averageRating: { $avg: "$rating" },
				},
			},
		]);

		//return rating
		if (result.length > 0) {
			//return response
			return res.status(200).json({
				success: true,
				message: "Average Rating Output Successfully",
				averageRating: result[0].averageRating,
			});
		}
		//return response
		return res.status(200).json({
			success: true,
			message: "Average Rating is 0, no ratings given till now",
			averageRating: 0,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in creating avg Rating",
		});
	}
};

//getAllRating
exports.getAllRating = async (req, res) => {
	try {
		const allReviews = await RatingAndReview.find({})
			.sort({ rating: "desc" })
			.populate({ path: "user", select: "firstName lastName email image" })
			.populate({
				path: "course",
				select: "courseName",
			})
			.exec();

		//return response
		return res.status(200).json({
			success: true,
			message: "All reviews fetched successfully",
			data: allReviews,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in getting all Ratings and Reviews",
		});
	}
};
