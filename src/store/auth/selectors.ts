import {RootState} from "../store";

export const refreshToken = (state: RootState) => state.auth.refreshToken;
export const accessToken: any = (state: RootState) => state.auth.accessToken;

