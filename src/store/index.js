import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { reducer as rootReducer } from './ducks'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas)
export default store;
