import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register, logIn, getData } from "../auth/opetations";

type SignInUser = {
  email: string | null;
  password: string | null;
};

type User = {
  name: string | null;
  surname: string | null;
  email: string | null;
  role: string | null;
  password: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  phone_number: string | null;
};

export type AuthState = {
  signInUser: SignInUser;
  user: User;
  refreshToken: string | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  message: string | null;
};
const initialState: AuthState = {
  signInUser: {
    email: null,
    password: null,
  },
  user: {
    name: null,
    surname: null,
    email: null,
    role: null,
    password: null,
    country: null,
    city: null,
    address: null,
    phone_number: null,
  },
  refreshToken: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        logIn.fulfilled,
        (state, action: PayloadAction<{ signInUser: SignInUser; refreshToken: string; accessToken: string }>) => {
          state.signInUser = action.payload.signInUser;
          state.isLoggedIn = true;
          state.refreshToken = action.payload.refreshToken;
          state.accessToken = action.payload.accessToken;
          state.isLoading = false;
        }
      )
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getData.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = action.payload.user;
      })
      .addCase(getData.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
