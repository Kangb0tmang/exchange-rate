import { getExchangeRates } from '../api';

const initialState = {
  amount: '12.00',
  currencyCode: 'JPY',
  currencyData: { USD: { displayLabel: 'US Dollars', code: 'USD', rate: 1.0 } },
  supportedCurrencies: ['USD', 'EUR', 'JPY', 'CAD', 'GBP', 'MXN'],
};

// Reducer function similar to reduce (array function)
export function ratesReducer(state = initialState, action) {
  switch (action.type) {
    case AMOUNT_CHANGED:
      return { ...state, amount: action.payload };
    case CURRENCY_CODE_CHANGED:
      return { ...state, currencyCode: action.payload };
    case 'rates/labelReceived': {
      const { displayLabel, currencyCode } = action.payload;
      return {
        ...state,
        currencyData: {
          ...state.currencyData,
          [currencyCode]: {
            ...state.currencyData[currencyCode],
            displayLabel,
          },
        },
      };
    }
    case 'rates/ratesReceived':
      const codes = Object.keys(action.payload).concat(state.currencyCode);
      const currencyData = {};
      for (let code in action.payload) {
        currencyData[code] = { code, rate: action.payload[code] };
      }
      return {
        ...state,
        currencyData,
        supportedCurrencies: codes,
      };
    default:
      // Always returns the new or old state, never modifies it
      return state;
  }
}

// Selectors - can do in 1 place instead of everywhere its used throughout app
export const getAmount = (state) => state.rates.amount;
export const getCurrencyCode = (state) => state.rates.currencyCode;
export const getCurrencyData = (state) => state.rates.currencyData;
export const getSupportedCurrencies = (state) =>
  state.rates.supportedCurrencies;
export const getDisplayLabel = (state, currencyCode) => {
  const match = state.rates.currencyData[currencyCode];
  if (match) {
    return match.displayLabel;
  }
};

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
  return function changeCurrencyCodeThunk(dispatch, getState) {
    const state = getState();
    const supportedCurrencies = getSupportedCurrencies(state);
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
