import axios from "axios";
import "../../constants/userConstants";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  GET_RANDOM_4_PRODUCTS_REQUEST,
  GET_RANDOM_4_PRODUCTS_SUCCESS,
  GET_RANDOM_4_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_SELLER_BY_ID_REQUEST,
  GET_SELLER_BY_ID_SUCCESS,
  GET_SELLER_BY_ID_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_RANDOM_SUB_CATEGORY_REQUEST,
  GET_RANDOM_SUB_CATEGORY_SUCCESS,
  GET_RANDOM_SUB_CATEGORY_FAIL,
  GET_RANDOM_PRODUCT_BY_CATEGORY_REQUEST,
  GET_RANDOM_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_RANDOM_PRODUCT_BY_CATEGORY_FAIL,
  GET_ALL_PRODUCT_BY_CATEGORY_REQUEST,
  GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_ALL_PRODUCT_BY_CATEGORY_FAIL,
  GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_REQUEST,
  GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_FAIL,
  GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_SUCCESS,
  GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_REQUEST,
  GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_SUCCESS,
  GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_FAIL,
  GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_REQUEST,
  GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_SUCCESS,
  GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_FAIL,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_DATA_BY_USER_REQUEST,
  GET_CART_DATA_BY_USER_SUCCESS,
  GET_CART_DATA_BY_USER_FAIL,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  REMOVE_PRODUCT_FROM_CART_REQUEST,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART_FAIL,
  UPDATE_CART_BY_PRODUCT_REQUEST,
  UPDATE_CART_BY_PRODUCT_SUCCESS,
  UPDATE_CART_BY_PRODUCT_FAIL,
  GET_SHIPPING_ADDRESS_BY_USER_REQUEST,
  GET_SHIPPING_ADDRESS_BY_USER_SUCCESS,
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
  GET_ORDER_MASTER_REQUEST,
  GET_ORDER_MASTER_SUCCESS,
  GET_ORDER_MASTER_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  ADD_PRODUCT_TO_MY_COLLECTION_REQUEST,
  ADD_PRODUCT_TO_MY_COLLECTION_SUCCESS,
  ADD_PRODUCT_TO_MY_COLLECTION_FAIL,
  GET_PRODUCTS_FROM_MYCOLLECTION_REQUEST,
  GET_PRODUCTS_FROM_MYCOLLECTION_SUCCESS,
  GET_PRODUCTS_FROM_MYCOLLECTION_FAIL,
  REMOVE_PRODUCT_FROM_MYCOLLECTION_REQUEST,
  REMOVE_PRODUCT_FROM_MYCOLLECTION_SUCCESS,
  REMOVE_PRODUCT_FROM_MYCOLLECTION_FAIL,
  ADD_REVIEW_FOR_PRODUCT_REQUEST,
  ADD_REVIEW_FOR_PRODUCT_SUCCESS,
  ADD_REVIEW_FOR_PRODUCT_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  DEACTIVATE_USER_ACCOUNT_REQUEST,
  DEACTIVATE_USER_ACCOUNT_SUCCESS,
  DEACTIVATE_USER_ACCOUNT_FAIL,
  GET_ALL_RANDOM_PRODUCT_REQUEST,
  GET_ALL_RANDOM_PRODUCT_SUCCESS,
  GET_ALL_RANDOM_PRODUCT_FAIL,
} from "../../constants/userConstants";
import { LOCAL_URL } from "../../constants/global";
import { ADMIN_DETAILS_RESET } from "../../constants/adminConstants";
import { async } from "@firebase/util";

export const login = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/userapi/login/token/`,
      user,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.access,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("username", user["username"]);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("username");

  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: ADMIN_DETAILS_RESET,
  });
};

export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${LOCAL_URL}/api/userapi/register/`,
      user,
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    //const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));
    // const username = localStorage.getItem("username");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/profile/`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.put(
      `${LOCAL_URL}/api/userapi/updateProfile/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      palyload: error,
    });
  }
};

export const getRandom4Products = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RANDOM_4_PRODUCTS_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getRandom4Product/`,
      config
    );

    dispatch({ type: GET_RANDOM_4_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RANDOM_4_PRODUCTS_FAIL, payload: error });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getProductById/${id}`,
      config
    );

    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, payload: error });
  }
};

export const getSellerById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SELLER_BY_ID_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getSellerById/${id}`,
      config
    );

    dispatch({ type: GET_SELLER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SELLER_BY_ID_FAIL, payload: error });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_BY_ID_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getUserById/${id}`,
      config
    );

    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: { [id]: data } });
  } catch (error) {
    dispatch({ type: GET_USER_BY_ID_FAIL, payload: error });
  }
};

export const getRandomSubCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RANDOM_SUB_CATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getRandomSubCategory/`,
      config
    );

    dispatch({ type: GET_RANDOM_SUB_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RANDOM_SUB_CATEGORY_FAIL, payload: error });
  }
};

