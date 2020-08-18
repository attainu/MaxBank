import React, { Component } from "react";
import Swal from "sweetalert2";

import contactUsImg from "../images/contact-us.svg";

class ContactUsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      query: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire("Thanks!", "Your request was submitted successfully. We'll be in touch with you shortly.", "success");
    this.setState({ firstName: "", lastName: "", email: "", queryType: "", query: "" });
  };

  render() {
    const { firstName, lastName, email, queryType, query } = this.state;

    return (
      <div className="container py-4">
        <div className="row justify-content-around align-items-center">
          <div className="col-lg-6 d-flex justify-content-center mb-3 mb-lg-0">
            <img src={contactUsImg} alt="contact" className="img-fluid" style={{ height: "300px" }} />
          </div>

          <div className="col-lg-6">
            <form className="" onSubmit={this.handleSubmit}>
              <div className="form-row justify-content-center">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    className="form-control"
                    required
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    className="form-control"
                    required
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-row justify-content-center">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    className="form-control"
                    required
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <select name="queryType" value={queryType} className="custom-select" required onChange={this.handleChange}>
                    <option value="" disabled hidden>
                      Select Query Type
                    </option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Account Related Query<">Account Related Query</option>
                    <option value="Card Related Query">Card Related Query</option>
                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <textarea
                    name="query"
                    value={query}
                    className="form-control"
                    rows="4"
                    required
                    placeholder="Your queries ..."
                    minLength="10"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <button className="btn btn-outline-dark btn-block" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUsForm;
