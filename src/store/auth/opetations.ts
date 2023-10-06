import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createGroupData, CreateUserGridData, SignInFormData} from "../../components/input/inputVariables";
import {FormData} from "../../components/input/inputVariables";
import {CreateUserData} from "../../components/input/inputVariables";
import {ValuesData} from "../../components/input/inputVariables";
import {useState} from "react";
import {DeviceFormData} from "../../components/input/inputVariables";
import {persistor} from "../store";

const setAuthHeader = (accessToken: any) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
    "auth/register",
    async ({name, surname, email, password, country, city, address, phone_number}: CreateUserData, thunkAPI) => {
        try {
            const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/auth/register", {
                name,
                surname,
                email,
                role : "customer",
                password,
                country,
                city,
                address,
                phone_number,
            });
            return respons.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const logIn = createAsyncThunk("auth/login", async ({email, password}: SignInFormData, thunkAPI) => {
    try {
        const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/auth/login", {
            email,
            password,
        });
        setAuthHeader(respons.data.accessToken);
        return respons.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const getData = createAsyncThunk("auth/getData", async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;


    try {
        setAuthHeader(persistedToken);
        const res = await axios.get("http://intern-project-backend.atwebpages.com/api/users/user-info", {
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json",
            },
        });
        return res.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();

    try {
        await persistor.purge();
        clearAuthHeader();
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});


export const getUsers = createAsyncThunk("auth/getUsers", async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;

    try {
        setAuthHeader(persistedToken);
        const res = await axios.get("http://intern-project-backend.atwebpages.com/api/users", {});
        return res.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const createUser = createAsyncThunk(
    "auth/createUser",
    async ({
               name,
               surname,
               email,
               role,
               password,
               country,
               city,
               address,
               administrator_id
           }: CreateUserGridData, thunkAPI) => {
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
                administrator_id,
                phone_number : "3 (554) 123-4517",
            });
            return respons.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const editUser = createAsyncThunk(
    "auth/editUser",
    async ({name, surname, email, password, country, city, address}: ValuesData, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const persistedToken = state.auth.accessToken;
        const id = state.auth.user.id;

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
            window.location.reload();
            return respons.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const editGridUser = createAsyncThunk(
    "auth/editGridUser",
    async ({id, name, surname, email, password, country, city, address}: ValuesData, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const persistedToken = state.auth.accessToken;
        console.log(id);

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
            window.location.reload();
            return respons.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
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
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json",
            },
        });
        return res.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const createDevice = createAsyncThunk(
    "auth/createDevice",
    async ({name, device_type, address, serial_number}: DeviceFormData, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const persistedToken = state.auth.accessToken;
        try {
            setAuthHeader(persistedToken);
            const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/devices/create", {
                owner_id : 3,
                name,
                device_type,
                address,
                serial_number,
                phase_active : true,
                phase_type : "laptop",
                sum_power : 155.9,
                group_id : 1,
                location : "{}",
                administrator_id : 2,
            });
            window.location.reload();
            return respons.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const deleteDevice = createAsyncThunk("auth/deletedevice", async (id: number, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
        setAuthHeader(persistedToken);
        const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/devices/delete", {
            data : {
                id,
            },
        });
        window.location.reload();
        return respons.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const deleteUser = createAsyncThunk("auth/deleteuser", async (id: number, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
        setAuthHeader(persistedToken);
        const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/users/delete-user", {
            data : {
                id,
            },
        });
        window.location.reload();
        return respons.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const editDevice = createAsyncThunk(
    "auth/editDevice",
    async ({id, name, device_type, country, email, city, address, serial_number}: DeviceFormData, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const persistedToken = state.auth.accessToken;
        try {
            setAuthHeader(persistedToken);
            const respons = await axios.put("http://intern-project-backend.atwebpages.com/api/devices/edit", {
                id,
                name,
                device_type,
                email,
                country,
                city,
                address,
                serial_number,
            });
            window.location.reload();
            return respons.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getGroups = createAsyncThunk("auth/getGroups",
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const persistedToken = state.auth.accessToken;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue("Unable to fetch user");
        }

        try {
            setAuthHeader(persistedToken);
            const res = await axios.get("http://intern-project-backend.atwebpages.com/api/groups", {
                headers : {
                    "Content-Type" : "application/json",
                    Accept : "application/json",
                },
            });
            return res.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    });

export const createGroup = createAsyncThunk("auth/createGroup",
    async ({name}: createGroupData, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const persistedToken = state.auth.accessToken;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue("Unable to fetch user");
        }

        try {
            setAuthHeader(persistedToken);
            const res = await axios.post("http://intern-project-backend.atwebpages.com/api/groups/create", {
                name
            });
            return res.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    });

export const editGroup = createAsyncThunk("auth/editGroup", async (id: number, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
        setAuthHeader(persistedToken);
        const respons = await axios.put("http://intern-project-backend.atwebpages.com/api/groups/edit", {
            id,
        });
        window.location.reload();
        return respons.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const deleteGroup = createAsyncThunk("auth/deleteGroup", async (id: number, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    try {
        setAuthHeader(persistedToken);
        const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/groups/delete", {
            data : {
                id,
            },
        });
        window.location.reload();
        return respons.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});
