import React from "react";
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import MyProfile from "../components/MyProfile";
import Accounts from "../components/Accounts";
import FixedDeposits from "../components/FixedDeposits";

class AccountsPage extends React.Component {
  render() {
    const { user, customerData } = this.props;

    if (user) {
      return (
        <div className="AccountsPage container-fluid">
          {customerData ? (
            <>
              <div className="container">
                <Router>
                  <div className="row justify-content-around">
                    <div className="col-lg-3 mb-5 p-lg-0">
                      <div className="list-group shadow">
                        <NavLink
                          exact
                          className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                          to="/my-accounts"
                          activeClassName="bg-info text-light text-center"
                        >
                          My Profile
                        </NavLink>
                        <NavLink
                          exact
                          className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                          to="/my-accounts/accounts"
                          activeClassName="bg-info text-light text-center"
                        >
                          Accounts
                        </NavLink>
                        <NavLink
                          exact
                          className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                          to="/my-accounts/deposits"
                          activeClassName="bg-info text-light text-center"
                        >
                          Fixed Deposits
                        </NavLink>
                      </div>
                    </div>

                    <div className="col-lg-8 p-lg-0">
                      <Switch>
                        <Route exact path="/my-accounts" component={MyProfile} />
                        <Route exact path="/my-accounts/accounts" component={Accounts} />
                        <Route exact path="/my-accounts/deposits" component={FixedDeposits} />
                      </Switch>
                    </div>
                  </div>
                </Router>
              </div>
            </>
          ) : (
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div className="spinner-border" role="status" style={{ width: "5rem", height: "5rem" }}></div>
            </div>
          )}
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

export default connect(mapStateToProps)(AccountsPage);
