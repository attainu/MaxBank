import React from "react";

import ContactUsForm from "../components/ContactUsForm";
import Address from "../components/Address";

const ContactUs = () => {
  return (
    <div className="ContactUsPage">
      <div className="container bg-light rounded shadow mb-4">
        <ContactUsForm />
      </div>

      <div className="container bg-light rounded shadow">
        <Address />
      </div>
    </div>
  );
};

export default ContactUs;
