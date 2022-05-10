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
} from "../../constants/userConstants";
import { LOCAL_URL } from "../../constants/global";
import { ADMIN_DETAILS_RESET } from "../../constants/adminConstants";

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

    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
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
