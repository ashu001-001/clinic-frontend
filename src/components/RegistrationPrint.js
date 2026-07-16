import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import { GETPT } from "./Constant";
import "./RegistrationPrint.css";

const RegistrationPrint = () => {

    const { id } = useParams();
    const navigate = useNavigate();

const [patient, setPatient] = useState({});

    const getPatient = async () => {
  try {

    const res = await axios.get(GETPT);

    const data = res.data.find(
      (p) => p.patientId === id
    );

    setPatient(data || {});

  } catch (err) {
    console.log(err);
  }
};

    useEffect(() => {
        getPatient();
    }, []);

    return (

        <div className="print-page">
            <button
  onClick={() => navigate("/home")}
  style={{
    position: "fixed",
    top: "15px",
    right: "15px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "none",
    background: "#dc3545",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,.2)",
    zIndex: 9999,
    transition: "0.3s"
  }}
  onMouseOver={(e) => {
    e.target.style.background = "#bb2d3b";
    e.target.style.transform = "scale(1.08)";
  }}
  onMouseOut={(e) => {
    e.target.style.background = "#dc3545";
    e.target.style.transform = "scale(1)";
  }}
>
  ✕
</button>

            <div className="print-header">

                <h1>ASHU DENTAL CLINIC</h1>

                <p>
                    Near Bus Stand, Dewas, Madhya Pradesh
                </p>

                <p>
                    Phone : 9876543210
                </p>

            </div>

            <hr />

            <h2 className="title">
                PATIENT REGISTRATION
            </h2>

            <table className="patient-table">

                <tbody>

                    <tr>

                        <td><b>Patient ID</b></td>
                        <td>{patient.patientId}</td>

                        <td><b>Registration Date</b></td>
                        <td>

                            {patient.createdAt
                                ? new Date(
                                      patient.createdAt
                                  ).toLocaleDateString()
                                : ""}

                        </td>

                    </tr>

                    <tr>

                        <td><b>Name</b></td>
                        <td>{patient.name}</td>

                        <td><b>Age</b></td>
                        <td>{patient.age}</td>

                    </tr>

                    <tr>

                        <td><b>Gender</b></td>
                        <td>{patient.gender}</td>

                        <td><b>Phone</b></td>
                        <td>{patient.phone}</td>

                    </tr>

                    <tr>

                        <td><b>Address</b></td>

                        <td colSpan="3">

                            {patient.address}

                        </td>

                    </tr>

                </tbody>

            </table>

            <br />

            <div className="note">

                <h4>Instructions</h4>

                <ul>

                    <li>
                        Carry this registration slip during every visit.
                    </li>

                    <li>
                        Kindly preserve Patient ID for future reference.
                    </li>

                    <li>
                        Please report at reception before consultation.
                    </li>

                </ul>

            </div>

            <div className="signature">

                <div>

                    ______________________

                    <br />

                    Patient Signature

                </div>

                <div>

                    ______________________

                    <br />

                    Authorized Signatory

                </div>

            </div>

            <div className="footer">

                Thank You For Visiting

                <br />

                ASHU DENTAL CLINIC

            </div>

        </div>

    );

};

export default RegistrationPrint;