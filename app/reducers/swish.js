// import * as actionTypes from 'app/screens/Node/actionTypes';
import { SWISH_STARTED, SWISH_SUCCESS, SWISH_FAILED, SWISH_DECLINED } from 'app/types/swish'

function swishReducer(state, action) {
  switch (action.type) {
    case SWISH_STARTED:
      return {loading: true}
    case SWISH_SUCCESS:
      return {loading: false}
    case SWISH_FAILED:
      return {loading: false}
    case SWISH_DECLINED:
      return {loading: false}
    default:
      return Object.assign({}, state);
      break;
  }
}

export default swishReducer;
