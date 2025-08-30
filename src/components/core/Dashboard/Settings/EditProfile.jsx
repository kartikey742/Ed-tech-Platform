import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../common/IconBtn"


const genders = ["Male", "Female", "Trans-Gender", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} className="edit-profile-form">
      <div className="profile-section">
        <h2 className="profile-title">Profile Information</h2>
        
        {/* First & Last Name */}
        <div className="profile-row">
          <div className="input-group">
            <label htmlFor="firstName" className="label-style">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="forminput"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && <span className="error-text">Please enter your first name.</span>}
          </div>

          <div className="input-group">
            <label htmlFor="lastName" className="label-style">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="forminput"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && <span className="error-text">Please enter your last name.</span>}
          </div>
        </div>

        {/* Date of Birth & Gender */}
        <div className="profile-row">
          <div className="input-group">
            <label htmlFor="dateOfBirth" className="label-style">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              className="forminput"
              {...register("dateOfBirth", {
                required: { value: true, message: "Please enter your Date of Birth." },
                max: { value: new Date().toISOString().split("T")[0], message: "Date of Birth cannot be in the future." }
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth.message}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="gender" className="label-style">Gender</label>
            <select
              id="gender"
              className="forminput"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
            {errors.gender && <span className="error-text">Please select your gender.</span>}
          </div>
        </div>

        {/* Contact & About */}
        <div className="profile-row">
          <div className="input-group">
            <label htmlFor="contactNumber" className="label-style">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="Enter contact number"
              className="forminput"
              {...register("contactNumber", {
                required: { value: true, message: "Please enter your Contact Number." },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && <span className="error-text">{errors.contactNumber.message}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="about" className="label-style">About</label>
            <input
              type="text"
              id="about"
              placeholder="Enter bio details"
              className="forminput"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && <span className="error-text">Please enter your About.</span>}
          </div>
        </div>
      </div>
<br />
      <div className="action-buttons">
        <button onClick={() => navigate("/dashboard/my-profile")} className="cancel-btn">Cancel</button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  )
}
