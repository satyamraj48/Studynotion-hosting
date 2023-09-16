const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
	const { courseId, subSectionId } = req.body;
	const userId = req.user.id;

	try {
		// Check if the subsection is valid
		const subsection = await SubSection.findById(subSectionId);
		if (!subsection) {
			return res.status(404).json({
				success: false,
				message: "Invalid subSection",
				error: error.message,
			});
		}

		// Find the course progress document for the user and course
		let courseProgress = await CourseProgress.findOne({
			courseId: courseId,
			userId: userId,
		});

		if (!courseProgress) {
			// If course progress doesn't exist, create a new one
			return res.status(404).json({
				success: false,
				message: "Course Progress does not exist",
			});
		} else {
			// If course progress exists, check if the subsection is already completed
			if (courseProgress.completedVideos.includes(subSectionId)) {
				return res.status(400).json({ error: "Subsection already completed" });
			}

			// Push the subsection into the completedVideos array
			courseProgress.completedVideos.push(subSectionId);
		}

		// Save the updated course progress
		await courseProgress.save();

		return res
			.status(200)
			.json({ success: true, message: "Course progress updated successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in updating course progress",
			error: error.message,
		});
	}
};
