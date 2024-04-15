import {
    createGroupData,
    CreateUserData,
    CreateUserGridData,
    DeviceFormData,
    SignInFormData,
    ValuesData
} from "../../components/input/inputVariables";
import axios from "axios";
import {makeAutoObservable} from "mobx";
import {clearPersistedStore, makePersistable} from "mobx-persist-store";

type SignInUser = {
    email: string | null;
    password: string | null;
};

type User = {
    id: number | null;
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
    owner_email: string | null;
    name: string | null;
    country: string | null;
    city: string | null;
    address: string | null;
    group_id?: number | null;
};

type ResponseGroupsData = {
    id?: number;
    name: string | null;
    administrator_id: string | null;
    created_at: string | null;
    updated_at: string | null;
};

class MobxStore {
    signInUser: SignInUser = {
        email : null,
        password : null,
    };
    
    user: User = {
        id : null,
        name : null,
        surname : null,
        email : null,
        role : null,
        password : null,
        country : null,
        city : null,
        address : null,
        phone_number : null,
        avatar : undefined,
    };
    
    users: ResponseData[] = [{
        id : null,
        name : null,
        surname : null,
        email : null,
        role : null,
        country : null,
        city : null,
        address : null,
        created_at : null,
        updated_at : null,
    }];
    
    devices: ResponseDeviceData[] = [{
        serial_number : null,
        device_type : null,
        owner_email : null,
        name : null,
        country : null,
        city : null,
        address : null,
        group_id : null
    }];
    
    groups: ResponseGroupsData[] = [{
        id : undefined,
        name : null,
        administrator_id : null,
        created_at : null,
        updated_at : null,
    }];
    
    refreshToken: string | null = null;
    
    accessToken: string | null = null;
    
    isLoggedIn: boolean = false;
    
    isLoading: boolean = false;
    
