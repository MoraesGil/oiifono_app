import { Creators as AuthActions } from "ducks/auth";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { createActions } from "reduxsauce";
import { normalize, schema } from "normalizr";
import api from "@/services/api";
import showResponseError from "./ErrorCatcher";
import { Alert } from "react-native";

export const { Types, Creators } = createActions({
  authSignInRequest: ["request"],
  authSignUpRequest: ["request"],
  authSignOutRequest: null
});

export function* signIn({ request }) {
  try {
    let { data } = yield call(api.post, "/login", request); 
    yield put(AuthActions.authSignIn(data));
  } catch (error) {
    Alert.alert("Login ou senha inválidos");
  }
}

export function* signUp({ payload }) {}

export function* signOut({ payload }) {}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  // takeLatest('persist/REHYDRATE', setToken),
  takeLatest("AUTH_SIGN_IN_REQUEST", signIn)
]);
