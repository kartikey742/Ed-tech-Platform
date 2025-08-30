import { useEffect, useState } from "react"
import OtpInput from "react-otp-input"
import { Link, useNavigate } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import { RxCountdownTimer } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { sendOtp, signUp } from "../services/operations/authAPI"


function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const { signupData, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!signupData) {
      navigate("/signup")
    }
   
  }, [])

  const handleVerifyAndSignup = (e) => {
    e.preventDefault()
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
  }

  return (
    <div className="verifyemail-container">
      {loading ? (
        <div className="verifyemail-spinner"></div>
      ) : (
        <div className="verifyemail-box">
          <h1 className="verifyemail-heading">Verify Email</h1>
          <p className="verifyemail-subtext">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="verifyemail-otpinput"
                  width={48}
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
                
              }}
            />
            <button type="submit" className="verifyemail-submit-btn">
              Verify Email
            </button>
          </form>
          <div className="verifyemail-footer">
            <Link to="/signup">
              <p className="verifyemail-back-link">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="verifyemail-resend-btn"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
