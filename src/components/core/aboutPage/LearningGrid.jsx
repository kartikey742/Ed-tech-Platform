import React from "react";
import {HighlightText} from "../homepage/highlight"
import {CTAButton} from "../homepage/button";


const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="learning-grid-wrapper">
      {LearningGridArray.map((card, i) => {
        const cardClass = 
          card.order % 2 === 1
            ? "learning-card dark"
            : card.order % 2 === 0
            ? "learning-card light"
            : "learning-card transparent";

        const isLarge = i === 0;
        const isOffset = card.order === 3;

        return (
          <div
            key={i}
            className={`learning-grid-card ${cardClass} ${isLarge ? "span-2" : ""} ${isOffset ? "offset" : ""}`}
          >
            {card.order < 0 ? (
              <div className="learning-highlight-card">
                <h2 className="highlight-heading">
                  {card.heading}
                  <HighlightText text={card.highliteText} />
                </h2>
                <p className="highlight-description">{card.description}</p>
                <div className="highlight-button">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="learning-basic-card">
                <h3 className="basic-heading">{card.heading}</h3>
                <p className="basic-description">{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
