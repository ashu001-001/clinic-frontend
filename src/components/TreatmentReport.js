import React, { useEffect, useState } from "react";
import axios from "axios";
import { GETALLVISITTREATMENT } from "./Constant";
import { useLocation } from "react-router-dom";

function TreatmentReport() {

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const from = params.get("from");
  const to = params.get("to");

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {

    const res = await axios.get(GETALLVISITTREATMENT);

    let data = res.data;

    if (from && to) {

      data = data.filter((v) => {

        const d = new Date(v.treatmentDate);

        return (
          d >= new Date(from) &&
          d <= new Date(to + "T23:59:59")
        );

      });

    }

    setVisits(data);

  };

 const totalCollection = visits.reduce(
  (sum, item) => sum + Number(item.finalAmount || 0),
  0
);

  
  return (

    <div
      style={{
        background: "#d9d9d9",
        minHeight: "100vh",
        padding: "30px",
      }}
    >

      <div
        style={{
          width: "210mm",
          minHeight: "297mm",
          background: "#fff",
          margin: "auto",
          padding: "30px",
          position: "relative",
          boxShadow: "0 0 20px rgba(0,0,0,.2)",
        }}
      >

        <button
          onClick={() => window.history.back()}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            width: "25px",
            height: "25px",
            border: "none",
            borderRadius: "50%",
            background: "#dc3545",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            textAlign: "center",
            color: "#198754",
          }}
        >
          Teeth Management System
        </h2>

        <h3
  style={{
    textAlign: "center",
    marginBottom: "25px",
  }}
>
  Treatment Report
</h3>

        <hr />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          <div>From : {from || "All"}</div>

          <div>To : {to || "All"}</div>

          <div>
            Total Visits : {visits.length}
          </div>
        </div>

      {visits
  .filter((v) => (v.items || []).length > 0)
  .map((v) => {

  const visitTotal = Number(v.finalAmount || 0);

    return (

      <div
        key={v._id}
        style={{
          border: "2px solid #000",
          marginBottom: "25px",
          padding: "15px",
          pageBreakInside: "avoid",
        }}
      >

        <div style={{ marginBottom: "15px", lineHeight: "28px" }}>

          <div
  style={{
    display: "flex",
    
    alignItems: "center",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "16px",
  }}
>
  <div>
    <b>Patient ID :</b> {v.patientId?.patientId}
  </div>

  <div>
    <b>Patient Name :</b> {v.patientId?.name}
  </div>

  <div>
    <b>Visit No. :</b> {v.visitId?.visitno}
  </div>

  <div>
    <b>Date :</b> {new Date(v.treatmentDate).toLocaleDateString()}
  </div>
</div>

        </div>

        <table
          className="table table-bordered"
          style={{ marginBottom: 0 }}
        >

          <thead className="table-secondary">

            <tr>

              <th>Treatment</th>

              <th
                style={{
                  width: "180px",
                  textAlign: "right",
                }}
              >
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {v.items.map((t) => (

  <tr key={t._id}>

    <td>{t.treatment?.treatmentName}</td>

    <td style={{ textAlign: "right" }}>
      ₹ {t.amount}
    </td>

  </tr>

))}

            <tr
              style={{
                fontWeight: "bold",
                background: "#e9ecef",
              }}
            >

              <td>TOTAL</td>

              <td style={{ textAlign: "right" }}>
                ₹ {visitTotal}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    );

  })}

     <div
  style={{
    marginTop: "30px",
    borderTop: "3px solid #000",
    paddingTop: "20px",
    textAlign: "center",
  }}
>

  <h3
    style={{
      marginBottom: "10px",
      letterSpacing: "2px",
    }}
  >
    GRAND TOTAL
  </h3>

  <h2
    style={{
      color: "#198754",
      fontWeight: "bold",
    }}
  >
    ₹ {totalCollection}
  </h2>

</div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >

          <button
            onClick={() => window.print()}
            style={{
              background: "#198754",
              color: "#fff",
              border: "none",
              padding: "10px 25px",
              borderRadius: "8px",
            }}
          >
            🖨 Print Report
          </button>

          <div
            style={{
              color: "#666",
              marginTop: "10px",
            }}
          >
            Generated :
            {" "}
            {new Date().toLocaleString()}
          </div>

        </div>

      </div>

    </div>

  );

}

export default TreatmentReport;