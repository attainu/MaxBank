import { GET_CUSTOMER } from "../actionTypes";

const initialState = {
  bank_customers: [
    {
      id: "cus_2272",
      object: "customer",
      address: null,
      balance: 10000,
      created: 1596711969,
      currency: "inr",
      name: "Ganesh",
      username: "user123",
      email: "123@email.com",
      object: "customer",
      loggedin: false,
    },
    {
      id: "cus_2278",
      object: "customer",
      address: null,
      balance: 250000,
      created: 1512345969,
      currency: "inr",
      name: "Brahma",
      username: "user456",
      email: "456@email.com",
      object: "customer",
      loggedin: false,
    },
  ],
  authCustomer: {},
};

const authCustomerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let stateCopy = { ...state };

  switch (type) {
    case GET_CUSTOMER: {
      let authCustomer = stateCopy.bank_customers.find((bank_customer) => bank_customer.username === payload);
      stateCopy.authCustomer = authCustomer;
      return stateCopy;
    }

    default:
      return stateCopy;
  }
};

export default authCustomerReducer;
