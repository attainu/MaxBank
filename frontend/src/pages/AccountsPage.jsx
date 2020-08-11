import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getCustomerData, updateCustomerData } from "../redux/actions/customerActions";
import { auth } from "../firebase";

import Cards from "../components/Cards";
import SavingAccount from "../components/SavingAccount";
import OtherAccounts from "../components/OtherAccounts";
import Transactions from "../components/Transactions";

class AccountsPage extends React.Component {
  render() {
    const { user, customerData } = this.props;

    if (user) {
      return (
        <div className="AccountsPage container-fluid">
          {customerData ? (
            <>
              <h1 className="mb-5">Welcome {customerData.name}</h1>
              <div className="AccountsPageContainer container">
                <nav>
                  <div className="nav nav-tabs nav-pills h5 nav-justified" role="tablist">
                    <a className="nav-item nav-link active" data-toggle="tab" href="#saving-account" role="tab">
                      Saving_Account
                    </a>
                    <a className="nav-item nav-link" data-toggle="tab" href="#other-accounts" role="tab">
                      Others_Accounts
                    </a>
                    <a className="nav-item nav-link" data-toggle="tab" href="#cards" role="tab">
                      Cards
                    </a>
                    <a className="nav-item nav-link" data-toggle="tab" href="#transactions" role="tab">
                      Transactions
                    </a>
                  </div>
                </nav>

                <div className="tab-content">
                  <div className="tab-pane fade pt-4 show active" id="saving-account" role="tabpanel">
                    <SavingAccount />
                  </div>
                  <div className="tab-pane fade pt-4" id="other-accounts" role="tabpanel">
                    <OtherAccounts />
                  </div>
                  <div className="tab-pane fade pt-4 container" id="cards" role="tabpanel">
                    <Cards />
                  </div>
                  <div className="tab-pane fade pt-4" id="transactions" role="tabpanel">
                    <Transactions />
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }

  componentDidMount() {
    if (auth.currentUser) {
      this.props.getCustomerData(auth.currentUser.uid);
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    customerData: storeState.customerState.customerData,
  };
};

export default connect(mapStateToProps, { getCustomerData, updateCustomerData })(AccountsPage);
