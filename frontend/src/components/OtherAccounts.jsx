import React from "react";
import { connect } from "react-redux";

class OtherAccounts extends React.Component {
  render() {
    const { otherAccounts } = this.props.customerData.accounts;

    return (
      <div className="AccountsDetailsContainer">
        <div className="SavingAccountContainer">
          {otherAccounts.length > 0 ? <div>other accounts TODO</div> : <h4 className="text-danger">Nothing here!</h4>}
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

export default connect(mapStateToProps)(OtherAccounts);
