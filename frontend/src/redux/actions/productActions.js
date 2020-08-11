import { ADD_PRODUCT, GET_PRODUCTS } from "../actionTypes";

export const addProduct = (id, type, prodname) => {
  let product = {
    id: id,
    type: type,
    prodname: prodname,
  };
  console.log("Adding product", product);
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const getProducts = () => {
  console.log("getting product");
  return {
    type: GET_PRODUCTS,
  };
};
