import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import SettingsPage from "./pages/Settings";
import Home from "./pages/Home";
import Converter from "./components/Converter";

function App() {
  const initialSettings = JSON.parse(localStorage.getItem("settings")) || {
    baseCurrency: "CAD",
    selectedCurrencies: ["USD", "EUR"],
    startDate: "June 1, 2022",
    endDate: "June 1, 2024",
  };

  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <Router>
      <div className="App">
        <SideBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home settings={settings} />} />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  onSaveSettings={handleSaveSettings}
                  settings={settings}
                />
              }
            />
            <Route path="/converter" element={<Converter />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
