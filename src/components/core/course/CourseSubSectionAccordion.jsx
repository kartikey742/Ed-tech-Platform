import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="subsection-container">
      <div className="subsection-header">
        <div className="subsection-title">
          <span className="subsection-icon">
            <HiOutlineVideoCamera />
          </span>
          <p>{subSec?.title}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;
