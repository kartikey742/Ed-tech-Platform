import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './courseInformation/CourseInformationForm'
import {CourseBuilderForm} from './courseBuilder/CourseBuilderForm'
import PublishCourse from './publishCourse'
export const RenderSteps = () => {
    const {step}=useSelector((state) => state.course)
    const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]
  return (
    <div id='render-form2'>
     

     <div id='notext'>

    {
  steps.map((item, i) =>
    <div id='noandtext' key={item.id}>
      <div id='dash'>

        {/* Circle */}
        <div
          id='no'
          style={{
            backgroundColor: step == item.id ? '#3D2A01' : '#2C333F',
            border: step == item.id ? '2px solid #FFD60A' : '2px solid #424854',
            color: step == item.id ? '#FFD60A' : '#999DAA'
          }}
        >
          {item.id < step ? (<FaCheck />) : (item.id)}
        </div>

        {/* Line */}
        {i != steps.length - 1 && (
          <div
            className="step-line"
            style={{
             
              height: '2px',
              backgroundColor: step > item.id ? '#FFD60A' : '#424854',
              margin: '0 10px'
            }}
          />
        )}
      
      </div>

      <br />

      {/* Title */}
      <div id='notext'>
        {item.title}
      </div>
    </div>
  )
}

  
    
  </div>
 
<br />
    {
      step==1 && <CourseInformationForm></CourseInformationForm>
    }
    {
      step==2 && <CourseBuilderForm></CourseBuilderForm>
    }
    {
      step==3 && <PublishCourse></PublishCourse>
    }
    </div>
  )
}
