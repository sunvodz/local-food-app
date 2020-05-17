import { sharedActionTypes } from 'app/shared';

function systemReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.MAINTENANCE_MODE_ENABLED:
      return Object.assign({}, state, {
        maintenance_mode: true,
      });
      break;

    case sharedActionTypes.MAINTENANCE_MODE_DISABLED:
      return Object.assign({}, state, {
        maintenance_mode: false,
      });
      break;

    case sharedActionTypes.GET_LANGS_SUCCESS:
      return Object.assign({}, state, {
        availableLanguages: action.availableLanguages,
      });
      break;

    case sharedActionTypes.SET_LANG_SUCCESS:
      return Object.assign({}, state, {
        lang: action.lang,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default systemReducer;
