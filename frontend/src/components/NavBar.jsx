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
          <NavLink
            to="/my-accounts"
            className="text-decoration-none text-light"
            activeClassName="border-bottom font-weight-bold font-italic"
          >
            My Account
          </NavLink>
          <NavLink
            to="/cards"
            className="text-decoration-none text-light"
            activeClassName="border-bottom font-weight-bold font-italic"
          >
            Cards
          </NavLink>
          <NavLink
            to="/payments"
            className="text-decoration-none text-light"
            activeClassName="border-bottom font-weight-bold font-italic"
          >
            Payments
          </NavLink>
        </>
      ) : (
        <NavLink to="/" className="text-decoration-none text-light" activeClassName="border-bottom font-weight-bold font-italic">
          Home
        </NavLink>
      )}

      <NavLink
        to="/branch-info"
        className="text-decoration-none text-light"
        activeClassName="border-bottom font-weight-bold font-italic"
      >
        Branch Info
      </NavLink>
      <NavLink
        to="/help"
        className="text-decoration-none text-light"
        activeClassName="border-bottom font-weight-bold font-italic"
      >
        Help
      </NavLink>

      {props.user ? (
        <button onClick={handleLogout} className="font-weight-bold text-danger">
          Logout
        </button>
      ) : null}
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
