import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

import config from "../config";

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: null,
      isLoading: false,
    };
  }

  makePayment = async (token) => {
    this.setState({ isLoading: true });
    const body = {
      token,
      product: this.props.product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    await fetch(`/api`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        this.setState({ isLoading: false });
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
        this.setState({ isLoading: false });
        Swal.fire("", "We can't process this transaction right now. Please try later.", "error");
      });
  };

  render() {
    const { name, price } = this.props.product;
    const { isLoading, receipt } = this.state;

    if (isLoading) {
      return <span className="spinner-border"></span>;
    } else {
      if (!receipt) {
        return (
          <StripeCheckout
            stripeKey={config.stripePublishKey}
            token={this.makePayment}
            name={name}
            amount={price * 100}
            currency="INR"
            // shippingAddress
            locale="en"
            allowRememberMe={false}
            image={this.props.image}
          >
            <button id="pay-with-card" className="btn btn-lg btn-outline-dark px-5">
              Proceed
            </button>
          </StripeCheckout>
        );
      } else {
        return (
          <div>
            <a
              href={this.state.receipt}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-outline-success mr-5"
            >
              Show Receipt
            </a>
            <button className="btn btn-lg btn-outline-danger" onClick={this.props.reset}>
              Reset
            </button>
          </div>
        );
      }
    }
  }

  componentDidMount() {
    const payBtn = document.getElementById("pay-with-card");
    if (payBtn) {
      payBtn.click();
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(Buy);
