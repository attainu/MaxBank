import React from "react";

import SavingAccount from "./SavingAccount";
import OtherAccounts from "./OtherAccounts";

class FundTransfer extends React.Component {
  render() {
    return (
      <>
        <div className="bg-light rounded p-2">
          <h3 className="text-center text-info mb-4 mt-2">Saving Account</h3>
          <SavingAccount />
        </div>
        <div className="bg-light rounded p-2 mt-4">
          <h3 className="text-center text-info mb-4 mt-2">Other Accounts</h3>
          <OtherAccounts />
        </div>
      </>
    );
  }
}

export default FundTransfer;
