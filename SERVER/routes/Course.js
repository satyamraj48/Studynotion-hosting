const express = require("express");
const router = express.Router();

// Course Controllers Import
const {
	createCourse,
	editCourse,
	getAllCourses,
	getCourseDetails,
	deleteCourse,
	getInstructorCourses,
	getFullCourseDetails,
} = require("../controllers/Course");

//*****************************************************************
//Category Controllers Import
const {
	showAllCategories,
	createCategory,
	getCategoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
	createSection,
	updateSection,
	deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
	createSubSection,
	updateSubSection,
	deleteSubSection,
} = require("../controllers/SubSection");

// Rating Controlles Import
const {
	createRating,
	getAverageRating,
	getAllRating,
} = require("../controllers/RatingAndReview");

// Course Progress Controllers Import

// Import Middlewares
const {
	auth,
	isStudent,
	isInstructor,
	isAdmin,
} = require("../middlewares/auth");
const { updateCourseProgress } = require("../controllers/CourseProgress");

// Course Routes
//****************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// Courses can Only be Edited by Instructors
router.post("/editCourse", auth, isInstructor, editCourse);
// Courses can Only be deleted by Instructors
router.post("/deleteCourse", auth, isInstructor, deleteCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Edit a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Get all Courses under a specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Full Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

// Course Progress Routes
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

//******************************************************************************************************************
// Category Routes
//*****************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);

router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails);

//******************************************************************************************************************
// Rating and Review Routes
//*****************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
