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
      allOk: false,
      image: "",
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleOperator = (event) => {
    const value = event.target.value;
    this.setState({ operator: value });

    let imageUrl = "";
    if (value === "Jio") {
      imageUrl = "https://assetscdn1.paytm.com/images/catalog/operators/84x84/1548842919961.png";
    } else if (value === "Airtel") {
      imageUrl = "https://assetscdn1.paytm.com/images/catalog/operators/84x84/1555311132380.png";
    } else if (value === "BSNL") {
      imageUrl = "https://assetscdn1.paytm.com/images/catalog/operators/84x84/1555325713574.png";
    } else if (value === "Idea" || value === "Vodafone") {
      imageUrl = "https://assetscdn1.paytm.com/images/catalog/operators/84x84/1589949718136.png";
    }
    this.setState({ image: imageUrl });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ allOk: true });
  };

  handleReset = () => {
    this.setState({ planType: "prepaid", operator: "", mobileNumber: "", amount: "", allOk: false, image: "" });
  };

  render() {
    return (
      <div className="container-fluid bg-light rounded px-3 pt-1 pb-4 mt-3">
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
                  style={{ width: "20px", height: "20px" }}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="prepaid" style={{ fontSize: "1.2rem" }}>
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
                  style={{ width: "20px", height: "20px" }}
                  onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="postpaid" style={{ fontSize: "1.2rem" }}>
                  Postpaid
                </label>
              </div>

              <input
                type="text"
                name="mobileNumber"
                pattern="\d*"
                minLength="10"
                maxLength="10"
                className="form-control form-control-lg mt-3"
                placeholder="10 digit mobile number"
                required
                value={this.state.mobileNumber}
                onChange={this.handleChange}
              />

              <select
                className="custom-select custom-select-lg my-3"
                name="operator"
                required
                value={this.state.operator}
                onChange={this.handleOperator}
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

              <input
                type="text"
                name="amount"
                pattern="\d*"
                minLength="2"
                maxLength="3"
                className="form-control form-control-lg"
                placeholder="Amount"
                required
                value={this.state.amount}
                onChange={this.handleChange}
              />

              <div className="w-100 d-flex justify-content-center mt-4">
                {!this.state.allOk ? (
                  <button type="submit" className="btn btn-lg btn-outline-dark px-5">
                    Proceed
                  </button>
                ) : (
                  <Buy
                    product={{
                      name: `${this.state.operator} ${this.state.planType} ${this.state.mobileNumber}`,
                      price: `${Number(this.state.amount)}`,
                    }}
                    reset={this.handleReset}
                    image={this.state.image}
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
