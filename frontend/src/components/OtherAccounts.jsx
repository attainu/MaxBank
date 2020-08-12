import React from "react";
import { connect } from "react-redux";

class OtherAccounts extends React.Component {
  render() {
    const { otherAccounts } = this.props.customerData.accounts;

    if (otherAccounts.length > 0) {
      return <div>TODO</div>;
    } else {
      return <h4 className="text-danger text-center">Nothing here!</h4>;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps)(OtherAccounts);
