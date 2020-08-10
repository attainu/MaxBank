import React from "react";
import { connect } from "react-redux";

class Accounts extends React.Component {
  render() {
    const { savingAccount, currentAccount } = this.props.customerData.account;

    return (
      <div className="AccountsDetailsContainer">
        <div className="SavingAccountContainer">
          <h2>Saving Account</h2>
          {savingAccount ? (
            <>
              <p>Account Number: {savingAccount.accountNumber}</p>
              <p>Balance: {savingAccount.balance}</p>
            </>
          ) : (
            <p>No data available!</p>
          )}
        </div>
        <div className="CurrentAccountContainer">
          <h2>Current Account</h2>
          {currentAccount ? (
            <>
              <p>Account Number: {currentAccount.accountNumber}</p>
              <p>Balance: {currentAccount.balance}</p>
            </>
          ) : (
            <p>No data available!</p>
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

export default connect(mapStateToProps)(Accounts);
