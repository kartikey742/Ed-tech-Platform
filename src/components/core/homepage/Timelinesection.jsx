import React from 'react'
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg" ; 
const Timeline = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success of the company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];
export const Timelinesection = () => {
  return (
    <div id='maintimeline'>
      <div>{
      Timeline.map((ele)=>{
        return(
          <div id='Timeline'>
            <div style={{width:'10%',display:'inline-block'}}><img src={ele.Logo}></img></div>
            <div style={{width:'90%'}}>
              <h3>{ele.Heading}</h3>
              <p>{ele.Description}</p>
            </div>
          <br /><br /><br /><br />
          </div>
        )
      })
      }
      </div>
      <div>
      <img src={TimeLineImage} style={{ width: "35rem", height: "auto",position:'relative' }}  />
         <div className="stats-container">
      <div className="stats-box">
        <div className="stats-item">
          <p className="stats-number">10</p>
          <p className="stats-label">YEARS EXPERIENCES</p>
        </div>

        <div className="divider"></div>

        <div className="stats-item">
          <p className="stats-number">250</p>
          <p className="stats-label">TYPES OF COURSES</p>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}
