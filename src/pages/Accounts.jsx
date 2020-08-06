import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getCustomer } from "../redux/actions/authCustomerActions";

class Accounts extends React.Component {
  componentDidMount() {
    this.props.getCustomer(this.props.validUserName);
  }

  render() {
    if (this.props.authCustomer) {
      return (
        <div>
          <h1> Welcome {this.props.authCustomer.name} </h1>
          <div>
            <Link to="/accbal">
              <button>Account Balance</button>
            </Link>
          </div>
          <div>
            <Link to="/cardbal">
              <button>Card Balance</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    validUserName: storeState.userState.validUserName,
    authCustomer: storeState.authCustomerState.authCustomer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: (username) => dispatch(getCustomer(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
