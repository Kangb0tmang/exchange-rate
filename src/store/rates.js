const initialState = {
  amount: '12.00',
  currencyCode: 'JPY',
};

// Reducer function similar to reduce (array function)
export function ratesReducer(state = initialState, action) {
  switch (action.type) {
    case 'rates/amountChanged':
      return { ...state, amount: action.payload };
    case 'rates/currencyCodeChanged':
      return { ...state, currencyCode: action.payload };
    default:
      // Always returns the new or old state, never modifies it
      return state;
  }
}