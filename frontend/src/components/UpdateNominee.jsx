import React from "react";
import { connect } from "react-redux";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class UpdateNominee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      relation: "",
      isLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const getUpdatedData = () => {
      this.setState({ isLoading: false });
      this.props.getCustomerData(auth.currentUser.uid);
    };

    this.setState({ isLoading: true });
    this.props.updateCustomerData(auth.currentUser.uid, {
      nominee: { name: this.state.name, age: this.state.age, relation: this.state.relation },
    });
    document.querySelector("#updateNominee").classList.remove("show");
    document.querySelector("#updateNominee").classList.add("hide");
    document.querySelector(".modal-backdrop").remove();
    setTimeout(getUpdatedData, 1000);
  };

  render() {
    return (
      <div>
        <button className="btn btn-sm btn-warning" data-toggle="modal" data-target="#updateNominee">
          {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Update"}
        </button>

        <div className="modal fade" id="updateNominee" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Nominee Details</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="form d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    className="form-control mb-4"
                    placeholder="Nominee Name"
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="age"
                    pattern="\d*"
                    maxLength="2"
                    value={this.state.age}
                    className="form-control mb-4"
                    placeholder="Nominee Age"
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="relation"
                    value={this.state.relation}
                    className="form-control mb-4"
                    placeholder="your relation with Nominee"
                    onChange={this.handleChange}
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getCustomerData, updateCustomerData })(UpdateNominee);
