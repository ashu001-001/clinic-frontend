import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./Reports.css";

function Reports() {
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState({});

  const reports = [
    {
      title: "Patient Report",
      icon: "👤",
      color: "#0d6efd",
      desc: "View all registered patients",
      route: "/patient-report",
    },
    {
      title: "Consultation Report",
      icon: "🩺",
      color: "#198754",
      desc: "Doctor consultation collection",
      route: "/consultation-report",
    },
    {
      title: "Treatment Report",
      icon: "🦷",
      color: "#ff9800",
      desc: "Treatment collection and records",
      route: "/treatment-report",
    },
    // {
    //   title: "Sitting Report",
    //   icon: "🪑",
    //   color: "#8e44ad",
    //   desc: "View all dental sitting collection",
    //   route: "/sitting-report",
    // },
  ];

  const handleDateChange = (index, field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const generateReport = (item, index) => {
    const from = dateRange[index]?.from || "";
    const to = dateRange[index]?.to || "";

    if (!from || !to) {
      alert("Please select From Date and To Date");
      return;
    }

    if (from > to) {
      alert("From Date cannot be greater than To Date");
      return;
    }

    navigate(`${item.route}?from=${from}&to=${to}`);
  };

  return (
    <>
      <Header />

      <div className="reports-page">
        <div className="reports-container">

          {/* HEADER */}
          <div className="reports-header">
            <div>
              <div className="reports-badge">
                📊 CLINIC ANALYTICS
              </div>

              <h1 className="reports-title">
                Reports
              </h1>

              <p className="reports-subtitle">
                Generate and view detailed clinic reports by date range.
              </p>
            </div>

            <div className="reports-header-icon">
              📈
            </div>
          </div>


          {/* REPORT GRID */}
          <div className="reports-grid">

            {reports.map((item, index) => {

              const current = dateRange[index] || {};

              return (
                <div
                  className="report-card"
                  key={index}
                  style={{
                    "--report-color": item.color,
                  }}
                >

                  {/* CARD TOP */}
                  <div className="report-card-top">

                    <div
                      className="report-icon"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>

                    <div className="report-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                  </div>


                  {/* TITLE */}
                  <h2 className="report-title">
                    {item.title}
                  </h2>

                  <p className="report-description">
                    {item.desc}
                  </p>


                  {/* DATE */}
                  <div className="date-section">

                    <div className="date-field">

                      <label>
                        From Date
                      </label>

                      <input
                        type="date"
                        value={current.from || ""}
                        onChange={(e) =>
                          handleDateChange(
                            index,
                            "from",
                            e.target.value
                          )
                        }
                      />

                    </div>


                    <div className="date-field">

                      <label>
                        To Date
                      </label>

                      <input
                        type="date"
                        value={current.to || ""}
                        onChange={(e) =>
                          handleDateChange(
                            index,
                            "to",
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>


                  {/* BUTTON */}
                  <button
                    className="generate-button"
                    style={{
                      background: item.color,
                    }}
                    onClick={() =>
                      generateReport(item, index)
                    }
                  >
                    <span>Generate Report</span>
                    <span className="button-arrow">
                      →
                    </span>
                  </button>

                </div>
              );
            })}

          </div>


          {/* FOOTER INFO */}
          <div className="reports-info">
            <span>🔒 Secure Reports</span>
            <span>•</span>
            <span>📅 Select Date Range</span>
            <span>•</span>
            <span>📄 Detailed Records</span>
          </div>

        </div>
      </div>
    </>
  );
}

export default Reports;