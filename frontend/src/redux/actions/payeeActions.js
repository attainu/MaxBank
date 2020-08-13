import { ADD_PAYEE, DELETE_PAYEE, UPDATE_PAYEE } from "../actionTypes";

export const addPayee = (payee) => {
  console.log("Adding payee", payee);
  return {
    type: ADD_PAYEE,
    payload: payee,
  };
};

export const deletePayee = (id) => {
  console.log("Deleting payee");
  return {
    type: DELETE_PAYEE,
    payload: id,
  };
};

export const updatePayee = (id) => {
  console.log("Updating payee");
  return {
    type: UPDATE_PAYEE,
    payload: id,
  };
};
