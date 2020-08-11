import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../redux/actions/productActions";

class ProdCard extends Component {
  handleClick = (event) => {
    console.log("1", event.target.value);
    let prodname = "";
    if (event.target.value === "Debit") {
      prodname = "MaxBank Debit/ATM Card";
    } else prodname = "MaxBank Coral Credit Card";

    this.props.addProduct(Date.now().toString(), "Card", prodname);
  };

  render() {
    return (
      <div>
        <h3> Select from the following cards </h3>
        <ul>
          <li>
            <h5> MaxBank Debit/ATM Card </h5>
            <button className="ProdButton" value="Debit" onClick={this.handleClick}>
              APPLY
            </button>
          </li>
          <li>
            <h5> MaxBank Coral Credit Card </h5>
            <button className="ProdButton" value="Credit" onClick={this.handleClick}>
              APPLY
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(null, { addProduct })(ProdCard);
