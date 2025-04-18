import React, { useState, useEffect, useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';

const ConvertCrypto = () => {
  const { allCoin, currency } = useContext(CoinContext);  // Accessing context
  const [fromCurrency, setFromCurrency] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("ethereum");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Function to fetch conversion rate
  const fetchConversionRate = () => {
    const fromCoin = allCoin.find(coin => coin.id === fromCurrency);
    const toCoin = allCoin.find(coin => coin.id === toCurrency);

    if (fromCoin && toCoin) {
      const conversionRate = toCoin.current_price / fromCoin.current_price;
      setConvertedAmount(conversionRate * amount);
    }
  };

  // Run the fetch conversion rate whenever currencies or amount change
  useEffect(() => {
    if (allCoin.length > 0) {
      fetchConversionRate();
    }
  }, [fromCurrency, toCurrency, amount, allCoin]);

  // Swap function to reverse fromCurrency and toCurrency
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container mx-auto p-25">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-primary dark:text-white">Convert Cryptocurrencies</h1>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* From Currency */}
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-800 dark:text-white">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {allCoin.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 mt-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Amount"
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center p-3">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar"
            >
              ↔️
            </button>
          </div>

          {/* To Currency */}
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-800 dark:text-white">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar"
            >
              {allCoin.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {convertedAmount !== null && (
          <div className="mt-6 text-center text-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Conversion Result</h2>
            <p className="text-xl mt-2 text-gray-700 dark:text-gray-300">
              {amount} {fromCurrency.toUpperCase()} ={" "}
              <span className="font-semibold text-primary">{convertedAmount.toFixed(6)} {toCurrency.toUpperCase()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertCrypto;
