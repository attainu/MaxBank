import React from "react";

import AddPayee from "./AddPayee";
import ViewPayee from "./ViewPayee";

class ManagePayees extends React.Component {
  render() {
    return (
      <>
        <div className="bg-light rounded p-3 shadow">
          <AddPayee />
        </div>
        <div className="bg-light rounded p-3 mt-4 shadow">
          <h3 className="text-center text-info">Payees List</h3>
          <hr className="" />
          <ViewPayee />
        </div>
      </>
    );
  }
}

export default ManagePayees;
