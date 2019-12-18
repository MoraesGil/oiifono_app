import { Creators as ScheduleActions } from "ducks/auth";
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

export function* signIn({ payload }) {
   
}

export function* signUp({ payload }) {
  
}

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
  takeLatest(" ", funcion),
  
]);
