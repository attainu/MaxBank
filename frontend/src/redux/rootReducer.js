import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import customerReducer from "./reducers/customerReducer";
import branchReducer from "./reducers/branchReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  customerState: customerReducer,
  branchState: branchReducer,
});

export default rootReducer;
