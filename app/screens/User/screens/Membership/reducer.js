import { sharedActionTypes } from 'app/shared';

function membershipReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.PAYMENT_IN_PROGRESS:
    case sharedActionTypes.PAYMENT_COMPLETE:
      return Object.assign({}, state, {
        paymentInProgress: action.paymentInProgress,
      });
      break;

    default:
      return Object.assign({}, state, {
          paymentInProgress: false,
      });
      break;
  }
}

export default membershipReducer;
