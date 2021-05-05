import { getExchangeRates } from '../api';

export const supportedCurrencies = ['USD', 'EUR', 'JPY', 'CAD', 'GBP', 'MXN'];

const initialState = {
  amount: '12.00',
  currencyCode: 'JPY',
  currencyData: { USD: 1.0 },
};

// Reducer function similar to reduce (array function)
export function ratesReducer(state = initialState, action) {
  switch (action.type) {
    case AMOUNT_CHANGED:
      return { ...state, amount: action.payload };
    case CURRENCY_CODE_CHANGED:
      return { ...state, currencyCode: action.payload };
    case 'rates/ratesReceived':
      return { ...state, currencyData: action.payload };
    default:
      // Always returns the new or old state, never modifies it
      return state;
  }
}

// Selectors - can do in 1 place instead of everywhere its used throughout app
export const getAmount = (state) => state.rates.amount;
export const getCurrencyCode = (state) => state.rates.currencyCode;
export const getCurrencyData = (state) => state.rates.currencyData;

// Action types
export const AMOUNT_CHANGED = 'rates/amountChanged';
export const CURRENCY_CODE_CHANGED = 'rates/curencyCodeChanged';

// Action Creators
export const changeAmount = (amount) => ({
  type: AMOUNT_CHANGED,
  payload: amount,
});
// export const changeCurrencyCode = (currencyCode) => (dispatch) => {
//   dispatch({
//     type: CURRENCY_CODE_CHANGED,
//     payload: currencyCode,
//   });
// };
export function changeCurrencyCode(currencyCode) {
  return function changeCurrencyCodeThunk(dispatch) {
    dispatch({
      type: CURRENCY_CODE_CHANGED,
      payload: currencyCode,
    });
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      dispatch({
        type: 'rates/ratesReceived',
        payload: rates,
      });
    });
  };
}

// Thunks - always have a dispatch & getState
export function getInitialRates(dispatch, getState) {
  const state = getState();
  const currencyCode = getCurrencyCode(state);
  dispatch(changeCurrencyCode(currencyCode));
}
