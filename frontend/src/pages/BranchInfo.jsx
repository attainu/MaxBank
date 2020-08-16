import React, { useState } from "react";
import { connect } from "react-redux";

import { getBranchInfo } from "../redux/actions/branchActions";

const BranchInfo = (props) => {
  const [ifsc, setIfsc] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ifsc !== "") {
      props.getBranchInfo(ifsc);
    }
  };

  return (
    <div className="BranchInfo">
      <div className="BranchInfoContainer container d-flex flex-column align-items-center bg-light rounded shadow">
        <form className="row justify-content-center mt-4" onSubmit={handleSubmit}>
          <div className="col-lg-8">
            <input
              type="search"
              className="form-control form-control-lg rounded-pill"
              name="ifsc"
              placeholder="Enter IFSC"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />
          </div>
          <div className="col-lg-4 d-flex justify-content-center align-items-center mt-3 mt-lg-0">
            {props.isFetchingBranch ? (
              <span className="spinner-border text-info"></span>
            ) : (
              <button type="submit" className="btn btn-lg btn-outline-info rounded-pill btn-block">
                Search
              </button>
            )}
          </div>
        </form>

        {props.branchSearchResult ? (
          <div className="row justify-content-center mt-5">
            <div className="col-lg-9">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="text-info lead">Bank_Name:</td>
                    <td className="lead">Max Bank</td>
                  </tr>
                  <tr>
                    <td className="text-info lead">MICR:</td>
                    <td className="lead">{props.branchSearchResult.micr}</td>
                  </tr>
                  <tr>
                    <td className="text-info lead">Branch:</td>
                    <td className="lead">{props.branchSearchResult.branch}</td>
                  </tr>
                  <tr>
                    <td className="text-info lead">Contact:</td>
                    <td className="lead">{props.branchSearchResult.contact.slice(0, -2)}</td>
                  </tr>
                  <tr>
                    <td className="text-info lead">Address:</td>
                    <td className="lead">{props.branchSearchResult.address}</td>
                  </tr>
                  <tr>
                    <td className="text-info lead">District:</td>
                    <td className="lead">{props.branchSearchResult.district}</td>
                  </tr>
                  <tr>
                    <td className="text-info lead">State:</td>
                    <td className="lead">{props.branchSearchResult.state}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    branchSearchResult: storeState.branchState.branchSearchResult,
    isFetchingBranch: storeState.branchState.isFetchingBranch,
  };
};

export default connect(mapStateToProps, { getBranchInfo })(BranchInfo);
