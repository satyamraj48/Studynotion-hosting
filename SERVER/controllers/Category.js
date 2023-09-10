const Category = require("../models/Category");

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//create Category handler function
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name || !description) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}
		const categoryDetails = await Category.create({ name, description });
		console.log(categoryDetails);

		res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//getAllCategory handler function
exports.showAllCategories = async (req, res) => {
	try {
		const allCategory = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			message: "All category returned successfully",
			data: allCategory,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//categoryPageDetails
exports.getCategoryPageDetails = async (req, res) => {
	try {
		//get category ID
		const { categoryId } = req.body;
		//get courses for specified category ID
		const selectedCategory = await Category.findById(categoryId)
			.populate({
				path: "courses",
				matches: { status: "Published" },
				populate: {
					path: "instructor",
				},
				populate: { path: "ratingAndReviews" },
			})
			.exec();
		//validation
		if (!selectedCategory)
			return res.status(404).json({
				success: false,
				message: "Data Not Found",
			});

		//handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category",
			});
		}

		//get courses for different categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		});
		const differentCategory = await Category.findOne(
			categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
				._id
		)
			.populate({
				path: "courses",
				match: { status: "Published" },
				populate: {
					path: "instructor",
				},
				populate: { path: "ratingAndReviews" },
			})
			.exec();

		//get top selling courses across all categories
		const allCategories = await Category.find()
			.populate({
				path: "courses",
				match: { status: "Published" },
				populate: {
					path: "instructor",
				},
				populate: { path: "ratingAndReviews" },
			})
			.exec();
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		//return response
		res.status(200).json({
			success: true,
			message: "Category page Details returned Successfully",
			data: { selectedCategory, differentCategory, mostSellingCourses },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};
