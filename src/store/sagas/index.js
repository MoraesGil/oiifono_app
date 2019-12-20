import { all } from "redux-saga/effects";

import auth from "./auth";
import schedules from "./schedules";

export default function* rootSaga() {
  yield all([schedules, auth]);
}
