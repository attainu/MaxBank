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
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = this.state;

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
                account: {
                  savingAccount: {
                    accountNumber: (Math.random() * 10000000000).toFixed(0),
                    balance: 50000,
                  },
                  currentAccount: {
                    accountNumber: (Math.random() * 10000000000).toFixed(0),
                    balance: 50000,
                  },
                  card: {
                    cardNumber: "4000 0035 6000 0008",
                  },
                },
              })
              .catch((error) => {
                alert("Something went wrong with added user to firestore: ", error);
              });

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
            placeholder="Full Name"
            className="RegisterInput"
            required
          />
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Email"
            className="RegisterInput"
            required
          />
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Password"
            className="RegisterInput"
            required
          />
          <input
            onChange={this.handleChange}
            value={this.state.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="RegisterInput"
            required
          />
          <input type="submit" className="RegisterBtn" value="Sign Up" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return { user: storeState.userState.user };
};

export default connect(mapStateToProps)(Register);
