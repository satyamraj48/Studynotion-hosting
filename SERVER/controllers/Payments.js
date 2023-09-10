const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
	courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { mongoose } = require("mongoose");
const {
	paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

//initiate the razorpay order
exports.capturePayment = async (req, res) => {
	try {
		const { courses } = req.body;
		const userId = req.user.id;

		if (courses.length === 0)
			return res.status(403).json({
				success: false,
				message: "Please provide valid course ID",
			});

		let totalAmount = 0;

		for (const course_id of courses) {
			let course;
			try {
				//course validation
				course = await Course.findById(course_id);
				if (!course)
					return res.status(403).json({
						success: false,
						message: "Could not find the course",
					});

				//check student already enrolled in that courses
				const uid = new mongoose.Types.ObjectId(userId);
				if (course.studentsEnrolled.includes(uid))
					return res.status(403).json({
						success: false,
						message: "Student is already Enrolled",
					});

				totalAmount += course.price;
			} catch (error) {
				console.log(error);
				return res.status(500).json({
					success: false,
					message: error.message,
				});
			}
		}

		const options = {
			amount: totalAmount * 100,
			currency: "INR",
			receipt: Math.random(Date.now()).toString(),
		};

		try {
			const paymentResponse = await instance.orders.create(options);
			res.json({
				success: true,
				message: "Order Created Successfully",
				data: paymentResponse,
			});
		} catch (error) {
			console.log(error);
			return res.status(403).json({
				success: false,
				message: "Could not initiate the order",
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in creating Order",
			error: error.message,
		});
	}
};

//verify the payment
exports.verifyPayment = async (req, res) => {
	try {
		const razorpay_order_id = req.body?.razorpay_order_id;
		const razorpay_payment_id = req.body?.razorpay_payment_id;
		const razorpay_signature = req.body?.razorpay_signature;
		const courses = req.body?.courses;
		const userId = req.user.id;
		//validation
		if (
			!razorpay_order_id ||
			!razorpay_payment_id ||
			!razorpay_signature ||
			!courses ||
			!userId
		)
			return res.status(403).json({
				success: false,
				message: "Payment Failed 1",
			});

		let body = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_SECRET)
			.update(body.toString())
			.digest("hex");

		if (expectedSignature === razorpay_signature) {
			//enroll kro student ko
			await enrollStudents(courses, userId, res);

			//return response
			return res.status(200).json({
				success: true,
				message: "Payment Verified",
			});
		}
		return res.status(200).json({
			success: false,
			message: "Payment Failed 3",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in Verification of Payment",
			error: error.message,
		});
	}
};

const enrollStudents = async (courses, userId, res) => {
	if (!courses || !userId)
		return res.status(400).json({
			success: false,
			message: "Please Provide data for Courses or UserId",
		});

	for (const course_id of courses) {
		try {
			//find the course and enroll the student in it
			const enrolledCourse = await Course.findOneAndUpdate(
				{ _id: course_id },
				{
					$push: {
						studentsEnrolled: userId,
					},
				},
				{ new: true }
			);
			if (!enrolledCourse)
				return res.status(500).json({
					success: false,
					error: "Course not Found",
				});

			//create course progress for that course
			const courseProgress = await CourseProgress.create({
				courseId: course_id,
				userId: userId,
				completedVideos: [],
			});

			//find the course and add the course to their list of enrolledCourses and add course progress id to their list of courseProgress
			const enrolledStudent = await User.findOneAndUpdate(
				{ _id: userId },
				{
					$push: {
						courses: course_id,
						courseProgress: courseProgress._id,
					},
				},
				{ new: true }
			);
			if (!enrolledStudent)
				return res.status(500).json({
					success: false,
					message: "Student not Found",
				});

			//send mail to student
			const emailResponse = await mailSender(
				enrolledStudent.email,
				"Congratulations, you are onboarded into new Codehelp Course",
				courseEnrollmentEmail(
					enrolledCourse.courseName,
					`${enrolledStudent.firstName} ${enrolledStudent.lastName}`
				)
			);
		} catch (error) {
			console.log("for Loop Course mei ERROR....", error);
			return res.status(500).json({
				success: false,
				message: "Error in enrolling student",
			});
		}
	}
};

exports.sendPaymentSuccessEmail = async (req, res) => {
	const { orderId, paymentId, amount } = req.body;

	const userId = req.user.id;
	if (!orderId || !paymentId || !amount)
		return res.status(400).json({
			success: false,
			message: "Please provide all the fileds",
		});

	try {
		//student info
		const enrolledStudent = await User.findById(userId);
		await mailSender(
			enrolledStudent.email,
			`Payment Recieved`,
			paymentSuccessEmail(
				enrolledStudent.firstName,
				amount / 100,
				orderId,
				paymentId
			)
		);
	} catch (error) {
		console.log("Error in sending mail ", error);
		return res.status(500).json({
			success: false,
			message: "Could not send email",
		});
	}
};

//capture the payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {
// 	try {
// 		//get courseId and userId
// 		const { courseId } = req.body;
// 		const userId = req.user.id;
// 		//validation
// 		//valid courseID
// 		if (!courseId)
// 			return res.status(403).json({
// 				success: false,
// 				message: "Please provide valid course ID",
// 			});
// 		//valid courseDetail
// 		const courseDetails = await Course.findById(courseId);
// 		if (!courseDetails)
// 			return res.status(403).json({
// 				success: false,
// 				message: "Could not find the course",
// 			});
// 		//user already pay for the same course
// 		const uid = new mongoose.Types.ObjectId(userId);
// 		if (courseDetails.studentsEnrolled.includes(uid))
// 			return res.status(403).json({
// 				success: false,
// 				message: "Student is already enrolled",
// 			});
// 		//order create
// 		const amount = courseDetails.price;
// 		const currency = "INR";
// 		const options = {
// 			amount: amount * 100,
// 			currency,
// 			receipt: Math.random(Date.now()).toString(),
// 			notes: {
// 				courseId,
// 				userId,
// 			},
// 		};
// 		try {
// 			//initiate the payment using razorpay
// 			const paymentResponse = await instance.orders.create(options);
// 			console.log("Payment Response ->  ", paymentResponse);
// 			//return response
// 			return res.status(200).json({
// 				success: true,
// 				message: "Order Created Successfully",
// 				courseName: courseDetails.courseName,
// 				courseDescription: courseDetails.courseDescription,
// 				thumbnail: courseDetails.thumbnail,
// 				orderId: paymentResponse.id,
// 				currency: paymentResponse.currency,
// 				amount: paymentResponse.amount,
// 			});
// 		} catch (error) {
// 			console.error(error);
// 			return res.json({
// 				success: false,
// 				message: "Could not initiate Order",
// 				error: error.message,
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Error in creating Order",
// 			error: error.message,
// 		});
// 	}
// };

//verify Signature of Razorpay and Server

//here Razorpay hits this API route(/verifySignature), so here req is came from razorpay not from frontend
// exports.verifySignature = async (req, res) => {
// 	try {
// 		const webhookSecret = "12345678";

// 		//signature came in hashed form
// 		const signature = req.headers["x-razorpay-signature"];

// 		//3steps for hashing webhookSecret
// 		const shasum = crypto.createHmac("sha256", webhookSecret);
// 		shasum.update(JSON.stringify(req.body));
// 		const digest = shasum.digest("hex");

// 		if (signature === digest) {
// 			console.log("Payment is Authorised");

// 			const { userId, courseId } = req.body.payload.payment.entity.notes;
// 			try {
// 				//find the course and enroll the student in it
// 				const enrolledCourse = await User.findOneAndUpdate(
// 					{ _id: courseId },
// 					{ $push: { studentsEnrolled: userId } },
// 					{ new: true }
// 				);
// 				if (!enrolledCourse) {
// 					return res.status(500).json({
// 						success: false,
// 						message: "Error in enrolling Course",
// 					});
// 				}

// 				//find the student and add the course to their courses list
// 				const enrolledStudent = await User.findOneAndUpdate(
// 					{ _id: userId },
// 					{
// 						$push: {
// 							courses: courseId,
// 						},
// 					},
// 					{ new: true }
// 				);

// 				//mail send krdo confirmation wala
// 				const emailResponse = await mailSender(
// 					enrolledStudent.email,
// 					"Congratulations, you are onboarded into new Codehelp Course",
// 					courseEnrollmentEmail(
// 						enrolledCourse.courseName,
// 						enrolledStudent.firstName
// 					)
// 				);
// 				return res.status(200).json({
// 					success: true,
// 					message: "Signature Verified and New Course Added Successfully",
// 				});
// 			} catch (error) {
// 				console.error(error);
// 				return res.status(500).json({
// 					success: false,
// 					message: "Error in enrolling Course",
// 					error: error.message,
// 				});
// 			}
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Invalid request, Error in verification of Signature",
// 			error: error.message,
// 		});
// 	}
// };
