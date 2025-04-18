import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const inputHandler = (e) => {
    const searchQuery = e.target.value;
    setInput(searchQuery);

    if (searchQuery === "") {
      setFilteredCoins([]);
      setIsDropdownVisible(false);
    } else {
      const filtered = allCoin.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCoins(filtered);
      setIsDropdownVisible(true);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = filteredCoins;
    setDisplayCoin(coins);
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  // Hide the dropdown if user clicks outside of it
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="pt-16 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="hero text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Your One-Stop Destination<br /> for Crypto Price Comparisons and Insights
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Effortlessly compare cryptocurrencies, check real-time prices, and stay updated with market changes.
          </p>
          <form onSubmit={searchHandler} className="mt-6 relative">
            <div className="relative">
              <input
                onChange={inputHandler}
                value={input}
                type="text"
                placeholder="Search a Crypto"
                required
                className="w-full md:w-xl p-3 border border-gray-300 dark:border-gray-700 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />

              {/* Custom Dropdown */}
              {isDropdownVisible && (
                <div className="dropdown absolute left-0 w-full mt-2 md:ml-20 md:w-xl lg:ml-52 lg:w-xl  xl:ml-84
                2xl:ml-114  bg-white dark:bg-gray-700 shadow-lg rounded-md z-10">
                  <ul className="max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredCoins.map((coin, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          setInput(coin.name);
                          setIsDropdownVisible(false);
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <p>{coin.name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full md:w-auto mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>

        {/* Crypto Table Section */}
        <div className="crypto-table bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          {/* Table Header (desktop only) */}
          <div className="hidden md:grid p-4 grid-cols-5 gap-6 text-gray-700 font-semibold dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p>24H Change</p>
            <p>Market Cap</p>
          </div>

          {/* Table Content */}
          <div className="table-content divide-y divide-gray-200 dark:divide-gray-700">
            {displayCoin.slice(0, 10).map((item, index) => (
              <Link
                to={`/coin/${item.id}`}
                key={index}
                className="block p-4 md:grid md:grid-cols-5 md:items-center hover:bg-gray-50 transition-all duration-200 dark:hover:bg-gray-700"
              >
                {/* Desktop column */}
                <p className="hidden md:block">{item.market_cap_rank}</p>

                <div className="flex items-center space-x-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-sm text-gray-800 dark:text-white">
                    {item.name + " - " + item.symbol}
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 md:text-left">
                  {currency.symbol + " " + item.current_price.toLocaleString()}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    item.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : item.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100 + "%"}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 md:text-left">
                  {currency.symbol + " " + item.market_cap.toLocaleString()}
                </p>

                {/* Mobile stacked details */}
                <div className="md:hidden mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div><span className="font-medium">Rank:</span> {item.market_cap_rank}</div>
                  <div><span className="font-medium">Price:</span> {currency.symbol + " " + item.current_price.toLocaleString()}</div>
                  <div>
                    <span className="font-medium">24H:</span>{" "}
                    <span className={item.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : item.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400"
                    }>
                      {Math.floor(item.price_change_percentage_24h * 100) / 100 + "%"}
                    </span>
                  </div>
                  <div><span className="font-medium">Market Cap:</span> {currency.symbol + " " + item.market_cap.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
