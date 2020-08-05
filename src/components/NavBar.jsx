import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "../redux/actions/userActions";

const NavBar = ({ user, logOut, history, ...restProps }) => {
  const handleLogout = () => {
    logOut();
    history.push("/");
  };

  return (
    <div className="NavBar">
      <Link to="/">
        <button style={{ color: "red", fontSize: "2.5rem" }}>MaxBank</button>
      </Link>

      {user !== null ? (
        <>
          <Link to="/accounts">
            <button>Accounts</button>
          </Link>
          <Link to="/services">
            <button>Services</button>
          </Link>
          <Link to="/products">
            <button>Products</button>
          </Link>
          <Link to="/payments">
            <button>Payments</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/">
          <button>Home</button>
        </Link>
      )}

      <Link to="/branch-info">
        <button>Branch Info</button>
      </Link>
      <Link to="/help">
        <button>Help</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.customer,
  };
};

export default withRouter(connect(mapStateToProps, { logOut })(NavBar));
