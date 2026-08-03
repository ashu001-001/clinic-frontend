import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ADDPT, GETPT, EDITPT, GETVISIT, VISIT, GETALLVISIT, GETALLVISITTREATMENT } from "./Constant";
import {
  GETALLERGY, GETCOMPLAINT, GETCONSULTANT, GETDISEASE, GETINVESTIGATION, GETPRESCRIPTION,
  GETPROCEDURE, GETTREATMENT, GETSURGERY
} from "./Constant"
import { GETREFERENCE, GETCITY, } from "./Constant";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { executeAssistantCommand } from "../assistant/AssistantEngine";

const Home = () => {
  const [formData, setFormData] = useState({
    prefix:"",
    name: "",
    surname: "",
    fatherName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    stateName: "",
    cityName: "",
    referenceBy: "",
  });

  const [patientId, setPatientId] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [visitHistory, setVisitHistory] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [investigations, setInvestigations] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [prescriptionRows, setPrescriptionRows] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [treatmentRows, setTreatmentRows] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [search, setSearch] = useState("");

  const [references, setReferences] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const [time, setTime] = useState(new Date());
  const [listening, setListening] = useState(false);
const [voiceText, setVoiceText] = useState("");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = SpeechRecognition
  ? new SpeechRecognition()
  : null;

  const [showAssistant, setShowAssistant] = useState(false);
const [command, setCommand] = useState("");


  const [todayConsultationCount, setTodayConsultationCount] = useState(0);
  const [todayConsultationAmount, setTodayConsultationAmount] = useState(0);

const marqueeText =
  localStorage.getItem("activeMarqueeText") ||
  "Welcome to Ashu Dental Clinic. We care for your smile!";

  const [todayPatients, setTodayPatients] = useState(0);
  const [todayConsultations, setTodayConsultations] = useState(0);
  const [todayTreatments, setTodayTreatments] = useState(0);
  const [todayCollection, setTodayCollection] = useState(0);

  const loadDashboard = async () => {
    try {

      const patientRes = await axios.get(GETPT);
      const visitRes = await axios.get(GETALLVISIT);
      const billRes = await axios.get(GETALLVISITTREATMENT);

      const today = new Date().toDateString();

      // Today's Patients
      const patientsToday = patientRes.data.filter(
        p => new Date(p.createdAt).toDateString() === today
      );

      // Today's Visits
      const visitsToday = visitRes.data.filter(
        v => new Date(v.visitDate).toDateString() === today
      );

      // Today's Consultation Amount

      setTodayConsultationCount(visitsToday.length);

      let consultationAmount = 0;

      visitsToday.forEach((visit) => {
        consultationAmount += Number(
          visit.consultantCharge || 0
        );
      });

      setTodayConsultationAmount(consultationAmount);

      // Today's Bills
      const billsToday = billRes.data.filter(
        b => new Date(b.createdAt).toDateString() === today
      );

      // Dashboard Counts
      setTodayPatients(patientsToday.length);
      setTodayConsultations(visitsToday.length);

      // Today's Treatment Count
      let treatmentCount = 0;

      billsToday.forEach((bill) => {
        treatmentCount += bill.items?.length || 0;
      });

      setTodayTreatments(treatmentCount);

      // Today's Collection
      let total = 0;

      billsToday.forEach((bill) => {
        total += Number(bill.finalAmount || 0);
      });

      



      setTodayCollection(total);

    } catch (err) {
      console.log(err);
    }
  };


  const startListening = () => {
  if (!recognition) {
    alert("Speech Recognition Browser me support nahi karta.");
    return;
  }

  recognition.lang = "hi-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();

  setListening(true);

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;

    console.log("Voice :", text);

    setVoiceText(text);

    setListening(false);
  };

  recognition.onerror = (err) => {
    console.log(err);

    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };
};


  const navigate = useNavigate();

  useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const handleCityChange = (e) => {
    const city = e.target.value;

    const selected = cities.find(
      c => c.cityName.toLowerCase() === city.toLowerCase()
    );

    if (selected) {
      setFormData({
        ...formData,
        cityName: city,
        stateName: selected.stateName,
      });
    } else {
      setFormData({
        ...formData,
        cityName: city,
        stateName: "",
      });
    }
  };


  const [visitData, setVisitData] = useState({
    consultant: "",
    consultantCharge: "",
    complaint: "",
    disease: "",
    allergy: "",
    investigation: "",
    procedure: "",
    surgery: "",
    treatment: "",
    treatmentAmount: "",
    medicine: "",
    dosage: "",
    days: "",
    notes: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const getPatients = async () => {
    try {
      const res = await axios.get(GETPT);
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getConsultants = async () => {
    const res = await axios.get(GETCONSULTANT);
    setConsultants(res.data);
  };

  const getReferences = async () => {
    const res = await axios.get(GETREFERENCE);
    setReferences(res.data.data);
  };

  const getCities = async () => {
    try {
      const res = await axios.get(GETCITY);

      setCities(res.data.data);   // agar backend {data:[...]} bhej raha hai

      // agar array aa raha ho to
      // setCities(res.data);

    } catch (err) {
      console.log(err);
    }
  };


  const loadCities = async () => {
    const res = await axios.get(GETCITY);
    setCities(res.data.data);
  };

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    getPatients();
    loadDashboard();
    getReferences();
    getCities();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(ADDPT, formData);

      setPatientId(response.data.patientId);

      setSelectedPatient(response.data);

      setIsEdit(true);

      alert(
        `Patient Registered Successfully\n\nPatient ID: ${response.data.patientId}`
      );

      getPatients();
      loadDashboard();

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Error");
    }
  };

  const handleClear = () => {
    setPatientId("");

    setFormData({
      prefix:"",
      name: "",
      surname: "",
      fatherName: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      stateName: "",
      cityName: "",
      referenceBy: "",
      cityName: "",
      stateName: "",
    });
  };

  const selectPatientByName = (name) => {

  const patient = patients.find((p) =>
    `${p.name} ${p.surname || ""}`
      .toLowerCase()
      .trim()
      .includes(name.toLowerCase())
  );

  if (!patient) {
    alert("Patient Not Found");
    return;
  }

  setSelectedPatient(patient);

  setPatientId(patient.patientId);

  setFormData({
    prefix: patient.prefix || "",
    name: patient.name || "",
    surname: patient.surname || "",
    fatherName: patient.fatherName || "",
    age: patient.age || "",
    gender: patient.gender || "",
    phone: patient.phone || "",
    address: patient.address || "",
    stateName: patient.stateName || "",
    cityName: patient.cityName || "",
    referenceBy: patient.referenceBy || "",
  });

  setIsEdit(true);

  alert(`${patient.name} Selected`);
};

const executeCommand = (text) => {

  text = text.toLowerCase().trim();

  // ---------- SELECT PATIENT ----------

  if (
    text.includes("select") ||
    text.includes("open") ||
    text.includes("edit") ||
    text.includes("data") ||
    text.includes("profile")
  ) {

    const patient = patients.find((p) => {

      const fullName =
        `${p.name} ${p.surname || ""}`.toLowerCase();

      return text.includes(fullName) ||
             text.includes(p.name.toLowerCase());

    });

    if (patient) {

      setSelectedPatient(patient);

      setPatientId(patient.patientId);

      setFormData({
        prefix: patient.prefix || "",
        name: patient.name || "",
        surname: patient.surname || "",
        fatherName: patient.fatherName || "",
        age: patient.age || "",
        gender: patient.gender || "",
        phone: patient.phone || "",
        address: patient.address || "",
        stateName: patient.stateName || "",
        cityName: patient.cityName || "",
        referenceBy: patient.referenceBy || "",
      });

      setIsEdit(true);

      return;
    }

  }

  // ---------- CLEAR ----------

  if (
    text.includes("clear") ||
    text.includes("new patient")
  ) {

    handleClear();

    setSelectedPatient(null);

    setIsEdit(false);

    return;
  }

  // ---------- UPDATE ----------

  if (
    text.includes("update")
  ) {

    handleUpdate();

    return;
  }

  
};


const runCommand = () => {

  executeAssistantCommand({

    command,

    patients,

    setSelectedPatient,

    setPatientId,

    setFormData,

    setIsEdit,

    navigate,

  });

  setCommand("");

};


  const handleUpdate = async () => {

    console.log("Selected Patient =>", selectedPatient);

    try {
      const response = await axios.put(
        `${EDITPT}/${selectedPatient._id}`,
        formData
      );

      alert(response.data.msg);

      getPatients();
      setIsEdit(false);
      setSelectedPatient(null);

      setPatientId("");

      setFormData({
        prefix:"",
        name: "",
        surname: "",
        fatherName: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        stateName: "",
        cityName: "",
        referenceBy: "",
        city: "",
        stateName: "",
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Update Failed");
    }
  };
  const getPatientHistory = async (id) => {
    try {
      const res = await axios.get(`${GETVISIT}${id}`);

      setVisitHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />

      <div style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "20px",
        marginTop: "-10px",

      }} className="container mt-4">

        <div style={{
          display: "flex",
          justifyContent: "space-between",
        }}>

          <div style={{
            width: "590px"
          }}
            className="registration-card">
            <h2 className="registration-title">Patient Registration</h2>

            {patientId && (
              <div className="success-box">
                <strong style={{
                  color: "#1eb933",
                  marginBottom: "20px",
                }}>Patient Registered Successfully</strong>
                <br />
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">

                <div className="col-md-6 mb-3">
                  <label
                    style={{
                      width: "90px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}
                  >Patient ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={patientId}
                    readOnly
                  />
                </div>

                <div style={{
                  display: "flex",
                  gap: "15px",
                }}
                  className="col-md-6 mb-3">
                  <label
                    style={{
                      width: "75px",
                      display: "inline-block",
                      fontWeight: "600",
                      marginleft: "10px"
                    }}
                  >Name</label>
                   <select  style={{
                    width:"70px",
                    height:"37px"
                  }}
                    name="prefix"
                    className="form-control"
                    value={formData.prefix}
                    onChange={handleChange}
                    required
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Master">Master</option>
                  </select>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    style={{
                      width: "170px",

                    }}
                    type="text"
                    name="surname"
                    placeholder="Enter Surname"
                    className="form-control"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label
                    style={{
                      width: "90px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}
                  >Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />

                  <label> Gender </label>
                  <select
                    name="gender"
                    className="form-control"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    style={{
                      width: "90px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}
                  >Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setFormData({
                        ...formData,
                        phone: value,
                      });
                    }}
                    maxLength={10}
                    required
                  />


                  <label
                    style={{
                      width: "105px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}
                  > Father Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    className="form-control"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label
                    style={{
                      width: "90px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}
                  >Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: "403px" }}
                  />
                </div>



                <div className="col-md-6 mb-3">

                  <label
                    style={{
                      width: "90px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}
                  >City</label>

                  <input
                    list="cityList"
                    className="form-control"
                    value={formData.cityName}
                    onChange={handleCityChange}
                  />

                  <datalist id="cityList">
                    {cities.map((c) => (
                      <option
                        key={c._id}
                        value={c.cityName}
                      />
                    ))}
                  </datalist>


                  <label>State</label>

                  <input
                    type="text"
                    className="form-control"
                    value={formData.stateName}
                    onChange={(e) => setFormData({
                      ...formData,
                      stateName: e.target.value
                    })}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label

                  >Reference By</label>
                  <select
                    name="referenceBy"
                    className="form-control"
                    value={formData.referenceBy}
                    onChange={handleChange}
                  >

                    <option defaultValue="Self">Select</option>

                    {references.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.referenceBy}
                      </option>
                    ))}

                  </select>
                </div>



                <div className="col-md-12 text-center">
                  {isEdit ? (
                    <>
                      <button
                        type="button"
                        className="form-btn update-btn me-2"
                        onClick={handleUpdate}
                      >
                        Update Patient
                      </button>

                      <button
                        type="button"
                        className="form-btn cancel-btn"
                        onClick={() => {
                          setIsEdit(false);
                          setSelectedPatient(null);
                          setPatientId("");

                          setFormData({
                            prefix:"",
                            name: "",
                            surname: "",
                            fatherName: "",
                            age: "",
                            gender: "",
                            phone: "",
                            address: "",
                            stateName: "",
                            cityName: "",
                            referenceBy: "",
                            city: "",
                            stateName: "",
                          });
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="form-btn print-btn me-2"
                        onClick={() => navigate(`/registration-print/${patientId}`)}
                        disabled={!patientId}
                      >
                        🖨 Print
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="form-btn save-btn me-2"
                      >
                        Save
                      </button>

                      <button style={{
                        background: "#57544c",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                      }}
                        type="button"
                        className="form-btn clear-btn"
                        onClick={handleClear}
                      >
                        Clear
                      </button>
                    </>
                  )}
                </div>

              </div>
            </form>
          </div>



          <div>

            {/* Marquee Section */}
            {marqueeText && (
              <div
                style={{
                  width: "580px",
                  background: "linear-gradient(90deg,#ff512f,#dd2476)",
                  color: "#fff",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize:"18px",
                  boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease",
                  marginTop: "10px",
                }}
              >
                <marquee behavior="scroll" direction="left" scrollamount="7">
                  📢 {marqueeText}
                </marquee>
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
                marginBottom: "20px",
                marginTop: "20px",
                width: "590px"
              }}
            >

              {/* New Patients */}

              <div
                style={{
                  background: "linear-gradient(135deg,#5B247A,#1BCEDF)",
                  color: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 10px 20px rgba(0,0,0,.15)",
                  height: "20vh",
                  boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease",
                }}
              >


                <h5 style={{ marginTop: "15px" }}>
                  Today's New Patients
                </h5>

                <h2>{todayPatients}</h2>
              </div>

              {/* Consultation */}

              <div
                style={{
                  background: "linear-gradient(135deg,#11998e,#38ef7d)",
                  color: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 10px 20px rgba(0,0,0,.15)",
                  height: "20vh",
                  boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease",
                }}
              >


                <h5 style={{ marginTop: "15px" }}>
                  Today's Consultations
                </h5>

                <h2>{todayConsultations}</h2>
              </div>

              {/* Treatment */}

              <div
                style={{
                  background: "linear-gradient(135deg,#12c2e9,#c471ed,#f64f59)",
                  color: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 10px 20px rgba(0,0,0,.15)",
                  height: "20vh",
                  boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease", 
                }}
              >


                <h5 style={{ marginTop: "15px" }}>
                  Today's Treatments
                </h5>

                <h2>{todayTreatments}</h2>

              </div>

              <div
                style={{
                  background: "linear-gradient(135deg,#00c6ff,#2a5888,#1e3c72)",
                  color: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 10px 20px rgba(0,0,0,.15)",
                  height: "20vh",
                  boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease",
                }}
              >


                <h5 style={{ marginTop: "15px" }}>
                  Today's Consultation Amount
                </h5>

                <h2>₹{todayConsultationAmount}</h2>
               


              </div>



              {/* Collection */}

              <div
                style={{
                  background: "linear-gradient(135deg,#f12711,#f5af19)",
                  color: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 10px 20px rgba(0,0,0,.15)",
                  height: "20vh",
                  boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease",
                }}
              >

                <h5 style={{ marginTop: "15px" }}>
                  Today's Treatment Collection
                </h5>

                <h2>₹{todayCollection}</h2>

              </div>


              <div
  style={{
background: "linear-gradient(135deg,#0F2027,#203A43,#2C5364)" ,
    color: "#fff",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,.15)",
    height: "20vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease",
  }}
>
  <h5 style={{ fontSize: "18px",
    marginTop:"45px"
   }}>{time.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})}</h5>

  <h3 style={{ fontSize: "23px",
    margin:"-10px"
   }}>
    {time.toLocaleTimeString()}
  </h3>

  <h6 style={{ fontSize: "18px",
   }}>
    {time.toLocaleDateString("en-US", {
      weekday: "long",
    })}
  </h6>
</div>



            </div>
            
          </div>

        </div>




        <div style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
          className="card shadow">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                color: "#0d6efd",
                margin: 0,
                fontWeight: "700",
              }}
            >
              Patient List
            </h2>

            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search Patient ID / Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "450px",
                borderRadius: "15px",
                height: "36px",
                paddingLeft: "10px",
                fontSize: "18px"
              }}
            />
          </div>

          <div
            className="table-responsive"
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              borderRadius: "10px",
              border: "1px solid #dee2e6",
            }}
          >
            <table
              className="table table-hover align-middle"
              style={{
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#ffffff",
                  color: "#000000",
                  zIndex: 100,
                }}
              >

                <tr>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >S.No</th>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >Patient ID</th>
                   <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >Prefix</th>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >Name</th>
                  <th
                    style={{
                      padding: "1px",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                    }}
                  >Surname</th>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >Age</th>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >Gender</th>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >Phone</th>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >Father Name</th>
                  <th
                    style={{
                      padding: "12px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  > City</th>
                  <th
                    style={{
                      padding: "12px",

                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  > State</th>
                  <th
                    style={{
                      padding: "12px",
                      paddingLeft: "px",
                      whiteSpace: "nowrap",
                      textAlign: "right",
                    }}
                  >Profile</th>
                </tr>
              </thead>

              <tbody>
                {patients.length > 0 ? (
                  patients
                    .filter((item) => {
                      return (
                        item.patientId?.toLowerCase().includes(search.toLowerCase()) ||
                        item.name?.toLowerCase().includes(search.toLowerCase()) ||
                        item.phone?.toLowerCase().includes(search.toLowerCase()) ||
                        item.surname?.toLowerCase().includes(search.toLowerCase())
                      );
                    })
                    .map((item, index) => (
                      <tr key={item._id}>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{index + 1}</td>

                        <td
                          style={{
                            color: "blue",
                            cursor: "pointer",

                            fontWeight: "bold",
                          }}


                          onClick={() => {

                            setSelectedPatient(item);

                            setPatientId(item.patientId);


                            setFormData({
                              prefix:item.prefix || "",
                              name: item.name || "",
                              age: item.age || "",
                              gender: item.gender || "",
                              phone: item.phone || "",
                              address: item.address || "",
                              stateName: item.stateName || "",
                              cityName: item.cityName || "",
                              referenceBy: item.referenceBy || "",
                              surname: item.surname || "",
                              fatherName: item.fatherName || "",
                            });

                            setIsEdit(true);
                          }}
                        >
                          {item.patientId}
                        </td>
                         <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.prefix}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.name}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "left",
                          }}
                        >{item.surname}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.age}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.gender}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.phone}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.fatherName}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.cityName}</td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >{item.stateName}</td>

                        <td>
                          <button
                            style={{
                              background: "#198754",
                              color: "#fff",
                              border: "none",
                              padding: "10px 20px",
                              borderRadius: "10px",
                              marginLeft: "15px",
                              marginBottom: "5px",
                              boxShadow:
                                "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",

                              transition: "all .3s ease",
                            }}
                            className="btn btn-info btn-sm"
                            onClick={() => navigate(`/patient/${item._id}`)}
                          >
                            Profile
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      No Patients Found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
      <div
  onClick={startListening}
  style={{
    position: "absolute",
    right: "30px",
    bottom: "30px",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: listening ? "#dc3545" : "#0d6efd",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,.3)",
    transition: ".3s",
  }}
>
  {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
</div>

{voiceText && (
  <div
    style={{
      position: "fixed",
      bottom: "120px",
      right: "30px",
      margin:"50px",
      background: "#fff",
      padding: "150px",
      borderRadius: "10px",
      width: "320px",
      boxShadow: "0 5px 20px rgba(0,0,0,.2)",
      zIndex: 999600,
    }}
  >
    <b>You Said :</b>

    <br />

    {voiceText}
  </div>
)}

{/* Floating Assistant */}

<div
  onClick={() => setShowAssistant(!showAssistant)}
  style={{
    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#0d6efd",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    cursor: "pointer",
    zIndex: 99999,
    boxShadow: "0 8px 20px rgba(0,0,0,.3)"
  }}
>
 🤖
</div>

{showAssistant && (
  <div
    style={{
      position: "fixed",
      right: "25px",
      bottom: "100px",
      width: "330px",
      background: "#fff",
      borderRadius: "12px",
      padding: "15px",
      boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      zIndex: 99999
    }}
  >
    <h5>Dental Assistant</h5>

    <input
      className="form-control"
      placeholder="Type Command..."
      value={command}
      onChange={(e) => setCommand(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          runCommand();
        }
      }}
    />

    <button
      className="btn btn-primary mt-3 w-100"
      onClick={runCommand}
    >
      Run Command
    </button>
  </div>
)}

    </>
  );
};

export default Home;