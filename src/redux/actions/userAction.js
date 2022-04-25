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
} from "../../constants/userConstants";
import store from "../store";

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
      "http://127.0.0.1:8000/api/userapi/login/token/",
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
      "http://127.0.0.1:8000/api/userapi/register/",
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

    const { token } = store.getState().userLogin;

    // const username = localStorage.getItem("username");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/userapi/profile/",
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

    const { token } = store.getState().userLogin;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/userapi/updateProfile/",
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
