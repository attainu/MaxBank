import React from "react";

import MobileRecharge from "./MobileRecharge";
import MetroRecharge from "./MetroRecharge";
import DthRecharge from "./DthRecharge";

class Recharge extends React.Component {
  render() {
    return (
      <div className="bg-light rounded">
        <nav>
          <div className="nav nav-tabs nav-pills h5 nav-justified" role="tablist">
            <a className="nav-item nav-link active py-3" data-toggle="tab" href="#mobile" role="tab">
              Mobile Recharge
            </a>
            <a className="nav-item nav-link py-3" data-toggle="tab" href="#dth" role="tab">
              DTH Recharge
            </a>
            <a className="nav-item nav-link py-3" data-toggle="tab" href="#metro" role="tab">
              Metro Recharge
            </a>
          </div>
        </nav>

        <div className="tab-content">
          <div className="tab-pane fade pt-4 show active" id="mobile" role="tabpanel">
            <MobileRecharge />
          </div>
          <div className="tab-pane fade pt-4" id="dth" role="tabpanel">
            <DthRecharge />
          </div>
          <div className="tab-pane fade pt-4" id="metro" role="tabpanel">
            <MetroRecharge />
          </div>
        </div>
      </div>
    );
  }
}

export default Recharge;
