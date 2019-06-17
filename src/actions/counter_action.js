import * as Types from './types';

export const counter_increase = (number) => {
  return {
    type: Types.COUNTER_INCREASE,
    number
  }
};

export const counter_decrease = (number) => {
  return {
    type: Types.COUNTER_DECREASE,
    number
  }
};