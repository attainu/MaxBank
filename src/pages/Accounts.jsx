import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Accounts extends React.Component {
  render() {
    if (this.props.validUser) {
      return (
        <div>
          <h1> Account Page</h1>
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
    validUser: storeState.userState.validUser,
  };
};

export default connect(mapStateToProps)(Accounts);
