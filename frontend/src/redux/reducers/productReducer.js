import { ADD_PRODUCT, GET_PRODUCTS } from "../actionTypes";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT: {
      console.log("entering productReducer  ADD_PRODUCT", payload);
      return { ...state, products: [...state.products, payload] };
    }
    case GET_PRODUCTS: {
      console.log("entering productReducer GET_PRODUCTS");
      return { ...state };
    }
    default:
      return state;
  }
};

export default productReducer;