export const getRandomProductByCategory = (cat) => async (dispatch) => {
  try {
    dispatch({ type: GET_RANDOM_PRODUCT_BY_CATEGORY_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getRandomProductByCategory/${cat}`,
      config
    );
    dispatch({
      type: GET_RANDOM_PRODUCT_BY_CATEGORY_SUCCESS,
      payload: { [cat]: data },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_RANDOM_PRODUCT_BY_CATEGORY_FAIL, payload: error });
  }
};

// export const getAllProductByCategory = (cat) => async (dispatch) => {
//   try {
//     dispatch({ type: GET_ALL_PRODUCT_BY_CATEGORY_REQUEST });

//     const token = JSON.parse(localStorage.getItem("userInfo"));

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: token && `Bearer ${token.access}`,
//       },
//     };

//     const { data } = await axios.get(
//       `${LOCAL_URL}/api/userapi/getAllProductByCategory/${cat}`,
//       config
//     );
//     dispatch({
//       type: GET_ALL_PRODUCT_BY_CATEGORY_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({ type: GET_ALL_PRODUCT_BY_CATEGORY_FAIL, payload: error });
//   }
// };

export const getSubCategoryByMainCategoryName = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_REQUEST });
    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getSubCategoryByMainCategoryName/${name}`,
      config
    );

    dispatch({
      type: GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORY_BY_MAINCATEGORY_NAME_FAIL,
      palyload: error,
    });
  }
};

export const getAllProductsBySubCategoryName = (sub) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getAllProductBySubCategory/${sub}`,
      config
    );
    dispatch({
      type: GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_BY_SUB_CATEGORY_NAME_FAIL,
      payload: error,
    });
  }
};

export const getSubCategoryBySubCategoryName = (sub) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getSubCategoryBySubCategoryName/${sub}`,
      config
    );
    dispatch({
      type: GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORY_BY_SUBCATEGORY_NAME_FAIL,
      payload: error,
    });
  }
};

export const addToCart = (cart) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/userapi/addToCart/`,
      cart,
      config
    );
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAIL, payload: error });
  }
};

// export const updateCartByProduct = (prod) => async (dispatch) => {
//   console.log(prod);
//   try {
//     dispatch({ type: UPDATE_CART_BY_PRODUCT_REQUEST });

//     const token = JSON.parse(localStorage.getItem("userInfo"));

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: token && `Bearer ${token.access}`,
//       },
//     };

//     const { data } = await axios.post(
//       `${LOCAL_URL}/api/userapi/updateCartByProduct/`,
//       prod,
//       config
//     );
//     dispatch({ type: UPDATE_CART_BY_PRODUCT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: UPDATE_CART_BY_PRODUCT_FAIL, payload: error });
//   }
// };

export const getCartDataByUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_DATA_BY_USER_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getCartDataByUser/`,
      config
    );
    dispatch({
      type: GET_CART_DATA_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_DATA_BY_USER_FAIL,
      payload: error,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getProductById/${id}`,
      config
    );

    dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_BY_ID_FAIL, payload: error });
  }
};

export const removeProductFromCart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_PRODUCT_FROM_CART_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/userapi/removeProductFromCart/${id}`,
      config
    );

    dispatch({
      type: REMOVE_PRODUCT_FROM_CART_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FROM_CART_FAIL,
      palyload: error,
    });
  }
};

export const getShippingAddressByUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIPPING_ADDRESS_BY_USER_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/sellerapi/getShippingAddressByUser/`,
      config
    );
    dispatch({
      type: GET_SHIPPING_ADDRESS_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SHIPPING_ADDRESS_BY_USER_RESET,
      payload: error,
    });
  }
};

export const addShippingAddress = (shippingAdd) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SHIPPING_ADDRESS_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };
    const { data } = await axios.post(
      `${LOCAL_URL}/api/sellerapi/addShippingAddress/`,
      shippingAdd,
      config
    );
    dispatch({ type: ADD_SHIPPING_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_SHIPPING_ADDRESS_FAIL, payload: error });
  }
};

export const removeShippingAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SHIPPING_ADDRESS_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/sellerapi/deleteShippingAddress/${id}`,
      config
    );

    dispatch({
      type: DELETE_SHIPPING_ADDRESS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SHIPPING_ADDRESS_FAIL,
      palyload: error,
    });
  }
};

