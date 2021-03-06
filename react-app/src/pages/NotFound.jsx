import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ width: "100%", height: "90vh" }} className="d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center px-3 text-center">
        <h1 className="display-1">404</h1>

        <h2 className="text-danger">Oops! This Page Could Not Be Found</h2>

        <p className="lead">
          Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable
        </p>

        <Link to="/" className="btn btn-info">
          Go To Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
