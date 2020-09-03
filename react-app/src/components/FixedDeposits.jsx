import React from "react";

import MyFD from "./MyFD";
import ApplyForFD from "./ApplyForFD";

class FixedDeposits extends React.Component {
  render() {
    return (
      <>
        <div className="bg-light rounded p-2 shadow">
          <h3 className="text-center text-info mt-2">My Fixed Deposits</h3>
          <hr className="mb-3" />
          <MyFD />
        </div>
        <div className="bg-light rounded p-2 pt-4 mt-4 shadow">
          <ApplyForFD />
        </div>
      </>
    );
  }
}

export default FixedDeposits;
