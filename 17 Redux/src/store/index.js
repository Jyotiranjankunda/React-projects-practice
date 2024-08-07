// import {createStore} from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {counter: 0, showCounter: true};

// 
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

/*
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return {
        counter: state.counter + 1,
        showCounter: state.showCounter
      };
    
    case "increase":
      // If we want to increase not only by 1 but also by any value, then we can pass that value along with the action object.

      // Whenever we return a state object, then it overrides the existing state not merges with it, so even if we change only one element of the state, we need to write other elements as it is, if we not write then it will be overridden by what we returns.

      // And always return the state object after updating any state property. You should never change the existing state. Instead, always override it by returning a brand new state object. Because objects and arrays are reference values in JavaScript, it's easy to accidentally override and change the existing state.

      return {
        counter: state.counter + action.amount,
        showCounter: state.showCounter
      };
    
    case "decrement":
      return {
        counter: state.counter - 1,
        showCounter: state.showCounter
      };
    
    case "toggle":
      return {
        showCounter: !state.showCounter,
        counter: state.counter
      };
  
    default:
      break;
  }

  // Some problems with this method: 
  // 1. Multiple identifiers grow in number with growing app, so it may be possible that we mismatch them.
  // 2. When our state has many elements, then we have write all of them while returning a new state object, even if we have changed just one or two.

  return state;
}
*/

const store = configureStore({
  reducer: counterSlice.reducer
});

export default store;
// We need to pass this store to the provider component, which wraps the whole app component.