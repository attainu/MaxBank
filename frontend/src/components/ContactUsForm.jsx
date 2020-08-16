import React, { Component } from "react";

class ContactUsForm extends Component {
  render() {
    return (
      <form className="needs-validation" noValidate>
        <div className="form-row justify-content-center">
          <div className="col-md-4 mb-3">
            <input type="text" className="form-control" required placeholder="First Name" />
            <div className="invalid-feedback">Please enter your first name.</div>
          </div>
          <div className="col-md-4 mb-3">
            <input type="text" className="form-control" required placeholder="Last Name" />
            <div className="invalid-feedback">Please enter your last name.</div>
          </div>
        </div>
        <div className="form-row justify-content-center">
          <div className="col-md-4 mb-3">
            <input type="text" className="form-control" required placeholder="Email" />
            <div className="invalid-feedback">Please provide a valid email.</div>
          </div>
          <div className="col-md-4 mb-3">
            <select className="custom-select" required>
              <option selected disabled value="">
                Choose...
              </option>
              <option>...</option>
            </select>
            <div className="invalid-feedback">Please select a valid category.</div>
          </div>
          <div className="col-md-8 mb-3">
            <textarea className="form-control" rows="3" required placeholder="Your queries ..." minLength="10" />
            <div className="invalid-feedback">Your query must contain atleast 10 characters.</div>
          </div>
        </div>

        <div className="row justify-content-center">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    );
  }
}

export default ContactUsForm;
