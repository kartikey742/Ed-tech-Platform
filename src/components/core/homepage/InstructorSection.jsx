import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { CTAButton } from './button'
import { HighlightText } from './highlight'
import {FaArrowRight} from "react-icons/fa";
export const InstructorSection = () => {
  return (
    <div id='InstructorSection'>
        {/* <div style={{width:'50%'}}>
        </div> */}
        <img  id='instructor' src={Instructor}></img>

        <div id='instdiv'>
            <div>

        <h1 style={{color:'white'}}>Become an <br></br><HighlightText text={'instructor'}></HighlightText></h1>
        <p id='instructortext'>Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.</p>
            </div>
              <CTAButton active={true} linkto={'signup'}>
                          <div id="CTA">
                          Start teaching today
                          <FaArrowRight></FaArrowRight>
                          </div>
                        </CTAButton>
        </div>
    </div>
  )
}
