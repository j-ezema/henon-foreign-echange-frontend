import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import {
  CA,
  US,
  FR,
  SE,
  CH,
  JP,
  BG,
  CZ,
  DK,
  GB,
  HU,
  PL,
  RO,
  IS,
  NO,
  TR,
  AU,
  BR,
  CN,
  HK,
  ID,
  IL,
  IN,
  KR,
  MX,
  NZ,
  PH,
  TH,
  ZA,
} from "country-flag-icons/react/3x2";

const baseCurrencies = [
  { value: "USD", label: "USD", Flag: US },
  { value: "CAD", label: "CAD", Flag: CA },
  { value: "EUR", label: "EUR", Flag: FR },
];

const reverseRateCurrencies = [
  { value: "CAD", label: "CAD", Flag: CA },
  { value: "USD", label: "USD", Flag: US },
  { value: "EUR", label: "EUR", Flag: FR },
  { value: "SEK", label: "SEK", Flag: SE },
  { value: "CHF", label: "CHF", Flag: CH },
  { value: "JPY", label: "JPY", Flag: JP },
  { value: "BGN", label: "BGN", Flag: BG },
  { value: "CZK", label: "CZK", Flag: CZ },
  { value: "DKK", label: "DKK", Flag: DK },
  { value: "GBP", label: "GBP", Flag: GB },
  { value: "HUF", label: "HUF", Flag: HU },
  { value: "PLN", label: "PLN", Flag: PL },
  { value: "RON", label: "RON", Flag: RO },
  { value: "ISK", label: "ISK", Flag: IS },
  { value: "NOK", label: "NOK", Flag: NO },
  { value: "TRY", label: "TRY", Flag: TR },
  { value: "AUD", label: "AUD", Flag: AU },
  { value: "BRL", label: "BRL", Flag: BR },
  { value: "CNY", label: "CNY", Flag: CN },
  { value: "HKD", label: "HKD", Flag: HK },
  { value: "IDR", label: "IDR", Flag: ID },
  { value: "ILS", label: "ILS", Flag: IL },
  { value: "INR", label: "INR", Flag: IN },
  { value: "KRW", label: "KRW", Flag: KR },
  { value: "MXN", label: "MXN", Flag: MX },
  { value: "NZD", label: "NZD", Flag: NZ },
  { value: "PHP", label: "PHP", Flag: PH },
  { value: "THB", label: "THB", Flag: TH },
  { value: "ZAR", label: "ZAR", Flag: ZA },
];

const SettingsPage = ({ settings, onSaveSettings }) => {
  const navigate = useNavigate();
  const [baseCurrency, setBaseCurrency] = useState(baseCurrencies[0]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    reverseRateCurrencies[0],
    reverseRateCurrencies[1],
  ]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (settings) {
      setBaseCurrency(
        baseCurrencies.find(
          (currency) => currency.value === settings.baseCurrency
        ) || baseCurrencies[0]
      );
      setSelectedCurrencies(
        reverseRateCurrencies.filter((currency) =>
          settings.selectedCurrencies.includes(currency.value)
        )
      );
      setStartDate(new Date(settings.startDate));
      setEndDate(new Date(settings.endDate));
    }
  }, [settings]);

  const formatDate = (date) => {
    if (!date) return null;
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleSaveSettings = () => {
    onSaveSettings({
      baseCurrency: baseCurrency.value,
      selectedCurrencies: selectedCurrencies.map((currency) => currency.value),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
    navigate("/");
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="form-group">
        <label htmlFor="base-currency">Base Currency:</label>
        <Select
          id="base-currency"
          value={baseCurrency}
          onChange={setBaseCurrency}
          options={baseCurrencies}
          getOptionLabel={(option) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <option.Flag style={{ marginRight: 10, width: "20px" }} />
              {option.label}
            </div>
          )}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "white",
              borderColor: "black",
              color: "black",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "rgb(166, 129, 60)" : "white",
              color: state.isFocused ? "white" : "black",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "black",
            }),
          }}
        />
      </div>

      <div className="form-group">
        <label>Reverse Currencies:</label>
        <Select
          isMulti
          value={selectedCurrencies}
          onChange={setSelectedCurrencies}
          options={reverseRateCurrencies}
          getOptionLabel={(option) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <option.Flag style={{ marginRight: 10, width: "20px" }} />
              {option.label}
            </div>
          )}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "white",
              borderColor: "black",
              color: "black",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "rgb(166, 129, 60)" : "white",
              color: state.isFocused ? "white" : "black",
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "rgb(166, 129, 60)",
              color: "white",
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="start-date">Start Date:</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM d, yyyy"
          className="custom-datepicker"
        />
      </div>

      <div className="form-group">
        <label htmlFor="end-date">End Date:</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="MMMM d, yyyy"
          className="custom-datepicker"
        />
      </div>

      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default SettingsPage;
