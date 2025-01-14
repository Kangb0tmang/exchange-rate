import { useDispatch } from 'react-redux';
import { changeAmount } from '../store/rates';

export function AmountField({ amount }) {
  // Send actions to reducer, which may update state
  const dispatch = useDispatch();
  function onChange(e) {
    // Dispatches the amount changed to reducer
    // dispatch({ type: AMOUNT_CHANGED, payload: e.target.value });
    dispatch(changeAmount(e.target.value));
  }

  return (
    <form className='ExchangeRate-form'>
      <input
        aria-label='Amount in base currency'
        type='text'
        value={amount}
        onChange={onChange}
      />
    </form>
  );
}
