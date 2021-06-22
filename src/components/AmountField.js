import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAmount } from '../store/reducers/RateReducer';
import { amountChanged } from '../store/actions/RateActions';
import { debounce } from 'lodash';

export function AmountField({ amount, changeAmount }) {
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

// prop types
AmountField.propTypes = {
  amount: PropTypes.string,
  changeAmount: PropTypes.func,
};

// redux stuff
function mapStateToProps(state) {
  return {
    amount: getAmount(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeAmount: (newAmount) => dispatch(amountChanged(newAmount)),
  };
}

export const AmountFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AmountField);
