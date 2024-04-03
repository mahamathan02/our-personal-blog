import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const rootreducer = combineReducers({
  user: userReducer,
});

export default rootreducer;
