import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, useLocation, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "../core/Dashboard/ProfileDropDown";
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FcMenu } from "react-icons/fc";
import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

function Navbar() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	const [subLinks, setSubLinks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [menu, setMenu] = useState(false);

	const location = useLocation();

	const ref = useRef();

	useOnClickOutside(ref, () => setMenu(false));

	function routeMatch(route) {
		return matchPath({ path: route }, location.pathname);
	}

	const fetchSubLinks = async () => {
		setLoading(true);
		try {
			const result = await apiconnector("GET", categories.CATEGORIES_API);
			// console.log("Printing Sublinks result-> ", result.data.data);
			setSubLinks(result.data.data);
		} catch (error) {
			console.log("Could not fetch category list");
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchSubLinks();
	}, []);

	return (
		<div
			className={`w-full h-14 flex items-center justify-center ${
				location.pathname !== "/" && "bg-richblack-800"
			} border-b border-richblack-700 text-richblack-25 transition-all duration-200`}
		>
			<div className="flex w-11/12 max-w-maxContent items-center justify-between gap-x-8">
				{/* Logo */}
				<Link to="/">
					<img
						src={logo}
						alt="Company Logo"
						width={160}
						height={42}
						loading="lazy"
					/>
				</Link>

				{/* Navigation links */}
				<nav className="text-sm md:text-[16px] hidden md:block">
					<ul className="flex items-center gap-x-4 md:gap-x-6 text-richblack-25">
						{NavbarLinks.map((elem, i) => (
							<li key={i}>
								{elem.title === "Catalog" ? (
									<div
										className={`relative flex items-center cursor-pointer gap-1 group ${
											routeMatch(elem?.path)
												? "text-yellow-25"
												: "text-richblack-25"
										}`}
									>
										<p className="">{elem.title}</p>

										<IoIosArrowDown />

										<div className="absolute w-[200px] left-[50%] top-[-50%] z-[1000] translate-x-[-50%] translate-y-[3em] flex flex-col bg-richblack-5 p-2 text-richblack-900 opacity-0 transition-all duration-150 font-medium rounded-lg invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-[3em]">
											<div className="absolute left-[50%] top-0 translate-y-[-40%] translate-x-[80%] h-6 w-6 rotate-45 rounded select-none bg-richblack-5 -z-10"></div>
											{loading ? (
												<p className="text-center">Loading...</p>
											) : (
												<>
													{subLinks.length ? (
														subLinks.map((sublink, index) => (
															<Link
																to={`/catalog/${sublink.name
																	.split(" ")
																	.join("-")
																	.toLowerCase()}`}
																key={index}
																className={`transition-all duration-150 bg-transparent hover:bg-richblack-50 rounded-lg pl-4 py-3 pr-2 `}
															>
																{sublink.name}
															</Link>
														))
													) : (
														<p className="text-center">No Courses Found</p>
													)}
												</>
											)}
										</div>
									</div>
								) : (
									<Link to={elem?.path}>
										<p
											className={`${
												routeMatch(elem?.path)
													? "text-yellow-25"
													: "text-richblack-25"
											} text-center `}
										>
											{elem.title}
										</p>
									</Link>
								)}
							</li>
						))}
					</ul>
				</nav>

				{/* Login SignUp Dashboard */}
				<div className="flex gap-x-5 items-center">
					{user && user?.accountType !== "Instructor" && (
						<Link to="/dashboard/cart">
							<div className="text-lg md:text-2xl relative ">
								<AiOutlineShoppingCart />
								{totalItems >= 0 && (
									<span className="absolute -top-2 left-4 md:left-5 text-sm text-center font-semibold text-yellow-100 bg-richblack-600 rounded-full overflow-hidden h-5 w-5 grid place-items-center z-[10]">
										{totalItems}
									</span>
								)}
							</div>
						</Link>
					)}

					{token === null && (
						/* Not Logged in */
						<div className="flex gap-x-3 items-center">
							<Link to="/login">
								<button className="border border-richblack-700 rounded-lg px-3 py-2">
									Login
								</button>
							</Link>

							<Link to="/signup">
								<button className="border border-richblack-700 rounded-lg px-3 py-2">
									SignUp
								</button>
							</Link>
						</div>
					)}

					{token !== null && (
						<div className="flex items-center space-x-1">
							<ProfileDropDown />
							<button
								className="md:hidden relative hover:bg-richblack-600 rounded-md  "
								onMouseOver={() => setMenu(true)}
							>
								<FcMenu className="text-3xl" />
								{menu && (
									<div
										className="absolute z-[1000] -right-2 top-10 w-[220px] bg-richblack-700 px-4 p-2 rounded-lg transition-all duration-700  "
										ref={ref}
									>
										<ul className="flex flex-col gap-y-6 p-3 text-richblack-25 ">
											{NavbarLinks.map((elem, i) => (
												<Link to={elem?.path}>
													<li key={i} className="text-xl hover:text-yellow-5">
														{elem.title}
													</li>
												</Link>
											))}
										</ul>
									</div>
								)}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
