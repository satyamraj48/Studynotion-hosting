import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, useLocation, matchPath, Navigate } from "react-router-dom";
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
	const [tabMenu, setTabMenu] = useState(true);

	const location = useLocation();

	const ref = useRef();
	useOnClickOutside(ref, () => {
		setMenu(false);
		setTabMenu(false);
	});

	function routeMatch(route) {
		return matchPath({ path: route }, location.pathname);
	}

	const fetchSubLinks = async () => {
		setLoading(true);
		try {
			const result = await apiconnector("GET", categories.CATEGORIES_API);
			console.log("Printing Sublinks result-> ", result.data.data);
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
			<div className="relative flex w-11/12 max-w-maxContent items-center justify-between gap-x-8">
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
				{/* menu button for small screen */}
				<button
					className="flex md:hidden"
					onMouseOver={() => setMenu(true)}
					onClick={() => setMenu(!menu)}
				>
					<FcMenu className="text-3xl" />
				</button>

				{(menu || tabMenu) && (
					<div
						className="text-sm bg-richblack-700 rounded-md px-4 py-2 absolute top-14 inset-x-[5%] sm:inset-x-[10%] md:text-[16px] md:static md:bg-transparent md:shadow-none z-[1000] shadow-sm shadow-richblack-500"
						onMouseLeave={() => setMenu(false)}
						ref={ref}
					>
						<ul className="flex items-center justify-evenly gap-x-4 md:gap-x-6 text-richblack-25">
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
											<p>{elem.title}</p>

											<IoIosArrowDown />

											<div className="absolute w-[200px] left-[50%] top-[-50%] z-[1000] translate-x-[-50%] translate-y-[3em] flex flex-col bg-richblack-5 p-2 text-richblack-900 opacity-0 transition-all duration-150 font-medium rounded-lg invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-[3em]">
												<div className="absolute left-[50%] top-0 translate-y-[-40%] translate-x-[80%] h-6 w-6 rotate-45 rounded select-none bg-richblack-5 -z-10"></div>
												{loading ? (
													<p className="text-center">Loading...</p>
												) : (
													<>
														{subLinks.length > 0 ? (
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
												} text-center active:text-yellow-25 `}
											>
												{elem.title}
											</p>
										</Link>
									)}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Login SignUp Dashboard */}
				<div className="flex items-center gap-x-5">
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
						<div className="flex items-center gap-x-3">
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
						<div className="">
							<ProfileDropDown />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
