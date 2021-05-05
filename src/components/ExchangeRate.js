import { useSelector } from 'react-redux';
import { RateTable } from './RateTable';
import { CurrencyCodePicker } from './CurrencyCodePicker';
import { AmountField } from './AmountField';
import {
  getAmount,
  getCurrencyData,
  supportedCurrencies,
  getCurrencyCode,
} from '../store/rates';

export function ExchangeRate() {
  // Get currency amount with useSelector instead of useState
  const amount = useSelector(getAmount);
  const currencyCode = useSelector(getCurrencyCode);
  const currencyData = useSelector(getCurrencyData);

  return (
    <>
      <section>
        <h1 className='ExchangeRate-header'>
          Exchange Rates{' '}
          <CurrencyCodePicker
            supportedCurrencies={supportedCurrencies}
            currencyCode={currencyCode}
          />
        </h1>
      </section>
      <section>
        <AmountField amount={amount} />
      </section>
      <section>
        <RateTable currencyData={currencyData} amount={amount} />
      </section>
    </>
  );
}
