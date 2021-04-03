import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, aciton) => {
  switch (aciton.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        orderInfo: aciton.payload,
        success: true,
      };
    case ORDER_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: aciton.payload,
      };
    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
