import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";

import { createRating } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../common/IconBtn";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const ratingChanged = (event, newValue) => {
    setValue("courseRating", newValue);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  const currentRating = watch("courseRating", 0);

  return (
    <div className="crm-overlay">
      <div className="crm-container">
        {/* Modal Header */}
        <div className="crm-header">
          <p className="crm-title">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="crm-close-icon" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="crm-body">
          <div className="crm-user-section">
            <img
              src={user?.image}
              alt={user?.firstName + " profile"}
              className="crm-user-img"
            />
            <div>
              <p className="crm-user-name">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="crm-user-status">Posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="crm-form">
            {/* Replaced StarRatings with MUI Rating */}
            <Rating
              name="course-rating"
              value={currentRating}
              onChange={ratingChanged}
              size="large"
              precision={1}
              sx={{ color: "#FFD60A", marginBottom: "1rem" }} // matches previous star color
            />

            <div className="crm-textarea-section">
              <label htmlFor="courseExperience" className="crm-label">
                Add Your Experience <sup className="crm-required">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="crm-textarea"
              />
              {errors.courseExperience && (
                <span className="crm-error">Please Add Your Experience</span>
              )}
            </div>

            <div className="crm-btn-group">
              <button
                onClick={() => setReviewModal(false)}
                type="button"
                className="crm-cancel-btn"
              >
                Cancel
              </button>
              <IconBtn type="submit" text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
