import React from "react";

import Buy from "./Buy";

class MobileRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planType: "prepaid",
      operator: "",
      mobileNumber: "",
      amount: "",
      errorMessage: "",
      allOk: false,
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    // this.setState({ errorMessage: "err" });
    this.setState({ allOk: true });
  };

  render() {
    return (
      <div className="container-fluid bg-light rounded px-3 pt-1 pb-3 mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form className="p-3" onSubmit={this.submitHandler}>
              <div className="form-check form-check-inline mr-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="planType"
                  id="prepaid"
                  value="prepaid"
                  checked={this.state.planType === "prepaid"}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="prepaid">
                  Prepaid
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="planType"
                  id="postpaid"
                  value="postpaid"
                  checked={this.state.planType === "postpaid"}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="postpaid">
                  Postpaid
                </label>
              </div>
              <div className="form-group mt-4 w-lg-50">
                <input
                  type="text"
                  name="mobileNumber"
                  pattern="\d*"
                  minLength="10"
                  maxLength="10"
                  className="form-control"
                  placeholder="10 digit mobile number"
                  required
                  value={this.state.mobileNumber}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  name="operator"
                  required
                  value={this.state.operator}
                  onChange={this.handleChange}
                >
                  <option value="" disabled hidden>
                    Select Operator
                  </option>
                  <option value="Jio">JIO</option>
                  <option value="Airtel">AIRTEL</option>
                  <option value="BSNL">BSNL</option>
                  <option value="Idea">IDEA</option>
                  <option value="Vodafone">VODAFONE</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="amount"
                  pattern="\d*"
                  maxLength="3"
                  className="form-control"
                  placeholder="Amount"
                  required
                  value={this.state.amount}
                  onChange={this.handleChange}
                />
              </div>
              <p className="text-danger lead m-2">{this.state.errorMessage}</p>
              <div className="w-100 d-flex justify-content-center">
                {!this.state.allOk ? (
                  <button type="submit" className="btn btn-info">
                    Proceed
                  </button>
                ) : (
                  <Buy
                    product={{
                      name: `${this.state.operator} ${this.state.planType} ${this.state.mobileNumber}`,
                      price: `${Number(this.state.amount)}`,
                    }}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileRecharge;
