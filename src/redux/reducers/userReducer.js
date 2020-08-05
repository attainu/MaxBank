import { LOG_IN, LOG_OUT, REGISTER } from "../actionTypes";

const initialState = {
  customer: JSON.parse(localStorage.getItem("customerData")) || null,
};

const customerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN:
      const loginJSON = JSON.stringify(payload);
      localStorage.setItem("customerData", loginJSON);
      return { ...state, customer: payload };

    case LOG_OUT:
      localStorage.removeItem("customerData");
      return { ...state, customer: null };

    case REGISTER:
      const registerJSON = JSON.stringify(payload);
      localStorage.setItem("customerData", registerJSON);
      return { ...state, customer: payload };

    default:
      return state;
  }
};

export default customerReducer;
