import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  authLogin: ["token"],
  authLogout: null
});

const INITIAL_STATE = {
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6MzAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU3NjQ2MDA1MywiZXhwIjoxNTc2NTgwMDUzLCJuYmYiOjE1NzY0NjAwNTMsImp0aSI6ImtoZEc4OGJQeTdnQXZodVoiLCJzdWIiOjMsInBydiI6ImY5MzA3ZWI1ZjI5YzcyYTkwZGJhYWVmMGUyNmYwMjYyZWRlODZmNTUifQ.Lc01tAiCUj3avz49y42pY8ss548YGf0YRkBC8uhE5o4",
  me: {
    id: 62,
    email: "teste@teste.com",
    name: "Samuel das Neves Sobrinho",
    picture: "https://randomuser.me/api/portraits/med/men/11.jpg",
    cnpj: null,
    ie: null,
    register: "537474"
  }
};

export default createReducer(INITIAL_STATE, {
  [Types.AUTH_LOGIN]: login,
  [Types.AUTH_LOGOUT]: logout
});

const login = (state = INITIAL_STATE, action) => {
  return { ...state, ...{ token: payload.token } };
};

const logout = (state = INITIAL_STATE, action) => {
  return { ...state, ...{ token: "" } };
};
