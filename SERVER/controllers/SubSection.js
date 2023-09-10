const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {
	uploadImageToCloudinary,
	deleteFileFromCloudinary,
} = require("../utils/imageUploader");
require("dotenv").config();

//create SubSection
exports.createSubSection = async (req, res) => {
	try {
		//fetch data
		const { title, description, sectionId } = req.body;
		const video = req.files.videoFile;

		//validation
		if (!title || !description || !video || !sectionId)
			return res.status(403).json({
				success: false,
				message: "All fields are required",
			});
		//upload video to Cloudinary
		const uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_NAME
		);
		console.log("Upload Details -> ", uploadDetails);

		//create SubSection
		const newSubSection = await SubSection.create({
			title,
			timeDuration: uploadDetails.duration,
			description,
			videoUrl: uploadDetails.secure_url,
		});

		//add SubSection ObjectId in Section model
		const updatedSection = await Section.findByIdAndUpdate(
			sectionId,
			{
				$push: {
					subSection: newSubSection._id,
				},
			},
			{ new: true }
		)
			.populate("subSection")
			.exec(); //TODO: log updated section here, after adding populate query

		//return response
		return res.status(200).json({
			success: true,
			message: "SubSection Created Successfully",
			data: updatedSection,
		});
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Error in Creating SubSection",
			error: error.message,
		});
	}
};

//update SubSection
exports.updateSubSection = async (req, res) => {
	try {
		//fetch data
		const { sectionId, subSectionId, title, description } = req.body;

		const subSection = await SubSection.findById(subSectionId);
		//validation
		if (!subSection)
			return res.status(403).json({
				success: false,
				message: "SubSection not found",
			});

		if (title !== undefined) subSection.title = title;
		if (description !== undefined) subSection.description = description;

		if (req.files && req.files.videoFile !== undefined) {
			//TODO: delete old video from Cloudinary  COMPLETED
			await deleteFileFromCloudinary(
				subSection.videoUrl,
				process.env.FOLDER_NAME
			);
			const video = req.files.videoFile;
			//upload video to Cloudinary
			const uploadDetails = await uploadImageToCloudinary(
				video,
				process.env.FOLDER_NAME
			);
			subSection.videoUrl = uploadDetails.secure_url;
			subSection.timeDuration = uploadDetails.duration;
		}

		//save
		await subSection.save();

		// find updated section and return it
		const updatedSection = await Section.findById(sectionId).populate(
			"subSection"
		);

		//return response
		return res.status(200).json({
			success: true,
			message: "SubSection Updated Successfully",
			data: updatedSection,
		});
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Error in Updating SubSection",
			error: error.message,
		});
	}
};

//delete SubSection
exports.deleteSubSection = async (req, res) => {
	try {
		//fetch data
		const { subSectionId, sectionId } = req.body;
		//validation
		if (!subSectionId || !sectionId)
			return res.status(403).json({
				success: false,
				message: "All fields are required",
			});

		//TODO : completed
		// remove SubSection ObjectId from Section model
		await Section.findByIdAndUpdate(sectionId, {
			$pull: {
				subSection: subSectionId,
			},
		});

		const subSectionDetails = await SubSection.findById(subSectionId);

		if (!subSectionDetails) {
			return res.status(403).json({
				success: false,
				message: "SubSection not found",
			});
		}

		//TODO: delete video from Cloudinary  COMPLETED
		await deleteFileFromCloudinary(
			subSectionDetails.videoUrl,
			process.env.FOLDER_NAME
		);

		//delete SubSection
		await SubSection.findByIdAndDelete(subSectionId);

		// find updated section and return it
		const updatedSection = await Section.findById(sectionId).populate(
			"subSection"
		);

		//return response
		return res.status(200).json({
			success: true,
			message: "SubSection Deleted Successfully",
			data: updatedSection,
		});
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Error in Deleting SubSection",
			error: error.message,
		});
	}
};
