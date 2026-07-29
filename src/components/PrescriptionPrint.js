import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const PrescriptionPrint = () => {

  const navigate = useNavigate();

  const data = JSON.parse(
  localStorage.getItem("consultationData")
);

if (!data) {
  return <h2>No Data Found</h2>;
}

const {
  patient,
  visit,
  complaintRows,
  diseaseRows,
  allergyRows,
  investigationRows,
  procedureRows,
  surgeryRows,
  prescriptionRows,
} = data;

  return (
    <div className="consultation-page">

      <div style={{
        marginTop:"-20px"
      }} className="print-header">
        <h1>ASHU MULTISPECIALITY CLINIC</h1>
        <p>Near Bus Stand, Your City</p>
        <p>Phone : 9876543210</p>
      </div>

      <hr />

      <h2 style={{ textAlign: "center" }}>
        PRESCRIPTION SLIP
      </h2>

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
      

<h3>Visit Details</h3>

<table
  border="1"
  width="100%"
  cellPadding="8"
  style={{
    borderCollapse: "collapse",
    marginBottom: "20px",
  }}
>
  <tbody>

    <tr>
      <td><b>Complaints</b></td>
      <td>
        {complaintRows?.length
          ? complaintRows.map(x => x.complaint?.complaintName).join(", ")
          : "No Complaint"}
      </td>
    </tr>

    <tr>
      <td><b>Diseases</b></td>
      <td>
        {diseaseRows?.length
          ? diseaseRows.map(x => x.disease?.diseaseName).join(", ")
          : "No Disease"}
      </td>
    </tr>

    <tr>
      <td><b>Allergies</b></td>
      <td>
        {allergyRows?.length
          ? allergyRows.map(x => x.allergyName).join(", ")
          : "No Allergy"}
      </td>
    </tr>

    <tr>
      <td><b>Investigations</b></td>
      <td>
        {investigationRows?.length
          ? investigationRows.map(x => x.investigationName).join(", ")
          : "No Investigation"}
      </td>
    </tr>

    <tr>
      <td><b>Procedures</b></td>
      <td>
        {procedureRows?.length
          ? procedureRows.map(x => x.procedureName).join(", ")
          : "-"}
      </td>
    </tr>

    <tr>
      <td><b>Surgery</b></td>
      <td>
        {surgeryRows?.length
          ? surgeryRows.map(x => x.surgery?.surgeryName).join(", ")
          : "-"}
      </td>
    </tr>

  </tbody>
</table>

<h3>Prescription</h3>

<table
  border="1"
  width="100%"
  cellPadding="8"
  style={{ borderCollapse: "collapse" }}
>
  <thead>
    <tr>
      <th>#</th>
      <th>Medicine</th>
      <th>Dosage</th>
      <th>Days</th>
    </tr>
  </thead>

  <tbody>

    {prescriptionRows?.length ? (
      prescriptionRows.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.medicine?.medicine || item.medicine}</td>
          <td>{item.dosage}</td>
          <td>{item.days}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4">No Prescription</td>
      </tr>
    )}

  </tbody>
</table>

      <div
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        <div>
          ______________________
          <br />
          Patient Signature
        </div>

        <div>
          ______________________
          <br />
          Doctor Signature
        </div>

      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontWeight: "bold",
        }}
      >
        Thank You For Visiting
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

export default PrescriptionPrint;