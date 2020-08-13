import React from "react";
import { connect } from "react-redux";

import UpdateContact from "./UpdateContact";
import UpdateAddress from "./UpdateAddress";
import UpdateNominee from "./UpdateNominee";

class FundTransfer extends React.Component {
  render() {
    const { name, email, customerId, contactNumber, address, nominee } = this.props.customerData;

    return (
      <div className="jumbotron jumbotron-fluid p-3 bg-light">
        <div className="container">
          <h1 className="display-4 text-center">{name}</h1>
          <p className="lead text-center">{email}</p>
          <hr className="my-4"></hr>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="text-info lead">Customer ID:</td>
                <td>{customerId}</td>
              </tr>
              <tr>
                <td className="text-info lead">Contact Number:</td>
                {contactNumber ? (
                  <>
                    <td>
                      <p className="mb-2">{contactNumber}</p> <UpdateContact value="Change" />
                    </td>
                  </>
                ) : (
                  <td>
                    <UpdateContact value="Update" />
                  </td>
                )}
              </tr>
              <tr>
                <td className="text-info lead">Address:</td>
                {address ? (
                  <td>{address}</td>
                ) : (
                  <td>
                    <UpdateAddress />
                  </td>
                )}
              </tr>
              <tr>
                <td className="text-info lead">Nominee:</td>
                {nominee ? (
                  <td>
                    <p>
                      <span className="text-info">Name:</span> {nominee.name}
                    </p>
                    <p>
                      <span className="text-info">Age:</span> {nominee.age}
                    </p>
                    <p>
                      <span className="text-info">Relation:</span> {nominee.relation}
                    </p>
                  </td>
                ) : (
                  <td>
                    <UpdateNominee />
                  </td>
                )}
              </tr>
            </tbody>
          </table>
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

export default connect(mapStateToProps)(FundTransfer);
