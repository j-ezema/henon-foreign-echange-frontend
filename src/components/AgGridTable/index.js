import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
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
import "./index.css"; 

const AgGridTable = ({ rowData }) => {
  const columnDefs = [
    { headerName: "Date", field: "date", filter: "agDateColumnFilter" },
    {
      headerName: "Currency",
      field: "currency",
      filter: "agTextColumnFilter",
      cellRenderer: (params) => {
        const flagComponents = {
          CAD: <CA className="flag-icon" title="Canada" />,
          USD: <US className="flag-icon" title="United States" />,
          EUR: <FR className="flag-icon" title="France" />,
          SEK: <SE className="flag-icon" title="Sweden" />,
          CHF: <CH className="flag-icon" title="Switzerland" />,
          JPY: <JP className="flag-icon" title="Japan" />,
          BGN: <BG className="flag-icon" title="Bulgaria" />,
          CZK: <CZ className="flag-icon" title="Czech Republic" />,
          DKK: <DK className="flag-icon" title="Denmark" />,
          GBP: <GB className="flag-icon" title="United Kingdom" />,
          HUF: <HU className="flag-icon" title="Hungary" />,
          PLN: <PL className="flag-icon" title="Poland" />,
          RON: <RO className="flag-icon" title="Romania" />,
          ISK: <IS className="flag-icon" title="Iceland" />,
          NOK: <NO className="flag-icon" title="Norway" />,
          TRY: <TR className="flag-icon" title="Turkey" />,
          AUD: <AU className="flag-icon" title="Australia" />,
          BRL: <BR className="flag-icon" title="Brazil" />,
          CNY: <CN className="flag-icon" title="China" />,
          HKD: <HK className="flag-icon" title="Hong Kong" />,
          IDR: <ID className="flag-icon" title="Indonesia" />,
          ILS: <IL className="flag-icon" title="Israel" />,
          INR: <IN className="flag-icon" title="India" />,
          KRW: <KR className="flag-icon" title="South Korea" />,
          MXN: <MX className="flag-icon" title="Mexico" />,
          NZD: <NZ className="flag-icon" title="New Zealand" />,
          PHP: <PH className="flag-icon" title="Philippines" />,
          THB: <TH className="flag-icon" title="Thailand" />,
          ZAR: <ZA className="flag-icon" title="South Africa" />,
        };

        const FlagComponent = flagComponents[params.value];

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {FlagComponent}
            <span style={{ marginLeft: "8px" }}>{params.value}</span>
          </div>
        );
      },
    },
    { headerName: "Rate", field: "rate", filter: "agNumberColumnFilter" },
  ];

  return (
    <div
      className="ag-theme-alpine custom-ag-theme"
      style={{ height: 400, width: "100%", marginTop: "20px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          flex: 1,
          minWidth: 100,
          headerClass: "header-center",
        }}
      />
    </div>
  );
};

export default AgGridTable;
