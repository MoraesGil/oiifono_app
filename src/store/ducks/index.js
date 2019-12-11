import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth";
import { reducer as patientsReducer } from "./patients";
import schedules, {agenda} from "./schedules";

export const reducer = combineReducers({
  patients: patientsReducer,
  schedules:{
    list:schedules,
    agenda
  },
  auth: authReducer
});
