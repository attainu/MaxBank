import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";

import { addPayee } from "../redux/actions/payeeActions";
import ViewPayees from "../components/ViewPayees";

class ManagePayees extends React.Component {
  state = {
    id: "",
    fullname: "",
    nickname: "",
    accnumber: "",
    ifsccode: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ id: Date.now().toString() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //this.setState({ id: Date.now().toString() });
    console.log("2", this.state.id);
    this.props.addPayee(this.state);
    alert("Payee has been successfully added");
  };

  render() {
    return (
      <div className="container-fluid bg-light rounded px-3 py-1">
        <div>
          <Router>
            <NavLink exact to="/payments/viewpayee">
              View Registered Payees
            </NavLink>
            <Switch>
              <Route exact path="/payments/viewpayee" component={ViewPayees} />
            </Switch>
          </Router>
        </div>

        <div style={{ marginTop: "30px", marginBottom: "20px" }}>
          <h5> Add Payee </h5>
        </div>

        <form className="AddPayeeForm" onSubmit={this.handleSubmit}>
          <div class="form-group row">
            <label for="fullname" class="col-sm-3 col-form-label">
              Account Name
            </label>
            <div class="col-sm-6">
              <input
                onChange={this.handleChange}
                value={this.state.fullname}
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Account Name"
                className="form-control"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="nickname" class="col-sm-3 col-form-label">
              Account Nick Name
            </label>
            <div class="col-sm-6">
              <input
                onChange={this.handleChange}
                value={this.state.nickname}
                type="text"
                name="nickname"
                id="nickname"
                placeholder="Account Nick Name"
                className="form-control"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="accnumber" class="col-sm-3 col-form-label">
              Account Number
            </label>
            <div class="col-sm-6">
              <input
                onChange={this.handleChange}
                value={this.state.accnumber}
                type="text"
                minLength="12"
                maxLength="12"
                name="accnumber"
                id="accnumber"
                placeholder="Account Number"
                className="form-control"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="ifsccode" class="col-sm-3 col-form-label">
              Bank IFSC code
            </label>
            <div class="col-sm-6">
              <input
                onChange={this.handleChange}
                value={this.state.ifsccode}
                type="text"
                minLength="16"
                maxLength="16"
                name="ifsccode"
                id="ifsccode"
                placeholder="Bank IFSC code"
                className="form-control"
                required
              />
            </div>
          </div>

          <input type="submit" className="btn btn-primary mb-2 AddPayeeBtn" value="Add Payee" />
        </form>
      </div>
    );
  }
}

export default connect(null, { addPayee })(ManagePayees);
