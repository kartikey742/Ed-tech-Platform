import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";


const ContactFormSection = () => {
  return (
    <div className="contact-section-wrapper">
      <h1 className="contact-section-heading">Get in Touch</h1>
      <p className="contact-section-subtext">
        We'd love to hear from you. Please fill out this form.
      </p>
      <div className="contact-section-form-wrapper">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
