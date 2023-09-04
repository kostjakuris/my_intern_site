import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInFormData } from "../../components/input/inputVariables";
import { FormData } from "../../components/input/inputVariables";
import { accessToken } from "./selectors";
import { useNavigate } from "react-router-dom";

const setAuthHeader = (accessToken: any) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, surname, email, role, password, country, city, address, phone_number }: FormData) => {
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
      return respons;
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
    return respons;
  } catch (e: any) {
    return e.message;
  }
});

export const getData = createAsyncThunk("auth/getData", async () => {
  const persistedAccessToken = accessToken;

  if (persistedAccessToken === null) {
    return "Unable to fetch user";
  }

  try {
    setAuthHeader(persistedAccessToken);
    const res = await axios.get("http://intern-project-backend.atwebpages.com/api/users/user-info", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (e: any) {
    return e.message;
  }
});
