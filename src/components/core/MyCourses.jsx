import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../services/operations/courseDetailsAPI"
import IconBtn from "./common/IconBtn"
import Table from "./Table"



export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [tableLoading, setTableloading] = useState(false)

  useEffect(() => {
    
    const fetchCourses = async () => {
      setTableloading(true)
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
      setTableloading(false) 
    }
    fetchCourses()
  }, [token])

  return (
    <div className="myCourses__container">
      <div className="myCourses__header">
        <h1 className="myCourses__title">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {courses && <Table courses={courses} setCourses={setCourses} tableLoading={tableLoading} setTableloading={setTableloading}/>}
    </div>
  )
}
