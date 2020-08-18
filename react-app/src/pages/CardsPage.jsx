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
                        className="list-group-item text-decoration-none d-flex align-items-center px-5 py-3"
                        to="/cards"
                        activeClassName="bg-dark text-light"
                      >
                        <i className="fas fa-credit-card fa-lg mr-4"></i>
                        <span style={{ fontSize: "1.2rem" }}>Cards</span>
                      </NavLink>

                      <NavLink
                        exact
                        className="list-group-item text-decoration-none d-flex align-items-center px-5 py-3"
                        to="/cards/transactions"
                        activeClassName="bg-dark text-light"
                      >
                        <i className="fas fa-file-invoice-dollar fa-lg ml-1 mr-4"></i>
                        <span style={{ fontSize: "1.2rem" }}>Transactions</span>
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
