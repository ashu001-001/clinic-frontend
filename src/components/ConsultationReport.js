import React, { useEffect, useState } from "react";
import axios from "axios";
import { GETALLVISIT } from "./Constant";
import { useLocation } from "react-router-dom";

function ConsultationReport() {

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const from = params.get("from");
  const to = params.get("to");

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {

    const res = await axios.get(GETALLVISIT);

    let data = res.data;

    if (from && to) {

      data = data.filter((v) => {

        const d = new Date(v.visitDate);

        return (
          d >= new Date(from) &&
          d <= new Date(to + "T23:59:59")
        );

      });

    }

    setVisits(data);

  };

  const totalCollection = visits.reduce(
    (sum, v) => sum + (v.consultantCharge || 0),
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
          Consultation Report
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

        <table className="table table-bordered">

         <thead className="table-success">
  <tr>

    <th>Sr.</th>

    <th>Patient ID</th>

    <th>Visit No.</th>

    <th>Date</th>

    <th>Patient</th>

    <th>Consultant</th>

    <th>Fee</th>

  </tr>
</thead>

        <tbody>

  {

    visits.map((v, index) => (

      <tr key={v._id}>

        <td>{index + 1}</td>

        <td>
          {v.patientId?.patientId}
        </td>

        <td>
          {v.visitno}
        </td>

        <td>
          {new Date(v.visitDate).toLocaleDateString()}
        </td>

        <td>
          {v.patientId?.name}
        </td>

        <td>
          {v.consultant?.consultantName}
        </td>

        <td>
          ₹ {v.consultantCharge}
        </td>

      </tr>

    ))

  }

</tbody>

        </table>

        <div
          style={{
            marginTop: "20px",
            textAlign: "right",
            fontSize: "20px",
            fontWeight: "700",
            color: "#198754",
          }}
        >
          Total Collection : ₹ {totalCollection}
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

export default ConsultationReport;