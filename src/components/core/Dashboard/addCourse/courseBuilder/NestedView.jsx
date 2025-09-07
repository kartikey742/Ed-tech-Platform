import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { CourseBuilderForm } from "./CourseBuilderForm";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { SubSectionModal } from "./SubSectionModal";

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );
    if (result) dispatch(setCourse(result));
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId },token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
    }
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="nested-container">
        {course?.courseContent?.map((section) => (
          
          <details key={section._id} open>
            <summary className="section-summary">
              <div className="section-header">
                <RxDropdownMenu className="icon-enrol"  size={40}/>
                <p className="section-title">{section.sectionName}</p>
              </div>
              <div className="section-actions">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="icon-enrol" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                 <RiDeleteBin6Line className="icon-enrol" />
                </button>
                <span className="divider">|</span>
                <AiFillCaretDown className="icon-enrol" size={20} />
              </div>
            </summary>
            <div className="subsection-container">
              {section.subSection.map((data) => (
                <div
                key={data?._id}
                onClick={() => setViewSubSection(data)}
                className="subsection-item"
                >
                
                  <div className="subsection-info">
                    <RxDropdownMenu className="icon-enrol"  size={20}/>
                    <p className="subsection-title">{data.title}</p>
                  </div>
                  {console.log('data',data)}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="subsection-actions"
                  >
                    <button className="act"
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="icon-enrol " />
                    </button>
                    <button
                    className="act"
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="icon-enrol act" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="add-lecture-btn"
              >
                <FaPlus className="icon-enrol" color="#facc15"/>
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
