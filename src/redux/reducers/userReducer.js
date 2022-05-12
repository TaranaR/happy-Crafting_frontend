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
        user: {},
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

export const userGetUserByIdReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case GET_USER_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_USER_BY_ID_RESET:
      return {
        userInfo: {},
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
  // console.log("---------------", state);
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

export const userGetCartDataByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_DATA_BY_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_CART_DATA_BY_USER_SUCCESS:
      return {
        loading: false,
        cartData: action.payload,
      };
    case GET_CART_DATA_BY_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_CART_DATA_BY_USER_RESET:
      return {
        cartData: {},
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
