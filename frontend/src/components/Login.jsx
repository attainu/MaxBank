import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { auth } from "../firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    this.setState({ isLoading: true });

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ email: "", password: "", isLoading: false });
        Swal.fire("", error.message, "error");
      });
  };

  render() {
    return (
      <form className="d-flex flex-column align-items-center px-3 py-5 bg-light rounded-lg shadow" onSubmit={this.handleSubmit}>
        <h3 className="mb-5">Sign into your account</h3>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <input
                className="form-control form-control-lg rounded-pill mb-3"
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
                name="email"
                placeholder="email"
                required
              />
              <input
                className="form-control form-control-lg rounded-pill"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                name="password"
                placeholder="password"
                required
              />
              <button type="submit" className="btn btn-lg btn-outline-dark my-4 mt-1 rounded-pill btn-block">
                {this.state.isLoading ? (
                  <span className="spinner-border"></span>
                ) : (
                  <>
                    Login <i className="fas fa-sign-in-alt ml-3"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </form>
    );
  }
}

const mapStateToProps = (storeState) => {
  return { user: storeState.userState.user };
};

export default connect(mapStateToProps)(Login);
