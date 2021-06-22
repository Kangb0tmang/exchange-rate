import config from './config.json';

// helper to make our exchange rate API call
export function getExchangeRates(base, supportedCurrencies) {
  const symbols = supportedCurrencies
    .filter((symbol) => symbol !== base) // exclude your own code from requested symbols
    .join();
  const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${config.apiKey}&symbols=${symbols}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.rates);
}