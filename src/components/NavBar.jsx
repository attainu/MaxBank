import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../firebase";

const NavBar = (props) => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="NavBar">
      <NavLink to="/">
        <button style={{ color: "red", fontSize: "2.0rem" }}>MaxBank</button>
      </NavLink>

      {props.user ? (
        <>
          <NavLink to="/my-accounts">
            <button>My Accounts</button>
          </NavLink>
          <NavLink to="/products">
            <button>Products</button>
          </NavLink>
          <NavLink to="/payments">
            <button>Payments</button>
          </NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
      )}

      <NavLink to="/branch-info">
        <button>Branch Info</button>
      </NavLink>
      <NavLink to="/help">
        <button>Help</button>
      </NavLink>
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
