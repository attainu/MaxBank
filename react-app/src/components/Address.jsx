import React from "react";

const Address = () => {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-4 text-center my-auto">
          <h2>Address</h2>
          <hr />
          <p className="mt-3">6, Sansad Marg,</p>
          <p>Sansad Marg Area,</p>
          <p>New Delhi, Delhi 110001</p>
        </div>

        <div className="col-lg-8 mt-3 mt-md-3 mt-lg-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28014.397766187936!2d77.17951448539634!3d28.63576407463962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b49e1af447%3A0xe305cafe1145f77d!2sReserve%20Bank%20Of%20India!5e0!3m2!1sen!2sin!4v1597596183240!5m2!1sen!2sin"
            width="100%"
            height="300px"
            frameBorder="0"
            style={{ border: "none" }}
            tabIndex="0"
            title="address"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Address;
