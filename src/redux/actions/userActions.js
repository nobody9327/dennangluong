import axios from "axios";
import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const signin = (email, password) => (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
  });

  axios
    .post("/api/users/signin", { email, password })
    .then((response) => {
      const user = response.data;
      console.log("user", user);
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: user,
      });
      localStorage.setItem("userInfo", JSON.stringify(user));
    })
    .catch((error) => {
      dispatch({
        type: USER_SIGNIN_FAILURE,
        payload:
          error.respose && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({
    type: USER_SIGNOUT,
  });
};

export const register = (name, email, password) => (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  axios
    .post("/api/users/register", { name, email, password })
    .then((response) => {
      const user = response.data;
      console.log("user", user);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: user,
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: user,
      });

      localStorage.setItem("userRegister", JSON.stringify(user));
    })
    .catch((error) => {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload:
          error.respose && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
