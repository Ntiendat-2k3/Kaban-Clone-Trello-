import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import cardModalReducer from "../features/CardModal/cardModalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cardModal: cardModalReducer,
});
export default rootReducer;
