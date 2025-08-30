import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../common/IconBtn"


export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => {
    console.log(state.viewCourse)
    return state.viewCourse})
  

  useEffect(() => {
    if (!courseSectionData.length) return
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId)
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[
        currentSubSectionIndx
      ]?._id
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="sidebar-container">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <div
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="sidebar-back-btn"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <IconBtn
            text="Add Review"
            customClasses="sidebar-add-review"
            onclick={() => setReviewModal(true)}
          />
        </div>
        <div className="sidebar-course-info">
          <p className="course-name">{courseEntireData?.courseName}</p>
          <p className="course-progress">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="sidebar-sections">
        {courseSectionData.map((course, index) => (
          <div
            className="sidebar-section"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            {/* Section Header */}
            <div className="section-header">
              <div className="section-title">{course?.sectionName}</div>
              <div
                className={`section-arrow ${
                  activeStatus === course?._id ? "arrow-open" : "arrow-closed"
                }`}
              >
                <BsChevronDown />
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === course?._id && (
              <div className="subsection-container">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`subsection-item ${
                      videoBarActive === topic._id ? "active-subsection" : ""
                    }`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
