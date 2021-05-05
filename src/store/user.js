const initialState = {
  name: 'Jon Snow',
  currencyCode: 'JPY',
};

export function userReducer(state = initialState, action) {
  return state;
}

// Selectors - can do in 1 place instead of everywhere its used throughout app
export const getName = (state) => state.user.name;
