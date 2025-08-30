import React from "react";
import {HighlightText} from "../homepage/highlight";


const Quote = () => {
  return (
    <div className="quote-container">
      We are passionate about revolutionizing the way we learn. Our
      innovative platform <HighlightText text={"combines technology"} />,{" "}
      <span className="quote-expertise">expertise</span>, and community to create an
      <span className="quote-impact">
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
