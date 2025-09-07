import React, { useEffect } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { ratingsEndpoints } from "../../../services/apis";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

export const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;
  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      console.log("Logging Response in rating.....", response);
      const { data } = response;
      if (data.success) {
        setReviews(data.data);
        console.log("Printing Reviews", data.data);
      }
    };
    fetchAllReviews();
  }, []);
  console.log("Printing Reviews", reviews);

  return (
    <div id="mainswiper">
       <h1 style={{textAlign:'center'}} className="about-reviews-title">Reviews from other learners</h1>
       <br />
      <Swiper
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{ delay: 2500 }}
        modules={[ FreeMode, Pagination, Autoplay ]}
           breakpoints={{
          0: {
            slidesPerView: 1, // Mobile
          },
          640: {
            slidesPerView: 2, // Small tablets
          },
          1024: {
            slidesPerView: 3, // Tablets & small laptops
          },
          1280: {
            slidesPerView: 4, // Large desktops
          },
        }}
      >
        {reviews.map((review) => (

          <SwiperSlide>
            <div id="slidecard">
              <div id="firstsection">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                ></img>
                <div id="nametopic">
                  <p>
                    {review.user?.firstName} {review.user?.lastName}
                  </p>
                  {console.log(review.user?.firstName)}
                  
                  <p id="coursename">{review.course.courseName}</p>
                </div>
              </div>
              <p>{review.review}</p>
              <div>
                <div id="rating">
                  <p>{review.rating}</p>
                  <Rating
                    value={review.rating || 0}
                    readOnly
                    precision={0.5}
                    size="medium"
                    sx={{
                      "& .MuiRating-iconFilled": { color: "#ffd700" }, // Gold
                      "& .MuiRating-iconEmpty": { color: "#ccc" }, // Gray
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))} 
      </Swiper>
    </div>
  );
};
