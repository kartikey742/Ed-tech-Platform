import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getFullDetailsOfCourse } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../../slices/courseSlice"
import {RenderSteps} from "../RenderSteps"



export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  console.log(courseId);
  
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    })()
  }, [courseId, token, dispatch])

  if (loading) {
    return (
      <div className="editCourse__loading-container">
        <div className="editCourse__spinner"></div>
      </div>
    )
  }

  return (
    <div className="editCourse__container">
      <h1 className="editCourse__title">Edit Course</h1>
      <div className="editCourse__content">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="editCourse__not-found">Course not found</p>
        )}
      </div>
    </div>
  )
}
