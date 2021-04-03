import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer } from "./reducers/orderReducer";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { userReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
  userRegister: userRegisterReducer,
  order: orderCreateReducer,
});
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
