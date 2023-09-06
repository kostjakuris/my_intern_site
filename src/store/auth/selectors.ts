import { RootState } from "../store";
import { AuthState } from "../auth/slice";

export const refreshToken = (state: RootState) => state.auth.refreshToken;
export const accessToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectUserName = (state: RootState) => state.auth.user.name;
export const selectUserEmail = (state: RootState) => state.auth.user.email;
export const selectUserError = (state: RootState) => state.auth.message;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
