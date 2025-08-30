import React from "react";
// import Footer from "../components/Common/Footer";
import {ReviewSlider} from "../components/core/common/ReviewSlider";
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import ContactForm from "../components/core/ContactUsPage/ContactForm";
import Footer from "../components/core/common/Footer";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Top Section */}
      <div className="contact-main-container">
        {/* Contact Details */}
        <div className="contact-details-section">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <ContactForm />
        </div>
      </div>
<br />
      {/* Review Section */}
     
        <ReviewSlider />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
