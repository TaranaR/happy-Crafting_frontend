import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  GET_RANDOM_4_PRODUCTS_REQUEST,
  GET_RANDOM_4_PRODUCTS_SUCCESS,
  GET_RANDOM_4_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_SELLER_BY_ID_REQUEST,
  GET_SELLER_BY_ID_SUCCESS,
  GET_SELLER_BY_ID_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_RESET,
  GET_RANDOM_SUB_CATEGORY_REQUEST,
  GET_RANDOM_SUB_CATEGORY_SUCCESS,
  GET_RANDOM_SUB_CATEGORY_FAIL,
  GET_RANDOM_PRODUCT_BY_CATEGORY_REQUEST,
  GET_RANDOM_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_RANDOM_PRODUCT_BY_CATEGORY_FAIL,
  GET_RANDOM_PRODUCT_BY_CATEGORY_RESET,
  GET_ALL_PRODUCT_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_ALL_PRODUCT_BY_CATEGORY_FAIL,
  GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_REQUEST,
  GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_SUCCESS,
  GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_FAIL,
  GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_REQUEST,
  GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_SUCCESS,
  GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_FAIL,
  GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_REQUEST,
  GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_SUCCESS,
  GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_CART_DATA_BY_USER_REQUEST,
  GET_CART_DATA_BY_USER_SUCCESS,
  GET_CART_DATA_BY_USER_FAIL,
  GET_CART_DATA_BY_USER_RESET,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_RESET,
  REMOVE_PRODUCT_FROM_CART_REQUEST,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART_FAIL,
  GET_PRODUCT_DETAILS_RESET,
  UPDATE_CART_BY_PRODUCT_REQUEST,
  UPDATE_CART_BY_PRODUCT_SUCCESS,
  UPDATE_CART_BY_PRODUCT_FAIL,
  GET_SHIPPING_ADDRESS_BY_USER_REQUEST,
  GET_SHIPPING_ADDRESS_BY_USER_SUCCESS,
  GET_SHIPPING_ADDRESS_BY_USER_FAIL,
  GET_SHIPPING_ADDRESS_BY_USER_RESET,
  ADD_SHIPPING_ADDRESS_REQUEST,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  ADD_SHIPPING_ADDRESS_FAIL,
  DELETE_SHIPPING_ADDRESS_REQUEST,
  DELETE_SHIPPING_ADDRESS_SUCCESS,
  DELETE_SHIPPING_ADDRESS_FAIL,
  GET_SHIPPING_ADDRESS_BY_ID_REQUEST,
  GET_SHIPPING_ADDRESS_BY_ID_SUCCESS,
  GET_SHIPPING_ADDRESS_BY_ID_FAIL,
  ADD_ORDER_MASTER_REQUEST,
  ADD_ORDER_MASTER_SUCCESS,
  ADD_ORDER_MASTER_FAIL,
  REMOVE_CART_DATA_BY_USER_REQUEST,
  REMOVE_CART_DATA_BY_USER_SUCCESS,
  REMOVE_CART_DATA_BY_USER_FAIL,
  ADD_ORDER_DETAILS_REQUEST,
  ADD_ORDER_DETAILS_SUCCESS,
  ADD_ORDER_DETAILS_FAIL,
  ADD_ORDER_DETAILS_RESET,
  ADD_ORDER_MASTER_RESET,
  GET_ORDER_MASTER_REQUEST,
  GET_ORDER_MASTER_SUCCESS,
  GET_ORDER_MASTER_FAIL,
  GET_ORDER_MASTER_RESET,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  ADD_PRODUCT_TO_MY_COLLECTION_REQUEST,
  ADD_PRODUCT_TO_MY_COLLECTION_SUCCESS,
  ADD_PRODUCT_TO_MY_COLLECTION_FAIL,
  GET_PRODUCTS_FROM_MYCOLLECTION_REQUEST,
  GET_PRODUCTS_FROM_MYCOLLECTION_SUCCESS,
  GET_PRODUCTS_FROM_MYCOLLECTION_FAIL,
  GET_PRODUCTS_FROM_MYCOLLECTION_RESET,
  REMOVE_PRODUCT_FROM_MYCOLLECTION_REQUEST,
  REMOVE_PRODUCT_FROM_MYCOLLECTION_SUCCESS,
  REMOVE_PRODUCT_FROM_MYCOLLECTION_FAIL,
  ADD_REVIEW_FOR_PRODUCT_REQUEST,
  ADD_REVIEW_FOR_PRODUCT_SUCCESS,
  ADD_REVIEW_FOR_PRODUCT_FAIL,
  ADD_REVIEW_FOR_PRODUCT_RESET,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
  DEACTIVATE_USER_ACCOUNT_REQUEST,
  DEACTIVATE_USER_ACCOUNT_SUCCESS,
  DEACTIVATE_USER_ACCOUNT_FAIL,
  GET_ALL_RANDOM_PRODUCT_REQUEST,
  GET_ALL_RANDOM_PRODUCT_SUCCESS,
  GET_ALL_RANDOM_PRODUCT_FAIL,
  LIKE_PRODUCT_REQUEST,
  LIKE_PRODUCT_SUCCESS,
  LIKE_PRODUCT_FAIL,
  GET_FEATURED_PRODUCTS_REQUEST,
  GET_FEATURED_PRODUCTS_SUCCESS,
  GET_FEATURED_PRODUCTS_FAIL,
} from "../../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAIL:
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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        token: action.payload,
      };
    case USER_LOGIN_FAIL:
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

