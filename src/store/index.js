import { createStore, combineReducers } from 'redux';
 
import { reducer as dataReducer } from '@/data/reducer';
// import { reducer as servicesReducer } from '@/services/reducer'; 

const appReducer = combineReducers({
	// services: servicesReducer,
	data: dataReducer,
});
 
const store = createStore(
	appReducer 
);
 
export default store;
