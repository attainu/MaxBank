import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "./firebase";
import { setUser } from "./redux/actions/userActions";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AccountsPage from "./pages/AccountsPage";
import ProductsPage from "./pages/ProductsPage";
import BranchInfo from "./pages/BranchInfo";

import NavBar from "./components/NavBar";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/my-accounts" component={AccountsPage} />
          <Route exact path="/productspage" component={ProductsPage} />
          <Route path="/branch-info" component={BranchInfo} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
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
