import React from "react";
import { connect } from "react-redux";

import UpdateBtn from "../components/UpdateBtn";

class SavingAccount extends React.Component {
  render() {
    const { savingAccount } = this.props.customerData.accounts;

    if (savingAccount) {
      return (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Opening Date</th>
              <th scope="col">Account Number</th>
              <th scope="col">Balance</th>
              <th scope="col">PAN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{savingAccount.openingDate}</td>
              <td>{savingAccount.accountNumber}</td>
              <td>₹{savingAccount.balance}</td>
              {savingAccount.pan ? (
                <td>{savingAccount.pan}</td>
              ) : (
                <td>
                  <UpdateBtn toUpdate="PAN" />
                </td>
              )}
            </tr>
          </tbody>
        </table>
      );
    } else {
      return <h4 className="text-danger">You don't have any saving account!</h4>;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps)(SavingAccount);
