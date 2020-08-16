import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
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
    <header className="NavBar">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link to="/" className="navbar-brand ml-lg-5 pl-lg-4" style={{ color: "red", fontSize: "2.25rem" }}>
          MaxBank
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-auto mt-3 mt-md-0">
            {props.user ? (
              <>
                <li className="nav-item mx-lg-5 mx-md-3 mb-2 mb-md-0 d-flex align-items-center">
                  <NavLink
                    to="/my-accounts"
                    style={{ fontSize: "1.1rem" }}
                    className="text-decoration-none text-light"
                    activeClassName="border-bottom font-weight-bold font-italic"
                  >
                    My Account
                  </NavLink>
                </li>
                <li className="nav-item mx-lg-5 mx-md-3 mb-2 mb-md-0 d-flex align-items-center">
                  <NavLink
                    to="/cards"
                    style={{ fontSize: "1.1rem" }}
                    className="text-decoration-none text-light"
                    activeClassName="border-bottom font-weight-bold font-italic"
                  >
                    Cards
                  </NavLink>
                </li>
                <li className="nav-item mx-lg-5 mx-md-3 mb-2 mb-md-0 d-flex align-items-center">
                  {" "}
                  <NavLink
                    style={{ fontSize: "1.1rem" }}
                    to="/payments"
                    className="text-decoration-none text-light"
                    activeClassName="border-bottom font-weight-bold font-italic"
                  >
                    Payments
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item mx-lg-5 mx-md-3 mb-2 mb-md-0 d-flex align-items-center">
                <NavLink
                  to="/"
                  style={{ fontSize: "1.1rem" }}
                  exact
                  className="text-decoration-none text-light"
                  activeClassName="border-bottom font-weight-bold font-italic"
                >
                  Home
                </NavLink>
              </li>
            )}

            <li className="nav-item mx-lg-5 mx-md-3 mb-2 mb-md-0 d-flex align-items-center">
              <NavLink
                to="/branch-info"
                style={{ fontSize: "1.1rem" }}
                className="text-decoration-none text-light"
                activeClassName="border-bottom font-weight-bold font-italic"
              >
                Branch Info
              </NavLink>
            </li>
            <li className="nav-item mx-lg-5 mx-md-3 mb-2 mb-md-0 d-flex align-items-center">
              <NavLink
                to="/contact-us"
                style={{ fontSize: "1.1rem" }}
                className="text-decoration-none text-light"
                activeClassName="border-bottom font-weight-bold font-italic"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          {props.user ? (
            <button onClick={handleLogout} className="mr-lg-5 my-3 my-md-0 btn btn-outline-danger" style={{ fontSize: "1.1rem" }}>
              Sign out
            </button>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
