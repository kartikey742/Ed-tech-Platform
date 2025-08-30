import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || []);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList]);

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementsList([...requirementsList, requirement.trim()]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };

  return (
    <div className="req-field-container">
      <label htmlFor={name} className="req-label">
        {label} <sup className="req-required">*</sup>
      </label>

      <div className="req-input-container">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="req-input"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="req-add-btn"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="req-list">
          {requirementsList.map((req, index) => (
            <li key={index} className="req-list-item">
              <div>{req}</div>
              <div
              
                className="req-clear-btn"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </div>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="req-error">
          {label} is required
        </span>
      )}
    </div>
  );
}
