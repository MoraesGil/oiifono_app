import { combineReducers } from 'redux';
import { reducer as patientsReducer } from './patients/reducer';

export const reducer = combineReducers({
	patients: patientsReducer,
});
