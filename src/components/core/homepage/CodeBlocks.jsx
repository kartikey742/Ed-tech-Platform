import React from "react";
import { CTAButton } from "./button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
export const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctaBtn1,
  ctaBtn2,
  codeBlock,
  bgGrd,
  codeColor,
}) => {
  return (
    <div id="maincodeblock" style={{flexDirection:position}}>
      <div className="sec1">
        <div>
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>{heading}</div>
          <br />
          <div style={{ fontSize: "14px", color: "#666" }}>{subHeading}</div>
        </div>

        <div id="homeButtons">
          <CTAButton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
            <div id="CTA">
            {ctaBtn1.text}
            <FaArrowRight></FaArrowRight>
            </div>
          </CTAButton>

          <CTAButton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
            {ctaBtn2.text}
          </CTAButton>
        </div>
      </div>
      <div className="sec2">
         <TypeAnimation
        sequence={[codeBlock,'', 500]} // type whole block, then pause
        wrapper="span"
        cursor={true}
        speed={1} 
        repeat={Infinity} 
        omitDeletionAnimation={true}
      />
      </div>
    </div>
  );
};
