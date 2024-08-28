import { combineReducers } from "redux";
import cart from "./cart-slices";
import services from "./services-slices";
const rootReducer = combineReducers({
  cart: cart,
  services: services,
});

export default rootReducer;
