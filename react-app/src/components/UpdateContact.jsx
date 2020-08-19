import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class UpdateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleUpdate = () => {
    const getUpdatedData = () => {
      this.setState({ isLoading: false });
      this.props.getCustomerData(auth.currentUser.uid);
      Swal.fire("Updated!", "Contact number has been updated.", "success");
    };

    Swal.fire({
      text: "Enter your 10 digit contact number",
      input: "text",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      inputValidator: (value) => {
        if (!value) {
          return "Enter your contact number!";
        } else if (value.length !== 10) {
          return "Enter your correct 10 digit contact number!";
        } else if (value === this.props.customerData.contactNumber) {
          return "This number is already registered!";
        } else {
          this.setState({ isLoading: true });
          this.props.updateCustomerData(auth.currentUser.uid, {
            contactNumber: value,
          });
          setTimeout(getUpdatedData, 1000);
        }
      },
    });
  };

  render() {
    return (
      <div>
        <button className="btn btn-sm btn-outline-warning" onClick={this.handleUpdate}>
          {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : `${this.props.value}`}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(UpdateContact);
