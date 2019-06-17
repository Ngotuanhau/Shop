import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import countReducer from './counterReducer';
import ordersReducer from './ordersReducer';
import reviewsReducer from './reviewsReducer';
import customersReducer from './customersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products: productsReducer,
  categories: categoriesReducer,
  count: countReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
  customers: customersReducer,
})

