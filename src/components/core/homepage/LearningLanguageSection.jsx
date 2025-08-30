import React from 'react'
import {HighlightText} from './highlight'
import {CTAButton} from "../../../components/core/homepage/button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div className="mcontainer">
      <div className="title">
        Your swiss knife for <HighlightText text="learning any language" />
      </div>

      <div className="description">
        Using spin makes learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className="image-row">
        <img src={Know_your_progress} alt="Know your progress" />
        <img src={Compare_with_others} alt="Compare with others" />
        <img src={Plan_your_lessons} alt="Plan your lessons" />
      </div>
    <br /><br />
      <div className="cta-wrapper">
        <CTAButton active={true} linkto="/signup">
          <div>Learn More</div>
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection