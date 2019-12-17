import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  pagination: null,
  errors: {},
  list: {}
};
/**
 * Action types & creators
 */
export default function(moduleName){

  const { Types, Creators } = createActions({
    [`${moduleName}SetPagination`]: ["errors"],
    [`${moduleName}SetErrors`]: ["errors"],
    [`${moduleName}CleanErrors`]: null,
    [`${moduleName}Fetch`]: ["itemList"],
    [`${moduleName}LoadMore`]: ["itemList"],
    [`${moduleName}UpdateOrAdd`]: ["item"],
    [`${moduleName}Remove`]: ["id"]
  });

  const uperModuleName = moduleName.toUpperCase();
  
  const Reducer = createReducer(INITIAL_STATE, {
    [Types[`${uperModuleName}_SET_PAGINATION`]]: setPagination,
    [Types[`${uperModuleName}_SET_ERRORS`]]: setErrors,
    [Types[`${uperModuleName}_CLEAN_ERRORS`]]: cleanErrors,
    [Types[`${uperModuleName}_FETCH`]]: fetch,
    [Types[`${uperModuleName}_LOAD_MORE`]]: loadMore,
    [Types[`${uperModuleName}_UPDATE_OR_ADD`]]: updateOrAdd,
    [Types[`${uperModuleName}_REMOVE`]]: remove
  });
  
  return { Types , Creators, Reducer }
}

/**
 * Handlers
 */ 
const setPagination = (state = INITIAL_STATE, pagination) => {
  return (state = { ...state, pagination: pagination });
};

const setErrors = (state = INITIAL_STATE, errors) => {
  return (state = { ...state, errors: errors });
};

const cleanErrors = (state = INITIAL_STATE) => {
  return (state = { ...state, errors: {} });
};

const fetch = (state = INITIAL_STATE, list) => {
  return (state = { ...state, list: list });
};

const loadMore = (state = INITIAL_STATE, list) => {
  return { ...state, list: { ...state.list, ...list } };
};

const updateOrAdd = (state = INITIAL_STATE, item) => {
  return { ...state, list: { ...state.list, ...item } };
};

const remove = (state = INITIAL_STATE, id) => {
  delete state.list[id];
  return state;
}; 