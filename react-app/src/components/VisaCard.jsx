import React from "react";
import { connect } from "react-redux";

import "../styles/VisaCard.css";

const VisaCard = ({ customerData }) => {
  return (
    <div className="visacard">
      <div className="card__front card__part">
        <span style={{ color: "tomato", fontSize: "1.6rem" }} className="card__front-square card__square">
          <i className="fab fa-maxcdn"></i>axBank
        </span>
        <img
          className="card__front-logo card__logo"
          src="https://cdn.visa.com/cdn/assets/images/logos/visa/logo.png"
          alt="Visa logo"
        />
        <p className="card__credit">credit</p>
        <p className="card_numer">{customerData.card.cardNumber}</p>
        <div className="card__space-75">
          <span className="card__label">Card holder</span>
          <p className="card__info">{customerData.name}</p>
        </div>
        <div className="card__space-25">
          <span className="card__label">Expires</span>
          <p className="card__info">10/25</p>
        </div>
      </div>

      <div className="card__back card__part">
        <div className="card__black-line"></div>
        <div className="card__back-content">
          <div className="card__secret">
            <p className="card__secret--last">121</p>
          </div>
          <span style={{ color: "tomato", fontSize: "1.6rem" }} className="card__back-square card__square">
            <i className="fab fa-maxcdn"></i>axBank
          </span>
          <img
            className="card__back-logo card__logo"
            src="https://cdn.visa.com/cdn/assets/images/logos/visa/logo.png"
            alt="Visa logo"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps)(VisaCard);
