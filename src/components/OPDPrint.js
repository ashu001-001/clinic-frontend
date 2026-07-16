import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ConsultationPrint.css";

const OPDPrint = () => {

  const navigate = useNavigate();

  const data = JSON.parse(
    localStorage.getItem("consultationData")
  );

  
  

  
  if (!data) {
    return <h2>No Data Found</h2>;
  }

  const { patient, visit } = data;


  return (
    <div className="consultation-page">

      <div className="print-header">
        <h1>ASHU MULTISPECIALITY CLINIC</h1>
        <p>Near Bus Stand, Your City</p>
        <p>Phone : 9876543210</p>
      </div>

      <hr />

       <table className="patient-table">

        <tbody>

          <tr>
            <td><b>Patient ID</b></td>
            <td>{patient.patientId}</td>

            <td><b>Visit No</b></td>
            <td>{visit.visitno}</td>
          </tr>

          <tr>
            <td><b>Patient Name</b></td>
            <td>{patient.name}</td>

            <td><b>Age</b></td>
            <td>{patient.age}</td>
          </tr>

          <tr>
            <td><b>Consultant</b></td>
            <td>{visit.consultant?.consultantName}</td>

            <td><b>Date</b></td>
            <td>
              {new Date(visit.visitDate).toLocaleDateString()}
            </td>
          </tr>

          

        </tbody>

      </table>



     

      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontWeight: "bold",
        }}
      >
        {/* Thank You For Visiting */}
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          padding: "10px 15px",
        }}
      >
        ✖
      </button>

    </div>
  );
};

export default OPDPrint;