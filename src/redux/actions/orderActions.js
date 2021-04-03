import axios from "axios";
import { useSelector } from "react-redux";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const user = getState().user;
  const { userInfo } = user;
  console.log("userinfo", userInfo);
  axios
    .post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    .then((response) => {
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: response.data.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem("cartItems");
    })
    .catch((error) => {
      dispatch({
        type: ORDER_CREATE_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    });
};
