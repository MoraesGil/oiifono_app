import { createStore, combineReducers } from 'redux';
 
import { reducer as ducksReducer } from './ducks'
// import { reducer as servicesReducer } from '@/services/reducer'; 

const appReducer = combineReducers({
	// services: servicesReducer,
	data: ducksReducer,
});
 
const store = createStore(
	appReducer 
);
 
export default store;
