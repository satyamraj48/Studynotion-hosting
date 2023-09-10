import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import ReactStars from "react-rating-stars-component";

import { apiconnector } from "../../services/apiconnector";
import { courseEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";

function ReviewSlider() {
	const [reviews, setReviews] = useState([]);
	const truncateWords = 15;

	useEffect(() => {
		const fetchAllReviews = async () => {
			const response = await apiconnector(
				"GET",
				courseEndpoints.GET_REVIEWS_API
			);
			// console.log("===response--> ", response?.data?.data);
			if (response?.data?.success) setReviews(response?.data?.data);
		};
		fetchAllReviews();
	}, []);

	return (
		<div className="my-10 w-[230px] h-[184px] max-w-maxContent lg:max-w-maxContent ">
			<Swiper
				slidesPerView={0}
				spaceBetween={2}
				loop={true}
				freeMode={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={[FreeMode, Pagination, Autoplay]}
				className="w-full"
			>
				{reviews.map((review, i) => (
					<SwiperSlide key={i}>
						<div className="flex flex-col gap-3 bg-richblack-800 rounded-lg px-6 py-3 text-sm">
							<div className="flex items-center gap-4">
								<img
									src={review?.user?.image ?? ""}
									alt="User Image"
									className="w-9 h-9 rounded-full object-cover"
								/>
								<div>
									<p className="font-semibold">{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
									<p className="text-xs text-richblack-300">
										{review?.course?.courseName}
									</p>
								</div>
							</div>
							<p className="my-2 text-md text-richblack-25 ">
								{review?.review.split(" ").length > truncateWords
									? `${review?.review
											.split(" ")
											.slice(0, truncateWords)
											.join(" ")}...`
									: `${review?.review}`}
							</p>
							<div className="flex items-center gap-2">
								<p className="text-yellow-100 font-semibold">
									{review.rating.toFixed(1)}
								</p>
								<ReactStars
									count={5}
									value={review.rating}
									size={20}
									edit={false}
									activeColor="#ffd700"
									emptyIcon={<FaStar />}
									fullIcon={<FaStar />}
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default ReviewSlider;
