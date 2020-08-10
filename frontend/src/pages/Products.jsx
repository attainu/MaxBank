import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllProducts } from "../redux/actions/productActions";
import Product from "../components/Product";
import "../styles/Products.css";

class Products extends Component {
  componentDidMount() {
    try {
      console.log("Entering component did mount");
      this.props.getAllProducts();
    } catch (err) {
      console.error(err.message);
    }
  }

  render() {
    console.log("Rendering 1  ");
    console.log("R ", this.props.products);
    return (
      <>
        <div className="Products">
          {this.props.products.map((product) => (
            <Product key={product.productId} product={product}>
              {" "}
            </Product>
          ))}
        </div>
        <a href="/">Go To Homepage</a>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
  };
};

const mapStateToProps = (storeState) => {
  console.log("s", storeState.productState.products);
  return {
    products: storeState.productState.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
