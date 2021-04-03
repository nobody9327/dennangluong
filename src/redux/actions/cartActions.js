import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (productId, quantity) => (dispatch, getState) => {
  axios
    .get(`/api/products/${productId}`)
    .then((response) => {
      const data = response.data;
      console.log("querry successed");
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          product: data._id,
          quantity,
        },
      });
      //if this statement is not placed here state may not as expected because this is asynchronous action
      getState().cart &&
        getState().cart.cartItems &&
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().cart.cartItems)
        );
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
};
