import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Footer from "../components/common/Footer";
import { apiconnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import CourseSlider from "../components/core/CatalogPage/CourseSlider";
import Course_Card from "../components/core/CatalogPage/Course_Card";
import Error from "./Error";

function Catalog() {
	const { catalogName } = useParams();
	const [loading, setLoading] = useState(false);
	const [catalogPageData, setCatalogpageData] = useState([]);
	const [categoryId, setCategoryId] = useState(null);
	const [active, setActive] = useState(1);

	useEffect(() => {
		//fetch all categories
		const getCategory = async () => {
			const res = await apiconnector("GET", categories.CATEGORIES_API);
			const category_id = res?.data?.data?.filter(
				(ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
			)[0]._id;
			setCategoryId(category_id);
		};
		//call
		getCategory();
	}, [catalogName]);

	useEffect(() => {
		const getCategoryDetails = async () => {
			setLoading(true);
			try {
				const result = await getCatalogPageData(categoryId);
				if (result) {
					setCatalogpageData(result);
				}
			} catch (error) {
				console.log("Catalog Page Data API....", error);
			}
			setLoading(false);
		};
		//call
		if (categoryId) getCategoryDetails();
	}, [categoryId]);

	if (loading || !catalogPageData) {
		return (
			<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">
				<div className="!w-12 !h-12 spinner2"></div>
			</div>
		);
	}

	if (!loading && !catalogPageData.success) {
		return <Error />;
	}

	return (
		<div className="w-full box-content bg-richblack-900 px-4 text-richblack-5">
			<div className="px-40 mx-auto min-h-[260px] max-w-maxContent items-start lg:max-w-maxContent bg-richblack-800 rounded-b-3xl flex flex-col justify-center gap-4">
				<p className="text-richblack-300 text-sm capitalize">
					{`
					Home / Catalog / `}
					<span className="text-yellow-25">
						{catalogPageData?.data?.selectedCategory?.name}
					</span>
				</p>
				<p className="text-richblack-5 text-3xl capitalize">
					{catalogPageData?.data?.selectedCategory?.name}
				</p>
				<p className="max-w-[870px] text-richblack-200 ">
					{catalogPageData?.data?.selectedCategory?.description}
				</p>
			</div>

			{/* section 1 */}
			{/* course to get startes */}
			<div className=" mx-auto w-full box-content max-w-maxContentTab lg:max-w-maxContent px-4 py-12 ">
				<p className="section_heading">Courses to get you started</p>
				<div
					className={`my-4 flex gap-y-4 border-b border-b-richblack-600 text-sm`}
				>
					<button
						className={`${
							active === 1
								? "text-yellow-25 border-b border-b-yellow-5"
								: "text-richblack-50"
						} px-4 py-2`}
						onClick={() => setActive(1)}
					>
						Most Popular
					</button>
					<button
						className={`${
							active === 2
								? "text-yellow-25 border-b border-b-yellow-5"
								: "text-richblack-50"
						} px-4 py-2`}
						onClick={() => setActive(2)}
					>
						New
					</button>
				</div>
				<div className="mt-4">
					<CourseSlider
						courses={
							active === 2
								? catalogPageData?.data?.differentCategory?.courses
								: catalogPageData?.data?.selectedCategory?.courses
						}
					/>
				</div>
			</div>

			{/* section 2 */}
			<div className=" mx-auto box-content w-full max-w-maxContentTab lg:max-w-maxContent px-4 py-12 ">
				<p className="section_heading">
					Top Courses in {catalogPageData?.data?.selectedCategory?.name}
				</p>
				<div className="py-8">
					<CourseSlider
						courses={catalogPageData?.data?.differentCategory?.courses}
					/>
				</div>
			</div>

			{/* section 3 */}
			<div className=" mx-auto box-content w-full max-w-maxContentTab lg:max-w-maxContent px-4 py-12 ">
				<p className="text-2xl font-semibold">Frequently Bought</p>
				<div className="py-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
						{catalogPageData?.data?.mostSellingCourses
							?.slice(0, 4)
							.map((course, index) => (
								<Course_Card key={index} course={course} />
							))}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Catalog;
