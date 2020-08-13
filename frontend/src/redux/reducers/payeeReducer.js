import { ADD_PAYEE, DELETE_PAYEE, UPDATE_PAYEE } from "../actionTypes";

const initialState = {
  payees: [],
};

const payeeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PAYEE: {
      console.log("entering payeeReducer  ADD_PAYEE", payload);
      return { ...state, payees: [...state.payees, payload] };
    }
    case DELETE_PAYEE: {
      console.log("entering payeeReducer DELETE_PAYEE");
      return {
        ...state,
        payees: state.payees.filter((payee) => payee.id !== payload),
      };
    }
    case UPDATE_PAYEE: {
      console.log("entering payeeReducer UPDATE_PAYEE");
      const { id, newPayee } = payload;
      const newPayees = [...state.payees];
      const payeeIndex = newPayees.findIndex((payee) => payee.id === id);
      newPayees[payeeIndex] = { id, ...newPayee };
      return { ...state, todos: newPayees };
    }
    default:
      return state;
  }
};

export default payeeReducer;
