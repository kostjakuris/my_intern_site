import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInFormData } from "../../components/input/inputVariables";
import { FormData } from "../../components/input/inputVariables";
import { CreateUserData } from "../../components/input/inputVariables";
import { ValuesData } from "../../components/input/inputVariables";
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
  async ({ name, surname, email, password, country, city, address, phone_number }: CreateUserData) => {
    try {
      const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/auth/register", {
        name,
        surname,
        email,
        role: "customer",
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
  const state: any = thunkAPI.getState();

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

export const getUsers = createAsyncThunk("auth/getUsers", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.accessToken;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get("http://intern-project-backend.atwebpages.com/api/users", {
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
  "auth/createUser",
  async ({ name, surname, email, role, password, country, city, address, phone_number }: ValuesData, thunkAPI) => {
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
      console.log(name, surname, email, role, password, country, city, address, phone_number);

      const enableAddGrid = () => {
        if (role == "Super admin") {
          setAddGridActive(true);
        }
      };
      enableAddGrid();
      return respons.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ name, surname, email, password, country, city, address }: ValuesData, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    const id =state.auth.user.id

    try {
      setAuthHeader(persistedToken);
      const respons = await axios.put("http://intern-project-backend.atwebpages.com/api/users/update-user-info", {
        id,
        name,
        surname,
        email,
        password,
        country,
        city,
        address,
      });
      return respons.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getDevices = createAsyncThunk("auth/getDevices", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.accessToken;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get("http://intern-project-backend.atwebpages.com/api/devices", {
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

export const createDevice = createAsyncThunk(
  "auth/createDevice",
  async ({ name, device_type, address, serial_number }: DeviceFormData, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/devices/create", {
        owner_id: 3,
        name,
        device_type,
        address,
        serial_number,
        phase_active: true,
        phase_type: "laptop",
        sum_power: 155.9,
        group_id: 1,
        location: "{}",
        administrator_id: 2,
      });
      return respons.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteDevice = createAsyncThunk("auth/deletedevice", async (id: number, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.accessToken;
  try {
    setAuthHeader(persistedToken);
    const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/devices/delete", {
      data: {
        id,
      },
    });
    return respons.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteUser = createAsyncThunk("auth/deleteuser", async (id: number, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.accessToken;
  try {
    setAuthHeader(persistedToken);
    const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/users/delete-user", {
      data: {
        id,
      },
    });
    return respons.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const editDevice = createAsyncThunk(
  "auth/editDevice",
  async ({ id, name, device_type, country, email, city, address, serial_number }: DeviceFormData, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
      setAuthHeader(persistedToken);
      const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/devices/edit", {
        id,
        name,
        device_type,
        email,
        country,
        city,
        address,
        serial_number,
      });
      return respons.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getGroups = createAsyncThunk("auth/getGroups", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.accessToken;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get("http://intern-project-backend.atwebpages.com/api/groups", {
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
