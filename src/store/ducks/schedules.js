import { createActions, createReducer } from "reduxsauce";
import { createSelector } from "reselect";

const INITIAL_STATE = {
  errors:{},
  list: {}
};
/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  sagaFetchSchedules: ["request"],
  sagaAddSchedule: ["request"],
  sagaUpdateSchedule: ["request"],
  sagaRemoveSchedule: ["request"],
  fetchSchedules: ["schedules"],
  addSchedule: ["schedule"],
  updateSchedule: ["schedule"],
  removeSchedule: ["schedule"]
});

// console.log(Types);
/**
 * Handlers
 */

const add = (state = INITIAL_STATE, action) => {
  // return { ...state, [schedule.id]: schedule };
  // return { ...state, [Math.random()]: action.schedule };
  return state;
};

const update = (state = INITIAL_STATE, action) => {
  return { ...state, [action.schedule.id]: action.schedule };
};

const remove = (state = INITIAL_STATE, action) => {
  delete state[action.schedule.id];
  return state;
};

const fetch = (state = INITIAL_STATE, payload) => {  
  return { ...state,...{list: payload.schedules} };
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_SCHEDULES]: fetch,
  [Types.ADD_SCHEDULE]: add,
  [Types.UPDATE_SCHEDULE]: update,
  [Types.REMOVE_SCHEDULE]: remove
});

/**
 * Selectors
 */
export const getRoot = state => state.schedules;

export const selectAgenda = createSelector(getRoot, schedules =>
  Object.values(schedules.list).reduce((agenda, schedule) => {
    let date = schedule.date.trim();
    if (!Array.isArray(agenda[date])) agenda[date] = [];
    agenda[date].push(schedule);
    return agenda;
  }, {})
);
