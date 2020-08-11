import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../redux/actions/productActions";

import "../styles/ProdAccount.css";

class ProdAccount extends Component {
  handleClick = (event) => {
    console.log("1", event.target.value);
    let prodname = "";
    if (event.target.value === "NPS") {
      prodname = "NPS Plus Savings Account";
    } else prodname = "Gold Savings Account";

    this.props.addProduct(Date.now().toString(), "Account", prodname);
  };

  render() {
    return (
      <div>
        <h3> Select from the following types of Accounts </h3>
        <ul>
          <li>
            <h5> NPS Plus Savings Account </h5>
            <button className="ProdButton" value="NPS" onClick={this.handleClick}>
              APPLY
            </button>
          </li>
          <li>
            <h5> Gold Savings Account </h5>
            <button className="ProdButton" value="Gold" onClick={this.handleClick}>
              APPLY
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(null, { addProduct })(ProdAccount);
