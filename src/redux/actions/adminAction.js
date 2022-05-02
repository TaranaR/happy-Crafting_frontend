import {
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_LOGOUT,
  GET_ALL_SELLERS_REQUEST,
  GET_ALL_SELLERS_SUCCESS,
  GET_ALL_SELLERS_FAIL,
  UPDATE_SELLER_STATUS_REQUEST,
  UPDATE_SELLER_STATUS_SUCCESS,
  UPDATE_SELLER_STATUS_FAIL,
  UPDATE_USER_STATUS_SUCCESS,
  UPDATE_USER_STATUS_REQUEST,
  UPDATE_USER_STATUS_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  CREATE_MAIN_CATEGORY_REQUEST,
  CREATE_MAIN_CATEGORY_SUCCESS,
  CREATE_MAIN_CATEGORY_FAIL,
  DELETE_MAIN_CATEGORY_REQUEST,
  DELETE_MAIN_CATEGORY_SUCCESS,
  DELETE_MAIN_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_FAIL,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_FAIL,
  CREATE_TYPE_OF_PRODUCT_REQUEST,
  CREATE_TYPE_OF_PRODUCT_SUCCESS,
  CREATE_TYPE_OF_PRODUCT_FAIL,
  DELETE_TYPE_OF_PRODUCT_REQUEST,
  DELETE_TYPE_OF_PRODUCT_SUCCESS,
  DELETE_TYPE_OF_PRODUCT_FAIL,
  GET_ALL_SUB_CATEGORY_REQUEST,
  GET_ALL_SUB_CATEGORY_SUCCESS,
  GET_ALL_SUB_CATEGORY_FAIL,
  GET_ALL_TYPE_OF_PRODUCT_REQUEST,
  GET_ALL_TYPE_OF_PRODUCT_SUCCESS,
  GET_ALL_TYPE_OF_PRODUCT_FAIL,
} from "../../constants/adminConstants";
import axios from "axios";
import { LOCAL_URL } from "../../constants/global";
import { USER_LOGOUT } from "../../constants/userConstants";

export const getAdminDetail = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DETAILS_REQUEST });

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
      `${LOCAL_URL}/api/adminapi/getAdminDetail/`,
      config
    );

    dispatch({
      type: ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const getAllSellerDetail = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SELLERS_REQUEST });

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
      `${LOCAL_URL}/api/adminapi/getSellerDetail/`,
      config
    );

    dispatch({
      type: GET_ALL_SELLERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SELLERS_FAIL,
      payload: error,
    });
  }
};

export const updateSellerStatus = (seller) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SELLER_STATUS_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.put(
      `${LOCAL_URL}/api/adminapi/updateSellerStatus/`,
      seller,
      config
    );
    dispatch({
      type: UPDATE_SELLER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_SELLER_STATUS_FAIL, payload: error });
  }
};

export const getAllUserDetail = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST });

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
      `${LOCAL_URL}/api/adminapi/getUsersDetail/`,
      config
    );

    dispatch({
      type: GET_ALL_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload: error,
    });
  }
};

export const updateUserStatus = (user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_STATUS_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    console.log(token);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.put(
      `${LOCAL_URL}/api/adminapi/updateUserStatus/`,
      user,
      config
    );
    dispatch({
      type: UPDATE_USER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_USER_STATUS_FAIL, payload: error });
  }
};

export const createMainCategory = (main) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MAIN_CATEGORY_REQUEST,
    });

    //const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/adminapi/createMainCategory/`,
      main,
      config
    );

    dispatch({
      type: CREATE_MAIN_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MAIN_CATEGORY_FAIL,
      palyload: error,
    });
  }
};

export const deleteMainCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MAIN_CATEGORY_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/adminapi/deleteMainCategory/${id}`,
      config
    );

    dispatch({
      type: DELETE_MAIN_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MAIN_CATEGORY_FAIL,
      palyload: error,
    });
  }
};

export const createSubCategory = (sub) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SUB_CATEGORY_REQUEST,
    });

    //const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/adminapi/createSubCategory/`,
      sub,
      config
    );

    dispatch({
      type: CREATE_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SUB_CATEGORY_FAIL,
      palyload: error,
    });
  }
};

export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SUB_CATEGORY_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/adminapi/deleteSubCategory/${id}`,
      config
    );

    dispatch({
      type: DELETE_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SUB_CATEGORY_FAIL,
      palyload: error,
    });
  }
};

export const createTypeOfProduct = (type) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TYPE_OF_PRODUCT_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/adminapi/createTypeOfProduct/`,
      type,
      config
    );

    dispatch({
      type: CREATE_TYPE_OF_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TYPE_OF_PRODUCT_FAIL,
      palyload: error,
    });
  }
};

export const deleteTypeOfProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TYPE_OF_PRODUCT_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/adminapi/deleteTypeOfProduct/${id}`,
      config
    );

    dispatch({
      type: DELETE_TYPE_OF_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TYPE_OF_PRODUCT_FAIL,
      palyload: error,
    });
  }
};

export const getAllSubCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SUB_CATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/adminapi/getSubCategory/`,
      config
    );

    dispatch({ type: GET_ALL_SUB_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SUB_CATEGORY_FAIL,
      payload: error,
    });
  }
};

export const getAllTypeOfProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TYPE_OF_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/adminapi/getTypeOfProduct/`,
      config
    );

    dispatch({ type: GET_ALL_TYPE_OF_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TYPE_OF_PRODUCT_FAIL,
      payload: error,
    });
  }
};

// export const getMainCatName = async (id) => {
//   try {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.get(
//       `${LOCAL_URL}/api/adminapi/getMainCatName/${id}`,
//       config
//     );

//     // const { data } = await axios.get(
//     //   `${LOCAL_URL}/api/adminapi/getMainCatName/${id}`,
//     //   config
//     // );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
