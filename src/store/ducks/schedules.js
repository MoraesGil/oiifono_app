import { createActions, createReducer } from "reduxsauce";
import { createSelector } from "reselect";

const INITIAL_STATE = {
  errors: {},
  list: {}
};
/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({    
  scheduleSetErrors: ["error"],
  scheduleCleanErrors: null,
  scheduleFetch: ["itemList"],  
  scheduleLoadMore: ["itemList"],
  scheduleUpdateOrAdd: ["item"],
  scheduleRemove: ["id"]
});

/**
 * Handlers
 */  
const setErrors = (state = INITIAL_STATE, errors) => {    
  return state = {...state, errors: errors}  
};

const cleanErrors = (state = INITIAL_STATE) => {    
  return state = {...state, errors: {}}  
};

const fetch = (state = INITIAL_STATE, list) => {    
  return state = {...state, list: list}  
};

const loadMore = (state = INITIAL_STATE, list) => {    
  return {...state, list:{...state.list,...list}}  
};

const updateOrAdd = (state = INITIAL_STATE, item) => {  
  return {...state, list:{...state.list,...item}}   
};

const remove = (state = INITIAL_STATE, id) => {
  delete state.list[id];
  return state;
};

export default createReducer(INITIAL_STATE, {  
  [Types.SCHEDULE_SET_ERRORS]: setErrors,
  [Types.SCHEDULE_CLEAN_ERRORS]: cleanErrors,
  [Types.SCHEDULE_FETCH]: fetch,
  [Types.SCHEDULE_LOAD_MORE]: loadMore,
  [Types.SCHEDULE_UPDATE_OR_ADD]: updateOrAdd,
  [Types.SCHEDULE_REMOVE]: remove,
   
});

/**
 * Selectors
 */
export const getRoot = state => state.schedules;

export const getList = createSelector(getRoot, schedules => schedules.list);

export const selectAgenda = createSelector(getList, list =>
  Object.values(list).reduce((agenda, schedule) => {
    let date = schedule.date.trim();
    if (!Array.isArray(agenda[date])) agenda[date] = [];
    agenda[date].push(schedule);
    return agenda;
  }, {})
);
