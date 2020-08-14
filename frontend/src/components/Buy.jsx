import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: null,
    };
  }

  makePayment = async (token) => {
    const body = {
      token,
      product: this.props.product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    await fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        this.setState({ receipt: data.receipt_url });

        if (this.props.customerData.card) {
          const transaction = {
            id: data.balance_transaction,
            amount: data.amount / 100,
            // billing_details: data.billing_details,
            time: new Date().toString().slice(4, -31),
            description: data.description,
            receipt: data.receipt_url,
          };

          const updatedData = {
            card: {
              balance: this.props.customerData.card.balance - transaction.amount,
            },
            transactions: [...this.props.customerData.transactions, transaction],
          };

          this.props.updateCustomerData(auth.currentUser.uid, updatedData);
          const getUpdatedData = () => {
            this.props.getCustomerData(auth.currentUser.uid);
          };
          setTimeout(getUpdatedData, 1000);
        }
      })
      .catch((error) => {
        alert(error);
        // alert("Unexpected error occurred!\nDeducted amount will be refunded!");
      });
  };

  render() {
    const { name, price } = this.props.product;

    if (!this.state.receipt) {
      return (
        <StripeCheckout
          stripeKey="pk_test_51HCmJtFqMX5kB68LzQsHtBcokgPTCcU1f9Q3fZrTFlLYzmxYeum1YhvorPhDYokxtQwdxYa8skpAODJO8FsKEhsM00QDeZbkBW"
          token={this.makePayment}
          name={name}
          amount={price * 100}
          currency="INR"
          // shippingAddress
          locale="en"
          allowRememberMe={false}
        />
      );
    } else {
      return (
        <a href={this.state.receipt} target="_blank" rel="noopener noreferrer">
          Show Receipt
        </a>
      );
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(Buy);
