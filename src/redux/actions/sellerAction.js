import {
  CREATE_SHOP_REQUEST,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_FAIL,
  GET_TYPEOFPROD_SUCCESS,
  GET_TYPEOFPROD_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_DETAILS_FAIL,
  SELLER_UPDATE_PROFILE_REQUEST,
  SELLER_UPDATE_PROFILE_SUCCESS,
  SELLER_UPDATE_PROFILE_FAIL,
} from "../../constants/sellerConstants";
import axios from "axios";
import store from "../store";

export const createSellerShop = (shop) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SHOP_REQUEST,
    });

    const { token } = store.getState().userLogin;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/sellerapi/createShop/",
      shop,
      config
    );

    dispatch({
      type: CREATE_SHOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SHOP_FAIL,
      palyload: error,
    });
  }
};

export const uploadShopLogo = (shoplogo) => async (dispatch) => {
  try {
    dispatch({
      type: IMAGE_UPLOAD_REQUEST,
    });

    const { token } = store.getState().userLogin;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/sellerapi/uploadShopLogo/",
      shoplogo,
      config
    );

    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
      palyload: error,
    });
  }
};

export const getTypeOfProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TYPEOFPROD_SUCCESS });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/adminapi/getTypeOfProduct",
      config
    );

    dispatch({ type: GET_TYPEOFPROD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TYPEOFPROD_FAIL,
      payload: error,
    });
  }
};

export const createSellerProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    const { token } = store.getState().userLogin;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/sellerapi/createProduct/",
      product,
      config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      palyload: error,
    });
  }
};

export const getSellerProfile = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_DETAILS_REQUEST });

    const { token } = store.getState().userLogin;

    // const username = localStorage.getItem("username");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/sellerapi/sellerprofile/",
      config
    );

    dispatch({
      type: SELLER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const updateSellerProfile = (shop) => async (dispatch) => {
  try {
    dispatch({
      type: SELLER_UPDATE_PROFILE_REQUEST,
    });

    const { token } = store.getState().userLogin;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/sellerapi/updatesellerprofile/",
      shop,
      config
    );

    dispatch({
      type: SELLER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_UPDATE_PROFILE_FAIL,
      palyload: error,
    });
  }
};
