import { RootState } from "../store";
import { AuthState } from "../auth/slice";

export const refreshToken = (state: RootState) => state.auth.refreshToken;
export const accessToken:any = (state: RootState) => state.auth.accessToken;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectUser:any = (state: RootState) => state.auth.user;
export const selectUserError = (state: RootState) => state.auth.message;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
