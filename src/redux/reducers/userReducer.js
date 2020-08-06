import { LOG_IN, LOG_OUT, REGISTER } from "../actionTypes";

const initialState = {
  customers: [
    {
      username: "user123",
      email: "123@email.com",
      password: "pass123",
    },
    {
      username: "user456",
      email: "456@email.com",
      password: "pass456",
    },
  ],
  validUserName: "",
  registered: false,
};

const authCustomerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN: {
      let id = state.customers.findIndex((customer) => {
        return customer.username === payload.username && customer.password === payload.password;
      });

      if (id !== -1) {
        return { ...state, validUserName: payload.username };
      } else {
        return state;
      }
    }

    case LOG_OUT:
      return { ...state, validUserName: "" };

    case REGISTER:
      return { ...state, customers: [...state.customers, payload], registered: true };

    default:
      return state;
  }
};

export default authCustomerReducer;
