import * as Types from '../actions/types';

const initialState = {
  customers: [],
  error: null,
}

export default function customersReducer(state = initialState, action) {
  switch (action.type) {

    //SHOP GET LIST CUSTOMERS----------------------------
    case Types.SHOP_GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.customers,
      };
    case Types.SHOP_GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}