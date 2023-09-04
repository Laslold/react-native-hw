import { createSlice } from "@reduxjs/toolkit";
import {
  signupAuthThunk,
  loginAuthThunk,
  logoutAuthThunk,
} from "./auth-operation";
const initialState = {
  user: {},
  isLogin: false,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(signupAuthThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAuthThunk.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.user.email = payload.user.email;
        state.user.uid = payload.user.uid;
        state.user.nickname = payload.user.displayName;

        state.isLogin = true;
      })
      .addCase(signupAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(loginAuthThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuthThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.uid = payload.user.uid;
        state.user.email = payload.user.email;
        state.user.nickname = payload.user.displayName;

        state.isLogin = true;
      })
      .addCase(loginAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(logoutAuthThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.user = {};
      })

      .addCase(logoutAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export default authSlice.reducer;
