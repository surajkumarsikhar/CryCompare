import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const LineChart = ({ coinHistData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (coinHistData?.prices) {
      coinHistData.prices.forEach((item) => {
        const date = new Date(item[0]).toLocaleDateString().slice(0, -5);
        const price = item[1];
        dataCopy.push([date, price]);
      });
      setData(dataCopy);
    }
  }, [coinHistData]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg my-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Price Over Time</h2>
      <Chart
        chartType="LineChart"
        data={data}
        height="400px"
        legendToggle
        options={{
          legend: { position: "none" },
          hAxis: {
            title: "Date",
            format: 'MMM dd',
            textStyle: {
              color: '#4B5563', // Tailwind gray
              fontSize: 12,
            },
            gridlines: { count: 5 },
            baselineColor: '#4B5563', // Gray baseline color for dark mode
          },
          vAxis: {
            title: "Price",
            textStyle: {
              color: '#4B5563',
              fontSize: 12,
            },
            gridlines: { count: 6 },
            baselineColor: '#4B5563', // Gray baseline color for dark mode
          },
          curveType: "function", // Smooth the line
          colors: ['#4CAF50'], // Green color for line
          backgroundColor: '#F9FAFB', // Light background color
          chartArea: {
            width: '80%',
            height: '70%',
          },
          // Dark mode settings
          tooltip: {
            textStyle: {
              color: '#fff', // White text for tooltips in dark mode
            },
            trigger: 'focus',
          },
        }}
      />
    </div>
  );
};

export default LineChart;
