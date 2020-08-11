import React from "react";
import { connect } from "react-redux";

import { auth } from "../firebase";
import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";

class UpdateBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  updateDetails = () => {
    const getUpdatedData = () => {
      this.props.getCustomerData(auth.currentUser.uid);
    };

    if (this.props.toUpdate === "PAN") {
      if (this.state.inputValue.length !== 10) {
        alert("Please input your correct 10 digit PAN");
      } else {
        this.props.updateCustomerData(auth.currentUser.uid, {
          accounts: {
            savingAccount: {
              pan: this.state.inputValue
                .replace(/[^\dA-Z]/g, "")
                .replace(/(.{5})/g, "$1 ")
                .trim(),
            },
          },
        });
        document.querySelector("#updatePan").classList.remove("show");
        document.querySelector("#updatePan").classList.add("hide");
        document.querySelector(".modal-backdrop").remove();
        setTimeout(getUpdatedData, 1000);
      }
    }

    if (this.props.toUpdate === "Aadhaar") {
      if (this.state.inputValue.length !== 16) {
        alert("Please input your correct 16 digit Aadhaar");
      } else {
        this.props.updateCustomerData(auth.currentUser.uid, {
          accounts: {
            savingAccount: {
              aadhaar: this.state.inputValue
                .replace(/[^\dA-Z]/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim(),
            },
          },
        });
        document.querySelector("#updateAadhaar").classList.remove("show");
        document.querySelector("#updateAadhaar").classList.add("hide");
        document.querySelector(".modal-backdrop").remove();
        setTimeout(getUpdatedData, 1000);
      }
    }
  };

  render() {
    if (this.props.toUpdate === "PAN") {
      return (
        <div>
          <button className="btn btn-warning" data-toggle="modal" data-target="#updatePan">
            Update
          </button>

          <div className="modal fade" id="updatePan" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <form className="form-inline">
                    <div className="form-group mb-2">
                      <input type="text" readOnly className="form-control-plaintext" value="Enter Your PAN:" />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                      <input
                        type="text"
                        value={this.state.inputValue}
                        className="form-control"
                        placeholder="10 digit PAN"
                        onChange={this.handleChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={this.updateDetails}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.toUpdate === "Aadhaar") {
      return (
        <div>
          <button className="btn btn-warning" data-toggle="modal" data-target="#updateAadhaar">
            Update
          </button>

          <div className="modal fade" id="updateAadhaar" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <form className="form-inline">
                    <div className="form-group mb-2">
                      <input type="text" readOnly className="form-control-plaintext" value="Enter Your Aadhaar:" />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                      <input
                        type="text"
                        value={this.state.inputValue}
                        className="form-control"
                        placeholder="16 digit Aadhaar"
                        onChange={this.handleChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={this.updateDetails}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(null, { getCustomerData, updateCustomerData })(UpdateBtn);
