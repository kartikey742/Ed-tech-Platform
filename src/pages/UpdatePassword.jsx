import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../services/operations/authAPI"


function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="updpass-container"> 
      {loading ? (
        <div className="updpass-spinner"></div>
      ) : (
        <div className="updpass-card">
          <h1 className="updpass-heading">Choose new password</h1>
          <p className="updpass-subtext">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={handleOnSubmit} className="updpass-form">
            <label className="updpass-label">
              <p className="updpass-label-text">
                New Password <sup className="updpass-required">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="updpass-input"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="updpass-toggle-icon"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </span>
            </label>

            <label className="updpass-label">
              <p className="updpass-label-text">
                Confirm Password <sup className="updpass-required">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="updpass-input"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="updpass-toggle-icon"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </span>
            </label>

            <button type="submit" className="updpass-btn">
              Reset Password
            </button>
          </form>

          <div className="updpass-backlink">
            <Link to="/login" className="updpass-backlink-text">
              <BiArrowBack /> Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
