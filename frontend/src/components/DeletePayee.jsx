import React from "react";
import { connect } from "react-redux";

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
    };

    const newPayeeList = this.props.customerData.payeeList.filter((payee) => payee.id !== this.props.payee.id);

    this.setState({ isLoading: true });
    this.props.updateCustomerData(auth.currentUser.uid, {
      payeeList: newPayeeList,
    });

    setTimeout(getUpdatedData, 1000);
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
