import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/core/common/ConfirmationModal";
// import Footer from "../components/Common/Footer";
import RatingStars from "../components/core/common/RatingStars";
import CourseAccordionBar from "../components/core/course/CourseAccordianBar"
import CourseDetailsCard from "../components/core/course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { BuyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";


function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const { courseId } = useParams();
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getFullDetailsOfCourse(courseId,token);
      setResponse(res);
      console.log(res);
      
      
      

    } catch (error) {
      console.log("Could not fetch Course Details");
    }
  };

  fetchData();
}, [courseId]);


  
  useEffect(() => {
    if (response?.courseDetails?.ratingAndReviews) {
    console.log('rating',response.courseDetails?.ratingAndReviews);
    const count = GetAvgRating(response.courseDetails.ratingAndReviews);
    console.log('count',count);
    
    setAvgReviewCount(count);
  }
 
    
  }, [response]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  if (loading || !response) {
    return (
      <div className="page-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response.success) {
    return <Error />;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbNail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response?.courseDetails;

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="page-center">
        <div className="spinner"></div>
      </div>
    );
  }
console.log(avgReviewCount);

  return (
   <div id="maincd">
      <div className="course-details-container">
        <div className="course-hero">
          <div className="course-hero-content">
            {/* <div className="course-thumbnail-wrapper">
              <div className="course-thumbnail-overlay"></div>
              <img src={thumbNail} alt="course thumbnail" className="course-thumbnail" />
            </div> */}
            <div className="courseinfo">
              <p className="course-title">{courseName}</p>
              <p className="course-description">{courseDescription}</p>
              <div className="course-stats">
                <span className="highlight-text">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>({ratingAndReviews.length} reviews)</span>
                <span>{studentsEnrolled.length} students enrolled</span>
              </div>
              <p className="course-creator">Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
              <div className="course-meta">
                <p><BiInfoCircle /> Created at {formatDate(createdAt)}</p>
                <p><HiOutlineGlobeAlt /> English</p>
              </div>
            </div>
            {/* <div className="course-buttons-mobile">
              <p className="course-price">Rs. {price}</p>
              <button className="btn-yellow" onClick={handleBuyCourse}>Buy Now</button>
              <button className="btn-black">Add to Cart</button>
            </div> */}
          </div>
  
          
          <div className="course-card-desktop">
            <CourseDetailsCard course={response?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}></CourseDetailsCard>
          </div>
        </div>
      </div>
    
      <div className="course-content-wrapper">
        <div className="what-you-learn">
          <p className="section-title">What you'll learn</p>
          <div className="markdown-content">
            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
          </div>
        </div>
        <div className="course-content-section">
          <div className="section-header">
            <div id="sec-con">
            <p className="section-title">Course Content</p>
            <br />
            <div className="content-stats">
              <p>{courseContent.length} section(s)</p>
              <p>{totalNoOfLectures} lecture(s)</p>
              <p> {response?.totalDuration} total length</p>
            </div>
            </div>
            <button className="collapse-button" onClick={() => setIsActive([])}>
              Collapse all sections
            </button>
          </div>
          <div className="accordion-section">
            {courseContent?.map((course, index) => (
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>
          <div className="author-section">
            <p className="section-title">Author</p>
            <div className="author-info">
              <img
                src={
                  instructor.image
                    ? instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                }
                alt="Author"
                className="author-image"
              />
              <p className="author-name">{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p className="author-about">{instructor?.additionalDetails?.about}</p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
  );
}
export default CourseDetails;
