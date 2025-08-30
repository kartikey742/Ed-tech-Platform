import React from "react";
import IconBtn from "./IconBtn";


export default function ConfirmationModal({ modalData }) {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-container">
        <p className="confirmation-modal-title">
          {modalData?.text1}
        </p>
        <p className="confirmation-modal-subtitle">
          {modalData?.text2}
        </p>
        <div className="confirmation-modal-buttons">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="confirmation-modal-secondary-btn"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
