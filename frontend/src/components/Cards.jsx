import React from "react";
import { connect } from "react-redux";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  deleteCard = () => {
    if (auth.currentUser) {
      this.setState({ isLoading: true });
      this.props.updateCustomerData(auth.currentUser.uid, {
        card: null,
      });
      const getUpdatedData = () => {
        this.props.getCustomerData(auth.currentUser.uid);
        this.setState({ isLoading: false });
      };
      setTimeout(getUpdatedData, 1000);
    }
  };

  requestNewCard = () => {
    if (auth.currentUser) {
      this.setState({ isLoading: true });
      this.props.updateCustomerData(auth.currentUser.uid, {
        card: {
          cardNumber: "4242 4242 4242 4242",
        },
      });
      const getUpdatedData = () => {
        this.props.getCustomerData(auth.currentUser.uid);
        this.setState({ isLoading: false });
      };
      setTimeout(getUpdatedData, 1000);
    }
  };

  render() {
    const card = this.props.customerData.card;

    return (
      <div className="container-fluid p-4">
        {card ? (
          <h4 className="mb-5 text-info">Cards linked to your account:</h4>
        ) : (
          <h4 className="mb-5 text-danger">No Card linked to your account!</h4>
        )}

        <>
          {card ? (
            <div className="px-5">
              <div className="container border border-success rounded shadow-sm pt-3">
                <p className="lead text-center">MaxBank VISA Debit</p>
                <hr />
                <p className="lead text-center">{card.cardNumber}</p>
              </div>
              <div className="container d-flex justify-content-center mt-5">
                <button className="btn btn-danger" onClick={this.deleteCard}>
                  {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Block/Delete Card"}
                </button>
              </div>
            </div>
          ) : (
            <div className="conatiner d-flex justify-content-center">
              <button className="btn btn-success" onClick={this.requestNewCard}>
                {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Request for a New Card"}
              </button>
            </div>
          )}
        </>
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
