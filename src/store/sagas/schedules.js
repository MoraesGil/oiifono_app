import { Creators as ScheduleActions } from "ducks/schedules";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { createActions } from "reduxsauce";
import { normalize, schema } from "normalizr";
import api from "@/services/api";
import showResponseError from './ErrorCatcher';
/**
 * Normalized schemas
 */
const scheduleSchema = new schema.Entity("schedule");
const schedulesSchema = [scheduleSchema];

export const normalizeSchedules = list =>
  (normalizedData = normalize(list, schedulesSchema).entities.schedule);

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  scheduleFetchSaga: ["itemList"],
  scheduleLoadMoreSaga: ["itemList"],
  scheduleAddSaga: ["item"],
  scheduleUpdateSaga: ["id", "item"],
  scheduleRemoveSaga: ["id"]
});  


function* fetch(action) {
  try {
    let response = yield load(action);
    yield put(ScheduleActions.fetchSchedules(normalizeSchedules(response.data)));    
  } catch (error) {
    showResponseError(error)
  }
  
}

function* loadMore(action) {
  try {
    let response = yield load(action);
    yield put(ScheduleActions.scheduleLoadMore(normalizeSchedules(response.data)));    
  } catch (error) {
    showResponseError(error)
  }
}

function* load(action) {
  try {
    let response = yield call(api.get, "/schedules", action.request);
    return response
  } catch (error) {
    showResponseError(error)
  }
  
}

function* add(action) {
  try {
    let response = yield call(api.post, "/schedules", action.request);
    return response
  } catch (error) {
    showResponseError(error)
  }
}

function* update(action) {
  try {
    let response = yield call(api.put, "/schedules", action.request);
    return response
  } catch (error) {
    showResponseError(error)
  }
}

function* remove(action) {
  try {
    let response = yield call(api.delete, "/schedules", action.request);
    return response
  } catch (error) {
    showResponseError(error)
  }
}

export default all([
  takeLatest(Types.SCHEDULE_FETCH_SAGA, fetch),
  takeLatest(Types.SCHEDULE_LOAD_MORE_SAGA, loadMore),
  takeLatest(Types.SCHEDULE_ADD_SAGA, add),
  takeLatest(Types.SCHEDULE_UPDATE_SAGA, update),
  takeLatest(Types.SCHEDULE_REMOVE_SAGA, remove)
]);
