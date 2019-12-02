import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as patientsReducer } from "./patients/reducer";
import { reducer as schedulesReducer } from "./schedules/reducer";

export const reducer = combineReducers({
  patients: patientsReducer,
  schedules: schedulesReducer,
  auth: authReducer
});
