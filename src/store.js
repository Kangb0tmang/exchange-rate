import { createStore } from 'redux';

const initialState = {
  amount: '12.00',
  currencyCode: 'JPY',
};

// Reducer function similar to reduce (array function)
function reducer(state = initialState, action) {
  // Always returns the new or old state, never modifies it
  return state;
}

export const store = createStore(reducer);
