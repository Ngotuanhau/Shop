import * as Types from '../actions/types';

export default function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case Types.COUNTER_INCREASE:
      return Object.assign({}, state, {
        count: state.count + action.number
      });
    case Types.COUNTER_DECREASE:
      return Object.assign({}, state, {
        count: state.count - action.number
      });
    default:
      return state;
  }
}