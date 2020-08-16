import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class ApplyForFD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAccount: "",
      scheme: "",
      amount: "",
      isLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(this.state.amount);
    const existingBalance = this.props.customerData.accounts.savingAccount.balance;

    if (amount < 25000) {
      Swal.fire("", "Minimum amount to open a new FD is ₹25,000!", "warning");
    } else {
      if (amount > existingBalance) {
        Swal.fire(
          `Available Balance: ₹${existingBalance}`,
          "You don't have enough balance in you Saving Account to open this FD!",
          "error"
        );
      } else {
        const newFD = {
          accountNumber: (Math.random() * 100000000)
            .toFixed(0)
            .replace(/[^\dA-Z]/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim(),
          amount: amount,
          scheme: this.state.scheme,
          date: new Date().toString().slice(4, -40),
        };

        const transaction = {
          paidTo: "FD opened",
          amount: amount,
          remarks: this.state.scheme,
          time: new Date().toString().slice(4, -31),
        };

        const updatedData = {
          accounts: {
            fixedDeposits: [...this.props.customerData.accounts.fixedDeposits, newFD],
            savingAccount: {
              balance: existingBalance - amount,
            },
          },
          savingAccountTransactions: [...this.props.customerData.savingAccountTransactions, transaction],
        };

        this.setState({ isLoading: true });
        this.props.updateCustomerData(auth.currentUser.uid, updatedData);
        const getUpdatedData = () => {
          this.props.getCustomerData(auth.currentUser.uid);
          this.setState({
            fromAccount: "",
            scheme: "",
            amount: "",
            isLoading: false,
          });
          Swal.fire("", "Your new FD is live now.", "success");
        };
        setTimeout(getUpdatedData, 1000);
      }
    }
  };

  render() {
    const { accountNumber } = this.props.customerData.accounts.savingAccount;

    return (
      <>
        <a className="btn btn-outline-info" data-toggle="collapse" href="#SATcollapse">
          Apply for a new FD
        </a>
        <p className="mb-3"></p>
        <div className="collapse" id="SATcollapse">
          <div className="container-fluid mb-3">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
                  <select
                    className="custom-select custom-select-lg"
                    name="fromAccount"
                    required
                    value={this.state.fromAccount}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled hidden>
                      Select Account
                    </option>
                    <option value={accountNumber}>{accountNumber}</option>
                  </select>

                  <select
                    className="custom-select custom-select-lg my-3"
                    name="scheme"
                    required
                    value={this.state.scheme}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled hidden>
                      Select Scheme
                    </option>
                    <option value="Cumulative Interest Reinvestment">Cumulative Interest Reinvestment</option>
                    <option value="Monthly Interest Payment">Monthly Interest Payment</option>
                    <option value="Quarterly Interest Payment">Quarterly Interest Payment</option>
                  </select>

                  <input
                    type="text"
                    name="amount"
                    pattern="\d*"
                    minLength="1"
                    maxLength="10"
                    className="form-control form-control-lg"
                    placeholder="FD Amount"
                    required
                    value={this.state.amount}
                    onChange={this.handleChange}
                  />
                  <button type="submit" className="btn btn-lg btn-outline-info mt-4">
                    {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Proceed"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(ApplyForFD);
