import * as Types from '../actions/types';

const initialState = {
  reviews: [],
  error: null,
}

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {

    //SHOP GET LIST REVIEWS----------------------------
    case Types.SHOP_GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case Types.SHOP_GET_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}