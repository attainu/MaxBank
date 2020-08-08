import { GET_CUSTOMER_DATA, UPDATE_CUSTOMER_DATA } from "../actionTypes";
import { db } from "../../firebase";

export const getCustomerData = (userID) => async (dispatch) => {
  await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => {
      dispatch({ type: GET_CUSTOMER_DATA, payload: doc.data() });
    })
    .catch((err) => {
      alert(err);
    });
};

export const updateCustomerData = (userID, data) => async (dispatch) => {
  await db
    .collection("users")
    .doc(userID)
    .set(data, { merge: true })
    .then(() => {
      dispatch({ type: UPDATE_CUSTOMER_DATA });
    })
    .catch((err) => {
      alert(err);
    });
};
