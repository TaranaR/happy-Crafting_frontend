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
  UPDATE_SELLER_STATUS_REQUEST,
  UPDATE_SELLER_STATUS_SUCCESS,
  UPDATE_SELLER_STATUS_FAIL,
  UPDATE_SELLER_STATUS_RESET,
  UPDATE_USER_STATUS_REQUEST,
  UPDATE_USER_STATUS_SUCCESS,
  UPDATE_USER_STATUS_FAIL,
  UPDATE_USER_STATUS_RESET,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_RESET,
  CREATE_MAIN_CATEGORY_REQUEST,
  CREATE_MAIN_CATEGORY_SUCCESS,
  CREATE_MAIN_CATEGORY_FAIL,
  CREATE_MAIN_CATEGORY_RESET,
  DELETE_MAIN_CATEGORY_REQUEST,
  DELETE_MAIN_CATEGORY_SUCCESS,
  DELETE_MAIN_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_RESET,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_FAIL,
  CREATE_TYPE_OF_PRODUCT_REQUEST,
  CREATE_TYPE_OF_PRODUCT_SUCCESS,
  CREATE_TYPE_OF_PRODUCT_FAIL,
  CREATE_TYPE_OF_PRODUCT_RESET,
  DELETE_TYPE_OF_PRODUCT_REQUEST,
  DELETE_TYPE_OF_PRODUCT_SUCCESS,
  DELETE_TYPE_OF_PRODUCT_FAIL,
  GET_ALL_SUB_CATEGORY_REQUEST,
  GET_ALL_SUB_CATEGORY_SUCCESS,
  GET_ALL_SUB_CATEGORY_FAIL,
} from "../../constants/adminConstants";
import { USER_DETAILS_RESET } from "../../constants/userConstants";

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

export const updateSellerStatusReducer = (
  state = { loading: false, success: false, message: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_SELLER_STATUS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_SELLER_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case UPDATE_SELLER_STATUS_FAIL:
      return {
        laoding: false,
        error: action.payload,
      };
    case UPDATE_SELLER_STATUS_RESET:
      return {
        ...state,
        succes: false,
      };
    default:
      return state;
  }
};

export const getAllUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case GET_ALL_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ALL_USER_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const updateUserStatusReducer = (
  state = { loading: false, success: false, message: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_USER_STATUS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case UPDATE_USER_STATUS_FAIL:
      return {
        laoding: false,
        error: action.payload,
      };
    case UPDATE_USER_STATUS_RESET:
      return {
        ...state,
        succes: false,
      };
    default:
      return state;
  }
};

export const adminCreateMainCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MAIN_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case CREATE_MAIN_CATEGORY_SUCCESS:
      return {
        loading: false,
        mainCategoryInfo: action.payload,
      };
    case CREATE_MAIN_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_MAIN_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const adminDeleteMainCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MAIN_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case DELETE_MAIN_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_MAIN_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const adminCreateSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUB_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        subCategoryInfo: action.payload,
      };
    case CREATE_SUB_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_SUB_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const adminDeleteSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUB_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case DELETE_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_SUB_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminCreateTypeOfProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TYPE_OF_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_TYPE_OF_PRODUCT_SUCCESS:
      return {
        loading: false,
        typeOfProductInfo: action.payload,
      };
    case CREATE_TYPE_OF_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_TYPE_OF_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const adminDeleteTypeOfProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TYPE_OF_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_TYPE_OF_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_TYPE_OF_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminGetAllSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SUB_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        subCatInfo: action.payload,
      };
    case GET_ALL_SUB_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};
