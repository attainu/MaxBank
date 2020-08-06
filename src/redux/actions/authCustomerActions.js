import { GET_CUSTOMER } from "../actionTypes";

export const getCustomer = (username) => {
  return {
    type: GET_CUSTOMER,
    payload: username,
  };
};
