import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore";
import { FaUserAlt } from "react-icons/fa";
import { PiNotebookBold } from "react-icons/pi";
const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
export const ExploreMore = () => {
const[tab,setTab]=useState(tabsName[0])
const[card,setCard]=useState(HomePageExplore[0].courses[0].heading)
const[courses,setCourses]=useState(HomePageExplore[0])
const setCards=(value)=>{
setTab(value)
const res=HomePageExplore.filter((course)=>course.tag==value)
setCard(res[0].courses[0].heading)
setCourses(res[0])
// console.log(res[0]); 

}
  return (
  <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
  <div id='navbar'>
    {tabsName.map((ele, index) => {
      return (
        <div onClick={()=>setCards(ele)} id='tab' style={{backgroundColor:ele==tab?'#0e141e':'#151d2d'}} >    
          {ele}
        </div>
      );
    })}
      </div>
    <div id='cards'>
  {
    // console.log(courses.courses)
    
    courses.courses.map((course)=>{
      return(
        <div id="card">
  <div>
    <h2>{course.heading}</h2>
    <p>{course.description}</p>
  </div>

  <div className="card-bottom">
    <div>
      <FaUserAlt size={14} />
      <span>{course.level}</span>
    </div>
    <div>
      <PiNotebookBold size={16} />
      <span>{course.lessionNumber} Lessons</span>
    </div>
  </div>
</div>
      )
    })
  }
    </div>

  </div>
);
}
