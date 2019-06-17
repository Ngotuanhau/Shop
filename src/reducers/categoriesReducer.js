import * as Types from '../actions/types';

const initialState = {
  categories: [],
  error: null,
}

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {

    //SHOP GET LIST CATEGORIES----------------------------
    case Types.SHOP_GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
      };
    case Types.SHOP_GET_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}