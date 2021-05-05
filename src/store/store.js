import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user';
import { ratesReducer } from './rates';

// Thunk is a function that returns another function

export const store = createStore(
  combineReducers({
    user: userReducer,
    rates: ratesReducer,
  }),
  applyMiddleware(thunk)
);

// state.anount -> state.rates.amount
// state.name -> state.user.name
