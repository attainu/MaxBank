import React from "react";
import { BrowserRouter as Router, NavLink, Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Buy from "../components/Buy";

import ProdAccount from "../components/ProdAccount";
import ProdDeposit from "../components/ProdDeposit";
import ProdCard from "../components/ProdCard";

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: "Accounts", price: 5000 },
        { id: 2, name: "Deposits", price: 1000 },
        { id: 3, name: "Cards", price: 3000 },
        { id: 4, name: "Loans", price: 3000 },
        { id: 5, name: "Insurance", price: 3000 },
      ],
    };
  }

  render() {
    if (this.props.user) {
      return (
        <div className="ProductsPage">
          <div className="UpperPage">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTx3NfN3_Twj8fUafu1e-lpeKH0R_sQNfITUQ&usqp=CAU"
              alt="Family"
            ></img>
            <div className="sideImg">Secure your family from the risks of ... Invest in our latest product</div>
          </div>
          <div className="LowerPage">
            <Router>
              <div className="ProductsSideBar">
                <div className="list-group list-group-flush">
                  <NavLink to="/products/prodaccount" className="list-group-item list-group-item-action">
                    Accounts
                  </NavLink>
                  <NavLink to="/products/proddeposit" className="list-group-item list-group-item-action">
                    Deposits
                  </NavLink>
                  <NavLink to="/products/prodcards" className="list-group-item list-group-item-action">
                    Cards
                  </NavLink>
                </div>
              </div>
              <div className="ProductsContents">
                <Switch>
                  <Route exact path="/products/prodaccount" component={ProdAccount} />
                  <Route exact path="/products/proddeposit" component={ProdDeposit} />
                  <Route exact path="/products/prodcards" component={ProdCard} />
                </Switch>
              </div>
            </Router>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps)(ProductsPage);
