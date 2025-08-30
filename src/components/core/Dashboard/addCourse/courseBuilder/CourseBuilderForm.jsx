import React from 'react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from '../../../common/IconBtn'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse,setEditCourse } from '../../../../../slices/courseSlice'
import { setStep } from '../../../../../slices/courseSlice'
import  NestedView  from './NestedView'
export const CourseBuilderForm = () => {
    const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch() 
  
  const onSubmit=async(data)=>{
   
    
    setLoading(true)
    let result
    if(editSectionName){
      result=await updateSection({
        sectionName:data.sectionName,
         sectionId: editSectionName,
          courseId: course._id,
      },token)
    }
    else{
      result=await createSection({
        sectionName: data.sectionName,
          courseId: course._id,
      },token)
    }
    console.log(result);
    
    if(result){
      console.log(result);
      
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
     
    }
    setLoading(false)
  }
  const cancelEdit=()=>{
    setEditSectionName(null)
    setValue('sectionName',"")
  }
  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }
  return (
    <div id='mainformbuilder'>
      {/* {console.log('hi')} */}
      
      <h3>Course Builder</h3>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label for='sectionName'>Section Name</label>
        <br />
        <input id='sectionName'
        placeholder='Add a section to build your course'
        disabled={loading}
        {...register('sectionName',{required:true})}
        >
        </input>
        {errors.sectionName && <span>Section name is required</span>}
          </div>
          <div>
            <IconBtn
              type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
            </IconBtn>
              <br />
            {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>)}
          </div>
      </form>
      {course?.courseContent?.length>0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
      )}
      <br />
      <div id='bthbtn'>
        <button id='bt' onClick={goBack}>Back</button>
       <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
        </div>
    </div>
  )
}
