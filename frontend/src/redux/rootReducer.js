import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import customerReducer from "./reducers/customerReducer";
import payeeReducer from "./reducers/payeeReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  customerState: customerReducer,
  payeeState: payeeReducer,
});

export default rootReducer;
