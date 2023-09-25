import {RootState} from "../store";
import {AuthState} from "../auth/slice";

export const refreshToken = (state: RootState) => state.auth.refreshToken;
export const accessToken: any = (state: RootState) => state.auth.accessToken;
export const userError = (state: RootState) => state.auth.message;

