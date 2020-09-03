import React from "react";
import { connect } from "react-redux";

class SavingAccount extends React.Component {
  render() {
    const { fixedDeposits } = this.props.customerData.accounts;

    if (fixedDeposits.length > 0) {
      return (
        <div className="overflow-auto">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Opening Date</th>
                <th scope="col">FD Account Number</th>
                <th scope="col">Scheme</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {fixedDeposits.map((fd, index) => {
                return (
                  <tr key={fd.accountNumber}>
                    <th scope="row">{index + 1}</th>
                    <td>{fd.date}</td>
                    <td>{fd.accountNumber}</td>
                    <td>{fd.scheme}</td>
                    <td>₹{fd.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h5 className="text-danger text-center">You don't have any FD!</h5>;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps)(SavingAccount);
