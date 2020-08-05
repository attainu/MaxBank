import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { logIn } from "../redux/actions/userActions";

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
    // Log in
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    this.props.logIn(user);
    // this.props.history.push("/");
    // this.props.history.goBack();
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return this.props.user ? (
      <Redirect to="/" />
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
            placeholder="Enter email"
            className="LoginInput"
            required
          />
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Enter Password"
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
  return { user: storeState.userState.customer };
};

export default connect(mapStateToProps, { logIn })(Login);
