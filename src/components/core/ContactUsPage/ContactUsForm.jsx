import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiConnector"
import { contactusEndpoint } from "../../../services/apis"


const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form className="contact-form" onSubmit={handleSubmit(submitContactForm)}>
      <div className="contact-row">
        <div className="contact-field">
          <label htmlFor="firstname" className="contact-label">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="contact-input"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="contact-error">Please enter your name.</span>
          )}
        </div>
        <div className="contact-field">
          <label htmlFor="lastname" className="contact-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="contact-input"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="email" className="contact-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="contact-input"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="contact-error">Please enter your Email address.</span>
        )}
      </div>

      <div className="contact-field">
        <label htmlFor="phonenumber" className="contact-label">
          Phone Number
        </label>
        <div className="contact-phone-group">
          <select
            className="contact-select"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code} - {ele.country}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            className="contact-input contact-phone-input"
            {...register("phoneNo", {
              required: { value: true, message: "Please enter your Phone Number." },
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="contact-error">{errors.phoneNo.message}</span>
        )}
      </div>

      <div className="contact-field">
        <label htmlFor="message" className="contact-label">
          Message
        </label>
        <textarea
          id="message"
          rows="7"
          placeholder="Enter your message here"
          className="contact-textarea"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="contact-error">Please enter your Message.</span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`contact-button ${!loading && "hoverable"}`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
