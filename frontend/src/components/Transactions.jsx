import React from "react";
import { connect } from "react-redux";

class Transactions extends React.Component {
  render() {
    const { transactions } = this.props.customerData;

    if (transactions.length > 0) {
      return (
        <div className="px-3 pt-4 pb-1 bg-light rounded overflow-auto">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Time</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.time}</td>
                    <td>{item.description}</td>
                    <td>₹{item.amount}</td>
                    <td>
                      <a href={item.receipt} target="_blank" rel="noopener noreferrer">
                        Receipt
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center bg-light rounded p-4">
          <h4 className="text-danger">No transactions yet!</h4>
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

export default connect(mapStateToProps)(Transactions);
