import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { GETPT } from "./Constant";
import { useLocation } from "react-router-dom";

function PatientReport() {

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const from = params.get("from");
  const to = params.get("to");

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {

    const res = await axios.get(GETPT);

    let data = res.data;

    if(from && to){

      data = data.filter((x)=>{

        const d = new Date(x.createdAt);

        return(
          d >= new Date(from) &&
          d <= new Date(to + "T23:59:59")
        );

      });

    }

    setPatients(data);

  };

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
        margin: "auto",
        background: "#fff",
        padding: "30px",
        position: "relative",
        boxShadow: "0 0 20px rgba(0,0,0,.2)",
      }}
    >

      {/* Close Button */}

      <button
        onClick={() => window.history.back()}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "25px",
          height: "25px",
          borderRadius: "50%",
          border: "none",
          background: "#dc3545",
          color: "#fff",
          fontSize: "14px",
          fontWeight:"20px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* Heading */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            color: "#0d6efd",
            marginBottom: "5px",
          }}
        >
          Ashu Dental Clinic
        </h2>

        <h3>Patient Registration Report</h3>

        <hr />
      </div>

      {/* Report Info */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          fontWeight: "600",
        }}
      >
        <span>
        <div>
          From :
          {" "}
          {from || "All"}
         </div>
          <div>
          To :
          {" "}
          {to || "All"}
        </div>
        </span>

        <div>
          Total Registration :
          {" "}
          {patients.length}
        </div>
      </div>

      {/* Table */}

      <table className="table table-bordered">

        <thead
          style={{
            background: "#0d6efd",
            color: "#fff",
          }}
        >
          <tr>

            <th>Sr.</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Registration Date</th>

          </tr>
        </thead>

        <tbody>

          {

            patients.map((p,index)=>(

              <tr key={p._id}>

                <td>{index+1}</td>

                <td>{p.name}</td>

                <td>{p.gender}</td>

                <td>{p.age}</td>

                <td>{p.phone}</td>

                <td>
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

      {/* Footer */}

      <div
        style={{
          marginTop: "40px",
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
            cursor: "pointer",
          }}
        >
          🖨 Print Report
        </button>

        <div
          style={{
            color: "#777",
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

export default PatientReport;