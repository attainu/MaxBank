import { SETUSER } from "../actionTypes";

const initialState = {
  user: null,
};

const authCustomerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SETUSER:
      return { ...state, user: payload };

    default:
      return state;
  }
};

export default authCustomerReducer;
