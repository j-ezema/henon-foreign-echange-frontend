import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
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

const allCurrencies = [
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

const ConverterPage = () => {
  const [baseCurrency, setBaseCurrency] = useState(allCurrencies[0]);
  const [reverseCurrency, setReverseCurrency] = useState(allCurrencies[1]);
  const [baseAmount, setBaseAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConvert = async () => {
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${baseAmount}&from=${baseCurrency.value}&to=${reverseCurrency.value}`
      );
      setConvertedAmount(response.data.rates[reverseCurrency.value]);
    } catch (error) {
      console.error("Error converting currency", error);
    }
  };

  const handleClear = () => {
    setBaseCurrency(null);
    setReverseCurrency(null);
    setBaseAmount("");
    setConvertedAmount(null);
  };

  return (
    <div className="converter-page">
      <div className="converter-form">
        <h2>Currency Converter</h2>
        <div className="form-group">
          <label htmlFor="base-currency">Base Currency:</label>
          <Select
            id="base-currency"
            value={baseCurrency}
            onChange={setBaseCurrency}
            options={allCurrencies}
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
                backgroundColor: state.isFocused
                  ? "rgb(166, 129, 60)"
                  : "white",
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
          <label htmlFor="reverse-currency">Reverse Currency:</label>
          <Select
            id="reverse-currency"
            value={reverseCurrency}
            onChange={setReverseCurrency}
            options={allCurrencies}
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
                backgroundColor: state.isFocused
                  ? "rgb(166, 129, 60)"
                  : "white",
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
          <label htmlFor="base-amount">Base Currency Amount:</label>
          <input
            id="base-amount"
            type="number"
            value={baseAmount}
            onChange={(e) => setBaseAmount(e.target.value)}
            className="amount-input"
          />
        </div>
        <div className="button-group">
          <button onClick={handleConvert} className="convert-button">
            Convert
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
        {convertedAmount !== null && (
          <div className="converter-result">
            <span className="result-amount">{baseAmount}</span>{" "}
            <span className="result-currency">{baseCurrency.label}</span> ={" "}
            <span className="result-amount">{convertedAmount}</span>{" "}
            <span className="result-currency">{reverseCurrency.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConverterPage;
