import React from "react";
import { BrowserRouter as Router, NavLink, Switch, Route } from "react-router-dom";

import MobileRecharge from "./MobileRecharge";
import MetroRecharge from "./MetroRecharge";
import DthRecharge from "./DthRecharge";

class Recharge extends React.Component {
  render() {
    return (
      <div className="bg-light rounded shadow">
        <Router>
          <div className="list-group list-group-horizontal-lg">
            <NavLink
              exact
              className="list-group-item flex-fill  text-decoration-none font-weight-bold px-5 py-3 text-center"
              to="/payments/recharge"
              activeClassName="bg-secondary text-light"
            >
              Mobile Recharge
            </NavLink>
            <NavLink
              exact
              className="list-group-item flex-fill text-decoration-none font-weight-bold px-5 py-3 text-center"
              to="/payments/recharge/dth"
              activeClassName="bg-secondary text-light"
            >
              DTH Recharge
            </NavLink>

            <NavLink
              exact
              className="list-group-item flex-fill text-decoration-none font-weight-bold px-5 py-3 text-center"
              to="/payments/recharge/metro"
              activeClassName="bg-secondary text-light"
            >
              Metro Recharge
            </NavLink>
          </div>

          <Switch>
            <Route exact path="/payments/recharge" component={MobileRecharge} />
            <Route exact path="/payments/recharge/dth" component={DthRecharge} />
            <Route exact path="/payments/recharge/metro" component={MetroRecharge} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Recharge;
