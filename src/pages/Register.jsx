import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import myFirebase from "../firebase";

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

    if (password !== confirmPassword) {
      alert("Password not matched with Confirm Password");
    } else {
      myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          myFirebase
            .firestore()
            .collection("users")
            .doc(myFirebase.auth().currentUser.uid)
            .set({
              name: username,
              email: email,
            })
            .catch((error) => {
              alert("Something went wrong with added user to firestore: ", error);
            });

          this.props.history.push("/accounts");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  handleLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return this.props.user ? (
      <Redirect to="/accounts" />
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
