import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class HomePage extends React.Component {
  render() {
    if (!this.props.user) {
      return (
        <div className="HomePage">
          <div className="Login1">
            {"   "} Logon to Internet Banking
            <Link to="/login">
              <button className="Login2">LOGIN</button>
            </Link>
          </div>

          <div className="InvestFD">
            <img
              src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="Invest in FD"
            />
            <p className="InvestFD1"> Invest in an FD and watch your money grow </p>

            <p className="InvestFD2"> Invest in MaxBank's Money Multiplier Deposits today! </p>

            <p className="InvestFD3"> Hurry ! Call your Banking Manager now. </p>
          </div>

          <div className="Phishing">
            <p> PHISHING ATTACK ALERT !! </p>
            <p>
              Please do not share your banking credentials (OTP, Login, Card details, etc.). Also do not click on any unknown
              links received in SMS/e-mail for updating banking related information. Please do not share your device screen. Bank
              Executive will never ask you for these banking details. Call MaxBank Customer Care immediately to inform any
              suspicious transaction related to your Bank Accounts.
            </p>
          </div>

          <div className="InvestHealth">
            <img
              src="https://www.betterhealth.vic.gov.au/-/media/bhc/images/campaigns/sports/running_istock_74642299_1050x600.jpg?la=en&hash=963DAC7114FEF4C0DC1FE0BDF56B13CDAA21AE9E"
              alt="Invest in Health"
            />

            <p className="InvestHealth1"> Protect yours and your family's health </p>

            <p className="InvestHealth2"> Invest in MaxBank's Health Insurance today! </p>

            <p className="InvestHealth3"> Hurry ! Call your Banking Manager now. </p>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/my-accounts" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps)(HomePage);
