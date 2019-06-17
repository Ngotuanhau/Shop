import * as Types from '../actions/types';

const initialState = {
  orders: [],
  order: '',
  error: null
}

export default function odersReducer(state = initialState, action) {
  switch (action.type) {
    //GET ORDERS
    case Types.SHOP_GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders
      };
    case Types.SHOP_GET_ORDERS_FAILURE:
      return {
        ...state,
        error: action.error
      }

    //CREATE ORDER
    case Types.SHOP_CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order
      };
    case Types.SHOP_CREATE_ORDER_FAILURE:
      return {
        ...state,
        error: action.error
      };

    //GET ORDER BY ID
    case Types.SHOP_GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        order: action.order
      };
    case Types.SHOP_GET_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}