import { SETUSER } from "../actionTypes";

export const setUser = (user) => {
  return {
    type: SETUSER,
    payload: user,
  };
};
