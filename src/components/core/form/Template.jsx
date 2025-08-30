import { useSelector } from "react-redux"
import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="template-container">
      {loading ? (
        <div className="template-spinner"></div>
      ) : (
        <div className="template-wrapper">
          {/* Left Form Section */}
          <div className="template-left">
            <h1 className="template-title">{title}</h1>
            <p className="template-description">
              <span className="template-desc1">{description1}</span>{" "}
              <span className="template-desc2">{description2}</span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          {/* Right Image Section */}
          <div className="template-right">
            <img
              src={frameImg}
              alt="Pattern Frame"
              className="template-frame"
              loading="lazy"
            />
            <img
              src={image}
              alt="Main Visual"
              className="template-main-image"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
