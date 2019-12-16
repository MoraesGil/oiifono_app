import { combineReducers } from "redux";
 
import patients from "./patients";
import auth from "./auth";
import schedules from "./schedules";

export const reducer = combineReducers({
  patients,
  schedules,
  auth
});
