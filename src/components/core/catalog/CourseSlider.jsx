import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Pagination, FreeMode } from "swiper/modules";

import COURSE_CARD from "./COURSE_CARD";


function Course_Slider({ courses }) {
  return (
    <>

      {courses?.length>0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          pagination={{ clickable: true }}
          freeMode={true}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="course-slider"
        >
          {courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <COURSE_CARD course={course} Height="card-height" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="no-course-text">No Course Found</p>
      )}
    </>
  );
}

export default Course_Slider;
