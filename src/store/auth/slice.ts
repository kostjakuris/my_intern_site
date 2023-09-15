import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  getData,
  logOut,
  createUser,
  createDevice,
  deleteDevice,
  editDevice,
  editUser,
refreshUser,
} from "../auth/opetations";
import { DeviceFormData } from "../../components/input/inputVariables";
import {string} from "yup";

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
  avatar?: string | undefined;
};

export type AuthState = {
  signInUser: SignInUser;
  user: User;
  newUser: User;
  newDevice: DeviceFormData;
  refreshToken: string | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  message: null;
};
export const initialState: AuthState = {
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
    avatar: undefined,
  },

  newUser: {
    name: null,
    surname: null,
    email: null,
    role: null,
    password: null,
    country: null,
    city: null,
    address: null,
    phone_number: null,
    avatar: undefined,
  },

  newDevice: {
    id: undefined,
    owner_id: null,
    name: null,
    device_type: null,
    email: null,
    serial_number: null,
    country: null,
    city: null,
    address: null,
    phase_active: null,
    phase_type: null,
    sum_power: null,
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


      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.refreshToken = null;

      })

      .addCase(logOut.rejected, (state,) => {
        state.isRefreshing = false;
      })

      .addCase(getData.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = action.payload.user;
      })
      .addCase(getData.rejected, (state,action) => {
        state.isRefreshing = false;

      })

      .addCase(createUser.pending, (state) => {
        state.isRefreshing = true;
      })

      .addCase(createUser.fulfilled, (state, action: PayloadAction<{ newUser: User }>) => {
        state.newUser = action.payload.newUser;
        state.isLoading = false;
      })

      .addCase(createUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addCase(createDevice.pending, (state) => {
        state.isRefreshing = true;
      })

      .addCase(createDevice.fulfilled, (state, action: PayloadAction<{ newDevice: DeviceFormData }>) => {
        state.newDevice = action.payload.newDevice;
        state.isLoading = false;
      })

      .addCase(createDevice.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addCase(deleteDevice.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(editUser.pending, (state) => {
        state.isRefreshing = true;
      })

      .addCase(editUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })

      .addCase(editUser.rejected, (state) => {
        state.isRefreshing = false;
      })

        .addCase(refreshUser.pending, (state, action) => {
          state.isRefreshing = true;
        })
        .addCase(refreshUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.user = action.payload.user;
        })
        .addCase(refreshUser.rejected, (state, action) => {
          state.isRefreshing = false;
        })
  },
});

export default authSlice.reducer;
