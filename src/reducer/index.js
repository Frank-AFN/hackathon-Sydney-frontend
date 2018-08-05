/**
 * Created by zhangyy on 2/24/17.
 */

import {ADD, MINUS, MULTIPLY, DIVIDED, SETVALUES} from '../action'

const countReducer = (state = 0, action) => {
  switch (action.type){
    case ADD:
      return {num1: action.num1, num2: action.num2, total:Number(action.num1) + Number(action.num2)};
    case MINUS:
      return {num1: action.num1, num2: action.num2, total:action.num1 - action.num2};
    case MULTIPLY:
      return {num1: action.num1, num2: action.num2, total:action.num1 * action.num2};
    case DIVIDED:
      return {num1: action.num1, num2: action.num2, total:action.num1 / action.num2};
    case SETVALUES:
      let n = 0;
      switch (action.computeType){
        case 'ADD':
          n = Number(action.num1) + Number(action.num2);
          break;
        case 'MINUS':
          n = action.num1 - action.num2;
          break;
        case 'MULTIPLY':
          n = action.num1 * action.num2;
          break;
        case 'DIVIDED':
          n = action.num1 / action.num2;
          break;
        default:
          n = 0
      }
      return {num1: action.num1, num2:action.num2, total:n};
    default:
      return state
  }
};

export default countReducer