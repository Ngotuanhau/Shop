import * as Types from '../actions/types';

const initialState = {
  products: [],
  product: null,
  error: null,
  relatedproducts: [],
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {

    //SHOP GET LIST PRODUCTS----------------------------
    case Types.SHOP_GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
      };
    case Types.SHOP_GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        error: action.error
      }

    //SHOP GET PRODUCT BY ID------------------------------
    case Types.SHOP_GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.product,
        error: null
      }
    case Types.SHOP_GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        product: null,
        error: action.error
      }

    //SHOP GET RELATED PRODUCT ------------------------------ 
    case Types.SHOP_GET_RELATED_PRODUCTS_SUCCESS:
      return {
        ...state,
        relatedproducts: action.relatedproducts,
      }
    case Types.SHOP_GET_RELATED_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error
      }

    //SHOP CREATE PRODUCT ------------------------------ 
    case Types.SHOP_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product
      }
    case Types.SHOP_CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}