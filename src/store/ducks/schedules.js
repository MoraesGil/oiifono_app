import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  addSchedule: ["schedule"],
  updateSchedule: ["schedule"],
  removeSchedule: ["schedule"]
});

/**
 * Handlers
 */

const INITIAL_STATE = {
  "1": {
    id: 1,
    date: "2019-12-01",
    start_at: "12:00",
    end_at: "13:00",
    confirmed: true,
    attended: true,
    parent_id: null,
    absenced_by: null,
    person_id: 1
  },
  "2": {
    id: 2,
    date: " 2019-12-01",
    start_at: "11:00",
    end_at: "12:00",
    confirmed: true,
    attended: false,
    parent_id: null,
    absenced_by: "Ficou Doente",
    person_id: 2
  },
  "5": {
    id: 5,
    date: " 2019-12-01",
    start_at: "11:00",
    end_at: "12:00",
    confirmed: false,
    attended: false,
    parent_id: 2,
    absenced_by: null,
    person_id: 2
  },
  "3": {
    id: 3,
    date: "2019-12-03",
    start_at: "12:00",
    end_at: "13:00",
    confirmed: true,
    attended: true,
    parent_id: null,
    absenced_by: null,
    person_id: 1
  },
  "4": {
    id: 4,
    date: " 2019-12-03",
    start_at: "14:00",
    end_at: "15:00",
    confirmed: false,
    attended: false,
    parent_id: null,
    absenced_by: null,
    person_id: 2
  }
};

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

export default createReducer(INITIAL_STATE, {
  [Types.ADD_SCHEDULE]: add,
  [Types.UPDATE_SCHEDULE]: update,
  [Types.REMOVE_SCHEDULE]: remove
});

export const selectAgenda = state => {
  return Object.values(state.items).reduce((agenda, schedule) => {
    let date = schedule.date.trim();

    if (!Array.isArray(agenda[date])) agenda[date] = [];

    agenda[date].push(schedule);

    return agenda;
  }, {});
};