export const getShippingAddressById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIPPING_ADDRESS_BY_ID_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/sellerapi/getShippingAddressById/${id}`,
      config
    );
    dispatch({
      type: GET_SHIPPING_ADDRESS_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SHIPPING_ADDRESS_BY_ID_FAIL,
      payload: error,
    });
  }
};

export const addOrderMaster = (order) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ORDER_MASTER_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };
    const { data } = await axios.post(
      `${LOCAL_URL}/api/sellerapi/addOrderMaster/`,
      order,
      config
    );
    dispatch({ type: ADD_ORDER_MASTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ORDER_MASTER_FAIL, payload: error });
  }
};

export const removeCartDataByUser = () => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_CART_DATA_BY_USER_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/userapi/deleteCartDataByUser/`,
      config
    );

    dispatch({
      type: REMOVE_CART_DATA_BY_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_DATA_BY_USER_FAIL,
      palyload: error,
    });
  }
};

export const addOrderDetails = (orderDetails) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ORDER_DETAILS_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };
    const { data } = await axios.post(
      `${LOCAL_URL}/api/sellerapi/addOrderDetails/`,
      orderDetails,
      config
    );
    dispatch({ type: ADD_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ORDER_DETAILS_FAIL, payload: error });
  }
};

export const getOrderMasterByUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_MASTER_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/sellerapi/getOrderMasterByUser/`,
      config
    );
    dispatch({
      type: GET_ORDER_MASTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_MASTER_FAIL,
      payload: error,
    });
  }
};

export const getOrderDetailsByOrderMaster = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/sellerapi/getOrderDetailsByOrderMasterId/${orderId}`,
      config
    );
    dispatch({
      type: GET_ORDER_DETAILS_SUCCESS,
      payload: { [orderId]: data },
      // payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const addToMyCollection = (collection) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_TO_MY_COLLECTION_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/userapi/addToMyCollection/`,
      collection,
      config
    );
    dispatch({ type: ADD_PRODUCT_TO_MY_COLLECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_TO_MY_COLLECTION_FAIL, payload: error });
  }
};

export const getProductsFromMyCollection = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_FROM_MYCOLLECTION_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getMyCollectionByUser/`,
      config
    );
    dispatch({
      type: GET_PRODUCTS_FROM_MYCOLLECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FROM_MYCOLLECTION_FAIL,
      payload: error,
    });
  }
};

export const removeProductFromCollection = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_PRODUCT_FROM_MYCOLLECTION_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/userapi/removeProductFromMyCollection/${id}`,
      config
    );

    dispatch({
      type: REMOVE_PRODUCT_FROM_MYCOLLECTION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FROM_MYCOLLECTION_FAIL,
      palyload: error,
    });
  }
};

export const addReviewForProduct = (review) => async (dispatch) => {
  try {
    dispatch({ type: ADD_REVIEW_FOR_PRODUCT_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/userapi/createReview/`,
      review,
      config
    );
    dispatch({ type: ADD_REVIEW_FOR_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_REVIEW_FOR_PRODUCT_FAIL, payload: error });
  }
};

export const changePassword = (changePassword) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.put(
      `${LOCAL_URL}/api/userapi/changePassword/`,
      changePassword,
      config
    );

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      palyload: error,
    });
  }
};

export const deactivateUserAccount = () => async (dispatch) => {
  try {
    dispatch({
      type: DEACTIVATE_USER_ACCOUNT_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/userapi/deactivateUserAccount/`,
      config
    );

    dispatch({
      type: DEACTIVATE_USER_ACCOUNT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_USER_ACCOUNT_FAIL,
      palyload: error,
    });
  }
};

export const getAllRandomProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_RANDOM_PRODUCT_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: token && `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/userapi/getAllRandomProducts/`,
      config
    );

    dispatch({ type: GET_ALL_RANDOM_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_RANDOM_PRODUCT_FAIL, payload: error });
  }
};
