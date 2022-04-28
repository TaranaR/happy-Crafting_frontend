import {
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_LOGOUT,
  GET_ALL_SELLERS_REQUEST,
  GET_ALL_SELLERS_SUCCESS,
  GET_ALL_SELLERS_FAIL,
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
