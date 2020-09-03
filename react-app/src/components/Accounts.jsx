import React from "react";

import SavingAccount from "./SavingAccount";
import SavingAccountTransactions from "./SavingAccountTransactions";

class FundTransfer extends React.Component {
  render() {
    return (
      <>
        <div className="bg-light rounded p-2 shadow">
          <h3 className="text-center text-info mt-2">Saving Account</h3>
          <hr className="mb-3" />
          <div className="overflow-auto">
            <SavingAccount />
          </div>
        </div>
        <div className="bg-light rounded p-2 pt-4 mt-4 shadow">
          <SavingAccountTransactions />
        </div>
      </>
    );
  }
}

export default FundTransfer;
