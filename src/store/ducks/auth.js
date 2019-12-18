import { createActions, createReducer } from "reduxsauce"; 
 
const INITIAL_STATE = {
  token:"",   
  signed: false,
  loading: false, 
  me:{}
}; 

export const { Types, Creators } = createActions({
  authUpdateProfile: ['profile'],
  authLogin: ["login"],
  authLogout: null, 
}); 

const updateProfile = (state = INITIAL_STATE, me) => {
  return (state = { ...state, me: me });
};
const login = (state = INITIAL_STATE, payload) => {
  return { ...state, ...payload,...{signed: true, loading: false} };
};  
const logout = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
}; 

export default createReducer(INITIAL_STATE, { 
  [Types.AUTH_UPDATE_PROFILE]: updateProfile,
  [Types.AUTH_LOGIN]: login,
  [Types.AUTH_LOGOUT]: logout
});