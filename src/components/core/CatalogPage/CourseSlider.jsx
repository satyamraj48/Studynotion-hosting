import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Course_Card from "./Course_Card";

function CourseSlider({ courses }) {
	return (
		<>
			{courses?.length ? (
				<Swiper
					className="max-h-[30rem]"
					slidesPerView={1}
					spaceBetween={25}
					loop={true}
					modules={[Pagination, Autoplay, Navigation]}
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					navigation={true}
					breakpoints={{
						1024: { slidesPerView: 3 },
					}}
				>
					{courses.map((course, index) => (
						<SwiperSlide key={index}>
							<Course_Card course={course} />
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<p className="text-xl">No Course Found</p>
			)}
		</>
	);
}

export default CourseSlider;
