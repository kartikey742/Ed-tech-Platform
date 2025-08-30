import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../services/operations/authAPI";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="forgot-container">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="form-wrapper">
          <h1 className="form-title">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="form-subtitle">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="form-label">
                <p className="label-text">
                  Email Address <sup className="required">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-input"
                />
              </label>
            )}
            <button type="submit" className="submit-button">
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="back-link">
            <Link to="/login" className="login-link">
              <BiArrowBack />
              <span>Back To Login</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
