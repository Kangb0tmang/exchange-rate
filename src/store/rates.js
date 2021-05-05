const initialState = {
  amount: '12.00',
  currencyCode: 'JPY',
};

// Reducer function similar to reduce (array function)
export function ratesReducer(state = initialState, action) {
  switch (action.type) {
    case AMOUNT_CHANGED:
      return { ...state, amount: action.payload };
    case CURRENCY_CODE_CHANGED:
      return { ...state, currencyCode: action.payload };
    default:
      // Always returns the new or old state, never modifies it
      return state;
  }
}

// Selectors - can do in 1 place instead of everywhere its used throughout app
export const getAmount = (state) => state.rates.amount;
export const getCurrencyCode = (state) => state.rates.currencyCode;

// Action types
export const AMOUNT_CHANGED = 'rates/amountChanged';
export const CURRENCY_CODE_CHANGED = 'rates/curencyCodeChanged';

// Action Creators
export const changeAmount = (amount) => ({
  type: AMOUNT_CHANGED,
  payload: amount,
});
export const changeCurrencyCode = (currencyCode) => ({
  type: CURRENCY_CODE_CHANGED,
  payload: currencyCode,
});
