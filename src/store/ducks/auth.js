import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  token: "",
  signed: false,
  loading: false,
  me: {}
};

export const { Types, Creators } = createActions({
  authUpdateProfile: ["profile"],
  authSignIn: ["payload"],
  authSignOut: null
});

const updateProfile = (state = INITIAL_STATE, { profile }) => {
  return (state = { ...state, me: profile });
};
const signIn = (state = INITIAL_STATE, { payload }) => {
  console.log("call duck", payload);
  return { ...state, ...payload, ...{ signed: true, loading: false } };
};
const signOut = () => {
  return INITIAL_STATE;
};

export default createReducer(INITIAL_STATE, {
  [Types.AUTH_UPDATE_PROFILE]: updateProfile,
  [Types.AUTH_SIGN_IN]: signIn,
  [Types.AUTH_SIGN_OUT]: signOut
});
