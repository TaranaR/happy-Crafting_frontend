import {
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_DETAILS_RESET,
  ADMIN_LOGOUT,
  GET_ALL_SELLERS_REQUEST,
  GET_ALL_SELLERS_SUCCESS,
  GET_ALL_SELLERS_FAIL,
  GET_ALL_SELLERS_RESET,
} from "../../constants/adminConstants";

export const adminDetailReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case ADMIN_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        admin: action.payload,
      };
    case ADMIN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_DETAILS_RESET:
      return {
        admin: {},
      };
    default:
      return state;
  }
};

export const getAllSellerDetailsReducer = (state = { seller: {} }, action) => {
  switch (action.type) {
    case GET_ALL_SELLERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_SELLERS_SUCCESS:
      return {
        loading: false,
        seller: action.payload,
      };
    case GET_ALL_SELLERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ALL_SELLERS_RESET:
      return {
        seller: {},
      };
    default:
      return state;
  }
};
