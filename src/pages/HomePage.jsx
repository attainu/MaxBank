import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class HomePage extends React.Component {
  render() {
    if (!this.props.validUser) {
      return (
        <div className="HomePage">
          <div>
            <Link to="/login">
              <button>Customer Login</button>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <button>Admin Login</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/accounts" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    validUser: storeState.userState.validUser,
  };
};

export default connect(mapStateToProps)(HomePage);