export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_DETAILS_RESET:
      return {
        // user: {},
      };
    // case USER_LOGOUT:
    //   return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = { loading: false, success: false, userInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export const userGetRandom4ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RANDOM_4_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case GET_RANDOM_4_PRODUCTS_SUCCESS:
      return {
        loading: false,
        randProd: action.payload,
      };
    case GET_RANDOM_4_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        prodInfo: action.payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_DETAILS_RESET:
      return {
        prodInfo: {},
      };
    default:
      return state;
  }
};

export const userGetSellerByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SELLER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_SELLER_BY_ID_SUCCESS:
      return {
        loading: false,
        sellerInfo: action.payload,
      };
    case GET_SELLER_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetUserByIdReducer = (state = { userInfo: [] }, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
      return {
        loading: true,
        userInfo: [],
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        loading: false,
        userInfo: [...state.userInfo, action.payload],
      };
    case GET_USER_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_USER_BY_ID_RESET:
      return {
        userInfo: [],
      };
    default:
      return state;
  }
};

export const userGetRandomSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RANDOM_SUB_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_RANDOM_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        randSubCat: action.payload,
      };
    case GET_RANDOM_SUB_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetRandomProductByCategoryReducer = (
  state = {
    randProdCat: [],
    loading: false,
    error: {},
  },
  action
) => {
  switch (action.type) {
    case GET_RANDOM_PRODUCT_BY_CATEGORY_REQUEST:
      return {
        loading: true,
        randProdCat: [],
      };
    case GET_RANDOM_PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        randProdCat: [...state.randProdCat, action.payload],
      };
    case GET_RANDOM_PRODUCT_BY_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_RANDOM_PRODUCT_BY_CATEGORY_RESET:
      return {
        randProdCat: [],
      };
    default:
      return state;
  }
};

// export const userGetAllRandomProductByCategoryReducer = (
//   state = {},
//   action
// ) => {
//   switch (action.type) {
//     case GET_ALL_PRODUCT_BY_CATEGORY_REQUEST:
//       return {
//         loading: true,
//       };
//     case GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS:
//       return {
//         loading: false,
//         prodCat: action.payload,
//       };
//     case GET_ALL_PRODUCT_BY_CATEGORY_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

export const userGetSubCatgoryByMainCategoryNameReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_SUCCESS:
      return {
        loading: false,
        subCatInfo: action.payload,
      };
    case GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetAllProductsBySubCategoryNameReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_SUCCESS:
      return {
        loading: false,
        allProdSub: action.payload,
      };
    case GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_FAIL:
      return {
        loading: false,
        allProdSub: action.payload,
      };
    default:
      return state;
  }
};

export const userGetSubCategoryBySubCategoryNameReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_SUCCESS:
      return {
        loading: false,
        subCatName: action.payload,
      };
    case GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userAddToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        loading: false,
        cartData: action.payload,
      };
    case ADD_TO_CART_FAIL:
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

// export const userUpdateCartByProductReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_CART_BY_PRODUCT_REQUEST:
//       return {
//         loading: true,
//         success: false,
//       };
//     case UPDATE_CART_BY_PRODUCT_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         message: action.payload,
//       };
//     case UPDATE_CART_BY_PRODUCT_FAIL:
//       return {
//         loading: false,
//         success: false,
//         error: action.payload,
//       };
//     case USER_LOGOUT:
//       return {};
//     default:
//       return state;
//   }
// };

