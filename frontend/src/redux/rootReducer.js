import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import customerReducer from "./reducers/customerReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  customerState: customerReducer,
});

export default rootReducer;
