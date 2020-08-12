import React from "react";

import Buy from "./Buy";

class MetroRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: "",
      cardNumber: "",
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
      <div className="container-fluid bg-light rounded px-3 py-1">
        <form className="p-3" onSubmit={this.submitHandler}>
          <div className="form-group">
            <select className="form-control" name="operator" required value={this.state.operator} onChange={this.handleChange}>
              <option value="" disabled hidden>
                Select Operator
              </option>
              <option value="Delhi-Metro">Delhi Metro</option>
              <option value="Hyderabad-Metro">Hyderabad Metro</option>
              <option value="Mumbai-Metro">Mumbai Metro</option>
            </select>
          </div>
          <div className="form-group w-lg-50">
            <input
              type="text"
              name="cardNumber"
              pattern="\d*"
              minLength="10"
              maxLength="10"
              className="form-control"
              placeholder="10 digit metro card number"
              required
              value={this.state.cardNumber}
              onChange={this.handleChange}
            />
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
          <div className="w-100 d-flex justify-content-end">
            {!this.state.allOk ? (
              <button type="submit" className="btn btn-info">
                Proceed
              </button>
            ) : (
              <Buy
                product={{
                  name: `${this.state.operator} ${this.state.cardNumber}`,
                  price: `${Number(this.state.amount)}`,
                }}
              />
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default MetroRecharge;
