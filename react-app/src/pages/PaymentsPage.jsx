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
                      className="list-group-item text-decoration-none d-flex align-items-center px-5 py-3"
                      to="/payments"
                      activeClassName="bg-dark text-light"
                    >
                      <i className="fas fa-hand-holding-usd fa-lg mr-4"></i>
                      <span style={{ fontSize: "1.2rem" }}>Fund Transfer</span>
                    </NavLink>

                    <NavLink
                      exact
                      className="list-group-item text-decoration-none d-flex align-items-center px-5 py-3"
                      to="/payments/manage-payee"
                      activeClassName="bg-dark text-light"
                    >
                      <i className="fas fa-users-cog fa-lg mr-4"></i>
                      <span style={{ fontSize: "1.2rem" }}>Manage Payee</span>
                    </NavLink>

                    <NavLink
                      exact
                      className="list-group-item text-decoration-none d-flex align-items-center px-5 py-3"
                      to="/payments/recharge"
                      activeClassName="bg-dark text-light"
                    >
                      <i className="fas fa-mobile-alt fa-lg ml-2 mr-3"></i>
                      <span style={{ fontSize: "1.2rem" }} className="ml-3">
                        Recharge
                      </span>
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
