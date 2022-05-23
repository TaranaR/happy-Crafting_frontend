import {
  CREATE_SHOP_REQUEST,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_FAIL,
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
  SELLER_UPDATE_PROFILE_REQUEST,
  SELLER_UPDATE_PROFILE_SUCCESS,
  SELLER_UPDATE_PROFILE_FAIL,
  GET_PRODUCTBYSELLER_REQUEST,
  GET_PRODUCTBYSELLER_SUCCESS,
  GET_PRODUCTBYSELLER_FAIL,
  SELLER_PRODUCT_DELETE_REQUEST,
  SELLER_PRODUCT_DELETE_SUCCESS,
  SELLER_PRODUCT_DELETE_FAIL,
  SELLER_PRODUCT_UPDATE_SUCCESS,
  SELLER_PRODUCT_UPDATE_FAIL,
  SELLER_PRODUCT_UPDATE_REQUEST,
  GET_ORDERED_PRODUCT_SELLER_REQUEST,
  GET_ORDERED_PRODUCT_SELLER_SUCCESS,
  GET_ORDERED_PRODUCT_SELLER_FAIL,
  ORDER_DISPATCHED_BY_SELLER_REQUEST,
  ORDER_DISPATCHED_BY_SELLER_SUCCESS,
  ORDER_DISPATCHED_BY_SELLER_FAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
} from "../../constants/sellerConstants";
import axios from "axios";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  LOCAL_URL,
} from "../../constants/global";
import emailjs from "@emailjs/browser";

export const createSellerShop = (shop) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SHOP_REQUEST,
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
      `${LOCAL_URL}/api/sellerapi/createShop/`,
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

    // const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/sellerapi/uploadShopLogo/`,
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

export const getMainCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MAINCATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/adminapi/getMainCategory/`,
      config
    );

    dispatch({ type: GET_MAINCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MAINCATEGORY_FAIL,
      payload: error,
    });
  }
};

export const getSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBCATEGORY_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/adminapi/getSubCategory/${id}`,
      config
    );

    dispatch({ type: GET_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORY_FAIL,
      payload: error,
    });
  }
};

export const getTypeOfProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TYPEOFPROD_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/adminapi/getTypeOfProduct/${id}`,
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

    // const { token } = store.getState().userLogin;
    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_URL}/api/sellerapi/createProduct/`,
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

    //const { token } = store.getState().userLogin;
    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/sellerapi/sellerprofile/`,
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

    // const { token } = store.getState().userLogin;
    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.put(
      `${LOCAL_URL}/api/sellerapi/updatesellerprofile/`,
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

export const getProductsBySeller = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTBYSELLER_REQUEST });

    // const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/sellerapi/getproducts/`,
      config
    );

    dispatch({ type: GET_PRODUCTBYSELLER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTBYSELLER_FAIL,
      payload: error,
    });
  }
};

export const updateSellerProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: SELLER_PRODUCT_UPDATE_REQUEST,
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
      `${LOCAL_URL}/api/sellerapi/updatesellerproduct/`,
      product,
      config
    );

    dispatch({
      type: SELLER_PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_PRODUCT_UPDATE_FAIL,
      palyload: error,
    });
  }
};

export const deleteSellerProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELLER_PRODUCT_DELETE_REQUEST,
    });

    // const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.delete(
      `${LOCAL_URL}/api/sellerapi/deleteproduct/${id}`,
      config
    );

    dispatch({
      type: SELLER_PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_PRODUCT_DELETE_FAIL,
      palyload: error,
    });
  }
};

export const getOrderedProductBySeller = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERED_PRODUCT_SELLER_REQUEST });

    // const { token } = store.getState().userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_URL}/api/sellerapi/getOrderedProductBySeller/`,
      config
    );

    dispatch({ type: GET_ORDERED_PRODUCT_SELLER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDERED_PRODUCT_SELLER_FAIL,
      payload: error,
    });
  }
};

export const orderDispatchedBySeller = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DISPATCHED_BY_SELLER_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const order = {
      isDispatched: true,
    };

    const { data } = await axios.put(
      `${LOCAL_URL}/api/sellerapi/updateOrdermaster/${orderId}`,
      order,
      config
    );

    dispatch({
      type: ORDER_DISPATCHED_BY_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DISPATCHED_BY_SELLER_FAIL,
      palyload: error,
    });
  }
};

export const sendEmail = (templateParams) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_REQUEST });

    const { text } = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    dispatch({ type: SEND_EMAIL_SUCCESS, payload: text });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_FAIL, payload: error });
  }
};

export const orderDelivered = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELIVERED_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };

    const order = {
      isDelivered: true,
      isPaid: true,
    };

    const { data } = await axios.put(
      `${LOCAL_URL}/api/sellerapi/updateOrdermaster/${orderId}`,
      order,
      config
    );

    dispatch({
      type: ORDER_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      palyload: error,
    });
  }
};
