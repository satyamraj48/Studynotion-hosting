import React, { useEffect, useState, useRef } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, useLocation, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "../core/Dashboard/ProfileDropDown";
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { CgMenuGridR } from "react-icons/cg";

function Navbar({ setMenuRoot }) {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	const [subLinks, setSubLinks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [menu, setMenu] = useState(false);
	const [tabMenu, setTabMenu] = useState(false);

	const location = useLocation();

	const ref = useRef();
	useOnClickOutside(ref, () => {
		setMenu(false);
		// setMenuRoot(false);
	});

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
			console.log("Could not fetch category list", error);
		}
		setLoading(false);
	};

	//window width
	const getWindowSize = () => {
		const pageWidth = window.matchMedia("(min-width: 768px)");
		if (pageWidth.matches) {
			setTabMenu(true);
			setMenu(false);
		} else {
			setTabMenu(false);
		}
	};
	window.addEventListener("resize", getWindowSize);

	//category fetch
	useEffect(() => {
		fetchSubLinks();
		getWindowSize();
	}, []);

	return (
		<div
			className={`w-full h-14 flex items-center justify-center ${
				location.pathname !== "/" && "bg-richblack-800"
			} border-b border-richblack-700 text-richblack-25 transition-all duration-200`}
		>
			<div className="relative flex w-11/12 max-w-maxContent items-center justify-between gap-x-8">
				{/* Logo */}{" "}
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
				<div
					className={`text-sm bg-richblack-700 rounded-md px-7 py-4 absolute top-12 -right-1 md:text-[16px] md:static md:bg-transparent md:shadow-none z-[1000] shadow-sm shadow-richblack-500 transition-all duration-300 ${
						menu && "animate-[bounce_0.1s_ease-in_1]"
					} ${
						tabMenu || menu ? "visible opacity-100" : "invisible opacity-0"
					} `}
					onMouseLeave={() => {
						setMenu(false);
						// setMenuRoot(menu);
					}}
					ref={ref}
				>
					<ul className="flex flex-col items-start md:flex-row md:items-center md:justify-evenly gap-4 md:gap-6 text-richblack-25">
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

										<div className="absolute w-[140px] md:w-[200px] right-[40%] -top-[300%] md:left-[50%] md:top-[-50%] translate-x-[-50%] translate-y-[3em] flex flex-col bg-richblack-5 md:bg-richblack-5 p-2 text-blue-400 md:text-richblack-900 opacity-0 transition-all duration-150 font-medium rounded-md invisible z-[3000] group-hover:opacity-100 group-hover:visible group-hover:translate-y-[3em]">
											<div className="absolute left-[75%] top-[20%] md:left-[50%] md:top-0 translate-y-[-40%] translate-x-[80%] h-6 w-6 rotate-45 rounded select-none bg-richblack-5 "></div>
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
																<p onClick={() => setMenu(false)}>
																	{sublink.name}
																</p>
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
											onClick={() => setMenu(false)}
										>
											{elem.title}
										</p>
									</Link>
								)}
							</li>
						))}
					</ul>
				</div>
				{/* Login SignUp NavMenu Dashboard */}
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
					{/* menu button for small screen */}
					<button
						className="flex md:hidden z-[2001]"
						onMouseOver={() => {
							setMenu(true);
						}}
						onClick={() => {
							setMenu(true);
						}}
					>
						<CgMenuGridR className="text-richblack-100 text-2xl" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
