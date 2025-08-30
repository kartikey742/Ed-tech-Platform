import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbNail: ThumbnailImage, price: CurrentPrice, _id: courseId } = course;
  console.log(course);
  
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="cdc-card">
    
      
      <img src={ThumbnailImage} alt={course?.courseName} className="cdc-image" />

      <div className="cdc-content">
        <div className="cdc-price">₹ {CurrentPrice}</div>

        <div className="cdc-buttons">
          <button
            className="cdc-yellow-btn"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button onClick={handleAddToCart} className="cdc-black-btn">
              Add to Cart
            </button>
          )}
        </div>

        <p className="cdc-moneyback">30-Day Money-Back Guarantee</p>

        <div>
          <p className="cdc-includes-title">This Course Includes :</p>
          <div className="cdc-includes">
            
            {course?.instructions?.map((item, i) => (
              <p className="cdc-includes-item" key={i}>
                <BsFillCaretRightFill />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="cdc-share-container">
          <button className="cdc-share-btn" onClick={handleShare}>
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
