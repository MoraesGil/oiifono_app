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
  sagaFetchPatients: ["request"],
  sagaAddPatient: ["request"],
  sagaUpdatePatient: ["request"],
  sagaRemovePatient: ["request"],
  fetchPatients: ["patients"],
  addPatient: ["Patient"],
  updatePatient: ["Patient"],
  removePatient: ["Patient"]
});

// console.log(Types);
/**
 * Handlers
 */

const add = (state = INITIAL_STATE, action) => {
  // return { ...state, [Patient.id]: Patient };
  // return { ...state, [Math.random()]: action.Patient };
  return state;
};

const update = (state = INITIAL_STATE, action) => {
  return { ...state, [action.Patient.id]: action.Patient };
};

const remove = (state = INITIAL_STATE, action) => {
  delete state[action.Patient.id];
  return state;
};

const fetch = (state = INITIAL_STATE, payload) => {
  return { ...state, ...{ list: payload.patients } };
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_PATIENTS]: fetch,
  [Types.ADD_PATIENT]: add,
  [Types.UPDATE_PATIENT]: update,
  [Types.REMOVE_PATIENT]: remove
});

/**
 * Selectors
 */
export const getRoot = state => state.patients;

 