const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
	rating: {
		type: Number,
		requires: true,
	},
	review: {
		type: String,
		requires: true,
	},
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
