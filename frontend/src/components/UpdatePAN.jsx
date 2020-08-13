import React from "react";
import { connect } from "react-redux";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class UpdatePAN extends React.Component {
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
      accounts: {
        savingAccount: {
          pan: this.state.inputValue,
        },
      },
    });
    document.querySelector("#updatePan").classList.remove("show");
    document.querySelector("#updatePan").classList.add("hide");
    document.querySelector(".modal-backdrop").remove();
    setTimeout(getUpdatedData, 1000);
  };

  render() {
    return (
      <div>
        <button className="btn btn-sm btn-warning" data-toggle="modal" data-target="#updatePan">
          {this.state.isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Update"}
        </button>

        <div className="modal fade" id="updatePan" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter your PAN</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="form d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    minLength="10"
                    maxLength="10"
                    value={this.state.inputValue}
                    className="form-control mb-4"
                    placeholder="10 digit PAN"
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

export default connect(null, { getCustomerData, updateCustomerData })(UpdatePAN);
