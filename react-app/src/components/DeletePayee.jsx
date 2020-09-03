import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class DeletePayee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleDelete = () => {
    const getUpdatedData = () => {
      this.setState({ isLoading: false });
      this.props.getCustomerData(auth.currentUser.uid);
      Swal.fire("Removed!", "Payee has been removed.", "success");
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.value) {
        const newPayeeList = this.props.customerData.payeeList.filter((payee) => payee.id !== this.props.payee.id);
        this.setState({ isLoading: true });
        this.props.updateCustomerData(auth.currentUser.uid, {
          payeeList: newPayeeList,
        });
        setTimeout(getUpdatedData, 1000);
      }
    });
  };

  render() {
    return (
      <button className="btn btn-sm btn-danger" onClick={this.handleDelete}>
        {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Remove"}
      </button>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(DeletePayee);
