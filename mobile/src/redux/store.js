import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../redux/auth/auth-slice";

const rootReducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
