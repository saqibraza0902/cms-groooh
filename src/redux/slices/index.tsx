import { combineReducers } from "redux";
import cart from "./cart-slices";
const rootReducer = combineReducers({
  cart: cart,
});

export default rootReducer;
