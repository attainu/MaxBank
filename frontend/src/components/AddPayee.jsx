import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class AddPayee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payeeName: "",
      bankName: "",
      ifsc: "",
      isLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newPayee = {
      id: (Math.random() * 10000000000).toFixed(0),
      payeeName: this.state.payeeName,
      bankName: this.state.bankName,
      ifsc: this.state.ifsc,
    };

    this.setState({ isLoading: true });
    this.props.updateCustomerData(auth.currentUser.uid, {
      payeeList: [...this.props.customerData.payeeList, newPayee],
    });

    const getUpdatedData = () => {
      this.setState({ isLoading: false });
      Swal.fire("", "Payee Added Successfully!", "success");
      this.props.getCustomerData(auth.currentUser.uid);
    };
    setTimeout(getUpdatedData, 1000);
    this.setState({ payeeName: "", bankName: "", ifsc: "" });
  };

  render() {
    return (
      <div className="container-fluid" id="testing">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form className="p-3 d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="payeeName"
                className="form-control"
                placeholder="Name"
                required
                value={this.state.payeeName}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="bankName"
                className="form-control my-3"
                placeholder="Bank Name"
                required
                value={this.state.bankName}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="ifsc"
                minLength="10"
                maxLength="10"
                className="form-control"
                placeholder="10 digit IFSC"
                required
                value={this.state.ifsc}
                onChange={this.handleChange}
              />
              <p className="text-success lead my-3">{this.state.message}</p>
              <button type="submit" className="btn btn-info font-weight-bold">
                {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Add Payee"}
              </button>
            </form>
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

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(AddPayee);
