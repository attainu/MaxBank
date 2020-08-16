import React from "react";
import { Redirect, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./Login";
import Register from "./Register";

class HomePage extends React.Component {
  render() {
    if (!this.props.user) {
      return (
        <div className="HomePage">
          <div className="container h-100">
            <div className="row justify-content-between align-items-center h-100">
              <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center"></div>

              <div className="col-lg-5">
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                  </Switch>
                </Router>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/my-accounts" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps)(HomePage);
