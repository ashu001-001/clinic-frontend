import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPrint.css";

const BillPrint = () => {

  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("billData"));

 

  if (!data) {
    return (
      <div style={{ padding: 30 }}>
        <h3>No Bill Data Found</h3>
      </div>
    );
  }

  const {
    patient,
    selectedVisit,
    treatmentRows,
    billData,
    treatmentTotal,
    grandTotal,
    balance,
  } = data;

  return (
    <div className="print-page">

      <button
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          border: "none",
          background: "#dc3545",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 9999,
        }}
      >
        ✕
      </button>

      <div className="print-header">

        <h1>ASHU DENTAL CLINIC</h1>

        <p>Near Bus Stand, Dewas (M.P.)</p>

        <p>Phone : 9876543210</p>

      </div>

      <hr />

      <h2 className="title">
        DENTAL BILL
      </h2>

      <table className="patient-table">
        <tbody>

          <tr>
            <td><b>Patient ID</b></td>
            <td>{patient.patientId}</td>

            <td><b>Visit No.</b></td>
            <td>{selectedVisit.visitno}</td>
          </tr>

          <tr>
            <td><b>Patient Name</b></td>
            <td>{patient.name}</td>

            <td><b>Date</b></td>
            <td>{new Date().toLocaleDateString()}</td>
          </tr>

          <tr>
            <td><b>Payment Mode</b></td>
            <td>{billData.paymentMode}</td>

            <td><b>Paid</b></td>
            <td>₹ {billData.paidAmount}</td>
          </tr>

        </tbody>
      </table>

      <br />

      <table
  className="patient-table"
  style={{
    marginBottom: "20px",
    border: "2px solid ",
  }}
>

        <thead>

          <tr>

            <th>Sr.</th>

            <th>Treatment</th>

            <th>Amount</th>

            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {treatmentRows.length > 0 ? (

            treatmentRows.map((row, index) => (

              <tr key={index}>

                <td>{index + 1}</td>

                <td>{row.treatment}</td>

                <td>₹ {row.amount}</td>

                <td>
                  {new Date(row.date).toLocaleDateString()}
                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="4" style={{ textAlign: "center" }}>
                No Treatment
              </td>

            </tr>

          )}

        </tbody>

      </table>

      <br />

      <table className="patient-table">

        <tbody>

          <tr>

            <td><b>Treatment Total</b></td>

            <td>₹ {treatmentTotal}</td>

          </tr>

          <tr>

            <td><b>Discount</b></td>

            <td>₹ {billData.discount}</td>

          </tr>

          <tr>

            <td><b>Grand Total</b></td>

            <td>₹ {grandTotal}</td>

          </tr>

          <tr>

            <td><b>Paid Amount</b></td>

            <td>₹ {billData.paidAmount}</td>

          </tr>

          <tr>

            <td><b>Balance</b></td>

            <td>₹ {balance}</td>

          </tr>

        </tbody>

      </table>

     

      <div
  style={{
    marginTop: "40px",
    textAlign: "center",
    borderTop: "2px dashed #999",
    paddingTop: "15px",
    color: "#555",
  }}
>

  <h3
    style={{
      color: "#198754",
      marginBottom: "5px",
    }}
  >
    Thank You For Visiting
  </h3>

  <div>
    We Care For Your Smile 😊
  </div>

  <div
    style={{
      marginTop: "8px",
      fontSize: "13px",
    }}
  >
    Computer Generated Bill • No Signature Required
  </div>

</div>

    </div>
  );
};

export default BillPrint;