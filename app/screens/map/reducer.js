import * as actionTypes from './actionTypes';

function mapReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_NODES:
      return Object.assign({}, state, {
        level: null,
        fetching: true
      });
      break;

    case actionTypes.RECEIVE_NODES:
      return Object.assign({}, state, {
        level: action.level,
        fetching: false
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default mapReducer;
