import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { register } from "../redux/actions/userActions";

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
    // Register
    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password not matched with Confirm Password");
    } else {
      const user = {
        username,
        email,
        password,
      };
      this.props.register(user);
      // this.props.history.push("/");
    }
  };

  handleLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return this.props.registered ? (
      <Redirect to="/" />
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
            placeholder="UserName"
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
  return { registered: storeState.userState.registered};
};

export default connect(mapStateToProps, { register })(Register);
