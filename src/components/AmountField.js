import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAmount } from '../store/reducers/RateReducer';
import { amountChanged } from '../store/actions/RateActions';
import { debounce } from 'lodash';

export function AmountField({ amount, changeAmount }) {
  // constructor(props) {
  //   super(props);
  //   this.state = { amount: props.amount };
  //   this.onChange = this.onChange.bind(this);
  //   this.changeAmount = debounce(this.props.changeAmount, 500);
  // }

  const [displayAmount, setDisplayAmount] = useState(amount);

  function onChange(e) {
    let newAmount = e.target.value;
    setDisplayAmount(newAmount);
    // this.changeAmount(newAmount);
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
