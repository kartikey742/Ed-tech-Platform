import React from "react";
import ContactUsForm from "./ContactUsForm";


const ContactForm = () => {
  return (
    <div className="contact-form-container">
      <h1 className="contact-form-title">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="contact-form-description">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="contact-form-inner">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