export const userGetCartDataByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_DATA_BY_USER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case GET_CART_DATA_BY_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        cartData: action.payload,
      };
    case GET_CART_DATA_BY_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_CART_DATA_BY_USER_RESET:
      return {
        // success: false,
        // cartData: {},
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userGetProductByIdReducer = (
  state = {
    prodInfo: [],
    loading: false,
    error: {},
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID_REQUEST:
      return {
        loading: true,
        prodInfo: [],
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        loading: false,
        prodInfo: [...state.prodInfo, action.payload],
      };
    case GET_PRODUCT_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_BY_ID_RESET:
      return {
        prodInfo: [],
      };
    default:
      return state;
  }
};

export const userRemoveProductFromCartReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_FROM_CART_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_PRODUCT_FROM_CART_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_PRODUCT_FROM_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetShippingAddressByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHIPPING_ADDRESS_BY_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_SHIPPING_ADDRESS_BY_USER_SUCCESS:
      return {
        loading: false,
        address: action.payload,
      };
    case GET_SHIPPING_ADDRESS_BY_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_SHIPPING_ADDRESS_BY_USER_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userAddShippingAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SHIPPING_ADDRESS_REQUEST:
      return {
        loading: true,
      };
    case ADD_SHIPPING_ADDRESS_SUCCESS:
      return {
        loading: false,
        addressData: action.payload,
      };
    case ADD_SHIPPING_ADDRESS_FAIL:
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

export const userRemoveShippingAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SHIPPING_ADDRESS_REQUEST:
      return {
        loading: true,
      };
    case DELETE_SHIPPING_ADDRESS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_SHIPPING_ADDRESS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetShippingAddressByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHIPPING_ADDRESS_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_SHIPPING_ADDRESS_BY_ID_SUCCESS:
      return {
        loading: false,
        address: action.payload,
      };
    case GET_SHIPPING_ADDRESS_BY_ID_FAIL:
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

export const userAddOrderMasterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ORDER_MASTER_REQUEST:
      return {
        loading: true,
      };
    case ADD_ORDER_MASTER_SUCCESS:
      return {
        loading: false,
        orderData: action.payload,
      };
    case ADD_ORDER_MASTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_ORDER_MASTER_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRemoveCartDataByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_CART_DATA_BY_USER_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_CART_DATA_BY_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_CART_DATA_BY_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userAddOrderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case ADD_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetailData: action.payload,
      };
    case ADD_ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_ORDER_DETAILS_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userOrderMasterReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_MASTER_REQUEST:
      return {
        loading: true,
      };
    case GET_ORDER_MASTER_SUCCESS:
      return {
        loading: false,
        orderMasterData: action.payload,
      };
    case GET_ORDER_MASTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_MASTER_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userOrderDetailsByOrderMasterReducer = (
  state = {
    orderDetailsData: [],
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        orderDetailsData: [],
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetailsData: [...state.orderDetailsData, action.payload],
      };
    case GET_ORDER_MASTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_MASTER_RESET:
      return {
        orderDetailsData: [],
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userAddToMyCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_MY_COLLECTION_REQUEST:
      return {
        loading: true,
      };
    case ADD_PRODUCT_TO_MY_COLLECTION_SUCCESS:
      return {
        loading: false,
        myCollectionData: action.payload,
      };
    case ADD_PRODUCT_TO_MY_COLLECTION_FAIL:
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

export const userGetProductFromMyCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FROM_MYCOLLECTION_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case GET_PRODUCTS_FROM_MYCOLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        myCollection: action.payload,
      };
    case GET_PRODUCTS_FROM_MYCOLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCTS_FROM_MYCOLLECTION_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRemoveProductFromCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_FROM_MYCOLLECTION_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_PRODUCT_FROM_MYCOLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_PRODUCT_FROM_MYCOLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userAddReviewForProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_FOR_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case ADD_REVIEW_FOR_PRODUCT_SUCCESS:
      return {
        loading: false,
        reviewInfo: action.payload,
      };
    case ADD_REVIEW_FOR_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_REVIEW_FOR_PRODUCT_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userChangePasswordReducer = (
  state = { loading: false, success: false, changePasswordData: {} },
  action
) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
        changePasswordData: action.payload,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userDeactivateUserAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case DEACTIVATE_USER_ACCOUNT_REQUEST:
      return {
        loading: true,
      };
    case DEACTIVATE_USER_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DEACTIVATE_USER_ACCOUNT_FAIL:
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

export const userGetAllRandomProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RANDOM_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_RANDOM_PRODUCT_SUCCESS:
      return {
        loading: false,
        allProducts: action.payload,
      };
    case GET_ALL_RANDOM_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userLikeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case LIKE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        likeInfo: action.payload,
      };
    case LIKE_PRODUCT_FAIL:
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

export const userGetFeaturedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FEATURED_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case GET_FEATURED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        featuredProducts: action.payload,
      };
    case GET_FEATURED_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
