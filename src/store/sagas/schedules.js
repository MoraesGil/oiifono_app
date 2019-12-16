import { Types, Creators } from "ducks/schedules";
import { all, call, put, debounce } from "redux-saga/effects";
import { normalize, schema } from "normalizr";

const scheduleSchema = new schema.Entity("schedule");
const schedulesSchema = [scheduleSchema];

import api from "@/services/api";

const ENDPOINTS = {
  fetch: "/schedules"
};

function* fetchAll(action) {
  try {
    let response = yield call(api.get, ENDPOINTS.fetch, action.request);
    yield console.log(response.status);
    yield console.log(response.data);
    // const normalizedData = yield normalize(result, schedulesSchema);
    // const schedules = yield normalizedData.entities.schedule;
    // yield put(Creators.fetchSchedules(schedules));
  } catch (e) {
    yield console.log("error",e);
    // yield put(updateProfileFailure());
  }
}

export default function* rootSchedules() {
  yield all([debounce(1000, Types.SAGA_FETCH_SCHEDULES, fetchAll)]);
}
