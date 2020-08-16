import React from "react";

import AddPayee from "./AddPayee";
import ViewPayee from "./ViewPayee";

class ManagePayees extends React.Component {
  render() {
    return (
      <>
        <div className="bg-light rounded p-3 shadow">
          {/* <h3 className="text-center text-info mb-4 mt-2">Add Payee</h3> */}
          <AddPayee />
        </div>
        <div className="bg-light rounded p-3 mt-4 shadow">
          <h3 className="text-center text-info mb-4 mt-2">Payees List</h3>
          <ViewPayee />
        </div>
      </>
    );
  }
}

export default ManagePayees;
