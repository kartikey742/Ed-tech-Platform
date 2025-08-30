import React, { useEffect, useState } from "react";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
export const EnrolledCourses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (err) {
      console.log("unable to fetch courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div id="main-enrolled-courses">
      <br />
      <div>
        <h1>Enrolled Courses</h1>
      </div>
      <br />
      {!enrolledCourses ? (
        <div>Loading....</div>
      ) : !enrolledCourses.length ? (
        <p style={{textAlign:'center'}}>You have not enrolled in any courses yet</p>
      ) : (
        <div id="partable">
          <table border="1px solid" id="table">
            <tr id="mainrow">
              <th className="coursename">Course Name</th>
              <th className="duration">Duration</th>
              <th className="progress">Progress</th>
            </tr>
            {enrolledCourses.map((course, idx) => (
              <tr
                id="mainrow"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <td className="coursename">
                  <div id="imgtxt">
                    <img className="enrollimg" src={course.thumbNail}></img>
                    <div>
                      <h2 style={{textAlign:'start'}}>{course.courseName}</h2>

                      <p style={{ color: "grey" }}>
                        {" "}
                        {course.courseDescription
                          .split(" ")
                          .slice(0, 15)
                          .join(" ") +
                          (course.courseDescription.split(" ").length > 15
                            ? "..."
                            : "")}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="duration">{course.totalDuration}</td>
                <td className="progress">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
