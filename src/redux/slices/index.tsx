import { combineReducers } from "redux";
import cart from "./cartSlices";
const rootReducer = combineReducers({
  cart: cart,
});

export default rootReducer;
