import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
} from "../reducers/userReducer";

import {
  sellerCreateShopReducer,
  sellerGetTypeOfProductReducer,
  sellerCreateProductReducer,
  sellerProfileReducer,
  sellerUpdateProfileReducer,
  sellerGetProductBySellerReducer,
  sellerGetMainCategoryReducer,
  sellerGetSubCategoryReducer,
  sellerUpdateProductReducer,
  sellerDeleteProductReducer,
} from "../reducers/sellerReducer";

import {
  adminDetailReducer,
  getAllSellerDetailsReducer,
  updateSellerStatusReducer,
  getAllUserDetailsReducer,
  updateUserStatusReducer,
  adminCreateMainCategoryReducer,
  adminDeleteMainCategoryReducer,
  adminCreateSubCategoryReducer,
  adminDeleteSubCategoryReducer,
  adminCreateTypeOfProductReducer,
  adminDeleteTypeOfProductReducer,
  adminGetAllSubCategoryReducer,
} from "../reducers/adminReducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  sellerCreateShop: sellerCreateShopReducer,
  sellerCreateProduct: sellerCreateProductReducer,
  sellerProfile: sellerProfileReducer,
  sellerUpdateProfile: sellerUpdateProfileReducer,
  sellerProductBySeller: sellerGetProductBySellerReducer,
  sellerUpdateProduct: sellerUpdateProductReducer,
  sellerDeleteProduct: sellerDeleteProductReducer,
  sellerGetTypeOfProduct: sellerGetTypeOfProductReducer,
  sellerGetMainCategory: sellerGetMainCategoryReducer,
  sellerGetSubCategory: sellerGetSubCategoryReducer,
  adminDetail: adminDetailReducer,
  getAllSellerDetails: getAllSellerDetailsReducer,
  updateSellerStatus: updateSellerStatusReducer,
  getAllUserDetails: getAllUserDetailsReducer,
  updateUserStatus: updateUserStatusReducer,
  adminCreateMainCategory: adminCreateMainCategoryReducer,
  adminDeleteMainCategory: adminDeleteMainCategoryReducer,
  adminCreateSubCategory: adminCreateSubCategoryReducer,
  adminDeleteSubCategory: adminDeleteSubCategoryReducer,
  adminCreateTypeOfProduct: adminCreateTypeOfProductReducer,
  adminDeleteTypeOfProduct: adminDeleteTypeOfProductReducer,
  adminGetAllSubCategory: adminGetAllSubCategoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
