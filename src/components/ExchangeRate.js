import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ratesUpdated } from '../store/actions/RateActions';
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from '../store/reducers/RateReducer';
import { RateTable } from './RateTable';
import { CurrencyCodePicker } from './CurrencyCodePicker';
import { getExchangeRates } from '../api';
import { AmountField } from './AmountField';

export function ExchangeRate() {
  // Use custom hook here
  useCurrencyCodes();

  return (
    <>
      <section>
        <h1 className='ExchangeRate-header'>
          Exchange Rates <CurrencyCodePicker />
        </h1>
      </section>
      <section>
        <AmountField />
      </section>
      <section>
        <RateTable />
      </section>
    </>
  );
}

// Custom hook
// Can focus only on logic here
function useCurrencyCodes() {
  const dispatch = useDispatch();
  const supportedCurrencies = useSelector(getSupportedCurrencies);
  const currencyCode = useSelector(getCurrencyCode);
  const updateRates = (rates) => dispatch(ratesUpdated(rates));
  // Runs only on first time component is rendered
  useEffect(() => {
    getLatestExchangeRates();
  }, [currencyCode]);

  function getLatestExchangeRates() {
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      updateRates(rates);
    });
  }
}
