import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "./firebase";
import { setUser } from "./redux/actions/userActions";
import { getCustomerData } from "./redux/actions/customerActions";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AccountsPage from "./pages/AccountsPage";
import CardsPage from "./pages/CardsPage";
import PaymentsPage from "./pages/PaymentsPage";
import BranchInfo from "./pages/BranchInfo";
import ContactUsPage from "./pages/ContactUsPage";

import NavBar from "./components/NavBar";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={HomePage} />

          <Route path="/my-accounts" component={AccountsPage} />
          <Route path="/cards" component={CardsPage} />
          <Route path="/payments" component={PaymentsPage} />

          <Route exact path="/branch-info" component={BranchInfo} />
          <Route exact path="/contact-us" component={ContactUsPage} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
        this.props.getCustomerData(auth.currentUser.uid);
      } else {
        this.props.setUser(null);
      }
    });
  }
}

const mapStateToProps = (storeState) => {
  return { registered: storeState.userState.registered };
};

export default connect(mapStateToProps, { getCustomerData, setUser })(App);
