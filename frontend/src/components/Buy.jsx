import React from "react";
import StripeCheckout from "react-stripe-checkout";

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
        console.log(data);
        this.setState({ receipt: data.receipt_url });
      })
      .catch((error) => {
        alert("Unexpected error occurred!\nDeducted amount will be refunded!");
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
        >
          <button>Buy</button>
        </StripeCheckout>
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

export default Buy;
