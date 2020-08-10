import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import customerReducer from "./reducers/customerReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  customerState: customerReducer,
  productState: productReducer,
});

export default rootReducer;
