import { combineReducers } from "redux";
 
import DuckMaker from "./DuckMaker";
import auth from "./auth";
import schedules from "./schedules";

export const reducer = combineReducers({  
  patients:DuckMaker('patients'),
  schedules,
  auth
});
