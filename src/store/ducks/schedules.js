import { createActions, createReducer } from "reduxsauce";
import { createSelector } from "reselect";

const INITIAL_STATE = {
  agenda: {
    "2019-12-11": [
      {
        id: 1,
        date: "2019-12-11",
        start_at: "12:00",
        end_at: "13:00",
        confirmed: true,
        attended: true,
        parent_id: null,
        absenced_by: null,
        patient: {
          id: 1,
          name: "Dr. Tomás Martinho Domingues",
          nickname: null,
          picture: "https://randomuser.me/api/portraits/med/men/64.jpg",
          cpf: "29970857608",
          birthdate: "1972-11-03 00:00:00",
          gender: "m",
          rg: "625899819",
          disabilities: null,
          deathdate: null
        }
      },
      {
        id: 2,
        date: "2019-12-11",
        start_at: "11:00",
        end_at: "12:00",
        confirmed: true,
        attended: false,
        parent_id: null,
        absenced_by: "Ficou Doente",
        patient: {
          id: 2,
          name: "Nicolas Martinho Domingues",
          nickname: null,
          picture: "https://randomuser.me/api/portraits/med/men/67.jpg",
          cpf: "29970857608",
          birthdate: "1972-11-03 00:00:00",
          gender: "m",
          rg: "625899819",
          disabilities: null,
          deathdate: null
        }
      }
    ],
    "2019-12-12": [
      {
        id: 3,
        date: "2019-12-11",
        start_at: "11:00",
        end_at: "12:00",
        confirmed: false,
        attended: false,
        parent_id: 2,
        absenced_by: null,
        patient: {
          id: 2,
          name: "Nicolas Martinho Domingues",
          nickname: null,
          picture: "https://randomuser.me/api/portraits/med/men/67.jpg",
          cpf: "29970857608",
          birthdate: "1972-11-03 00:00:00",
          gender: "m",
          rg: "625899819",
          disabilities: null,
          deathdate: null
        }
      }
    ],
    "2019-12-13": [
      {
        id: 4,
        date: "2019-12-13",
        start_at: "12:00",
        end_at: "13:00",
        confirmed: true,
        attended: true,
        parent_id: null,
        absenced_by: null,
        patient: {
          id: 1,
          name: "Dr. Tomás Martinho Domingues",
          nickname: null,
          picture: "https://randomuser.me/api/portraits/med/men/64.jpg",
          cpf: "29970857608",
          birthdate: "1972-11-03 00:00:00",
          gender: "m",
          rg: "625899819",
          disabilities: null,
          deathdate: null
        }
      },
      {
        id: 5,
        date: " 2019-12-13",
        start_at: "14:00",
        end_at: "15:00",
        confirmed: false,
        attended: false,
        parent_id: null,
        absenced_by: null,
        patient: {
          id: 2,
          name: "Nicolas Martinho Domingues",
          nickname: null,
          picture: "https://randomuser.me/api/portraits/med/men/67.jpg",
          cpf: "29970857608",
          birthdate: "1972-11-03 00:00:00",
          gender: "m",
          rg: "625899819",
          disabilities: null,
          deathdate: null
        }
      }
    ],
    "2019-12-20": [
      {
        id: 7,
        date: "2019-12-20",
        start_at: "12:00",
        end_at: "13:00",
        confirmed: true,
        attended: true,
        parent_id: null,
        absenced_by: null,
        patient: {
          id: 1,
          name: "Dr. Tomás Martinho Domingues",
          nickname: null,
          picture: "https://randomuser.me/api/portraits/med/men/64.jpg",
          cpf: "29970857608",
          birthdate: "1972-11-03 00:00:00",
          gender: "m",
          rg: "625899819",
          disabilities: null,
          deathdate: null
        }
      },
      {
        id: 8,
        date: " 2019-12-20",
        start_at: "14:00",
        end_at: "15:00",
        confirmed: false,
        attended: false,
        parent_id: null,
        absenced_by: null,
        patient: {
          id: 2,
          name: "Nicolas Martinho Domingues",
          nickname: null,
          picture: "https://randomuser.me/api/portraits/med/men/67.jpg",
          cpf: "29970857608",
          birthdate: "1972-11-03 00:00:00",
          gender: "m",
          rg: "625899819",
          disabilities: null,
          deathdate: null
        }
      }
    ]
  },
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
        birthdate: "1972-11-03 00:00:00",
        gender: "m",
        rg: "625899819",
        disabilities: null,
        deathdate: null
      }
    },
    2: {
      id: 1,
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
        birthdate: "1972-11-03 00:00:00",
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
  addSchedule: ["schedule"],
  updateSchedule: ["schedule"],
  removeSchedule: ["schedule"]
});

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

export default createReducer(INITIAL_STATE, {
  [Types.ADD_SCHEDULE]: add,
  [Types.UPDATE_SCHEDULE]: update,
  [Types.REMOVE_SCHEDULE]: remove
}); 

/**
 * Selectors
 */

export const selectAgenda = createSelector(
  state => state.list,
  list => {
    console.log(list);
    return Object.values(state.list).reduce((agenda, schedule) => {
      let date = schedule.date.trim();

      if (!Array.isArray(agenda[date])) agenda[date] = [];

      agenda[date].push(schedule);

      return agenda;
    }, {});
  }
);
