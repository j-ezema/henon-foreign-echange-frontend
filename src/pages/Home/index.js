import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { CA, US, FR } from "country-flag-icons/react/3x2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import AgGridTable from "../../components/AgGridTable";
ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const colors = [
  "#A6813C", // Gold
  "#000000", // Black
  "rgba(166, 129, 60, 0.3)", // Beyish
  "#8B4513", // SaddleBrown
  "#D2B48C", // Tan
  "#DAA520", // GoldenRod
  "#CD853F", // Peru
];

const HomePage = ({ settings }) => {
  const [rates, setRates] = useState({ CAD: {}, USD: {}, EUR: {} });
  const [chartData, setChartData] = useState({ line: null, bar: null });
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    const fetchRates = async (base_currency) => {
      try {
        const response = await axios.get(
          "https://henon-fx-tracker-app-679990af8b3b.herokuapp.com/api/retrieve-rates/",
          {
            params: {
              base_currency,
              start_date: settings.startDate,
              end_date: settings.endDate,
            },
          }
        );
        const data = response.data[base_currency];
        const latestRates = data.reduce((acc, rate) => {
          acc[rate.currency] = rate.rate;
          return acc;
        }, {});
        setRates((prevRates) => ({
          ...prevRates,
          [base_currency]: latestRates,
        }));
      } catch (error) {
        console.error(
          `Error fetching exchange rates for ${base_currency}`,
          error
        );
      }
    };

    fetchRates("CAD");
    fetchRates("USD");
    fetchRates("EUR");
  }, [settings.startDate, settings.endDate]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "https://henon-fx-tracker-app-679990af8b3b.herokuapp.com/api/retrieve-rates/",
          {
            params: {
              base_currency: settings.baseCurrency,
              start_date: settings.startDate,
              end_date: settings.endDate,
            },
          }
        );
        const data = response.data[settings.baseCurrency];

        console.log("Fetched data for chart:", data);

        const labels = data.map((entry) => new Date(entry.date));
        const datasets = settings.selectedCurrencies.map((currency, index) => ({
          label: currency,
          data: data
            .filter((entry) => entry.currency === currency)
            .map((entry) => ({
              x: new Date(entry.date),
              y: entry.rate,
            })),
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length],
          pointRadius: 5,
          spanGaps: true,
        }));

        console.log("Chart datasets:", datasets);

        setChartData({
          line: {
            labels,
            datasets,
            options: {
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                    tooltipFormat: "MMM dd, yyyy",
                    displayFormats: {
                      day: "MMM dd",
                    },
                  },
                  ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 15,
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
              elements: {
                point: {
                  radius: 1,
                },
              },
            },
          },
          bar: {
            labels,
            datasets,
            options: {
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                    tooltipFormat: "MMM dd, yyyy",
                    displayFormats: {
                      day: "MMM dd",
                    },
                  },
                  ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 15,
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        });

        setGridData(data);
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    if (
      settings.startDate &&
      settings.endDate &&
      settings.selectedCurrencies.length > 0
    ) {
      fetchChartData();
    }
  }, [settings]);

  return (
    <div className="homepage">
      <div className="container-wrapper">
        <div className="container">
          <h2>
            <CA className="flag-icon" title="Canada" />
            CAD
          </h2>
          <div className="reverse-rate-container">
            <p className="rate-label">
              USD: <span>{rates.CAD.USD || "Loading..."}</span>
            </p>
            <p className="rate-label">
              EUR: <span>{rates.CAD.EUR || "Loading..."}</span>
            </p>
          </div>
        </div>
        <div className="container">
          <h2>
            <US className="flag-icon" title="United States" />
            USD
          </h2>
          <div className="reverse-rate-container">
            <p className="rate-label">
              CAD: <span>{rates.USD.CAD || "Loading..."}</span>
            </p>
            <p className="rate-label">
              EUR: <span>{rates.USD.EUR || "Loading..."}</span>
            </p>
          </div>
        </div>
        <div className="container">
          <h2>
            <FR className="flag-icon" title="France" />
            EUR
          </h2>
          <div className="reverse-rate-container">
            <p className="rate-label">
              USD: <span>{rates.EUR.USD || "Loading..."}</span>
            </p>
            <p className="rate-label">
              CAD: <span>{rates.EUR.CAD || "Loading..."}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="charts-wrapper">
        {chartData.line && (
          <div className="chart-container">
            <h3>Exchange Rate Multiaxis Line Chart</h3>
            <Line data={chartData.line} options={chartData.line.options} />
          </div>
        )}

        {chartData.bar && (
          <div className="chart-container">
            <h3>Exchange Rate Grouped Bar Chart</h3>
            <Bar data={chartData.bar} options={chartData.bar.options} />
          </div>
        )}
      </div>
      <AgGridTable rowData={gridData} />{" "}
    </div>
  );
};

export default HomePage;
