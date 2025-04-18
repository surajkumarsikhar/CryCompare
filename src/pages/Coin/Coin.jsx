import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
  const { coinId } = useParams()
  const [coinData, setCoinData] = useState(null)
  const [coinHistData, setCoinHistData] = useState(null)
  const { currency } = useContext(CoinContext)
  const [days, setDays] = useState(30)

  const daysHandler = (e) => {
    setDays(Number(e.target.value))
  }

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-EBF4gYRUuBTFVpo2w1y2vwP5' }
    }

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err))
  }

  const fetchHistData = async (days) => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-EBF4gYRUuBTFVpo2w1y2vwP5' }
    }

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.nam}&days=${days}&interval=daily`, options)
      .then((res) => res.json())
      .then((res) => setCoinHistData(res))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchCoinData()
  }, [currency, coinId])

  useEffect(() => {
    if (coinData) {
      fetchHistData(days)
    }
  }, [currency, days, coinData])

  if (!coinData || !coinHistData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        {/* Loader */}
        <div className="animate-spin h-16 w-16 border-t-4 border-blue-600 border-solid rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="pt-16 bg-gray-100 dark:bg-gray-900">
      <div className="p-8 min-h-screen">
        {/* Coin Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img src={coinData.image.large} alt={coinData.name} className="w-16 h-16 rounded-full" />
            <p className="text-3xl font-semibold text-gray-800 dark:text-white">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Timeframe Select */}
        <div className="mb-6">
          <select
            onChange={daysHandler}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            <option value="30">30 Day</option>
            <option value="1">1 Day</option>
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="90">3 Months</option>
            <option value="182">6 Months</option>
            <option value="365">1 Year</option>
          </select>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <LineChart coinHistData={coinHistData} />
        </div>

        {/* Coin Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Market Rank</h3>
            <p className="text-gray-600 dark:text-gray-400">{coinData.market_cap_rank}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Current Price</h3>
            <p className="text-lg text-gray-800 dark:text-white">
              {currency.symbol} {coinData.market_data.current_price[currency.nam].toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Market Cap</h3>
            <p className="text-lg text-gray-800 dark:text-white">
              {currency.symbol} {coinData.market_data.market_cap[currency.nam].toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">24 Hour High</h3>
            <p className="text-lg text-gray-800 dark:text-white">
              {currency.symbol} {coinData.market_data.high_24h[currency.nam].toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">24 Hour Low</h3>
            <p className="text-lg text-gray-800 dark:text-white">
              {currency.symbol} {coinData.market_data.low_24h[currency.nam].toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Coin
