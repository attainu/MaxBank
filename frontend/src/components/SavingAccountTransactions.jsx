import React from "react";
import { connect } from "react-redux";

class SavingAccountTransactions extends React.Component {
  render() {
    const { savingAccountTransactions } = this.props.customerData;

    return (
      <>
        <a className="btn btn-outline-secondary" data-toggle="collapse" href="#SATcollapse">
          Saving Account Transactions
        </a>
        <p className="mb-3"></p>
        <div className="collapse" style={{ overflowX: "auto" }} id="SATcollapse">
          {savingAccountTransactions.length > 0 ? (
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Time</th>
                  <th scope="col">Paid To</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {savingAccountTransactions.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.time}</td>
                      <td>{item.paidTo}</td>
                      <td>₹{item.amount}</td>
                      <td>{item.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h4 className="text-danger text-center mb-3">No Transactions yet!</h4>
          )}
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

export default connect(mapStateToProps)(SavingAccountTransactions);
