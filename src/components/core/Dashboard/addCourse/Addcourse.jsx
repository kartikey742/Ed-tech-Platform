import React from 'react'
import { RenderSteps } from './RenderSteps'
import CourseInformationForm from './courseInformation/CourseInformationForm'
export const AddCourse = () => {
  return (
    <div id='main-add-course'>

        <div id='upprcon'>
        <div id='textuploadtips'>
                <h1>Add Course</h1>
                
           
      
     </div>
     <div id='renderform' >
                    <RenderSteps></RenderSteps>
                </div> 
    </div>
        {/* <CourseInformationForm></CourseInformationForm> */}
    </div>
  )
}
