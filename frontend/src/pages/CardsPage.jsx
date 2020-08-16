import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Cards from "../components/Cards";
import Transactions from "../components/Transactions";

class CardsPage extends Component {
  render() {
    const { user, customerData } = this.props;

    if (user) {
      if (customerData) {
        return (
          <div className="CardsPage">
            <div className="container">
              <Router>
                <div className="row justify-content-around">
                  <div className="col-lg-3 mb-5 p-lg-0">
                    <div className="list-group shadow">
                      <NavLink
                        exact
                        className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                        to="/cards"
                        activeClassName="bg-info text-light text-center"
                      >
                        Cards
                      </NavLink>
                      <NavLink
                        exact
                        className="list-group-item text-decoration-none font-weight-bold px-5 py-3"
                        to="/cards/transactions"
                        activeClassName="bg-info text-light text-center"
                      >
                        Transactions
                      </NavLink>
                    </div>
                  </div>

                  <div className="col-lg-8 p-lg-0">
                    <Switch>
                      <Route exact path="/cards" component={Cards} />
                      <Route exact path="/cards/transactions" component={Transactions} />
                    </Switch>
                  </div>
                </div>
              </Router>
            </div>
          </div>
        );
      } else {
        return <div className="spinner-border mt-5" role="status" style={{ width: "5rem", height: "5rem" }}></div>;
      }
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

export default connect(mapStateToProps)(CardsPage);
