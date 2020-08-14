import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class FundTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: "",
      amount: "",
      remarks: "",
      message: "",
      errorMessage: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { payee, remarks } = this.state;
    const amount = Number(this.state.amount);
    const existingBalance = this.props.customerData.accounts.savingAccount.balance;

    if (amount > 25000) {
      this.setState({
        errorMessage: "You can't transfer more than ₹25,000 in one go!",
      });
    } else {
      if (amount > existingBalance) {
        this.setState({
          errorMessage: `You don't have enough balance in you Saving Account to make this tranfer! Available Balance is ₹${existingBalance}`,
        });
      } else {
        this.setState({
          errorMessage: "",
        });

        const transaction = {
          paidTo: `${payee}`,
          amount: amount,
          remarks: `${remarks}`,
          time: new Date().toString().slice(4, -31),
        };

        const updatedData = {
          accounts: {
            savingAccount: {
              balance: existingBalance - amount,
            },
          },
          savingAccountTransactions: [...this.props.customerData.savingAccountTransactions, transaction],
        };

        this.props.updateCustomerData(auth.currentUser.uid, updatedData);
        const getUpdatedData = () => {
          this.props.getCustomerData(auth.currentUser.uid);
          this.setState({
            message: "Transfer Successful!",
            payee: "",
            amount: "",
            remarks: "",
          });
        };
        setTimeout(getUpdatedData, 1000);

        const resetMessage = () => {
          this.setState({
            message: "",
          });
        };
        setTimeout(resetMessage, 3000);
      }
    }
  };

  render() {
    if (this.props.customerData) {
      const { payeeList } = this.props.customerData;
      return (
        <div className="container-fluid bg-light rounded px-3 py-4">
          {payeeList.length > 0 ? (
            <div className="row justify-content-center">
              <div className="col-9">
                <h3 className="text-center text-info mb-3">Fund Transfer</h3>
                <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
                  <select className="form-control" name="payee" required value={this.state.payee} onChange={this.handleChange}>
                    <option value="" disabled hidden>
                      Select Payee
                    </option>
                    {payeeList.map((payee) => {
                      return (
                        <option key={payee.id} value={payee.payeeName}>
                          {payee.payeeName} - {payee.bankName}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="text"
                    name="amount"
                    pattern="\d*"
                    minLength="1"
                    maxLength="5"
                    className="form-control my-3"
                    placeholder="Amount (₹25,000 max.)"
                    required
                    value={this.state.amount}
                    onChange={this.handleChange}
                  />
                  <input
                    type="text"
                    name="remarks"
                    className="form-control"
                    placeholder="Remarks"
                    required
                    value={this.state.remarks}
                    onChange={this.handleChange}
                  />
                  <p className="text-success text-center lead mt-3">{this.state.message}</p>
                  <p className="text-danger text-center lead mb-3">{this.state.errorMessage}</p>
                  <button type="submit" className="btn btn-info">
                    Transfer
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <h4 className="text-danger mb-3">No Payee in your account!</h4>
              <h4 className="text-info">You can transfer the funds only to the added payee.</h4>
              <Link className="btn btn-info mt-3" to="/payments/manage-payee">
                Add Payee
              </Link>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="container-fluid bg-light rounded d-flex justify-content-center">
          <div className="spinner-border my-5" role="status" style={{ width: "5rem", height: "5rem" }}></div>
        </div>
      );
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(FundTransfer);
