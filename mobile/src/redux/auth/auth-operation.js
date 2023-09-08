import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const signupAuthThunk = createAsyncThunk(
  "auth/signupAuthThunk",
  async (data, { rejectWithValue }) => {
    try {
      const { nickname, email, password } = data;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: nickname });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const loginAuthThunk = createAsyncThunk(
  "users/loginAuthThunk",
  async (user, { rejectWithValue }) => {
    try {
      const { uid, email, password } = user;
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password,
        uid
      );
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logoutAuthThunk = createAsyncThunk(
  "users/logoutAuthThunk",
  async (_, thunkAPI) => {
    try {
      const result = await signOut(auth);

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
