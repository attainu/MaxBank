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
  validUser: false,
  registered: false,
};

const customerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN: {
      console.log("1", payload);

      let id = state.customers.findIndex((customer) => {
        return customer.username === payload.username && customer.password === payload.password;
      });

      if (id !== -1) {
        return { ...state, validUser: true };
      } else {
        return { ...state, validUser: false };
      }
    }

    case LOG_OUT:
      return { ...state, validUser: false };

    case REGISTER:
      return { ...state, customers: [...state.customers, payload], registered: true };

    default:
      return state;
  }
};

export default customerReducer;
