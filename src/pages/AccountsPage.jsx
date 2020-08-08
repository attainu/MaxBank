import React from "react";
import { BrowserRouter as Router, NavLink, Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";
import { auth } from "../firebase";

import Cards from "../components/Cards";
import Accounts from "../components/Accounts";

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
                    <div>
                      <NavLink to="/my-accounts/">
                        <button>Accounts Details</button>
                      </NavLink>
                    </div>
                    <div>
                      <NavLink to="/my-accounts/cards">
                        <button>Cards</button>
                      </NavLink>
                    </div>
                  </div>

                  <div className="AccountsContents">
                    <Switch>
                      <Route exact path="/my-accounts/" component={Accounts} />
                      <Route exact path="/my-accounts/cards" component={Cards} />
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
