import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import "./index.css";

const Charts = ({ baseCurrency, reverseCurrencies, startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!Array.isArray(reverseCurrencies) || reverseCurrencies.length === 0) {
        console.error("Reverse currencies is not a valid array or is empty.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/api/retrieve-rates/",
          {
            params: {
              base_currency: baseCurrency,
              start_date: startDate,
              end_date: endDate,
            },
          }
        );

        const data = response.data[baseCurrency];
        const filteredData = data.filter((item) =>
          reverseCurrencies.includes(item.currency)
        );

        const labels = filteredData.map((item) => item.date);
        const datasets = reverseCurrencies.map((currency) => ({
          label: currency,
          data: filteredData
            .filter((item) => item.currency === currency)
            .map((item) => item.rate),
          fill: false,
          borderColor: "rgba(75,192,192,1)",
        }));

        setChartData({
          labels,
          datasets,
        });
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    fetchChartData();
  }, [baseCurrency, reverseCurrencies, startDate, endDate]);

  if (!chartData) {
    return <p>Loading chart data...</p>;
  }

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Multiaxis Line Chart</h3>
        <Line data={chartData} />
      </div>
      <div className="chart">
        <h3>Grouped Bar Chart</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Charts;
