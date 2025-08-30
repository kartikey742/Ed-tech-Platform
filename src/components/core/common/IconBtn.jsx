import React from "react";


export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`icon-btn ${outline ? "icon-btn-outline" : "icon-btn-filled"} ${customClasses}`}
    >
      {children ? (
        <>
          <span className={`icon-btn-text ${outline ? "icon-btn-text-outline" : ""}`}>
            {text}
          </span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
