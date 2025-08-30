import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { setCourse, setEditCourse } from "../../slices/courseSlice"



import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../utils/constants"
import ConfirmationModal from "./common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }
console.log(courses);

  return (
    <div id="maintable">
      <Table className="ct-table">
        <Thead>
          <Tr className="ct-table-header-row">
            <div id="thcourses"><Th className="ct-header-cell" >Courses</Th></div>
            <div  id="thduration"><Th className="ct-header-cell">Duration</Th></div>
            <div id="thprice"><Th className="ct-header-cell" >Price</Th></div>
            <div id="thactions"><Th className="ct-header-cell" id="thactions">Actions</Th></div>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="ct-no-courses">
                No courses found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => {
              let totalDuration = 0;
    course.courseContent.forEach(section => {
      section.subSection.forEach(subSec => {
        totalDuration += Number(subSec.timeDuration) || 0;
      });
    });
    function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds} sec`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
  }
}
           return (<Tr key={course._id} className="ct-table-body-row">
                <div id="thcourses">
                <Td className="ct-course-details">
                  <div className="ct-course-thumbnail">
                  <img 
                    src={course?.thumbNail}
                    alt={course?.courseName}
                    />
                    </div>
                  <div className="ct-course-info">
                    <p className="ct-course-name">
                      {course.courseName}
                    </p>
                    <p className="ct-course-desc">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="ct-created-date">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="ct-status-draft">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="ct-status-published">
                        <div className="ct-status-icon">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                </div>
                <div  id="thduration"><Td className="ct-cell">{formatDuration(totalDuration)}</Td></div>
                <div id="thprice"><Td  className="ct-cell">{`₹${course.price}`}</Td></div> 
                <div id="thactions">
                <Td>
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    title="Edit"
                    className="ct-btn-edit"
                    >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                        "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                        ? () => handleCourseDelete(course._id)
                        : () => {},
                        btn2Handler: !loading
                        ? () => setConfirmationModal(null)
                        : () => {},
                      })
                    }}
                    title="Delete"
                    className="ct-btn-delete"
                    >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
                </div>
              </Tr>)
})
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
