import React from "react";
import { connect } from "react-redux";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class Cards extends React.Component {
  deleteCard = () => {
    if (auth.currentUser) {
      const data = {
        account: {
          card: null,
        },
      };

      const getUpdatedData = () => {
        this.props.getCustomerData(auth.currentUser.uid);
      };

      this.props.updateCustomerData(auth.currentUser.uid, data);
      setTimeout(getUpdatedData, 1000);
    }
  };

  requestNewCard = () => {
    if (auth.currentUser) {
      const data = {
        account: {
          card: {
            cardNumber: `4000 0035 6000 ${(Math.random() * 10000).toFixed(0)}`,
          },
        },
      };

      const getUpdatedData = () => {
        this.props.getCustomerData(auth.currentUser.uid);
      };

      this.props.updateCustomerData(auth.currentUser.uid, data);
      setTimeout(getUpdatedData, 1000);
    }
  };

  render() {
    const { card } = this.props.customerData.account;

    return (
      <div className="CardsContainer">
        {card ? (
          <>
            <h2>Card linked to your accounts</h2>
            <p>Card Number: {card.cardNumber}</p>
            <button onClick={this.deleteCard}>Block/Delete Card</button>
          </>
        ) : (
          <>
            <h2>No Card linked to your accounts!</h2>
            <button onClick={this.requestNewCard}>Request for New Card</button>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(Cards);
