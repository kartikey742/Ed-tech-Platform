import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../common/RatingStars";



function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    console.log(course.ratingAndReviews);
    
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
    // console.log(count);
    
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`} className="course-card-link">
      <div className="course-card">
        <div className="course-thumbnail-wrapper">
          <img
            src={course?.thumbNail}
            alt="course thumbnail"
            className={`course-thumbnail ${Height}`}
          />
        </div>
        <div className="course-info">
          <p className="course-title">{course?.courseName}</p>
          <p className="course-instructor">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="course-rating">
            <span className="rating-value">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="rating-count">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
          <p className="course-price">Rs. {course?.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default Course_Card;
