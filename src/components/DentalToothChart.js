import React, { useState } from "react";

const upperTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11,
  21, 22, 23, 24, 25, 26, 27, 28
];

const lowerTeeth = [
  48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38
];

function Tooth({ number, selected, onClick }) {
  return (
    
    <div
      onClick={() => onClick(number)}
      style={{
        width: "55px",
        cursor: "pointer",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: selected ? "700" : "500",
          color: selected ? "#0056b3" : "#555",
          marginBottom: "6px",
        }}
      >
        {number}
      </div>

      <div
        style={{
          width: "48px",
          height: "58px",
          margin: "auto",
          borderRadius: "45% 45% 42% 42%",
          background: selected ? "#d9f1ff" : "#fff",
          border: selected
            ? "3px solid #0056b3"
            : "2px solid #b9c7d5",
          boxShadow: selected
            ? "0 0 12px rgba(0, 86, 179, .35)"
            : "0 2px 5px rgba(0,0,0,.08)",
          transition: "all .15s ease",
        }}
      />
    </div>
  );
}

function DentalToothChart() {
  const [selectedTooth, setSelectedTooth] = useState(null);

  const handleToothClick = (number) => {
    setSelectedTooth(number);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f9ff",
        padding: "25px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "20px 25px",
            marginBottom: "20px",
            boxShadow: "0 5px 18px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#0056b3",
            }}
          >
            🦷 Dental Tooth Chart
          </h2>

          <p
            style={{
              margin: "7px 0 0",
              color: "#777",
            }}
          >
            Select any tooth to view its information
          </p>
        </div>

        {/* Main */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "20px",
            alignItems: "start",
          }}
        >
          {/* Tooth Chart */}
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "35px 20px",
              boxShadow: "0 5px 18px rgba(0,0,0,.08)",
              overflowX: "auto",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginTop: 0,
                color: "#333",
              }}
            >
              UPPER ARCH
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                minWidth: "900px",
              }}
            >
              {upperTeeth.map((number) => (
                <Tooth
                  key={number}
                  number={number}
                  selected={selectedTooth === number}
                  onClick={handleToothClick}
                />
              ))}
            </div>

            <div
              style={{
                height: "1px",
                background: "#dce7f2",
                margin: "35px auto",
                maxWidth: "900px",
              }}
            />

            <h3
              style={{
                textAlign: "center",
                margin: 0,
                color: "#333",
              }}
            >
              LOWER ARCH
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                minWidth: "900px",
              }}
            >
              {lowerTeeth.map((number) => (
                <Tooth
                  key={number}
                  number={number}
                  selected={selectedTooth === number}
                  onClick={handleToothClick}
                />
              ))}
            </div>
          </div>

          {/* Information Panel */}
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "22px",
              boxShadow: "0 5px 18px rgba(0,0,0,.08)",
              minHeight: "220px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#0056b3",
              }}
            >
              Tooth Information
            </h3>

            {!selectedTooth ? (
              <div
                style={{
                  color: "#888",
                  lineHeight: "1.6",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                  🦷
                </div>

                <div>
                  Select a tooth from the chart to see its information.
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: "#eaf6ff",
                    borderRadius: "10px",
                    padding: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#777",
                    }}
                  >
                    Selected Tooth
                  </div>

                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      color: "#0056b3",
                    }}
                  >
                    {selectedTooth}
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "9px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Number:</strong> {selectedTooth}
                </div>

                <div
                  style={{
                    padding: "12px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "9px",
                  }}
                >
                  <strong>Status:</strong> Healthy
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DentalToothChart;