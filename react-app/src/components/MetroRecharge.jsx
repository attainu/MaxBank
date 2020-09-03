import React from "react";

import Buy from "./Buy";

class MetroRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: "",
      cardNumber: "",
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
    if (value === "Delhi-Metro") {
      imageUrl = "https://assetscdn1.paytm.com/images/catalog/operators/84x84/1564040109339.png";
    } else if (value === "Hyderabad-Metro") {
      imageUrl = "https://assetscdn1.paytm.com/images/catalog/operators/84x84/1564040144453.png";
    } else if (value === "Mumbai-Metro") {
      imageUrl = "https://assetscdn1.paytm.com/images/catalog/operators/84x84/1564040078583.png";
    }
    this.setState({ image: imageUrl });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ allOk: true });
  };

  handleReset = () => {
    this.setState({ operator: "", cardNumber: "", amount: "", allOk: false, image: "" });
  };

  render() {
    return (
      <div className="container-fluid bg-light rounded px-3 pt-1 pb-4 mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form className="p-3" onSubmit={this.submitHandler}>
              <select
                className="custom-select custom-select-lg"
                name="operator"
                required
                value={this.state.operator}
                onChange={this.handleOperator}
              >
                <option value="" disabled hidden>
                  Select Operator
                </option>
                <option value="Delhi-Metro">Delhi Metro</option>
                <option value="Hyderabad-Metro">Hyderabad Metro</option>
                <option value="Mumbai-Metro">Mumbai Metro</option>
              </select>

              <input
                type="text"
                name="cardNumber"
                pattern="\d*"
                minLength="10"
                maxLength="10"
                className="form-control my-3 form-control-lg"
                placeholder="10 digit metro card number"
                required
                value={this.state.cardNumber}
                onChange={this.handleChange}
              />

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
                      name: `${this.state.operator} ${this.state.cardNumber}`,
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

export default MetroRecharge;
