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
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
