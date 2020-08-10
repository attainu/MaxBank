import React from "react";

import "../styles/Product.css";

const Product = ({ product }) => {
  console.log({ product });
  return (
    <div className="Product">
      <img src={product.productImageURL} alt="Product"></img>
      <p> {product.productId} </p>
      <button className="Button">KNOW MORE</button>
    </div>
  );
};

export default Product;
