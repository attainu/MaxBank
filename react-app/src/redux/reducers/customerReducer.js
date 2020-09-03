import { GET_CUSTOMER_DATA, UPDATE_CUSTOMER_DATA } from "../actionTypes";

const initialState = {
  customerData: null,
};

const customerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER_DATA:
      return { ...state, customerData: payload };

    case UPDATE_CUSTOMER_DATA:
      return state;

    default:
      return state;
  }
};

export default customerReducer;
