import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faHouse, faGear } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src={require("../../assets/henoncapital_logo.jpg")}
          alt="FX Tracker Logo"
          className="sidebar-logo"
        />
      </div>
      <ul style={{ marginTop: "70px" }}>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} className="sidebar-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/converter">
            <FontAwesomeIcon icon={faRetweet} className="sidebar-icon" />
            Converter
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FontAwesomeIcon icon={faGear} className="sidebar-icon" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
