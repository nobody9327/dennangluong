import axios from "axios";
import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProduct = () => (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  axios
    .get("/api/products")
    .then((response) => {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_LIST_FAILURE,
        payload: error.message,
      });
    });
};

export const detailsProduct = (productId) => (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
  });
  axios
    .get(`/api/products/${productId}`)
    .then((response) => {
      console.log('querry success');
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log('querry error');
      dispatch({
        type: PRODUCT_DETAILS_FAILURE,
        payload: error.message,
      });
    });
};
