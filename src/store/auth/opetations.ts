import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInFormData } from "../../components/input/inputVariables";
import { FormData } from "../../components/input/inputVariables";
import { CreateUserData } from "../../components/input/inputVariables";
import { useState } from "react";
import { DeviceFormData } from "../../components/input/inputVariables";

const setAuthHeader = (accessToken: any) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, surname, email, role, password, country, city, address, phone_number }: CreateUserData) => {
    try {
      const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/auth/register", {
        name,
        surname,
        email,
        role,
        password,
        country,
        city,
        address,
        phone_number,
      });
      return respons.data;
    } catch (e: any) {
      return e.message;
    }
  }
);

export const logIn = createAsyncThunk("auth/login", async ({ email, password }: SignInFormData) => {
  try {
    const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/auth/login", {
      email,
      password,
    });
    setAuthHeader(respons.data.accessToken);
    return respons.data;
  } catch (e: any) {
    return e.message;
  }
});

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    clearAuthHeader();
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.code);
  }
});

export const getData = createAsyncThunk("auth/getData", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.accessToken;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get("http://intern-project-backend.atwebpages.com/api/users/user-info", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const createUser = createAsyncThunk(
  "auth/createuser",
  async ({ name, surname, email, role, password, country, city, address, phone_number }: CreateUserData, thunkAPI) => {
    const [addGridActive, setAddGridActive] = useState(false);
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/users/create-user", {
        name,
        surname,
        email,
        role,
        password,
        country,
        city,
        address,
        phone_number,
      });
      const enableAddGrid = () => {
        if (role == "Super admin") {
          setAddGridActive(true);
        }
      };
      enableAddGrid();
      return respons.data;
    } catch (e: any) {
      return e.message;
    }
  }
);

export const createDevice = createAsyncThunk(
  "auth/createdevice",
  async ({ name, device_type, country, city, address, serial_number }: DeviceFormData, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/devices/create", {
        owner_id: Math.random(),
        name,
        device_type,
        country,
        city,
        address,
        serial_number,
        phase_active: "true",
        phase_type: "laptop",
        sum_power: Math.random(),
      });
      return respons.data;
    } catch (e: any) {
      return e.message;
    }
  }
);
