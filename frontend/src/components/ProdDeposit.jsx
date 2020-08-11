import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../redux/actions/productActions";
import "../styles/ProdAccount.css";

class ProdDeposit extends Component {
  handleClick = (event) => {
    console.log("1", event.target.value);
    let prodname = "";
    if (event.target.value === "Fixed") {
      prodname = "Fixed Deposit";
    } else prodname = "Recurring Deposit";

    this.props.addProduct(Date.now().toString(), "Deposit", prodname);
  };

  render() {
    return (
      <div>
        <h3> Select from the following types of Deposits </h3>
        <ul>
          <li>
            <h5> Fixed Deposit </h5>
            <button className="ProdButton" value="Fixed" onClick={this.handleClick}>
              {" "}
              APPLY{" "}
            </button>
          </li>
          <li>
            <h5> Recurring Deposit </h5>
            <button className="ProdButton" value="Recurring" onClick={this.handleClick}>
              {" "}
              APPLY{" "}
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(null, { addProduct })(ProdDeposit);
