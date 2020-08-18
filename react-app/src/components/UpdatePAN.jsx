import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class UpdatePAN extends React.Component {
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
      Swal.fire("Updated!", "PAN has been updated.", "success");
    };

    Swal.fire({
      title: "Enter your PAN",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Enter your PAN!";
        } else if (value.length !== 10) {
          return "Enter your correct 10 digit PAN!";
        } else {
          this.setState({ isLoading: true });
          this.props.updateCustomerData(auth.currentUser.uid, {
            accounts: {
              savingAccount: {
                pan: value,
              },
            },
          });
          setTimeout(getUpdatedData, 1000);
        }
      },
    });
  };

  render() {
    return (
      <div>
        <button className="btn btn-sm btn-warning" onClick={this.handleUpdate}>
          {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Update"}
        </button>
      </div>
    );
  }
}

export default connect(null, { getCustomerData, updateCustomerData })(UpdatePAN);
