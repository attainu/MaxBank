import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Buy from "../components/Buy";

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: "Life Insurance", price: 5000 },
        { id: 2, name: "General Insurance", price: 1000 },
        { id: 3, name: "Medical Insurance", price: 3000 },
      ],
    };
  }

  render() {
    if (this.props.user) {
      return (
        <div className="ProductsPage">
          {this.state.products.map((product) => {
            return (
              <div className="ProductsPageItem" key={product.id}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <Buy product={product} />
              </div>
            );
          })}
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
