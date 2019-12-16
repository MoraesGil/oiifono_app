import { Creators as DuckCreators } from "ducks/schedules";
import { all, call, put, debounce } from "redux-saga/effects";
import { normalize, schema } from "normalizr";
import api from "@/services/api";

/**
 * Normalized schemas
 */
const scheduleSchema = new schema.Entity("schedule");
const schedulesSchema = [scheduleSchema]; 

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({ 
  scheduleFetchSaga: ["itemList"],  
  scheduleLoadMoreSaga: ["itemList"],
  scheduleAddSaga: ["item"],
  scheduleUpdateSaga: ["id","item"],
  scheduleRemoveSaga: ["id"]
});


function* fetch(action) {
  try {
    let response = yield call(api.get,'/schedules', action.request);     
    
    const normalizedData = yield normalize(response.data, schedulesSchema);
    const schedules = yield normalizedData.entities.schedule;
    
    yield put(DuckCreators.fetchSchedules(schedules));    
    yield put(DuckCreators.scheduleCleanErrors());
  } catch (e) { 
    if(e)
    yield put(DuckCreators.scheduleSetErrors(e));
  }
}

export default all([
  debounce(1000, Types.SCHEDULE_FETCH_SAGA, fetch),
  debounce(1000, Types.SCHEDULE_LOAD_MORE_SAGA, loadMore),
  debounce(1000, Types.SCHEDULE_ADD_SAGA, add),
  debounce(1000, Types.SCHEDULE_UPDATE_SAGA, update),
  debounce(1000, Types.SCHEDULE_REMOVE_SAGA, remove)
])



