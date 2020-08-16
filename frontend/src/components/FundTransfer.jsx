import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class FundTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: "",
      amount: "",
      remarks: "",
      isLoading: false,
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
      Swal.fire("", "You can't transfer more than ₹25,000 in one go!", "warning");
      this.setState({
        amount: "",
      });
    } else if (amount === 0) {
      Swal.fire("", "Amount can't be 0!", "warning");
    } else {
      if (amount > existingBalance) {
        Swal.fire(
          `Available Balance: ₹${existingBalance}`,
          "You don't have enough balance in you Saving Account to make this tranfer!",
          "error"
        );
      } else {
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

        this.setState({ isLoading: true });
        this.props.updateCustomerData(auth.currentUser.uid, updatedData);
        const getUpdatedData = () => {
          this.props.getCustomerData(auth.currentUser.uid);
          this.setState({
            payee: "",
            amount: "",
            remarks: "",
            isLoading: false,
          });
          Swal.fire("Transfer Successful!", "", "success");
        };
        setTimeout(getUpdatedData, 1000);
      }
    }
  };

  render() {
    if (this.props.customerData) {
      const { payeeList } = this.props.customerData;
      return (
        <div className="container-fluid bg-light rounded px-3 py-4 shadow">
          {payeeList.length > 0 ? (
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <h3 className="text-center text-info mb-5">Fund Transfer</h3>
                <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
                  <select className="custom-select" name="payee" required value={this.state.payee} onChange={this.handleChange}>
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
                  <button type="submit" className="btn btn-info mt-4">
                    {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Transfer"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <h4 className="text-danger mb-3">No Payee in your account!</h4>
              <h5 className="text-info text-center">You can transfer the funds only to the added payee.</h5>
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
