import React from "react";
import { connect } from "react-redux";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class Cards extends React.Component {
  deleteCard = () => {
    if (auth.currentUser) {
      this.props.updateCustomerData(auth.currentUser.uid, {
        card: null,
      });
      const getUpdatedData = () => {
        this.props.getCustomerData(auth.currentUser.uid);
      };
      setTimeout(getUpdatedData, 1000);
    }
  };

  requestNewCard = () => {
    if (auth.currentUser) {
      this.props.updateCustomerData(auth.currentUser.uid, {
        card: {
          cardNumber: "4242 4242 4242 4242",
        },
      });
      const getUpdatedData = () => {
        this.props.getCustomerData(auth.currentUser.uid);
      };
      setTimeout(getUpdatedData, 1000);
    }
  };

  render() {
    const card = this.props.customerData.card;

    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 mb-4">
          <h4>Cards linked to your account:</h4>
        </div>

        <div className="col-lg-3">
          {card ? (
            <div className="conatiner">
              <div className="container border border-success rounded shadow-sm pt-3">
                <p className="lead text-center">MaxBank VISA Debit</p>
                <hr />
                <p className="lead text-center">{card.cardNumber}</p>
              </div>
              <div className="container d-flex justify-content-center mt-4">
                <button className="btn btn-danger" onClick={this.deleteCard}>
                  Block/Delete Card
                </button>
              </div>
            </div>
          ) : (
            <div className="conatiner">
              <h4 className="text-danger">No Card linked to your account!</h4>
              <button className="btn btn-success mt-4" onClick={this.requestNewCard}>
                Request for a New Card
              </button>
            </div>
          )}
        </div>
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
