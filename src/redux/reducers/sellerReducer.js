import {
  CREATE_SHOP_REQUEST,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
  GET_TYPEOFPROD_REQUEST,
  GET_TYPEOFPROD_SUCCESS,
  GET_TYPEOFPROD_FAIL,
  GET_MAINCATEGORY_REQUEST,
  GET_MAINCATEGORY_SUCCESS,
  GET_MAINCATEGORY_FAIL,
  GET_SUBCATEGORY_REQUEST,
  GET_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_DETAILS_FAIL,
  SELLER_DETAILS_RESET,
  SELLER_UPDATE_PROFILE_REQUEST,
  SELLER_UPDATE_PROFILE_SUCCESS,
  SELLER_UPDATE_PROFILE_RESET,
  SELLER_UPDATE_PROFILE_FAIL,
  GET_PRODUCTBYSELLER_REQUEST,
  GET_PRODUCTBYSELLER_SUCCESS,
  GET_PRODUCTBYSELLER_FAIL,
  CREATE_PRODUCT_RESET,
  SELLER_PRODUCT_UPDATE_REQUEST,
  SELLER_PRODUCT_UPDATE_SUCCESS,
  SELLER_PRODUCT_UPDATE_FAIL,
  SELLER_PRODUCT_UPDATE_RESET,
  SELLER_PRODUCT_DELETE_REQUEST,
  SELLER_PRODUCT_DELETE_SUCCESS,
  SELLER_PRODUCT_DELETE_FAIL,
  GET_ORDERED_PRODUCT_SELLER_REQUEST,
  GET_ORDERED_PRODUCT_SELLER_SUCCESS,
  GET_ORDERED_PRODUCT_SELLER_FAIL,
  GET_ORDERED_PRODUCT_SELLER_RESET,
  ORDER_DISPATCHED_BY_SELLER_REQUEST,
  ORDER_DISPATCHED_BY_SELLER_SUCCESS,
  ORDER_DISPATCHED_BY_SELLER_FAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  DEACTIVATE_SHOP_REQUEST,
  DEACTIVATE_SHOP_SUCCESS,
  DEACTIVATE_SHOP_FAIL,
  GET_MAINCATEGORY_RESET,
  GET_SUBCATEGORY_RESET,
} from "../../constants/sellerConstants";
import { USER_LOGOUT } from "../../constants/userConstants";

export const sellerCreateShopReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SHOP_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SHOP_SUCCESS:
      return {
        loading: false,
        shopInfo: action.payload,
      };
    case CREATE_SHOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const sellerGetMainCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MAINCATEGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_MAINCATEGORY_SUCCESS:
      return {
        loading: false,
        mainCatInfo: action.payload,
      };
    case GET_MAINCATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_MAINCATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const sellerGetSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUBCATEGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBCATEGORY_SUCCESS:
      return {
        loading: false,
        subCatInfo: action.payload,
      };
    case GET_SUBCATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_SUBCATEGORY_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const sellerGetTypeOfProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TYPEOFPROD_REQUEST:
      return {
        loading: true,
      };
    case GET_TYPEOFPROD_SUCCESS:
      return {
        loading: false,
        prodTypeInfo: action.payload,
      };
    case GET_TYPEOFPROD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const sellerCreateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        prodInfo: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {};
    case USER_LOGOUT:
      return {
        prodInfo: {},
      };
    default:
      return state;
  }
};

export const sellerProfileReducer = (state = { seller: {} }, action) => {
  switch (action.type) {
    case SELLER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELLER_DETAILS_SUCCESS:
      return {
        loading: false,
        seller: action.payload,
      };
    case SELLER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SELLER_DETAILS_RESET:
      return {
        seller: {},
      };
    default:
      return state;
  }
};

export const sellerUpdateProfileReducer = (
  state = { loading: false, success: false, sellerInfo: {} },
  action
) => {
  switch (action.type) {
    case SELLER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case SELLER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        sellerInfo: action.payload,
      };
    case SELLER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SELLER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const sellerGetProductBySellerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTBYSELLER_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCTBYSELLER_SUCCESS:
      return {
        loading: false,
        prodInfo: action.payload,
      };
    case GET_PRODUCTBYSELLER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const sellerUpdateProductReducer = (
  state = { loading: false, success: false, prodUpdatedInfo: {} },
  action
) => {
  switch (action.type) {
    case SELLER_PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case SELLER_PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        prodUpdatedInfo: action.payload,
      };
    case SELLER_PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SELLER_PRODUCT_UPDATE_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const sellerDeleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case SELLER_PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SELLER_PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const sellerGetOrderedProductBySellerReducer = (
  state = {
    orderedProduct: {},
    loading: false,
    error: {},
  },
  action
) => {
  switch (action.type) {
    case GET_ORDERED_PRODUCT_SELLER_REQUEST:
      return {
        loading: true,
        orderedProduct: [],
      };
    case GET_ORDERED_PRODUCT_SELLER_SUCCESS:
      return {
        loading: false,
        orderedProduct: action.payload,
      };
    case GET_ORDERED_PRODUCT_SELLER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDERED_PRODUCT_SELLER_RESET:
      return {
        orderedProduct: {},
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const sellerOrderDispatchedBySellerReducer = (
  state = { loading: false, success: false, dispatchedInfo: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DISPATCHED_BY_SELLER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DISPATCHED_BY_SELLER_SUCCESS:
      return {
        loading: false,
        success: true,
        dispatchedInfo: action.payload,
      };
    case ORDER_DISPATCHED_BY_SELLER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sellerOrderDeliveredReducer = (
  state = { loading: false, success: false, deliveredInfo: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
        deliveredInfo: action.payload,
      };
    case ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sellersendEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST:
      return {
        loading: true,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        loading: false,
        emailSendData: action.payload,
      };
    case SEND_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sellerDeactivateShopReducer = (state = {}, action) => {
  switch (action.type) {
    case DEACTIVATE_SHOP_REQUEST:
      return {
        loading: true,
      };
    case DEACTIVATE_SHOP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DEACTIVATE_SHOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
