import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/video-react/dist/video-react.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Cart from "./components/core/Dashboard/Cart/Cart";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/InstructorCourses/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCoursePage/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import { useState } from "react";

const App = () => {
	const { user } = useSelector((state) => state.profile);
	const [menuRoot, setMenuRoot] = useState(false);

	return (
		<div
			className={`w-screen min-h-screen bg-richblack-900 flex flex-col items-center font-inter ${
				menuRoot && "overflow-y-hidden"
			} `}
		>
			<Navbar setMenuRoot={setMenuRoot} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />

				<Route
					path="/login"
					element={
						<OpenRoute>
							<Login />
						</OpenRoute>
					}
				/>
				<Route
					path="/signup"
					element={
						<OpenRoute>
							<Signup />
						</OpenRoute>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<OpenRoute>
							<ForgotPassword />
						</OpenRoute>
					}
				/>
				<Route
					path="/update-password/:id"
					element={
						<OpenRoute>
							<UpdatePassword />
						</OpenRoute>
					}
				/>
				<Route
					path="/verify-email"
					element={
						<OpenRoute>
							<VerifyEmail />
						</OpenRoute>
					}
				/>

				{/* dashboard routes */}
				<Route
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route
						path="/dashboard/my-profile"
						element={
							<PrivateRoute>
								<MyProfile />
							</PrivateRoute>
						}
					/>

					<Route
						path="/dashboard/settings"
						element={
							<PrivateRoute>
								<Settings />
							</PrivateRoute>
						}
					/>

					{user?.accountType === ACCOUNT_TYPE.STUDENT && (
						<>
							<Route
								path="/dashboard/enrolled-courses"
								element={
									<PrivateRoute>
										<EnrolledCourses />
									</PrivateRoute>
								}
							/>
							<Route
								path="/dashboard/cart"
								element={
									<PrivateRoute>
										<Cart />
									</PrivateRoute>
								}
							/>
						</>
					)}

					{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
						<>
							<Route
								path="/dashboard/instructor"
								element={
									<PrivateRoute>
										<InstructorDashboard />
									</PrivateRoute>
								}
							/>
							<Route
								path="/dashboard/my-courses"
								element={
									<PrivateRoute>
										<MyCourses />
									</PrivateRoute>
								}
							/>
							<Route
								path="/dashboard/add-course"
								element={
									<PrivateRoute>
										<AddCourse />
									</PrivateRoute>
								}
							/>
							<Route
								path="/dashboard/edit-course/:courseId"
								element={
									<PrivateRoute>
										<EditCourse />
									</PrivateRoute>
								}
							/>
						</>
					)}
				</Route>

				{/* view course routes */}
				<Route
					element={
						<PrivateRoute>
							<ViewCourse />
						</PrivateRoute>
					}
				>
					{user?.accountType === ACCOUNT_TYPE.STUDENT && (
						<Route
							path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
							element={
								<PrivateRoute>
									<VideoDetails />
								</PrivateRoute>
							}
						/>
					)}
				</Route>

				{/* catalog routes */}
				<Route path="/catalog/:catalogName" element={<Catalog />} />
				{/* course routes */}
				<Route path="/course/:courseId" element={<CourseDetails />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
};

export default App;
