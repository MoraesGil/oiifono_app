import { createActions, createReducer } from "reduxsauce";
import { createSelector } from "reselect";

const INITIAL_STATE = {
  list: {
    1: {
      id: 1,
      date: "2019-12-11",
      start_at: "12:00",
      end_at: "13:00",
      confirmed: true,
      attended: false,
      parent_id: null,
      absenced_by: null,
      patient: {
        id: 37,
        name: "Dr. Tomás Martinho Domingues",
        nickname: null,
        picture: "https://randomuser.me/api/portraits/med/men/64.jpg",
        cpf: "29970857608",
        birthdate: "1972-11-03",
        gender: "m",
        rg: "625899819",
        disabilities: null,
        deathdate: null
      }
    },
    2: {
      id: 2,
      date: "2019-17-11",
      start_at: "12:00",
      end_at: "13:00",
      confirmed: true,
      attended: false,
      parent_id: null,
      absenced_by: null,
      patient: {
        id: 37,
        name: "Dr. Tomás Martinho Domingues",
        nickname: null,
        picture: "https://randomuser.me/api/portraits/med/men/64.jpg",
        cpf: "29970857608",
        birthdate: "1972-11-03",
        gender: "m",
        rg: "625899819",
        disabilities: null,
        deathdate: null
      }
    }
  }
};
/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  fetchScheduleSuccess: ["callback"],
  addSchedule: ["schedule"],
  updateSchedule: ["schedule"],
  removeSchedule: ["schedule"]
});

console.log(Creators);
/**
 * Handlers
 */

const add = (state = INITIAL_STATE, action) => {
  // return { ...state, [schedule.id]: schedule };
  return { ...state, [Math.random()]: action.schedule };
};

const update = (state = INITIAL_STATE, action) => {
  return { ...state, [action.schedule.id]: action.schedule };
};

const remove = (state = INITIAL_STATE, action) => {
  delete state[action.schedule.id];
  return state;
};

const fetchSuccess = (state = INITIAL_STATE, action) => {
  console.log("chamou");
  console.log(action);
  // state.list = action.schedules
  return state;
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_SCHEDULE_SUCCESS]: fetchSuccess,
  [Types.ADD_SCHEDULE]: add,
  [Types.UPDATE_SCHEDULE]: update,
  [Types.REMOVE_SCHEDULE]: remove
});

/**
 * Selectors
 */

export const getSchedules = state => state.schedules;

export const selectAgenda = createSelector(getSchedules, schedules =>
  Object.values(schedules.list).reduce((agenda, schedule) => {
    let date = schedule.date.trim();
    if (!Array.isArray(agenda[date])) agenda[date] = [];
    agenda[date].push(schedule);
    return agenda;
  }, {})
);
