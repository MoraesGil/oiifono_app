import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth";
import { reducer as patientsReducer } from "./patients";
import { reducer as schedulesReducer } from "./schedules";

export const reducer = combineReducers({
  patients: patientsReducer,
  schedules: schedulesReducer,
  auth: authReducer
});