    message: string | null = null;
    createUser = (
        async ({
                   name, surname, email, role, password, country, city, address, administrator_id
               }: CreateUserGridData) => {
            const persistedToken = this.accessToken;
            try {
                this.setAuthHeader(persistedToken);
                const respons = await axios.post(
                    "http://intern-project-backend.atwebpages.com/api/users/create-user", {
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
                this.users = respons.data.users;
                return respons.data;
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            }
        }
    );
    editUser = (
        async ({name, surname, email, password, country, city, address}: ValuesData) => {
            const persistedToken = this.accessToken;
            const id = this.user.id;
            
            try {
                this.setAuthHeader(persistedToken);
                const respons = await axios.put(
                    "http://intern-project-backend.atwebpages.com/api/users/update-user-info", {
                        id,
                        name,
                        surname,
                        email,
                        password,
                        country,
                        city,
                        address,
                    });
                this.user = respons.data.user;
                return respons.data;
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            }
        }
    );
    createDevice = (
        async ({name, device_type, address, serial_number, group_id, owner_id}: DeviceFormData) => {
            const newGroupId = group_id ? Number(group_id) : 1;
            const newOwnerId = Number(owner_id);
            const persistedToken = this.accessToken;
            try {
                this.setAuthHeader(persistedToken);
                const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/devices/create",
                    {
                        owner_id : newOwnerId,
                        name,
                        device_type,
                        address,
                        serial_number,
                        phase_active : true,
                        phase_type : "laptop",
                        sum_power : 155.9,
                        group_id : newGroupId,
                        location : "{}",
                        administrator_id : 5,
                    });
                this.devices = respons.data.devices;
                return respons.data;
                
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            }
        }
    );
    deleteDevice = (async (id: number) => {
        const persistedToken = this.accessToken;
        try {
            this.setAuthHeader(persistedToken);
            const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/devices/delete", {
                data : {
                    id,
                },
            });
            this.devices = respons.data.devices;
            return respons.data;
        } catch (e: any) {
            this.message = e.response.data.message;
            return e.message;
            
        }
    });
    deleteUser = (async (id: number) => {
        const persistedToken = this.accessToken;
        try {
            this.setAuthHeader(persistedToken);
            const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/users/delete-user", {
                data : {
                    id,
                },
            });
            this.users = respons.data.users;
            return respons.data;
        } catch (e: any) {
            this.message = e.response.data.message;
            return e.message;
            
        }
    });
    editDevice = (
        async ({id, name, device_type, country, city, address, serial_number, group_id}: DeviceFormData) => {
            const persistedToken = this.accessToken;
            const newGroupId = group_id ? Number(group_id) : 1;
            try {
                this.setAuthHeader(persistedToken);
                const respons = await axios.put("http://intern-project-backend.atwebpages.com/api/devices/edit", {
                    id,
                    name,
                    device_type,
                    country,
                    city,
                    address,
                    serial_number,
                    group_id : newGroupId,
                });
                this.devices = respons.data.devices;
                return respons.data;
                
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            }
        }
    );
    createGroup = (
        async ({name}: createGroupData) => {
            const persistedToken = this.accessToken;
            
            try {
                this.setAuthHeader(persistedToken);
                const res = await axios.post("http://intern-project-backend.atwebpages.com/api/groups/create", {
                    name
                });
                this.groups = res.data.groups;
                return res.data;
                
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            }
        });
    
    constructor () {
        makeAutoObservable(this);
        
        makePersistable(this, {
            name : "MobxStore",
            properties : ["user", "signInUser", "users", "devices", "groups", "accessToken", "refreshToken", "isLoggedIn"],
            storage : window.localStorage
        });
    }
    
    setAuthHeader = (accessToken: any) => {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    };
    
    clearAuthHeader = () => {
        axios.defaults.headers.common.Authorization = "";
    };
    
    register =
        async ({name, surname, email, password, country, city, address, phone_number}: CreateUserData) => {
            this.isLoading = true;
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
                this.user = respons.data;
                return respons.data;
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            } finally {
                this.isLoading = false;
            }
        };
    
    logIn = async ({email, password}: SignInFormData) => {
        this.isLoading = true;
        try {
            const respons = await axios.post("http://intern-project-backend.atwebpages.com/api/auth/login", {
                email,
                password,
            });
            this.setAuthHeader(respons.data.accessToken);
            this.signInUser = respons.data.signInUser;
            this.accessToken = respons.data.accessToken;
            this.refreshToken = respons.data.refreshToken;
            return respons.data;
        } catch (e: any) {
            this.message = e.response.data.message;
            return e.message;
            
        } finally {
            this.isLoading = false;
        }
    };
    
    getData = async () => {
        const persistedToken = this.accessToken;
        this.isLoading = true;
        
        try {
            this.setAuthHeader(persistedToken);
            const res = await axios.get("http://intern-project-backend.atwebpages.com/api/users/user-info", {
                headers : {
                    "Content-Type" : "application/json",
                    Accept : "application/json",
                },
            });
            this.user = res.data.user;
            this.isLoggedIn = true;
            return res.data;
        } catch (e: any) {
            this.message = e.response.data.message;
            this.isLoggedIn = false;
            return e.message;
            
        } finally {
            this.isLoading = false;
        }
    };
    
    logOut = async () => {
        try {
            await clearPersistedStore(this);
            this.clearAuthHeader();
            
        } catch (e: any) {
            this.message = e.response.data.message;
            return e.message;
            
        } finally {
            this.isLoggedIn = false;
            this.accessToken = null;
            this.refreshToken = null;
        }
    };
    
    getUsers = async () => {
        const persistedToken = this.accessToken;
        
        try {
            this.setAuthHeader(persistedToken);
            const res = await axios.get("http://intern-project-backend.atwebpages.com/api/users", {});
            this.users = res.data.users;
            return res.data;
            
        } catch (e: any) {
            this.message = e.response.data.message;
            return e.message;
            
        }
    };
    
    editGridUser =
        
        async ({id, name, surname, email, password, country, city, address}: ValuesData) => {
            const persistedToken = this.accessToken;
            console.log(id);
            
            try {
                this.setAuthHeader(persistedToken);
                const respons = await axios.put(
                    "http://intern-project-backend.atwebpages.com/api/users/update-user-info", {
                        id,
                        name,
                        surname,
                        email,
                        password,
                        country,
                        city,
                        address,
                    });
                this.users = respons.data.users;
                return respons.data;
                
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            }
        };
    
    getDevices = async () => {
        const persistedToken = this.accessToken;
        try {
            this.setAuthHeader(persistedToken);
            const res = await axios.get("http://intern-project-backend.atwebpages.com/api/devices", {
                headers : {
                    "Content-Type" : "application/json",
                    Accept : "application/json",
                },
            });
            this.devices = res.data.devices;
            return res.data;
            
        } catch (e: any) {
            this.message = e.response.data.message;
            return e.message;
            
        }
    };
    
    getGroups =
        async () => {
            const persistedToken = this.accessToken;
            
            try {
                this.setAuthHeader(persistedToken);
                const res = await axios.get("http://intern-project-backend.atwebpages.com/api/groups", {
                    headers : {
                        "Content-Type" : "application/json",
                        Accept : "application/json",
                    },
                });
                this.groups = res.data.groups;
                return res.data;
                
            } catch (e: any) {
                this.message = e.response.data.message;
                return e.message;
                
            }
        };
    
    deleteGroup = async (id: number) => {
        const persistedToken = this.accessToken;
        try {
            this.setAuthHeader(persistedToken);
            const respons = await axios.delete("http://intern-project-backend.atwebpages.com/api/groups/delete", {
                data : {
                    id,
                },
            });
            this.groups = respons.data.groups;
            return respons.data;
        } catch (e: any) {
            this.message = e.response.data.message;
            return e.message;
            
        }
    };
    
}

export const mobxStore = new MobxStore();