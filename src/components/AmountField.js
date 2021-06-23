import React, { useState, useMemo, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getAmount } from '../store/reducers/RateReducer';
import { amountChanged } from '../store/actions/RateActions';
import { debounce } from 'lodash';

export function AmountField() {
  const dispatch = useDispatch();
  const amount = useSelector(getAmount);
  const changeAmount = useCallback(
    (newAmount) => dispatch(amountChanged(newAmount)),
    []
  );
  const [displayAmount, setDisplayAmount] = useState(amount);
  // useMemo instead of using an instance variable
  // useMemo ensures is created only once
  const onAmountChanged = useMemo(
    () => debounce(changeAmount, 500),
    // Can leave as empty array, but best practice ot put changeAmount here
    [changeAmount]
  );

  function onChange(e) {
    let newAmount = e.target.value;
    setDisplayAmount(newAmount);
    onAmountChanged(newAmount);
  }

  return (
    <form className='ExchangeRate-form'>
      <input type='text' value={displayAmount} onChange={onChange} />
    </form>
  );
}
// redux stuff
export const AmountFieldContainer = connect()(AmountField);
