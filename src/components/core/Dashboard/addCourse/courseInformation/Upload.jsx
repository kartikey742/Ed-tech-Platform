import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    noClick: true, // disable default click so we control it
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div className="upload-container">
      <label className="upload-label" htmlFor={name}>
        {label} {!viewData && <sup className="required">*</sup>}
      </label>

      <div
        className={`upload-dropzone ${isDragActive ? "active" : ""}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} ref={inputRef} />

        {previewSource ? (
          <div className="upload-preview">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="preview-image"
              />
            ) : (
              <video
                controls
                className="preview-video"
                style={{ aspectRatio: "16/9" }}
                src={previewSource}
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="upload-placeholder">
            <div
              className="upload-icon"
              onClick={() => inputRef.current && inputRef.current.click()}
            >
              <FiUploadCloud />
            </div>
            <p className="upload-text">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span
                className="browse-text"
                onClick={() => inputRef.current && inputRef.current.click()}
              >
                Browse
              </span>{" "}
              a file
            </p>
            <ul className="upload-tips">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="error-text">{label} is required</span>
      )}
    </div>
  );
}
