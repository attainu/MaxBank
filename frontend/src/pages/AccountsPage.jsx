import React from "react";
import { BrowserRouter as Router, NavLink, Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";
import { auth } from "../firebase";

import Cards from "../components/Cards";
import Accounts from "../components/Accounts";
import Transactions from "../components/Transactions";

class AccountsPage extends React.Component {
  updateData = () => {
    if (auth.currentUser) {
      const data = {
        account: {
          savingAccount: {
            balance: this.props.customerData.account.savingAccount.balance - 5000,
          },
        },
      };

      const getUpdatedData = () => {
        this.props.getCustomerData(auth.currentUser.uid);
      };

      this.props.updateCustomerData(auth.currentUser.uid, data);
      setTimeout(getUpdatedData, 1000);
    }
  };

  render() {
    const { user, customerData } = this.props;

    if (user) {
      return (
        <div className="AccountsPage">
          {customerData ? (
            <>
              <h1>Welcome {customerData.name}</h1>
              <button onClick={this.updateData}>update</button>
              <div className="AccountsPageContainer">
                <Router>
                  <div className="AccountsSidebar">
                    <div className="list-group list-group-flush">
                      <NavLink to="/my-accounts" className="list-group-item list-group-item-action">
                        Accounts Details
                      </NavLink>
                      <NavLink to="/my-accounts/cards" className="list-group-item list-group-item-action">
                        Cards
                      </NavLink>
                      <NavLink to="/my-accounts/transactions" className="list-group-item list-group-item-action">
                        Transactions
                      </NavLink>
                    </div>
                  </div>

                  <div className="AccountsContents">
                    <Switch>
                      <Route exact path="/my-accounts" component={Accounts} />
                      <Route exact path="/my-accounts/cards" component={Cards} />
                      <Route exact path="/my-accounts/transactions" component={Transactions} />
                    </Switch>
                  </div>
                </Router>
              </div>
            </>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }

  componentDidMount() {
    if (auth.currentUser) {
      this.props.getCustomerData(auth.currentUser.uid);
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(AccountsPage);
