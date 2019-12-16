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
    const normalizedData = yield normalize(response.data, schedulesSchema);
    const schedules = yield normalizedData.entities.schedule;
    yield console.log("fetch call");
    yield put(Creators.fetchSchedules(schedules));
  } catch (e) { 
    yield console.log("fetch error");
    yield put(Creators.RequestFailure(e));
  }
}

export default function* rootSchedules() {
  yield all([debounce(1000, Types.SAGA_FETCH_SCHEDULES, fetchAll)]);
}
