import { createStore, combineReducers } from 'redux';
 
import { reducer as rootReducer } from './ducks'
 
const store = createStore(rootReducer);
 
export default store;
