import React from "react";
import { connect } from "react-redux";

import UpdateContact from "./UpdateContact";
import UpdateAddress from "./UpdateAddress";
import UpdateNominee from "./UpdateNominee";

class FundTransfer extends React.Component {
  render() {
    const { name, email, customerId, contactNumber, address, nominee } = this.props.customerData;

    return (
      <div className="jumbotron jumbotron-fluid p-3 bg-light rounded shadow">
        <div className="container">
          <h1 className="display-4 text-center">{name}</h1>
          <p className="lead text-center mb-5">{email}</p>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="text-info lead">Customer ID:</td>
                    <td className="lead">{customerId}</td>
                  </tr>
                  <tr>
                    <td className="text-info lead">Contact Number:</td>
                    {contactNumber ? (
                      <>
                        <td className="lead">
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
                      <td className="lead">{address}</td>
                    ) : (
                      <td>
                        <UpdateAddress />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td className="text-info lead">Nominee:</td>
                    {nominee ? (
                      <td className="lead">
                        <p>
                          <span className="text-primary">Name:</span> {nominee.name}
                        </p>
                        <p>
                          <span className="text-primary">Age:</span> {nominee.age}
                        </p>
                        <p>
                          <span className="text-primary">Relation:</span> {nominee.relation}
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
