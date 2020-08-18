import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { auth, db } from "../firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (password.length < 6) {
      Swal.fire("", "Passworld must be atleast 6 digits long!", "warning");
    } else {
      if (password !== confirmPassword) {
        Swal.fire("", "Password not matched with Confirm Password!", "warning");
      } else {
        this.setState({ isLoading: true });
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            db.collection("users")
              .doc(auth.currentUser.uid)
              .set({
                name: username,
                email: email,
                customerId: `MB${(Math.random() * 1000000).toFixed(0)}`,
                contactNumber: null,
                address: null,
                nominee: null,
                accounts: {
                  savingAccount: {
                    accountNumber: (Math.random() * 1000000000000)
                      .toFixed(0)
                      .replace(/[^\dA-Z]/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim(),
                    balance: 250000,
                    pan: null,
                    openingDate: new Date().toString().slice(4, -40),
                  },
                  fixedDeposits: [],
                },
                card: {
                  cardNumber: "4242 4242 4242 4242",
                  balance: 65000,
                },
                transactions: [],
                savingAccountTransactions: [],
                payeeList: [],
              })
              .catch((error) => {
                Swal.fire("", error.message, "error");
              });
            this.setState({ isLoading: false });
          })
          .catch((error) => {
            this.setState({ username: "", email: "", password: "", confirmPassword: "", isLoading: false });
            Swal.fire("", error.message, "error");
          });
      }
    }
  };

  render() {
    return (
      <form className="d-flex flex-column align-items-center px-3 py-4 bg-light rounded-lg shadow" onSubmit={this.handleSubmit}>
        <h3 className="mb-5">Sign Up</h3>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <input
                className="form-control form-control-lg rounded-pill mb-3"
                onChange={this.handleChange}
                value={this.state.username}
                type="text"
                name="username"
                placeholder="name"
                required
              />
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
                className="form-control form-control-lg rounded-pill mb-3"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                name="password"
                placeholder="password"
                required
              />
              <input
                className="form-control form-control-lg rounded-pill"
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                required
              />
              <small className="form-text text-muted ml-3">Your password must be atleat 6 characters long.</small>

              <button type="submit" className="btn btn-lg btn-outline-dark my-4 mt-1 rounded-pill btn-block">
                {this.state.isLoading ? (
                  <span className="spinner-border"></span>
                ) : (
                  <>
                    Sign Up <i className="fas fa-user-plus ml-3"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <p>
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </form>
    );
  }
}

const mapStateToProps = (storeState) => {
  return { user: storeState.userState.user };
};

export default connect(mapStateToProps)(Register);
