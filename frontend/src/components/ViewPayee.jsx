import React from "react";
import { connect } from "react-redux";

import DeletePayee from "./DeletePayee";

class ViewPayee extends React.Component {
  render() {
    const { payeeList } = this.props.customerData;
    return (
      <div className="container-fluid" id="testing">
        <div className="row justify-content-center">
          <div className="col overflow-auto">
            {payeeList.length > 0 ? (
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">IFSC</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {payeeList.map((payee, index) => {
                    return (
                      <tr key={payee.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{payee.payeeName}</td>
                        <td>{payee.bankName}</td>
                        <td>{payee.ifsc}</td>
                        <td>
                          <DeletePayee payee={payee} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <>
                <hr className="my-2" />
                <h4 className="text-warning text-center">You have't added any payee!</h4>
              </>
            )}
          </div>
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

export default connect(mapStateToProps)(ViewPayee);
