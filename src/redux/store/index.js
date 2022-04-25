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
} from "../reducers/sellerReducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  sellerCreateShop: sellerCreateShopReducer,
  sellerGetTypeOfProduct: sellerGetTypeOfProductReducer,
  sellerCreateProduct: sellerCreateProductReducer,
  sellerProfile: sellerProfileReducer,
  sellerUpdateProfile: sellerUpdateProfileReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
