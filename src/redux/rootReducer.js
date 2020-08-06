import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import authCustomerReducer from "./reducers/authCustomerReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  authCustomerState: authCustomerReducer,
});

export default rootReducer;
