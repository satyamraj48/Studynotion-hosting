const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");

//create Section
exports.createSection = async (req, res) => {
	try {
		//data fetch
		const { sectionName, courseId } = req.body;
		//data validation
		if (!sectionName || !courseId)
			return res.status(403).json({
				success: false,
				message: "Fields are required",
			});
		//create Section
		const newSection = await Section.create({ sectionName });
		//update Course with section ObjectID
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({ path: "courseContent", populate: { path: "subSection" } })
			.exec(); //TODO: use populate to replace section/subsection both in the updatedCourse COMPLETED

		//return response
		res.status(200).json({
			success: true,
			message: "Section Created Successfully",
			data: updatedCourse,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error in Creating Section",
		});
	}
};

//update Section
exports.updateSection = async (req, res) => {
	try {
		//data fetch
		const { sectionName, sectionId, courseId } = req.body;
		//data validation
		if (!sectionName || !sectionId || !courseId)
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		//update Section
		const updatedSection = await Section.findByIdAndUpdate(
			sectionId,
			{
				sectionName,
			},
			{ new: true }
		);

		const courseDetails = await Course.findById(courseId)
			.populate({ path: "courseContent", populate: { path: "subSection" } })
			.exec();

		//return response
		return res.status(200).json({
			success: true,
			message: "Section Updated Successfully",
			data: courseDetails,
		});
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Error in Updating Section",
		});
	}
};

//delete Section
exports.deleteSection = async (req, res) => {
	try {
		//data fetch, assuming that we are sending ID in params
		const { sectionId, courseId } = req.body;

		//data validation
		if (!sectionId)
			return res.status(403).json({
				success: false,
				message: "Fields are required",
			});

		//delete sectionId from courseContent
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			},
		});

		//TODO(Think?) : delete subsection of this section COMPLETED,To be understood
		const section = await Section.findById(sectionId);
		await SubSection.deleteMany({ _id: { $in: section.subSection } });

		//delete Section
		await Section.findByIdAndDelete(sectionId);

		const courseDetails = await Course.findById(courseId)
			.populate({ path: "courseContent", populate: { path: "subSection" } })
			.exec();

		//return response
		return res.status(200).json({
			success: true,
			message: "Section Deleted Successfully",
			data: courseDetails,
		});
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Error in Deleting Section",
		});
	}
};
