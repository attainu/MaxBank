import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { auth, db } from "../firebase";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = this.state;
    this.setState({ isLoading: true });

    if (password.length < 6) {
      alert("Passworld must be atleast 6 digits long!");
    } else {
      if (password !== confirmPassword) {
        alert("Password not matched with Confirm Password");
      } else {
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
                    balance: 50000,
                    pan: null,
                    openingDate: new Date().toString().slice(4, -40),
                  },
                  otherAccounts: [],
                },
                card: {
                  cardNumber: "4242 4242 4242 4242",
                  balance: 65000,
                },
                transactions: [],
              })
              .catch((error) => {
                alert("Something went wrong with added user to firestore: ", error);
              });
            this.setState({ isLoading: true });
            this.props.history.push("/my-accounts");
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    }
  };

  handleLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return this.props.user ? (
      <Redirect to="/my-accounts" />
    ) : (
      <div className="RegisterOuterDiv">
        <img
          className="RegisterImg"
          src="https://previews.123rf.com/images/rawpixel/rawpixel1703/rawpixel170317195/73791587-internet-banking-transaction-financial-icon.jpg"
          alt="internet banking"
        />
        <div className="RegisterDiv">
          <form className="RegisterForm" onSubmit={this.handleSubmit}>
            <h1>Sign Up</h1>
            <p onClick={this.handleLogin} className="LoginInRegister">
              Already a User? Click here to Login
            </p>
            <input
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
              name="username"
              placeholder="name"
              className="RegisterInput"
              required
            />
            <input
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="email"
              className="RegisterInput"
              required
            />
            <input
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="password"
              className="RegisterInput"
              required
            />
            <input
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              className="RegisterInput"
              required
            />
            <button type="submit" className="RegisterBtn">
              {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return { user: storeState.userState.user };
};

export default connect(mapStateToProps)(Register);
