import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import FundTransfer from "../components/FundTransfer";
import ManagePayees from "../components/ManagePayees";
import Recharge from "../components/Recharge";

class PaymentsPage extends Component {
  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div className="PaymentsPage">
          <div className="container">
            <Router>
              <div className="row justify-content-around">
                <div className="col-lg-3 mb-5 p-lg-0">
                  <div className="list-group shadow">
                    <NavLink
                      exact
                      className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                      to="/payments"
                      activeClassName="bg-info text-light text-center"
                    >
                      Fund Transfer
                    </NavLink>
                    <NavLink
                      exact
                      className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                      to="/payments/manage-payee"
                      activeClassName="bg-info text-light text-center"
                    >
                      Manage Payee
                    </NavLink>

                    <NavLink
                      exact
                      className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                      to="/payments/recharge"
                      activeClassName="bg-info text-light text-center"
                    >
                      Recharge
                    </NavLink>
                  </div>
                </div>

                <div className="col-lg-8 p-lg-0">
                  <Switch>
                    <Route exact path="/payments" component={FundTransfer} />
                    <Route exact path="/payments/manage-payee" component={ManagePayees} />
                    <Route exact path="/payments/recharge" component={Recharge} />
                  </Switch>
                </div>
              </div>
            </Router>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps)(PaymentsPage);
