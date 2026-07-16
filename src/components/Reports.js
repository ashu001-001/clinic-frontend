import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Reports() {

  const navigate = useNavigate();

const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

  const reports = [
    {
      title: "Patient Report",
      icon: "👤",
      color: "#0d6efd",
      desc: "View All Registered Patients",
      route: "/patient-report",
    },
    {
      title: "Consultation Report",
      icon: "🩺",
      color: "#198754",
      desc: "Doctor Consultation Collection",
      route: "/consultation-report",
    },
    {
      title: "Treatment Report",
      icon: "🦷",
      color: "#ff9800",
      desc: "Treatment Collection",
      route: "/treatment-report",
    },
    {
  title: "Sitting Report",
  icon: "🪑",
  color: "#8e44ad",
  desc: "View All Dental Sitting Collection",
  route: "/sitting-report",
},

  ];

  return (
    <>
      <Header />
      <div
        style={{
          padding: "40px",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h2
          style={{
            color: "#0d6efd",
            marginBottom: "30px",
            marginTop: "-30px",
            fontWeight: "700",
          }}
        >
          📊 Reports
        </h2>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
          }}
        >
          {reports.map((item, index) => (

            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                marginTop:"-12px",
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(0,0,0,.1)",
                borderTop: `5px solid ${item.color}`,
                transition: ".3s",
              }}
            >
                            <h3
                style={{
                  marginTop: "10px",
                  color: item.color,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#666",
                }}
              >
                {item.desc}
              </p>
              <div style={{ marginTop: "15px" }}>

  <label> From </label>

  <input
    type="date"
    className="form-control"
    value={fromDate}
    onChange={(e)=>setFromDate(e.target.value)}
  />

  <label style={{marginTop:"10px"}}> To </label>

  <input
    type="date"
    className="form-control"
    value={toDate}
    onChange={(e)=>setToDate(e.target.value)}
  />

</div>

<button
style={{
  marginTop:"20px",
  background:item.color,
  color:"#fff",
  border:"none",
  padding:"10px 20px",
  borderRadius:"10px",
  cursor:"pointer",
  width:"100%"
}}
onClick={()=>
navigate(
`${item.route}?from=${fromDate}&to=${toDate}`
)
}
>
Generate Report
</button>

            </div>

          ))}

        </div>

      </div>

    </>
  );
}

export default Reports;