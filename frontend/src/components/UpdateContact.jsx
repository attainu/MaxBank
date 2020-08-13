import React from "react";
import { connect } from "react-redux";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class UpdateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      isLoading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const getUpdatedData = () => {
      this.setState({ isLoading: false });
      this.props.getCustomerData(auth.currentUser.uid);
    };

    this.setState({ isLoading: true });
    this.props.updateCustomerData(auth.currentUser.uid, {
      contactNumber: this.state.inputValue,
    });
    document.querySelector("#updateContact").classList.remove("show");
    document.querySelector("#updateContact").classList.add("hide");
    document.querySelector(".modal-backdrop").remove();
    setTimeout(getUpdatedData, 1000);
  };

  render() {
    const btnName = this.props.value;
    return (
      <div>
        <button className="btn btn-sm btn-warning" data-toggle="modal" data-target="#updateContact">
          {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : `${btnName}`}
        </button>

        <div className="modal fade" id="updateContact" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter your Contact Number</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="form d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    pattern="\d*"
                    minLength="10"
                    maxLength="10"
                    value={this.state.inputValue}
                    className="form-control mb-4"
                    placeholder="10 digit mobile number"
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

export default connect(null, { getCustomerData, updateCustomerData })(UpdateContact);
