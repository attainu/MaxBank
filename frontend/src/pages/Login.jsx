import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
        this.props.history.push("/my-accounts");
      })
      .catch((error) => {
        alert(error.message);
        this.setState({ isLoading: false });
      });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return this.props.user ? (
      <Redirect to="/my-accounts" />
    ) : (
      <div className="LoginOuterDiv">
        <img
          className="LoginImg"
          src="https://st.depositphotos.com/1049680/2265/i/450/depositphotos_22652109-stock-photo-young-woman-using-laptop.jpg"
          alt="work on laptop"
        />

        <div className="LoginDiv">
          <form className="LoginForm" onSubmit={this.handleSubmit}>
            <h1>Login to Internet Banking</h1>
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
              placeholder="password"
              className="LoginInput"
              required
            />
            <button type="submit" className="LoginBtn">
              {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Login"}
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

export default connect(mapStateToProps)(Login);
