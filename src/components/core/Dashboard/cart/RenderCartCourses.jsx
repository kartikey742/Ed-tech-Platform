import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

export function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`cart-item ${
            indx !== cart.length - 1 ? "cart-item-border" : ""
          } ${indx !== 0 ? "cart-item-margin" : ""}`}
        >
          <div className="cart-item-left">
            <img
              src={course?.thumbNail}
              alt={course?.courseName}
              className="cart-course-img"
            />
            <div className="cart-course-details">
              <p className="cart-course-title">{course?.courseName}</p>
              <p className="cart-course-category">{course?.category?.name}</p>
              <div className="cart-rating">
                {GetAvgRating(course.ratingAndReviews) > 0 && (
                  <span className="cart-rating-score">
                    {GetAvgRating(course.ratingAndReviews)}
                  </span>
                )}
                {console.log(course)}
                <RatingStars Review_Count={GetAvgRating(course.ratingAndReviews)} Star_Size={20}></RatingStars>
                <div style={{ color: "yellow" }}></div>
                <span className="cart-rating-count">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="cart-item-right">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="cart-remove-btn"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="cart-price">₹ {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
