import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion.jsx";

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null);
  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setActive(isActive?.includes(course._id));
  }, [isActive]);

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="accordion-container">
      <div>
        <div
          className="accordion-header"
          onClick={() => handleActive(course._id)}
        >
          <div className="accordion-title">
            <i className={isActive.includes(course._id) ? "rotate-180" : "rotate-0"}>
              <AiOutlineDown />
            </i>
            <p>{course?.sectionName}</p>
          </div>
          <div className="accordion-info">
            <span>{`${course.subSection.length || 0} lecture(s)`}</span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className="accordion-content"
        style={{ height: sectionHeight }}
      >
        <div className="accordion-subsection">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion subSec={subSec} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
