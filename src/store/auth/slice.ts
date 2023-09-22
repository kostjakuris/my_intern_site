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
  getUsers,
  getDevices,
  getGroups, createGroup
} from "../auth/opetations";
import { DeviceFormData } from "../../components/input/inputVariables";
import {persistor} from "../store";
import {PURGE} from "redux-persist";


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

type ResponseData = {
  id?: number | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  role: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type ResponseDeviceData = {
  id?: number | null;
  serial_number: string | null;
  device_type: string | null;
  owner_email:string|null;
  name: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  deviceCount?:number|null
};

type ResponseGroupsData = {
  id?: number;
  name: string | null;
  administrator_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type AuthState = {
  signInUser: SignInUser;
  user: User;
  newUser: User;
  users:ResponseData;
  devices:ResponseDeviceData;
  groups:ResponseGroupsData
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

  users: {
  id: null,
  name: null,
  surname: null,
  email: null,
  role: null,
  country: null,
  city: null,
  address: null,
  created_at: null,
  updated_at: null,
},

  devices: {
  serial_number: null,
  device_type: null,
  owner_email:null,
  name: null,
  country: null,
  city: null,
  address: null,
    deviceCount:null,
},

  groups: {
    id: undefined,
    name: null,
    administrator_id:null,
    created_at: null,
    updated_at: null,
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
  reducers: {
    clearResults(){

    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(PURGE, () => {
          return initialState;
        })

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
        state.isLoading = true;
      })

      .addCase(getData.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.isLoading = false;
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

        .addCase(getUsers.fulfilled, (state, action: PayloadAction<{ users: ResponseData }>) => {
          state.users = action.payload.users;
          state.isLoading = false;
        })

        .addCase(getDevices.fulfilled, (state, action: PayloadAction<{ devices: ResponseDeviceData }>) => {
          state.devices = action.payload.devices;
          state.isLoading = false;
        })

        .addCase(getGroups.fulfilled, (state, action: PayloadAction<{ groups: ResponseGroupsData }>) => {
          state.groups = action.payload.groups;
          state.isLoading = false;
        })

        .addCase(createGroup.fulfilled, (state, action: PayloadAction<{ groups: ResponseGroupsData }>) => {
          state.groups = action.payload.groups;
          state.isLoading = false;
        })
  },
});

export default authSlice.reducer;
