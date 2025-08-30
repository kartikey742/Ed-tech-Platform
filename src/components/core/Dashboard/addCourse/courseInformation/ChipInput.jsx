import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";


export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || []);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    setChips(chips.filter((_, index) => index !== chipIndex));
  };

  return (
    <div className="chip-input-container">
      <label className="chip-label" htmlFor={name}>
        {label} <sup className="chip-required">*</sup>
      </label>

      <div className="chip-wrapper">
        {chips.map((chip, index) => (
          <div key={index} className="chip">
            <div>{chip}</div>
           {/* <div style={{height:'fit-content'}}
              
              >
              </div> */}
              <MdClose
              className="chip-delete-btn chip-delete-icon"
              onClick={() => handleDeleteChip(index)}
              />
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="chip-input"
        />
      </div>

      {errors[name] && (
        <span className="chip-error">{label} is required</span>
      )}
    </div>
  );
}
