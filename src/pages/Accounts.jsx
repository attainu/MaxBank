import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Accounts extends React.Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <h1> Welcome </h1>
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
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps)(Accounts);
