import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import myFirebase from "./firebase";
import { setUser } from "./redux/actions/userActions";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Accounts from "./pages/Accounts";

import NavBar from "./components/NavBar";
import CardBalance from "./components/CardBalance";
import AccountBalance from "./components/AccountBalance";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/accounts" component={Accounts} />
          <Route exact path="/accbal" component={AccountBalance} />
          <Route exact path="/cardbal" component={CardBalance} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
      } else {
        this.props.setUser(null);
      }
    });
  }
}

const mapStateToProps = (storeState) => {
  return { registered: storeState.userState.registered };
};

export default connect(mapStateToProps, { setUser })(App);
