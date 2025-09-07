import React, { useEffect,useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import  InstructorChart  from './InstructorChart'
export const Instructor = () => {
const [loading,setLoading]=useState(false)
const [instructorData,setInstructorData]=useState(null)
const [courses,setCourses]=useState([])
  const token=useSelector((state)=>state.auth.token)
  const user=useSelector((state)=>state.profile.user)
  useEffect(()=>{
    const getCoursesWithStats=async()=>{
      setLoading(true)
      const instructorApiData=await getInstructorData(token)
      const result=await fetchInstructorCourses(token)
      console.log(instructorApiData);
      if(instructorApiData.length>0){
        setInstructorData(instructorApiData)
      }
      if(result){
        setCourses(result)
      }
      setLoading(false)
      
    }
    getCoursesWithStats()
  },[])
 const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
// console.log("Instructor Data for Income:", instructorData);
// console.log("Courses Data for Students:", courses);

  return (
    <div id='maininstdash'>  
    <br />   
      {
        loading?(<div className='spinner'></div>):
        <>
      <h1>Hi {user.firstName} 👋</h1>
      <h2>Let's start something new</h2>
      <br/>
        {courses.length>0?(
          <div id='instructorChartDiv'>
            <div id='horizontal'>
            {totalAmount>0 || totalStudents>0?(<InstructorChart courses={instructorData}></InstructorChart>):
            (
              <div>
              <p>Visualize</p>
              <p>Not Enough Data To Visualize</p>
              </div>
            )}
            <div id='stats'>
            <p style={{fontWeight:'bolder'}}>Statistics</p>
            <br />
            <p>Total Courses</p>
            <h2>{courses.length}</h2>
            <br />
            <p>Total Students</p>
            <h2>{totalStudents}</h2>
            <br />
            <p>Total Income</p>
            <h2>{totalAmount}</h2>
            </div>
            </div>
            <div id='cardsdiv'>
              <div id='viewCourses' >
            <p style={{fontWeight:'bolder'}}>Your courses</p>
            <Link to='/dashboard/my-courses'>
            <p style={{color:'rgb(255, 214, 10)'}}>View All</p>
            </Link>
              </div>
            <div id='allcards'>
              {
                courses.slice(0,3).map((course)=>(
                  <div id='instcard'>
                    <img id='instimg' src={course.thumbNail}></img>
                    <p>{course.courseName}</p>
                    <div id='cardcontent'>
                    <p>{course.studentsEnrolled.length} students</p>
                    <p>|</p>
                    <p>Rs. {course.price}</p>
                    </div>
                  </div>
                ))
              }
              </div>
            </div>
          </div>
        ):
        (
          <div>
            <p>You Have Not Created Any Coursess Yet</p>
              <Link to="/dashboard/add-course">
            <p>
              Create a course
            </p>
          </Link>
          </div>
        )}
      </>
      }
    </div>
  )
}
