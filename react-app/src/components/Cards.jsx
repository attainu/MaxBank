import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

import VisaCard from "./VisaCard";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  deleteCard = () => {
    const getUpdatedData = () => {
      this.props.getCustomerData(auth.currentUser.uid);
      this.setState({ isLoading: false });
      Swal.fire("Blocked!", "Card has been blocked.", "success");
    };

    if (auth.currentUser) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, block it!",
      }).then((result) => {
        if (result.value) {
          this.setState({ isLoading: true });
          this.props.updateCustomerData(auth.currentUser.uid, {
            card: null,
          });
          setTimeout(getUpdatedData, 1000);
        }
      });
    }
  };

  requestNewCard = () => {
    const getUpdatedData = () => {
      this.props.getCustomerData(auth.currentUser.uid);
      this.setState({ isLoading: false });
      Swal.fire("", "You new card has been issued.", "success");
    };

    if (auth.currentUser) {
      this.setState({ isLoading: true });
      this.props.updateCustomerData(auth.currentUser.uid, {
        card: {
          cardNumber: "4242 4242 4242 4242",
          balance: 65000,
        },
      });
      setTimeout(getUpdatedData, 1000);
    }
  };

  render() {
    const card = this.props.customerData.card;

    return (
      <div className="container-fluid p-4 bg-light rounded shadow">
        {card ? (
          <>
            <h4 className="text-info">Your active cards:</h4>
            <hr className="mb-5" />
          </>
        ) : (
          <h4 className="my-5 text-danger text-center">No Card is linked to your account!</h4>
        )}

        <>
          {card ? (
            <>
              <div className="row justify-content-center">
                <div className="col-lg-6 mb-4 p-0">
                  <div className="d-flex justify-content-center">
                    <VisaCard />
                  </div>
                </div>
                <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center">
                  <h5 className="text-info lead">Balance Left:</h5>
                  <h5 className="lead">₹{card.balance}</h5>
                </div>
              </div>
              <div className="container d-flex justify-content-center my-4">
                <button className="btn btn-lg btn-outline-danger" onClick={this.deleteCard}>
                  {this.state.isLoading ? <span className="spinner-border"></span> : "Block Card"}
                </button>
              </div>
            </>
          ) : (
            <div className="conatiner d-flex justify-content-center mb-5">
              <button className="btn btn-lg btn-outline-success" onClick={this.requestNewCard}>
                {this.state.isLoading ? <span className="spinner-border"></span> : "Request for a New Card"}
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
