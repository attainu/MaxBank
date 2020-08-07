import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import myFirebase from "../firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push("/accounts");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return this.props.user ? (
      <Redirect to="/accounts" />
    ) : (
      <div className="LoginDiv">
        <form className="LoginForm" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <p onClick={this.handleRegister} className="RegisterInLogin">
            New User? Click here to Register
          </p>
          <input
            onChange={this.handleChange}
            value={this.state.title}
            type="email"
            name="email"
            placeholder="email"
            className="LoginInput"
            required
          />
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Password"
            className="LoginInput"
            required
          />
          <input type="submit" className="LoginBtn" value="Login" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return { user: storeState.userState.user };
};

export default connect(mapStateToProps)(Login);
