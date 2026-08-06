import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GETVISIT, VISIT, PROFILE } from "./Constant";
import BillPopup from "./BillPrint";
import {
  GETALLERGY, GETCOMPLAINT, GETCONSULTANT, GETDISEASE, GETINVESTIGATION, GETPRESCRIPTION,
  GETPROCEDURE, GETTREATMENT, GETSURGERY, UPDATEVISIT,
} from "./Constant"
import { GETVISITTREATMENT, UPDATEVISITTREATMENT, ADDVISITTREATMENT } from "./Constant";
import { ADDSITTING, GETALLSITTING, GETSITTING, UPDATESITTING } from "./Constant"
import "./PatientProfile.css";


const PatientProfile = () => {

  const { id } = useParams();

  const [patient, setPatient] = useState({});

  const [showDetail, setShowDetail] = useState(false);

  const [showFullHistory, setShowFullHistory] = useState(false);

  const [complaintRows, setComplaintRows] = useState([]);
  const [allergyRows, setAllergyRows] = useState([]);
  const [diseaseRows, setDiseaseRows] = useState([]);
  const [investigationRows, setInvestigationRows] = useState([]);
  const [procedureRows, setProcedureRows] = useState([]);
  const [surgeryRows, setSurgeryRows] = useState([]);
  const [showVitals, setShowVitals] = useState(false);

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
  const [activeCard, setActiveCard] = useState("");
  const [billId, setBillId] = useState(null);
  const [sittingId, setSittingId] = useState(null);
  const [sittingHistory, setSittingHistory] = useState([]);

  const [sittingData, setSittingData] = useState({
    sittingNo: "",
    sittingDate: new Date().toISOString().split("T")[0],
    paidAmount: "",
    paymentMode: "Cash",
    nextVisitDate: "",
  });

  const [workDoneRows, setWorkDoneRows] = useState([]);

  const [workDone, setWorkDone] = useState({
    treatment: "",
    remark: "",
  });

  const addWorkDone = () => {

    if (!workDone.treatment) return;

    setWorkDoneRows([
      ...workDoneRows,
      workDone,
    ]);

    setWorkDone({
      treatment: "",
      remark: "",
    });

  };

  const handleSittingSave = async () => {

    try {

      const payload = {

        visitId: selectedVisit._id,
        patientId: patient._id,

        sittingNo: Number(sittingData.sittingNo),

        sittingDate: sittingData.sittingDate,

        workDone: workDone.treatment
          .split("\n")
          .map((t, i) => ({
            treatment: t.trim(),
            remark: workDone.remark.split("\n")[i]?.trim() || "",
          }))
          .filter(x => x.treatment),

        paidAmount: Number(sittingData.paidAmount),

        paymentMode: sittingData.paymentMode,

        nextVisitDate: sittingData.nextVisitDate,

      };

      let res;

      if (sittingId) {

        res = await axios.put(
          UPDATESITTING + sittingId,
          payload
        );

        alert("Sitting Updated");

      } else {

        res = await axios.post(
          ADDSITTING,
          payload
        );

        setSittingId(res.data._id);

        alert("Sitting Saved");

      }

      await getSittingHistory(selectedVisit._id);

      setActiveCard("");

      setSittingId(null);

      setWorkDone({
        treatment: "",
        remark: ""
      });

      setSittingData({
        sittingNo: "",
        sittingDate: new Date().toISOString().split("T")[0],
        paidAmount: "",
        paymentMode: "Cash",
        nextVisitDate: "",
      });

    } catch (err) {

      console.log(err);

      alert("Error");

    }

  };

  const getSittingHistory = async (visitId) => {
    try {
      const res = await axios.get(GETSITTING + visitId);

      console.log(res.data);

      setSittingHistory(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const totalAmount = treatmentRows.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const [billData, setBillData] = useState({
    discount: 0,
    paidAmount: 0,
    paymentMode: "Cash",
    remark: "",
  });

  const handleBillSave = async () => {
    try {

      const payload = {
        visitId: selectedVisit._id,
        patientId: patient._id,

        items: treatmentRows.map((row) => {

          const treatment = treatments.find(
            (t) => t.treatmentName === row.treatment
          );

          return {
            treatment: treatment?._id,
            amount: Number(row.amount),
          };

        }),

        totalAmount: treatmentTotal,
        discount: Number(billData.discount),
        finalAmount: grandTotal,
        paidAmount: Number(billData.paidAmount),
        balanceAmount: balance,
        paymentMode: billData.paymentMode,
        remark: billData.remark,
      };

      console.log(payload);

      let res;

      if (billId) {

        // ✅ Update Existing Bill
        res = await axios.put(
          UPDATEVISITTREATMENT + billId,
          payload
        );

        alert("Bill Updated Successfully");

      } else {

        // ✅ Save New Bill
        res = await axios.post(
          ADDVISITTREATMENT,
          payload
        );

        setBillId(res.data._id);

        alert("Bill Saved Successfully");

      }

      console.log(res.data);

      // Fresh data load kar lo
      getBillByVisit(selectedVisit._id);

    } catch (err) {

      console.log(err.response?.data || err);

      alert("Error Saving Bill");

    }
  };

  const getBillByVisit = async (visitId) => {
    try {

      const res = await axios.get(GETVISITTREATMENT + visitId);

      if (res.data.length > 0) {

        const bill = res.data[0];

        // ✅ Update ke liye Bill Id save karo
        setBillId(bill._id);

        setTreatmentRows(
          bill.items.map((item) => ({
            _id: item.treatment._id,
            treatment: item.treatment.treatmentName,
            amount: item.amount,
            date: bill.treatmentDate,
          }))
        );

        setBillData({
          discount: bill.discount,
          paidAmount: bill.paidAmount,
          paymentMode: bill.paymentMode,
          remark: bill.remark,
        });

      } else {

        // Naya Bill
        setBillId(null);

        setTreatmentRows([]);

        setBillData({
          discount: 0,
          paidAmount: 0,
          paymentMode: "Cash",
          remark: "",
        });

      }

    } catch (err) {
      console.log(err);
    }
  };

  const loadVisit = (visit) => {

    console.log(visit.complaints);
    setSelectedVisit(visit);
    getSittingHistory(visit._id);
    getBillByVisit(visit._id);
   setVisitData({
  consultant: visit.consultant?._id || "",
  consultantCharge: visit.consultantCharge || 0,
  notes: visit.notes || "",

  vitals:
    visit.vitals && visit.vitals.length > 0
      ? visit.vitals
      : [{
          weight: "",
          bp: "",
          temp: "",
          pulse: "",
          spo2: "",
          bsl: "",
        }],
});

    setComplaintRows(visit.complaints || []);
    setDiseaseRows(visit.diseases || []);
    setAllergyRows(visit.allergies || []);
    setInvestigationRows(visit.investigations || []);
    setProcedureRows(visit.procedures || []);
    setSurgeryRows(visit.surgeries || []);
    setPrescriptionRows(visit.prescription || []);

    setShowVisitForm(true);

  };

  const [editingVisitId, setEditingVisitId] = useState(null);

  const addRow = (
    list,
    value,
    rows,
    setRows,
    field
  ) => {

    const selected = list.find(
      x => x._id === value
    );

    if (!selected) return;

    if (rows.some(x => x._id === selected._id)) {
      alert("Already Added");
      return;
    }

    setRows([...rows, selected]);

    setVisitData({
      ...visitData,
      [field]: ""
    });

  };


  const [visitData, setVisitData] = useState({
    
    consultant: "",
    consultantCharge: "",
    complaint: "",
    complaintDays: "",
    complaintDuration: "Days",
    disease: "",
    diseaseDays: "",
    diseaseDuration: "Days",
    allergy: "",
    investigation: "",
    procedure: "",
    surgery: "",
    surgeryDays: "",
    surgeryDuration: "Days",
    treatment: "",
    treatmentAmount: "",
    medicine: "",
    dosage: "",
    days: "",
    quantity: "",
    nextVisitDate: "",
    notes: "",
    vitals: [{
  weight: "",
  bp: "",
  temp: "",
  pulse: "",
  spo2: "",
  bsl: "",
}],
  
  });

  const addMedicine = () => {

    if (!visitData.medicine) return;

    setPrescriptionRows([
      ...prescriptionRows,
      {
        medicine: visitData.medicine,
        dosage: visitData.dosage,
        days: Number(visitData.days),
        quantity: Number(visitData.quantity),
        nextVisitDate: visitData.nextVisitDate,
      },
    ]);

    setVisitData({
      ...visitData,
      medicine: "",
      dosage: "",
      days: "",
      quantity: "",
      nextVisitDate: "",
    });
  };

  const addComplaint = () => {
    const selected = complaints.find(
      x => x._id === visitData.complaint
    );
    console.log(selected);

    if (!selected) return;

    setComplaintRows([
      ...complaintRows,
      {
        ...selected,
        days: visitData.complaintDays,
        duration: visitData.complaintDuration,
      }
    ]);

    setVisitData({
      ...visitData,
      complaint: "",
      complaintDays: "",
      complaintDuration: "Days",
    });
  };

  const addDisease = () => {
    const selected = diseases.find(
      x => x._id === visitData.disease
    );

    if (!selected) return;

    setDiseaseRows([
      ...diseaseRows,
      {
        ...selected,
        days: visitData.diseaseDays,
        duration: visitData.diseaseDuration,
      }
    ]);

    setVisitData({
      ...visitData,
      disease: "",
      diseaseDays: "",
      diseaseDuration: "Days",
    });
  };

  const addSurgery = () => {
    const selected = surgeries.find(
      x => x._id === visitData.surgery
    );

    if (!selected) return;

    setSurgeryRows([
      ...surgeryRows,
      {
        ...selected,
        days: visitData.surgeryDays,
        duration: visitData.surgeryDuration,
      }
    ]);
    setVisitData({
      ...visitData,
      surgery: "",
      surgeryDays: "",
      surgeryDuration: "Days",
    });
  };

  const addTreatment = () => {

    const selected = treatments.find(
      (t) => t._id === visitData.treatment
    );

    if (!selected) return;

    setTreatmentRows([
      ...treatmentRows,
      {
        treatment: selected.treatmentName,
        date: new Date(),
        amount: selected.amount,
      },]);

    setVisitData({
      ...visitData,
      treatment: "",
      treatmentAmount: "",
    });
  };

  const handleVisitSave = async () => {

    console.log(visitData);

    try {

      const payload = {
        patientId: patient._id,
        visitno: visitHistory.length + 1,

        consultant: visitData.consultant,
        consultantCharge: Number(
          visitData.consultantCharge || 0
        ),
        complaints: complaintRows.map(x => ({
          complaint: x.complaint?._id || x._id,
          days: Number(x.days || 0),
          duration: x.duration,
        })),

        diseases: diseaseRows.map(x => ({
          disease: x._id,
          days: Number(x.days || 0),
          duration: x.duration,
        })),

        surgeries: surgeryRows.map(x => ({
          surgery: x._id,
          days: Number(x.days || 0),
          duration: x.duration,
        })),

        allergies: allergyRows.map(x => x._id),
        investigations: investigationRows.map(x => x._id),
        procedures: procedureRows.map(x => x._id),

        prescription: prescriptionRows,
        treatment: treatmentRows,

        vitals: visitData.vitals,

        notes: visitData.notes || "",
      };

      console.log(payload);

      const res = await axios.post(VISIT, payload);

      console.log(res.data);

      alert("Visit Saved Successfully");

      setSelectedVisit(res.data);

      getPatientHistory();

    } catch (err) {

      console.log(err.response?.data);

      alert(err.response?.data?.msg || "Error Saving Visit");
    }
  };

  const handleVisitUpdate = async (visitId) => {

    try {
      const payload = {
        patientId: patient._id,
        visitno: selectedVisit.visitno,
        consultant: visitData.consultant,
        consultantCharge: Number(
          visitData.consultantCharge || 0
        ),
        complaints: complaintRows.map(x => ({
          complaint: x.complaint?._id || x._id,
          days: Number(x.days || 0),
          duration: x.duration,
        })),
        diseases: diseaseRows.map(x => ({
          disease: x.disease?._id || x._id,
          days: Number(x.days || 0),
          duration: x.duration,
        })),
        surgeries: surgeryRows.map(x => ({
          surgery: x.surgery?._id || x._id,
          days: Number(x.days || 0),
          duration: x.duration,
        })),
        allergies: allergyRows.map(x => x._id),
        investigations: investigationRows.map(x => x._id),
        procedures: procedureRows.map(x => x._id),
        prescription: prescriptionRows,
        treatment: treatmentRows,
        vitals: visitData.vitals,
        notes: visitData.notes || "",
      };

      const res = await axios.put(
        `${UPDATEVISIT}/${visitId}`,
        payload
      );
      console.log(res.data);
      alert("Visit Updated Successfully");
      getPatientHistory();
      setSelectedVisit(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Error Updating Visit");
    }
  };

  const getConsultants = async () => {
    const res = await axios.get(GETCONSULTANT);
    setConsultants(res.data);
  };
  const getComplaints = async () => {
    const res = await axios.get(GETCOMPLAINT);
    setComplaints(res.data);
  };
  const getDiseases = async () => {
    const res = await axios.get(GETDISEASE);
    setDiseases(res.data);
  };
  const getAllergies = async () => {
    const res = await axios.get(GETALLERGY);
    setAllergies(res.data);
  };
  const getInvestigations = async () => {
    const res = await axios.get(GETINVESTIGATION);
    setInvestigations(res.data);
  };
  const getProcedures = async () => {
    const res = await axios.get(GETPROCEDURE);
    setProcedures(res.data);
  };
  const getSurgeries = async () => {
    const res = await axios.get(GETSURGERY);
    setSurgeries(res.data);
  };
  const getMedicines = async () => {
    const res = await axios.get(GETPRESCRIPTION);
    setMedicines(res.data);
  };
  const getTreatments = async () => {
    const res = await axios.get(GETTREATMENT);
    setTreatments(res.data);
  };
  const treatmentTotal = treatmentRows.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );
  const subTotal = treatmentTotal;
  const grandTotal =
    subTotal - Number(billData.discount || 0);
  const balance =
    grandTotal - Number(billData.paidAmount || 0);
  const resetVisitForm = () => {
    setSelectedVisit(null);

    setVisitData({
      consultant: "",
      consultantCharge: "",
      complaint: "",
      complaintDays: "",
      complaintDuration: "Days",

      disease: "",
      diseaseDays: "",
      diseaseDuration: "Days",

      surgery: "",
      surgeryDays: "",
      surgeryDuration: "Days",

      allergy: "",
      investigation: "",
      procedure: "",
      treatment: "",
      treatmentAmount: "",
      medicine: "",
      dosage: "",
      days: "",
      quantity: "",
      nextVisitDate: "",
      notes: "",

      vitals: [{
  weight: "",
  bp: "",
  temp: "",
  pulse: "",
  spo2: "",
  bsl: "",
}],
    });
    setComplaintRows([]);
    setDiseaseRows([]);
    setAllergyRows([]);
    setInvestigationRows([]);
    setProcedureRows([]);
    setSurgeryRows([]);
    setPrescriptionRows([]);
    setTreatmentRows([]);

    setEditingVisitId(null);
    setBillId(null);
    setSittingId(null);

    setSittingHistory([]);

    setBillData({
      discount: 0,
      paidAmount: 0,
      paymentMode: "Cash",
      remark: "",
    });

    setSittingData({
      sittingNo: "",
      sittingDate: new Date().toISOString().split("T")[0],
      paidAmount: "",
      paymentMode: "Cash",
      nextVisitDate: "",
    });

    setWorkDoneRows([]);

    setWorkDone({
      treatment: "",
      remark: "",
    })
  };

  const getPatient = async () => {
    try {
      const res = await axios.get(`${PROFILE}/${id}`);

      setPatient(res.data);

    } catch (err) {
      console.log(err);
    }


  };

  const getPatientHistory = async () => {
    try {
      const res = await axios.get(`${GETVISIT}${id}`);
      setVisitHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPatient();
    getPatientHistory();
    getConsultants();
    getComplaints();
    getDiseases();
    getAllergies();
    getInvestigations();
    getProcedures();
    getSurgeries();
    getMedicines();
    getTreatments();

  }, []);

  return (

    <> <Header />

      <div
        style={{
          padding: "20px",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}>

        <div style={{
          marginBottom: "-15px",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              marginBottom: "20px",
              width: "35%",
              height: "51vh",
            }}
          >
            <h2
              style={{
                color: "#0d6efd",
                marginBottom: "20px",
                marginTop: "-14px",

              }}
            >
              Patient Profile
            </h2>

            <div className="row">

              <div>
                <p style={{ display: "flex", marginBottom: "8px" }}>
                  <strong style={{ width: "120px" }}>Patient ID </strong>
                  <span style={{ width: "15px" }}>:</span>
                  <span>{patient.patientId}</span>
                </p>

                <p style={{ display: "flex", marginBottom: "8px" }}>
                  <strong style={{ width: "120px" }}>Name </strong>
                  <span style={{ width: "15px" }}>:</span>
                  <span>{patient.name} {" "}{patient.surname}</span>
                </p>

                <p style={{ display: "flex", marginBottom: "8px" }}>
                  <strong style={{ width: "120px" }}>Age </strong>
                  <span style={{ width: "15px" }}>:</span>
                  <span>{patient.age}</span>
                </p>

                <p style={{ display: "flex", marginBottom: "8px" }}>
                  <strong style={{ width: "120px" }}>Gender </strong>
                  <span style={{ width: "15px" }}>:</span>
                  <span>{patient.gender}</span>
                </p>

                <p style={{ display: "flex", marginBottom: "8px" }}>
                  <strong style={{ width: "120px" }}>Phone </strong>
                  <span style={{ width: "15px" }}>:</span>
                  <span>{patient.phone}</span>
                </p>

                <p style={{ display: "flex", marginBottom: "8px" }}>
                  <strong style={{ width: "120px" }}>Address </strong>
                  <span style={{ width: "15px" }}>:</span>
                  <textarea value={patient.address || ""}
                    readOnly
                    rows={3}
                    style={{
                      flex: 1,
                      resize: "none",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "8px",
                      background: "#f8f9fa",
                      overflowY: "auto"
                    }}
                  />

                </p>

                <p style={{ display: "flex", marginBottom: "8px" }}>
                  <strong style={{ width: "120px" }}>Registration </strong>
                  <span style={{ width: "15px" }}>:</span>
                  <span>
                    {patient.createdAt
                      ? new Date(patient.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </p>
              </div>

            </div>
          </div>







          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
              width: "55%",
              height: "52vh"
            }}
          >

            <h4
              style={{
                color: "#198754",
                marginBottom: "20px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px"
              }}
            >
              📊 Patient Summary
            </h4>

            <div className="row">

              <div className="col-md-3 mb-3">
                <h4 className="text-primary">Total Visits : {visitHistory.length}</h4>
                <h4>First Visit : {visitHistory.length
                  ? new Date(
                    visitHistory[visitHistory.length - 1].visitDate
                  ).toLocaleDateString()
                  : "-"}</h4>
                <button
                  style={{
                    background: "#198754",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    marginLeft: "0px",
                    marginBottom: "5px",
                    boxShadow:
                      "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",

                    transition: "all .3s ease",
                  }}
                  className="btn btn-info btn-sm"
                  onClick={() => setShowFullHistory(true)}
                >
                  Full History
                </button>
              </div>
            </div>

          </div>



        </div>

        <button
          style={{
            background: "#198754",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            margin: "12px",
            boxShadow:
              "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",

            transition: "all .3s ease",
          }}
          onClick={() => {

            if (showVisitForm) {

              // Close Visit
              resetVisitForm()
              setShowVisitForm(false);

              setSelectedVisit(null);
              setShowDetail(false);
              setActiveCard("");

              setVisitData({
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
                quantity: "",
                nextVisitDate: "",
                notes: "",
              });

              setComplaintRows([]);
              setDiseaseRows([]);
              setAllergyRows([]);
              setInvestigationRows([]);
              setProcedureRows([]);
              setSurgeryRows([]);
              setPrescriptionRows([]);
              setTreatmentRows([]);

            } else {

              // New Visit
              resetVisitForm()
              setSelectedVisit(null);
              setShowVisitForm(true);

            }

          }}
        >
          {showVisitForm ? "Close Visit" : "New Visit"}
        </button>

        {showVisitForm && (
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
          >
            <h3 style={{
              color: "#842bcc",
              marginBottom: "20px",
            }}>New Visit</h3>

            <div className="visit-menu">

              <button
                className={`visit-btn ${activeCard === "consultant" ? "active" : ""}`}
                onClick={() => setActiveCard("consultant")}
              >
                👨‍⚕️ Consultant
              </button>

              <button
                className={`visit-btn ${activeCard === "complaint" ? "active" : ""}`}
                onClick={() => setActiveCard("complaint")}
              >
                🤒 Complaint
              </button>

              <button
                className={`visit-btn ${activeCard === "allergy" ? "active" : ""}`}
                onClick={() => setActiveCard("allergy")}
              >
                🌿 Allergy
              </button>

              <button
                className={`visit-btn ${activeCard === "disease" ? "active" : ""}`}
                onClick={() => setActiveCard("disease")}
              >
                🦠 Disease
              </button>

              <button
                className={`visit-btn ${activeCard === "prescription" ? "active" : ""}`}
                onClick={() => setActiveCard("prescription")}
              >
                💊 Prescription
              </button>

              <button
                className={`visit-btn ${activeCard === "investigation" ? "active" : ""}`}
                onClick={() => setActiveCard("investigation")}
              >
                🔬 Investigation
              </button>

              <button
                className={`visit-btn ${activeCard === "procedure" ? "active" : ""}`}
                onClick={() => setActiveCard("procedure")}
              >
                🩺 Procedure
              </button>

              <button
                className={`visit-btn ${activeCard === "surgery" ? "active" : ""}`}
                onClick={() => setActiveCard("surgery")}
              >
                🏥 Surgery
              </button>

              <button
                className={`visit-btn ${activeCard === "notes" ? "active" : ""}`}
                onClick={() => setActiveCard("notes")}
              >
                📒 Notes
              </button>

              <button
                className={`visit-btn ${activeCard === "showVitals" ? "active" : ""}`}
                onClick={() => setActiveCard("vitals")}
              >
                🩺 Vitals
              </button>

            </div>
          </div>
        )}











        {
          activeCard === "complaint" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "900px",
                  maxWidth: "40%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                {/* Close Button */}
                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  🩺 Complaint
                </h3>

                <div className="row">

                  <div
                    className="col-md-8"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.complaint}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          complaint: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Complaint</option>

                      {complaints.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.complaintName}
                        </option>
                      ))}
                    </select>


                    <input
                      type="number"
                      className="form-control"
                      placeholder="Days"
                      value={visitData.complaintDays}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          complaintDays: e.target.value,
                        })
                      }
                    />

                    <select
                      className="form-control"
                      value={visitData.complaintDuration}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          complaintDuration: e.target.value,
                        })
                      }
                    >
                      <option value="Days">Days</option>
                      <option value="Months">Months</option>
                      <option value="Years">Years</option>
                    </select>

                    <button
                      className="btn btn-success"
                      onClick={addComplaint}
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">
                    <tr>
                      <th>Complaint</th>
                      <th>Days</th>
                      <th>Duration</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {complaintRows.length === 0 ? (

                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-muted"
                        >
                          No Complaint Added
                        </td>
                      </tr>

                    ) : (

                      complaintRows.map((row, index) => (

                        <tr key={index}>

                          <td>
                            {row.complaint?.complaintName || row.complaintName}
                          </td>

                          <td>{row.days}</td>

                          <td>{row.duration}</td>

                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setComplaintRows(
                                  complaintRows.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              ❌
                            </button>
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        }








        {
          activeCard === "consultant" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  width: "900px",
                  maxWidth: "35%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  👨‍⚕️ Consultant
                </h3>

                <div className="row">
                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <select
                      className="form-control"
                      value={visitData.consultant}
                      onChange={(e) => {
                        const selected = consultants.find(
                          (c) => c._id === e.target.value
                        );

                        setVisitData({
                          ...visitData,
                          consultant: e.target.value,
                          consultantCharge: selected?.consultantFee || 0,
                        });
                      }}
                    >
                      <option value="">Select Consultant</option>

                      {consultants.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.consultantName}
                        </option>
                      ))}
                    </select>

                    <input
                      className="form-control"
                      value={visitData.consultantCharge}

                      placeholder="Consultant Fee"
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          consultantCharge: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

              </div>
            </div>

          )
        }











        {
          activeCard === "allergy" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "900px",
                  maxWidth: "35%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                {/* Close Button */}
                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  🤧 Allergy
                </h3>

                <div className="row">

                  <div
                    className="col-md-8"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.allergy}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          allergy: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Allergy</option>

                      {allergies.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.allergyName}
                        </option>
                      ))}
                    </select>

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        addRow(
                          allergies,
                          visitData.allergy,
                          allergyRows,
                          setAllergyRows,
                          "allergy"
                        )
                      }
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">

                    <tr>
                      <th>Allergy</th>
                      <th width="100">Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {allergyRows.length === 0 ? (

                      <tr>

                        <td
                          colSpan="2"
                          className="text-center text-muted"
                        >
                          No Allergy Added
                        </td>

                      </tr>

                    ) : (

                      allergyRows.map((row, index) => (

                        <tr key={index}>

                          <td>{row.allergyName}</td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setAllergyRows(
                                  allergyRows.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              ❌
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        }











        {
          activeCard === "disease" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "900px",
                  maxWidth: "35%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  🩺 Disease
                </h3>

                <div className="row">

                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.disease}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          disease: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Disease</option>

                      {diseases.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.diseaseName}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Days"
                      value={visitData.diseaseDays}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          diseaseDays: e.target.value,
                        })
                      }
                    />

                    <select
                      className="form-control"
                      value={visitData.diseaseDuration}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          diseaseDuration: e.target.value,
                        })
                      }
                    >
                      <option value="Days">Days</option>
                      <option value="Months">Months</option>
                      <option value="Years">Years</option>
                    </select>

                    <button
                      className="btn btn-success"
                      onClick={addDisease}
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">
                    <tr>
                      <th>Disease</th>
                      <th>Days</th>
                      <th>Duration</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {diseaseRows.length === 0 ? (

                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-muted"
                        >
                          No Disease Added
                        </td>
                      </tr>

                    ) : (

                      diseaseRows.map((row, index) => (

                        <tr key={index}>

                          <td>
                            {row.disease?.diseaseName || row.diseaseName}
                          </td>

                          <td>{row.days}</td>

                          <td>{row.duration}</td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setDiseaseRows(
                                  diseaseRows.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              ❌
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        }











        {
          activeCard === "investigation" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "900px",
                  maxWidth: "35%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                {/* Close Button */}
                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  🔬 Investigation
                </h3>

                <div className="row">

                  <div
                    className="col-md-8"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.investigation}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          investigation: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Investigation</option>

                      {investigations.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.investigationName}
                        </option>
                      ))}
                    </select>

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        addRow(
                          investigations,
                          visitData.investigation,
                          investigationRows,
                          setInvestigationRows,
                          "investigation"
                        )
                      }
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">
                    <tr>
                      <th>Investigation</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {investigationRows.length === 0 ? (

                      <tr>
                        <td
                          colSpan="2"
                          className="text-center text-muted"
                        >
                          No Investigation Added
                        </td>
                      </tr>

                    ) : (

                      investigationRows.map((row, index) => (

                        <tr key={index}>

                          <td>{row.investigationName}</td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setInvestigationRows(
                                  investigationRows.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              ❌
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        }











        {
          activeCard === "procedure" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "900px",
                  maxWidth: "35%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                {/* Close Button */}
                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  ⚙️ Procedure
                </h3>

                <div className="row">

                  <div
                    className="col-md-8"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.procedure}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          procedure: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Procedure</option>

                      {procedures.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.procedureName}
                        </option>
                      ))}
                    </select>

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        addRow(
                          procedures,
                          visitData.procedure,
                          procedureRows,
                          setProcedureRows,
                          "procedure"
                        )
                      }
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">
                    <tr>
                      <th>Procedure</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {procedureRows.length === 0 ? (

                      <tr>
                        <td
                          colSpan="2"
                          className="text-center text-muted"
                        >
                          No Procedure Added
                        </td>
                      </tr>

                    ) : (

                      procedureRows.map((row, index) => (

                        <tr key={index}>

                          <td>{row.procedureName}</td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setProcedureRows(
                                  procedureRows.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              ❌
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        }











        {
          activeCard === "surgery" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "900px",
                  maxWidth: "35%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  🏥 Surgery
                </h3>

                <div className="row">

                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.surgery}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          surgery: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Select Surgery
                      </option>

                      {surgeries.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                        >
                          {c.surgeryName}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Days"
                      value={visitData.surgeryDays}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          surgeryDays: e.target.value,
                        })
                      }
                    />

                    <select
                      className="form-control"
                      value={visitData.surgeryDuration}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          surgeryDuration: e.target.value,
                        })
                      }
                    >
                      <option value="Days">Days</option>
                      <option value="Months">Months</option>
                      <option value="Years">Years</option>
                    </select>

                    <button
                      className="btn btn-success"
                      onClick={addSurgery}
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">
                    <tr>
                      <th>Surgery</th>
                      <th>Days</th>
                      <th>Duration</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      surgeryRows.length === 0 ? (

                        <tr>

                          <td
                            colSpan="4"
                            className="text-center text-muted"
                          >
                            No Surgery Added
                          </td>

                        </tr>

                      ) : (

                        surgeryRows.map((row, index) => (

                          <tr key={index}>

                            <td>
                              {row.surgery?.surgeryName || row.surgeryName}
                            </td>

                            <td>{row.days}</td>

                            <td>{row.duration}</td>

                            <td>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  setSurgeryRows(
                                    surgeryRows.filter(
                                      (_, i) => i !== index
                                    )
                                  )
                                }
                              >
                                ❌
                              </button>

                            </td>

                          </tr>

                        ))

                      )
                    }

                  </tbody>

                </table>

              </div>

            </div>

          )
        }










           {
          activeCard === "prescription" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "1100px",
                  maxWidth: "70%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                {/* Close Button */}
                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  💊 Prescription
                </h3>

                <div className="row">

                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.medicine}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          medicine: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Medicine</option>

                      {medicines.map((m) => (
                        <option
                          key={m._id}
                          value={m._id}
                        >
                          {m.medicine}
                        </option>
                      ))}
                    </select>

                    <input
                      className="form-control"
                      placeholder="Dosage"
                      value={visitData.dosage}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          dosage: e.target.value,
                        })
                      }
                    />

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Days"
                      value={visitData.days}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          days: e.target.value,
                        })
                      }
                    /><input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      value={visitData.quantity}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          quantity: e.target.value,
                        })
                      }
                    />


                    <button
                      className="btn btn-success"
                      onClick={addMedicine}
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">

                    <tr>
                      <th>Medicine</th>
                      <th>Dosage</th>
                      <th>Days</th>
                      <th>Qty</th>
                      <th width="100">Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {prescriptionRows.length === 0 ? (

                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-muted"
                        >
                          No Medicine Added
                        </td>
                      </tr>

                    ) : (

                      prescriptionRows.map((row, index) => (

                        <tr key={index}>

                          <td>
                            {
                              typeof row.medicine === "object"
                                ? row.medicine?.medicine
                                : medicines.find(
                                  (m) => m._id === row.medicine
                                )?.medicine
                            }
                          </td>

                          <td>{row.dosage}</td>

                          <td>{row.days}</td>

                          <td>{row.quantity}</td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setPrescriptionRows(
                                  prescriptionRows.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              ❌
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        }










        {
          activeCard === "treatment" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "1100px",
                  maxWidth: "70%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                {/* Close Button */}
                <button
                  onClick={() => setActiveCard(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    margin: "8px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  💉 Treatment
                </h3>

                <div className="row">

                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginBottom: "20px",
                    }}
                  >

                    <select
                      className="form-control"
                      value={visitData.treatment}
                      onChange={(e) => {

                        const selected =
                          treatments.find(
                            t => t._id === e.target.value
                          );

                        setVisitData({
                          ...visitData,
                          treatment: e.target.value,
                          treatmentAmount: selected?.amount || 0
                        });

                      }}
                    >

                      <option value="">
                        Select Treatment
                      </option>

                      {
                        treatments.map((t) => (
                          <option
                            key={t._id}
                            value={t._id}
                          >
                            {t.treatmentName}
                          </option>
                        ))
                      }

                    </select>

                    <input
                      className="form-control"
                      readOnly
                      value={visitData.treatmentAmount}
                      placeholder="Amount"
                    />

                    <button
                      className="btn btn-success"
                      onClick={addTreatment}
                    >
                      Add
                    </button>

                  </div>

                </div>

                <hr />

                <table className="table table-bordered table-hover">

                  <thead className="table-primary">

                    <tr>

                      <th>Treatment</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th width="100">Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {treatmentRows.length === 0 ? (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center text-muted"
                        >
                          No Treatment Added
                        </td>

                      </tr>

                    ) : (

                      treatmentRows.map((row, index) => (

                        <tr key={index}>

                          <td>{row.treatment}</td>

                          <td>₹ {row.amount}</td>

                          <td>
                            {new Date(row.date).toLocaleDateString()}
                          </td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                setTreatmentRows(
                                  treatmentRows.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              ❌
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        }










        {
          activeCard === "notes" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "900px",
                  maxWidth: "45%",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >

                {/* Close Button */}

                <button
                  onClick={() => setActiveCard("")}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    marginBottom: "20px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  📝 Clinical Notes
                </h3>

                <textarea
                  className="form-control"
                  rows={10}
                  placeholder="Enter Clinical Notes..."
                  value={visitData.notes}
                  onChange={(e) =>
                    setVisitData({
                      ...visitData,
                      notes: e.target.value,
                    })
                  }
                  style={{
                    resize: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    width: "580px",
                    paddingLeft: "5px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <button
                    className="btn btn-success"
                    onClick={() => setActiveCard("")}
                  >
                    ✔ Done
                  </button>
                </div>

              </div>

            </div>

          )
        }










        {
  activeCard === "vitals" && (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >

      <div
        style={{
          width: "900px",
          maxWidth: "55%",
          background: "#fff",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 15px 40px rgba(0,0,0,.35)",
          position: "relative",
        }}
      >

        <button
          onClick={() => setActiveCard("")}
          style={{
            position: "absolute",
            top: "12px",
            right: "18px",
            border: "none",
            background: "transparent",
            fontSize: "28px",
            cursor: "pointer",
            color: "#dc3545",
            fontWeight: "bold",
          }}
        >
          ×
        </button>

        <h3
          style={{
            color: "#0d6efd",
            marginBottom: "20px",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
          }}
        >
          🩺 Vitals
        </h3>

        <div className="row g-3">

          <div className="col-md-4">
            <label style={{
                      width: "100px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}>Weight (Kg)</label>
            <input
              type="number"
              className="form-control"
              value={visitData.vitals?.[0]?.weight || ""}
              onChange={(e) =>
                setVisitData({
                  ...visitData,
                  vitals: [{
                    ...visitData.vitals?.[0],
                    weight: e.target.value
                  }]
                })
              }
            />
          </div>

          <div className="col-md-4">
            <label style={{
                      width: "100px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}>BP</label>
            <input
              type="text"
              className="form-control"
              placeholder="120/80"
              value={visitData.vitals?.[0]?.bp || ""}
              onChange={(e) =>
                setVisitData({
                  ...visitData,
                  vitals: [{
                    ...visitData.vitals?.[0],
                    bp: e.target.value
                  }]
                })
              }
            />
          </div>

          <div className="col-md-4">
            <label 
            style={{
                      width: "100px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}
            >Temperature</label>
            <input
              type="number"
              className="form-control"
              value={visitData.vitals?.[0]?.temp || ""}
              onChange={(e) =>
                setVisitData({
                  ...visitData,
                  vitals: [{
                    ...visitData.vitals?.[0],
                    temp: e.target.value
                  }]
                })
              }
            />
          </div>

          <div className="col-md-4">
            <label style={{
                      width: "100px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}>Pulse</label>
            <input
              type="number"
              className="form-control"
              value={visitData.vitals?.[0]?.pulse || ""}
              onChange={(e) =>
                setVisitData({
                  ...visitData,
                  vitals: [{
                    ...visitData.vitals?.[0],
                    pulse: e.target.value
                  }]
                })
              }
            />
          </div>

          <div className="col-md-4">
            <label style={{
                      width: "100px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}>SPO2</label>
            <input
              type="number"
              className="form-control"
              value={visitData.vitals?.[0]?.spo2 || ""}
              onChange={(e) =>
                setVisitData({
                  ...visitData,
                  vitals: [{
                    ...visitData.vitals?.[0],
                    spo2: e.target.value
                  }]
                })
              }
            />
          </div>

          <div className="col-md-4">
            <label style={{
                      width: "100px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}>BSL</label>
            <input
              type="number"
              className="form-control"
              value={visitData.vitals?.[0]?.bsl || ""}
              onChange={(e) =>
                setVisitData({
                  ...visitData,
                  vitals: [{
                    ...visitData.vitals?.[0],
                    bsl: e.target.value
                  }]
                })
              }
            />
          </div>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <button
            className="btn btn-success"
            onClick={() => setActiveCard("")}
          >
            ✔ Done
          </button>
        </div>

      </div>

    </div>

  )
}










        {
          activeCard === "sitting" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >

              <div
                style={{
                  width: "800px",
                  maxWidth: "90%",
                  maxHeight: "92vh",
                  overflowY: "auto",
                  background: "linear-gradient(180deg,#ffffff,#f8fbff)",
                  borderRadius: "25px",
                  padding: "30px",
                  boxShadow: "0 25px 60px rgba(0,0,0,.25)",
                  border: "1px solid #e3f2fd",
                  position: "relative",
                }}
              >

                {/* Close */}

                <button
                  onClick={() => setActiveCard("")}
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "10px",
                    border: "none",
                    background: "transparent",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                <div
                  style={{
                    background: "linear-gradient(135deg,#1E90FF,#87CEFA)",
                    borderRadius: "15px",
                    padding: "15px 15px",
                    color: "#fff",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <h2 style={{
                      margin: 0,

                    }}>🦷 Dental Sitting</h2>
                    <small>Dental Clinic Management</small>
                  </div>

                  <h4 style={{
                    margin: 0,
                    fontSize: "20px",
                  }}>
                    Sitting No : {sittingData.sittingNo}
                  </h4>
                </div>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg,#ffffff,#f8fbff)",
                    border: "1px solid #dbeafe",
                    borderRadius: "15px",
                    padding: "20px",
                    marginBottom: "20px",

                  }}
                >
                  <div className="row">

                    <div className="col-md-3 mb-3">
                      <label>Sitting No.       </label>
                      <input style={{
                        borderRadius: "12px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                        boxShadow: "0 2px 8px rgba(0,0,0,.05)"
                      }}
                        type="number"
                        className="form-control"
                        value={sittingData.sittingNo}
                        readOnly
                      />

                      <label> Date </label>
                      <input style={{
                        borderRadius: "12px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                        boxShadow: "0 2px 8px rgba(0,0,0,.05)"
                      }}
                        type="date"
                        className="form-control"
                        value={sittingData.sittingDate}
                        onChange={(e) =>
                          setSittingData({
                            ...sittingData,
                            sittingDate: e.target.value
                          })
                        }
                      />
                      <label> Next Visit Date </label>

                      <input style={{
                        borderRadius: "12px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                        boxShadow: "0 2px 8px rgba(0,0,0,.05)"
                      }}
                        type="date"
                        className="form-control"
                        value={sittingData.nextVisitDate}
                        onChange={(e) =>
                          setSittingData({
                            ...sittingData,
                            nextVisitDate: e.target.value
                          })
                        }
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label>Paid Amount </label>
                      <input style={{
                        borderRadius: "12px",
                        padding: "10px",
                        border: "1px solid #dbeafe",
                        boxShadow: "0 2px 8px rgba(0,0,0,.05)"
                      }}
                        type="number"
                        className="form-control"
                        value={sittingData.paidAmount}
                        onChange={(e) =>
                          setSittingData({
                            ...sittingData,
                            paidAmount: e.target.value
                          })
                        }
                      />

                      <label> Payment Mode </label>

                      <select
                        className="form-control"
                        value={sittingData.paymentMode}
                        onChange={(e) =>
                          setSittingData({
                            ...sittingData,
                            paymentMode: e.target.value
                          })
                        }
                      >
                        <option>Cash</option>
                        <option>UPI</option>
                        <option>Card</option>
                        <option>Cheque</option>
                        <option>Bank Transfer</option>
                      </select>

                    </div>

                  </div>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg,#00c9a7,#92fe9d)",
                    padding: "15px 15px",
                    borderRadius: "15px",
                    marginBottom: "10px",
                    marginTop: "-10px",
                    border: "1px solid #e0ecff",
                    alignItems: "anchor-center",
                    display: "flex",
                    gap: "10px"

                  }}
                >
                  <label
                    style={{
                      color: "#fff",
                      fontSize: "22px",
                      fontWeight: "bold",

                    }}
                  >
                    🦷 Work Done
                  </label>

                  <textarea
                    style={{
                      width: "600px",
                      borderRadius: "10px",
                      border: "none"
                    }}
                    rows={4}
                    className="form-control"
                    value={workDone.treatment}
                    onChange={(e) =>
                      setWorkDone({
                        ...workDone,
                        treatment: e.target.value,
                      })
                    }
                  />

                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg,#00c9a7,#92fe9d)",
                    padding: "15px 15px",
                    borderRadius: "15px",
                    marginBottom: "10px",
                    border: "1px solid #e0ecff",
                    alignItems: "anchor-center",
                    display: "flex",
                    gap: "10px"

                  }}
                >
                  <label
                    style={{
                      color: "#fff",
                      fontSize: "22px",
                      fontWeight: "bold",

                    }}
                  >
                    📝  Remarks
                  </label>

                  <textarea style={{
                    width: "625px",
                    borderRadius: "10px",
                    border: "none",
                    height: "55px"
                  }}
                    rows={3}
                    className="form-control"
                    value={workDone.remark}
                    onChange={(e) =>
                      setWorkDone({
                        ...workDone,
                        remark: e.target.value,
                      })
                    }
                  />
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >

                  <button style={{
                    background: "#6c757d",
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 25px"
                  }}
                    className="btn btn-secondary"
                    onClick={() => setActiveCard("")}
                  >
                    Close
                  </button>

                  <button style={{
                    background:
                      "linear-gradient(135deg,#00c853,#43a047)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 30px",
                    boxShadow: "0 10px 20px rgba(67,160,71,.3)"
                  }}
                    className="btn btn-success"
                    onClick={handleSittingSave}
                  >
                    {sittingId ? "✏ Update Sitting" : "💾 Save Sitting"}
                  </button>

                </div>

              </div>

            </div>

          )
        }












        {showVisitForm && (

          <div
            style={{
              display: "flex",
              gap: "8px",
              margin: "10px",
            }}
          >
            <button style={{
              background: "#198754",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
              className="btn btn-secondary"
              onClick={() => {
                setShowVisitForm(false);
                setActiveCard("");
              }}
            >
              Cancel
            </button>

            <button
              style={{
                background: selectedVisit ? "#14cefd" : "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              className="btn"
              onClick={() => {
                if (selectedVisit) {
                  handleVisitUpdate(selectedVisit._id);
                } else {
                  handleVisitSave();
                }
              }}
            >
              {selectedVisit ? "✏️ Update Visit" : "💾 Save Visit"}
            </button>

            <button
              type="button"
              className="btn btn-info"
              onClick={() => setShowDetail(!showDetail)}
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              📋 Detail View
            </button>
            <button
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              className="btn btn-success"
              onClick={() => setActiveCard("prescriptionView")}
            >
              💊 Prescription
            </button>

            <button
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              className="btn btn-warning"
              onClick={() => setActiveCard("treatmentView")}
            >
              🦷 Treatment
            </button>

            <button
              className="btn"
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              onClick={() => setActiveCard("bill")}
            >
              💰 Bill
            </button>

            <button
              className="btn"
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              onClick={() => {

                if (!selectedVisit) {
                  alert("⚠️ Please select a patient visit first.");
                  return;
                }

               localStorage.setItem(
  "consultationData",
  JSON.stringify({
    patient,
    visit: selectedVisit,
    complaintRows,
    diseaseRows,
    allergyRows,
    investigationRows,
    procedureRows,
    surgeryRows,
    prescriptionRows,
    vitals: visitData.vitals,
  })
);

                navigate("/consultation-print");
              }}
            >
              🩺 PRINT RECEIPT
            </button>

            <button
              className="btn"
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              onClick={() => {

                setSittingId(null);

                const nextNo = sittingHistory.length + 1;

                setSittingData({
                  sittingNo: nextNo,
                  sittingDate: new Date().toISOString().split("T")[0],
                  paidAmount: "",
                  paymentMode: "Cash",
                  nextVisitDate: "",
                });

                setWorkDone({
                  treatment: "",
                  remark: "",
                });

                setActiveCard("sitting");

              }}
            >
              🦷 Sitting
            </button>


            <button
              className="btn"
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              onClick={() => setActiveCard("sittingHistory")}
            >
              📋 Sitting History
            </button>

            <button
              className="btn"
              style={{
                background: "#198754",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              onClick={() => {

                if (!selectedVisit) {
                  alert("⚠️ Please select a patient visit first.");
                  return;
                }

                localStorage.setItem(
                  "consultationData",
                  JSON.stringify({
                    patient,
                    visit: selectedVisit,
                  })
                );

                navigate("/OPD-print");
              }}
            >
              🖨 OPD Blank
            </button>

          </div>
        )}











        {
          activeCard === "prescriptionView" && (
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "30px",
                boxShadow: "0 8px 25px rgba(0,0,0,.12)",
                marginTop: "15px",
                marginBottom: "20px",
                border: "1px solid #e9ecef"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "2px solid #198754",
                  paddingBottom: "12px",
                  marginBottom: "20px"
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#198754",
                      fontWeight: "700"
                    }}
                  >
                    💊 Prescription
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#777",
                      fontSize: "14px"
                    }}
                  >
                    Doctor Prescription Details
                  </p>

                </div>

                <div
                  style={{
                    background: "#198754",
                    color: "#fff",
                    padding: "8px 18px",
                    borderRadius: "20px",
                    fontWeight: "600"
                  }}
                >
                  Total Medicines : {prescriptionRows.length}
                </div>

              </div>

              <div style={{
                marginBottom:"10px"
              }}> 
                 <h3
                    style={{
                      margin: 0,
                      color: "#198754",
                      fontWeight: "700"
                    }}
                  >
                    Vitals
                  </h3>
<div
  style={{
    background: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px",
  }}
>
  <div className="row">
   
    {visitData.vitals?.[0]?.weight && (
      <div style={{ display: "flex", marginBottom: "3px" }}>
        <strong style={{width:"111px"}}>Weight</strong>
        <strong style={{width:"10px"}}> : </strong>
        {visitData.vitals[0].weight} Kg
      </div>
    )}

    {visitData.vitals?.[0]?.bp && (
      <div style={{ display: "flex", marginBottom: "3px" }}>
        <strong style={{width:"111px"}}>BP</strong>
        <strong style={{width:"10px"}}> : </strong>
        {visitData.vitals[0].bp}
      </div>
    )}

    {visitData.vitals?.[0]?.temp && (
      <div style={{ display: "flex", marginBottom: "3px" }}>
        <strong style={{width:"111px"}}>Temperature </strong>
        <strong style={{width:"10px"}}> : </strong>
         {visitData.vitals[0].temp} °F
      </div>
    )}

    {visitData.vitals?.[0]?.pulse && (
       <div style={{ display: "flex", marginBottom: "3px" }}>
        <strong style={{width:"111px"}}>Pulse </strong>
        <strong style={{width:"10px"}}> : </strong>
        {visitData.vitals[0].pulse} bpm
      </div>
    )}

    {visitData.vitals?.[0]?.spo2 && (
       <div style={{ display: "flex", marginBottom: "3px" }}>
        <strong style={{width:"111px"}}> SPO₂ </strong>
        <strong style={{width:"10px"}}> : </strong>
        {visitData.vitals[0].spo2} %
      </div>
    )}

    {visitData.vitals?.[0]?.bsl && (
      <div style={{ display: "flex", marginBottom: "3px" }}>
        <strong style={{width:"111px"}}> BSL </strong>
        <strong style={{width:"10px"}}> : </strong>
         {visitData.vitals[0].bsl} mg/dL
      </div>
    )}

  </div>
</div>

              </div>

              <table
                className="table"
                style={{
                  marginBottom: 0
                }}
              >

                <thead>

                  <tr
                    style={{
                      background: "#198754",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >

                    <th style={{ width: "8%" }}>#</th>
                    <th>Medicine</th>
                    <th style={{ width: "20%" }}>Dosage</th>
                    <th style={{ width: "15%" }}>Days</th>
                    <th style={{ width: "15%" }}>Quantity</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    prescriptionRows.length > 0 ?

                      prescriptionRows.map((item, index) => (

                        <tr
                          key={index}
                          style={{
                            verticalAlign: "middle"
                          }}
                        >

                          <td
                            style={{
                              textAlign: "center",
                              fontWeight: "600"
                            }}
                          >
                            {index + 1}
                          </td>

                          <td>

                            <div
                              style={{
                                fontWeight: "600",
                                fontSize: "16px"
                              }}
                            >
                              💊 {item.medicine?.medicine || item.medicine}
                            </div>

                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              fontWeight: "500"
                            }}
                          >
                            {item.dosage || "-"}
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              fontWeight: "500"
                            }}
                          >
                            {item.days} Days
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              fontWeight: "500"
                            }}
                          >
                            {item.quantity}                           </td>

                        </tr>

                      ))

                      :

                      <tr>

                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            padding: "35px",
                            color: "#888",
                            fontWeight: "600"
                          }}
                        >

                          No Prescription Added

                        </td>

                      </tr>

                  }

                </tbody>

              </table>

              <div
                style={{
                  marginTop: "25px",
                  borderTop: "1px dashed #bbb",
                  paddingTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "#666"
                }}
              >
                <button
                  className="btn"
                  style={{
                    background: "#198754",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                  onClick={() => {

                    if (!selectedVisit) {
                      alert("⚠️ Please select a patient visit first.");
                      return;
                    }


                    localStorage.setItem(
                      "consultationData",
                      JSON.stringify({
                        patient,
                        visit: selectedVisit,
                        complaintRows,
                        diseaseRows,
                        allergyRows,
                        investigationRows,
                        procedureRows,
                        surgeryRows,
                        prescriptionRows,
                        vitals: visitData.vitals,
                      })
                    );

                    navigate("/prescription-print");
                  }}
                > PRINT </button>

                <span>
                  🩺 Follow Doctor Instructions Carefully
                </span>

                <span>
                  Generated From Dental Management System
                </span>

              </div>

            </div>

          )
        }










        {
          activeCard === "treatmentView" && (

            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "30px",
                boxShadow: "0 8px 25px rgba(0,0,0,.12)",
                marginTop: "15px",
                marginBottom: "20px",
                border: "1px solid #e9ecef"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "2px solid #0d6efd",
                  paddingBottom: "12px",
                  marginBottom: "20px"
                }}
              >

                <div>

                  <h3
                    style={{
                      margin: 0,
                      color: "#0d6efd",
                      fontWeight: "700"
                    }}
                  >
                    🦷 Treatment Summary
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#666"
                    }}
                  >
                    Patient Treatment Details
                  </p>

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >

                  <div
                    style={{
                      background: "#198754",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontWeight: "600"
                    }}
                  >
                    Treatments : {treatmentRows.length}
                  </div>

                  <div
                    style={{
                      background: "#0d6efd",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontWeight: "600"
                    }}
                  >
                    ₹ {totalAmount}
                  </div>

                </div>

              </div>

              <table className="table">

                <thead>

                  <tr
                    style={{
                      background: "#0d6efd",
                      color: "#fff",
                      textAlign: "center"
                    }}
                  >

                    <th style={{ width: "8%" }}>#</th>

                    <th>Treatment</th>

                    <th style={{ width: "22%" }}>
                      Date
                    </th>

                    <th style={{ width: "18%" }}>
                      Amount
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    treatmentRows.length > 0 ?

                      treatmentRows.map((item, index) => (

                        <tr
                          key={index}
                          style={{
                            verticalAlign: "middle"
                          }}
                        >

                          <td
                            style={{
                              textAlign: "center",
                              fontWeight: "600"
                            }}
                          >
                            {index + 1}
                          </td>

                          <td
                            style={{
                              fontWeight: "600",
                              fontSize: "16px"
                            }}
                          >
                            🦷 {item.treatment}
                          </td>

                          <td
                            style={{
                              textAlign: "center"
                            }}
                          >
                            {new Date(item.date).toLocaleDateString()}
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              fontWeight: "700",
                              color: "#198754"
                            }}
                          >
                            ₹ {Number(item.amount).toLocaleString()}
                          </td>

                        </tr>

                      ))

                      :

                      <tr>

                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            padding: "35px",
                            fontWeight: "600",
                            color: "#888"
                          }}
                        >

                          No Treatment Added

                        </td>

                      </tr>

                  }

                </tbody>

                {
                  treatmentRows.length > 0 &&

                  <tfoot>

                    <tr
                      style={{
                        background: "#f8f9fa",
                        fontWeight: "700",
                        fontSize: "17px"
                      }}
                    >

                      <td colSpan="3" style={{ textAlign: "right" }}>
                        Grand Total :
                      </td>

                      <td
                        style={{
                          color: "#198754",
                          textAlign: "center"
                        }}
                      >
                        ₹ {totalAmount.toLocaleString()}
                      </td>

                    </tr>

                  </tfoot>

                }

              </table>

              <div
                style={{
                  marginTop: "20px",
                  borderTop: "1px dashed #bbb",
                  paddingTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "#666"
                }}
              >

                <span>
                  🦷 Total Treatments : {treatmentRows.length}
                </span>

                <span>
                  💰 Total Cost : ₹ {totalAmount.toLocaleString()}
                </span>

              </div>

            </div>

          )
        }










        {
          activeCard === "sittingHistory" && (

            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "30px",
                boxShadow: "0 8px 25px rgba(0,0,0,.12)",
                marginTop: "15px",
                marginBottom: "20px",
                border: "1px solid #e9ecef"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "2px solid #0ae67f",
                  paddingBottom: "12px",
                  marginBottom: "20px"
                }}
              >

                <div>

                  <h3
                    style={{
                      margin: 0,
                      color: "#0ae67f",
                      fontWeight: "700"
                    }}
                  >
                    🦷 Dental Sitting History
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#666"
                    }}
                  >
                    All Sitting Details
                  </p>

                </div>

                <div
                  style={{
                    background: "#0ae67f",
                    color: "#000000",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    display: "flex",
                    gap: "8px"
                  }}
                >
                  Total Sitting :  {sittingHistory.length}
                  <button
                    style={{
                      background: "#f16100",
                      color: "#fff",
                      border: "none",
                      padding: "5px 12px",
                      borderRadius: "12px",

                    }}
                    className="btn btn-primary"
                    onClick={() => {
                      setActiveCard("sittingChart");
                    }}
                  >
                    📋 Sitting Chart
                  </button>
                </div>


              </div>

              <table className="table">

                <thead>

                  <tr
                    style={{
                      background: "#0ae67f",
                      color: "#000000",
                      textAlign: "center"
                    }}
                  >

                    <th> S No.</th>
                    <th> Sitting No. </th>
                    <th> Date </th>
                    <th> Work Done </th>
                    <th> Remark </th>
                    <th> Paid </th>
                    <th> Payment </th>
                    <th> Next Visit </th>
                    <th> Action </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    sittingHistory.length > 0 ?

                      sittingHistory.map((item, index) => (

                        <tr key={item._id}>

                          <td>{index + 1}</td>

                          <td>
                            🦷 {item.sittingNo}
                          </td>

                          <td>
                            {new Date(item.sittingDate).toLocaleDateString()}
                          </td>

                          <td>
                            {
                              item.workDone.map((w) => w.treatment).join(", ")
                            }
                          </td>

                          <td>
                            {
                              item.workDone.map((w) => w.remark).join(", ")
                            }
                          </td>

                          <td
                            style={{
                              color: "#198754",
                              fontWeight: "600"
                            }}
                          >
                            ₹ {item.paidAmount}
                          </td>

                          <td>
                            {item.paymentMode}
                          </td>

                          <td>

                            {
                              item.nextVisitDate
                                ? new Date(item.nextVisitDate).toLocaleDateString()
                                : "-"
                            }

                          </td>

                          <td>

                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => {

                                setSittingId(item._id);

                                setSittingData({
                                  sittingNo: item.sittingNo,
                                  sittingDate: item.sittingDate?.split("T")[0],
                                  paidAmount: item.paidAmount,
                                  paymentMode: item.paymentMode,
                                  nextVisitDate: item.nextVisitDate?.split("T")[0] || "",
                                });

                                setWorkDoneRows(item.workDone);
                                setWorkDone({
                                  treatment: item.workDone?.map(x => x.treatment).join("\n") || "",
                                  remark: item.workDone?.map(x => x.remark).join("\n") || "",
                                });

                                setActiveCard("sitting");

                              }}
                            >
                              ✏ Edit
                            </button>

                          </td>

                        </tr>

                      ))

                      :

                      <tr>

                        <td
                          colSpan="7"
                          style={{
                            textAlign: "center",
                            padding: "35px",
                            color: "#888",
                            fontWeight: "600"
                          }}
                        >

                          No Sitting Found

                        </td>

                      </tr>

                  }

                </tbody>

              </table>

              <div
                style={{
                  marginTop: "20px",
                  borderTop: "1px dashed #bbb",
                  paddingTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "#666"
                }}
              >

                <span>
                  🦷 Total Sitting : {sittingHistory.length}
                </span>

              </div>

            </div>

          )
        }











        {
          activeCard === "sittingChart" && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: "rgba(0,0,0,.55)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
              }}
            >

              <div
                style={{
                  width: "700px",
                  maxWidth: "90%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
                  position: "relative"

                }}
              >

                <button
                  onClick={() => setActiveCard("sittingHistory")}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "15px",
                    border: "none",
                    background: "transparent",
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "red"
                  }}
                >
                  ×
                </button>

                <h3
                  style={{
                    color: "#0d6efd",
                    marginBottom: "20px",
                    borderBottom: "2px solid #eee",
                    paddingBottom: "10px"
                  }}
                >
                  🦷 Complete Sitting Chart
                </h3>
                <div className="px-4">
                  <table className="table table-bordered table-hover">

                    <thead
                      style={{
                        background: "#0d6efd",
                        color: "#fff",
                        textAlign: "center",
                        margin: "10px"
                      }}
                    >

                      <tr>

                        <th>Sitting</th>
                        <th>Date</th>
                        <th>Work Done</th>
                        <th>Remark</th>
                        <th >Next Visit </th>
                        <th>Mode</th>
                        <th>Paid</th>

                      </tr>

                    </thead>

                    <tbody>

                      {
                        sittingHistory.map((item, index) => (

                          <tr key={item._id}>

                            <td>
                              <b>{item.sittingNo}</b>
                            </td>

                            <td>
                              {new Date(item.sittingDate).toLocaleDateString()}
                            </td>

                            <td >

                              {
                                item.workDone.length
                                  ?

                                  item.workDone.map((x, i) => (
                                    <div key={i}>
                                      {x.treatment}
                                    </div>
                                  ))

                                  :

                                  "-"

                              }

                            </td>

                            <td>

                              {
                                item.workDone.length
                                  ?

                                  item.workDone.map((x, i) => (
                                    <div key={i}>
                                      {x.remark || "-"}
                                    </div>
                                  ))

                                  :

                                  "-"

                              }

                            </td>

                            <td>
                              {
                                item.nextVisitDate
                                  ?
                                  new Date(item.nextVisitDate).toLocaleDateString()
                                  :
                                  "-"
                              }
                            </td>

                            <td>
                              {item.paymentMode}
                            </td>

                            <td
                              style={{

                                fontWeight: "bold"
                              }}
                            >
                              ₹ {item.paidAmount}
                            </td>





                          </tr>

                        ))
                      }

                    </tbody>

                    <br></br>

                    <tfoot>

                      <tr
                        style={{
                          background: "#9dcfdb83",
                          fontWeight: "bold",
                        }}
                      >

                        <td colSpan="6">
                          Total Sitting
                        </td>

                        <td
                          style={{
                            color: "black",
                            fontSize: "17px"
                          }}
                        >
                          ₹ {
                            sittingHistory.reduce(
                              (sum, item) => sum + Number(item.paidAmount || 0),
                              0
                            )
                          }
                        </td>



                      </tr>

                    </tfoot>

                  </table>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "20px"
                  }}
                >

                  <button
                    className="btn btn-danger"
                    onClick={() => setActiveCard("sittingHistory")}
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          )
        }












        {
          activeCard === "bill" && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }} >
              <div style={{
                width: "1000px",
                maxWidth: "90%",
                maxHeight: "88vh",
                overflowY: "auto",
                background: "#f4f8fc",
                borderRadius: "15px",
                padding: "25px",
                position: "relative",
                boxShadow: "0 15px 40px rgba(0,0,0,.35)"
              }} >
                <button onClick={() => setActiveCard("")}
                  style={{
                    position: "absolute",
                    top: -5,
                    right: 1,
                    border: "none",
                    background: "transparent",
                    fontSize: 30,
                    color: "red",
                    cursor: "pointer"
                  }} > × </button>
                <div style={{
                  background: "#92d677",
                  background: "linear-gradient(90deg,#0d6efd,#fff)",

                  padding: "18px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }} >
                  <div> <h3 style={{ margin: 0 }}>
                    Patient Bill
                  </h3>
                    <div> Dental Clinic Management </div> </div>
                  <div style={{
                    color: "black",
                    fontWeight: "bold",
                  }}> Visit No : {selectedVisit?.visitno} </div>
                </div>
                {/* Patient */}
                <div className="row">
                  <div className="col-md-3">
                    <label>Patient Name </label>
                    <input className="form-control"
                      value={patient.name}
                      readOnly />

                    <label> Patient ID </label>
                    <input className="form-control"
                      value={patient.patientId}
                      readOnly />

                    <label> Visit No </label>
                    <input className="form-control"
                      value={selectedVisit?.visitno}
                      readOnly />
                  </div> </div>
                <hr />
                {/* Treatment */}
                <div className="card shadow-sm mt-3 mb-3"
                  style={{
                    border: "none",
                    borderRadius: "15px"
                  }}>
                  <div
                    className="card-header"
                    style={{
                      background: "linear-gradient(135deg,#20c997,#fff)",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "8px",
                    }} >

                    <div />

                    <div style={{
                      margin: "10px",

                    }} className="card-body">
                      🦷 Add Treatment
                      <div className="col-md-5">
                        <select className="form-control"
                          value={visitData.treatment}
                          onChange={(e) => {
                            const selected = treatments.find(
                              t => t._id === e.target.value);
                            setVisitData({
                              ...visitData,
                              treatment: e.target.value,
                              treatmentAmount: selected?.amount || 0
                            });
                          }} >
                          <option value=""> Select Treatment </option>
                          {treatments.map((t) => (
                            <option
                              key={t._id}
                              value={t._id} >
                              {t.treatmentName}
                            </option>))}
                        </select>

                        <input style={{
                          margin: "10px",

                        }}
                          className="form-control"
                          value={visitData.treatmentAmount}
                          readOnly
                        />
                        <button className="btn btn-success w-100"
                          onClick={addTreatment} >
                          Add
                        </button>
                      </div> </div> </div> </div>
                <br />
                <table className="table table-hover align-middle">
                  <thead className="table-success">
                    <tr>
                      <th>Treatment</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead> <tbody>
                    {
                      treatmentRows.length === 0 ?
                        <tr> <td
                          colSpan="4"
                          className="text-center" >
                          No Treatment Added
                        </td> </tr>
                        :
                        treatmentRows.map((row, index) => (
                          <tr key={index}>
                            <td>{row.treatment}</td>
                            <td>₹ {row.amount}</td>
                            <td>
                              {new Date(row.date).toLocaleDateString()}
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                  setTreatmentRows(
                                    treatmentRows.filter(
                                      (_, i) => i !== index
                                    ))} >
                                ❌
                              </button>
                            </td> </tr>))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <th>
                        ₹ {totalAmount}
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tfoot> </table>
                <hr />
                <div className="card shadow-sm mt-4"
                  style={{
                    background: "#60b8a5",
                    background: "linear-gradient(135deg,#44bb54,#fff)",
                    padding: "2px 15px",
                    fontWeight: "600",
                    fontSize: "16px",
                    borderRadius: "12px",
                    gap: "5px"
                  }}>
                  <div style={{
                    paddingBottom: "8px ",
                    fontWeight: "600",
                    fontSize: "24px",
                    color: "#fff"

                  }} className="card-header text-white"  >
                    Payment Details
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label> Discount </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Discount"
                        value={billData.discount}
                        onChange={(e) =>
                          setBillData({
                            ...billData,
                            discount: e.target.value,
                          })} />

                      <label> Paid </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Paid Amount"
                        value={billData.paidAmount}
                        onChange={(e) =>
                          setBillData({
                            ...billData,
                            paidAmount: e.target.value,
                          })} />

                      <label> Payment Mode </label>
                      <select
                        className="form-control"
                        value={billData.paymentMode}
                        onChange={(e) =>
                          setBillData({
                            ...billData,
                            paymentMode: e.target.value,
                          })} >
                        <option>Cash</option>
                        <option>Partial</option>
                        <option>UPI</option>
                        <option>Card</option>
                        <option>Cheque</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  className="card shadow-sm mt-3"
                  style={{
                    width: "270px",
                    borderRadius: "12px",
                    border: "none",
                  }}
                >
                  <div
                    className="card-header text-white"
                    style={{
                      background: "#4373b3",
                      background: "linear-gradient(135deg,#4373b3,#fff)",
                      padding: "10px 15px",
                      fontWeight: "600",
                      fontSize: "16px",
                      borderRadius: "15px"
                    }}
                  >
                    💰 Bill Summary
                  </div>

                  <div
                    className="card-body"
                    style={{
                      padding: "12px 15px",
                      fontSize: "14px",

                    }}
                  >
                    <div className="d-flex justify-content-between mb-2">
                      <span>Treatment</span>
                      <strong>₹ {treatmentTotal}</strong>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Discount</span>
                      <strong>₹ {billData.discount || 0}</strong>
                    </div>

                    <hr style={{ margin: "8px 0" }} />

                    <div className="d-flex justify-content-between mb-2">
                      <span>Grand Total</span>
                      <strong style={{ color: "#0d6efd" }}>
                        ₹ {grandTotal}
                      </strong>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Paid</span>
                      <strong style={{ color: "#198754" }}>
                        ₹ {billData.paidAmount || 0}
                      </strong>
                    </div>

                    <hr style={{ margin: "8px 0" }} />

                    <div
                      className="d-flex justify-content-between"
                      style={{
                        fontSize: "17px",
                        fontWeight: "700",
                        color: "#dc3545",
                      }}
                    >
                      <span>Balance</span>
                      <span>₹ {balance}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <button style={{
                    background: "#198754",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    margin: "5px",
                  }}
                    className="btn btn-success"
                    onClick={handleBillSave} >
                    Save Bill
                  </button>
                  {" "}
                  <button style={{
                    background: "#198754",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    margin: "5px",
                  }}
                    className="btn btn-primary"
                    onClick={() => {
                      localStorage.setItem(
                        "billData",
                        JSON.stringify({
                          patient,
                          selectedVisit,
                          treatmentRows,
                          billData,
                          treatmentTotal,
                          grandTotal,
                          balance,
                        })
                      );

                      navigate("/billprint");
                    }}
                  >
                    Print Bill
                  </button>
                </div>
              </div>
            </div>
          )}












        {showDetail && (

          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.55)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >

            <div className="history-container">

              <div className="history-top">

                <h3 className="history-title">
                  📋 Visit Details
                </h3>

                <button
                  className="history-close"
                  onClick={() => setShowDetail(false)}
                >
                  ✕
                </button>

              </div>

              <div className="history-grid">

                <div className="history-box">
                  <div className="history-header">😣 Complaints</div>
                  <div className="history-body">
                    {complaintRows.length
                      ? complaintRows.map(x => x.complaint?.complaintName || x.complaintName).join(", ")
                      : "No Complaint"}
                  </div>
                </div>

                <div className="history-box">
                  <div className="history-header">🩺 Diseases</div>
                  <div className="history-body">
                    {diseaseRows.length
                      ? diseaseRows.map(x => x.disease?.diseaseName || x.diseaseName).join(", ")
                      : "No Disease"}
                  </div>
                </div>

                <div className="history-box">
                  <div className="history-header">🤧 Allergies</div>
                  <div className="history-body">
                    {allergyRows.length
                      ? allergyRows.map(x => x.allergyName).join(", ")
                      : "No Allergy"}
                  </div>
                </div>

                <div className="history-box">
                  <div className="history-header">🔬 Investigations</div>
                  <div className="history-body">
                    {investigationRows.length
                      ? investigationRows.map(x => x.investigationName).join(", ")
                      : "No Investigation"}
                  </div>
                </div>

                <div className="history-box">
                  <div className="history-header">🦷 Procedures</div>
                  <div className="history-body">

                    {procedureRows.length
                      ? procedureRows.map(x => x.procedureName).join(", ")
                      : "No Procedure"}
                  </div>
                </div>

                <div className="history-box">
                  <div className="history-header">👨‍⚕️ Surgery</div>
                  <div className="history-body">
                    {surgeryRows.length
                      ? surgeryRows.map(x => x.surgery?.surgeryName || x.surgeryName).join(", ")
                      : "No Surgery"}
                  </div>
                </div>

              </div>

            </div>

          </div>

        )}

        {showFullHistory && (

          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.55)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >

            <div
              className="history-container"
              style={{
                maxHeight: "90vh",
                overflowY: "auto",
                width: "60%",
              }}
            >

              <div className="history-top">

                <h3 className="history-title">
                  📚 Complete Patient History
                </h3>

                <button
                  className="history-close"
                  onClick={() => setShowFullHistory(false)}
                >
                  ✕
                </button>

              </div>

              {visitHistory.map((visit, index) => (

                <div
                  key={visit._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    padding: "10px",
                    background: "#fff",
                  }}
                >

                  <h4
                    style={{
                      marginBottom: "10px",
                      color: "#0056b3",
                    }}
                  >
                    Visit #{visit.visitno || index + 1}
                  </h4>

                  <div className="history-grid">

                    <div className="history-box">
                      <div className="history-header">😣 Complaints</div>
                      <div className="history-body">
                        {visit.complaints?.length
                          ? complaintRows.map(x => x.complaint?.complaintName).join(", ")
                          : "No Complaint"}
                      </div>
                    </div>

                    <div className="history-box">
                      <div className="history-header">🩺 Diseases</div>
                      <div className="history-body">
                        {visit.diseases?.length
                          ? visit.diseases.map(x => x.disease?.diseaseName).join(", ")
                          : "No Disease"}
                      </div>
                    </div>

                    <div className="history-box">
                      <div className="history-header">🤧 Allergies</div>
                      <div className="history-body">
                        {visit.allergies?.length
                          ? visit.allergies.map(x => x.allergyName).join(", ")
                          : "No Allergy"}
                      </div>
                    </div>

                    <div className="history-box">
                      <div className="history-header">🔬 Investigations</div>
                      <div className="history-body">
                        {visit.investigations?.length
                          ? visit.investigations.map(x => x.investigationName).join(", ")
                          : "No Investigation"}
                      </div>
                    </div>

                    <div className="history-box">
                      <div className="history-header">🦷 Procedures</div>
                      <div className="history-body">
                        {visit.procedures?.length
                          ? visit.procedures.map(x => x.procedureName).join(", ")
                          : "No Procedure"}
                      </div>
                    </div>

                    <div className="history-box">
                      <div className="history-header">👨‍⚕️ Surgery</div>
                      <div className="history-body">
                        {visit.surgeries?.length
                          ? visit.surgeries.map(x => x.surgery?.surgeryName).join(", ")
                          : "No Surgery"}
                      </div>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "20px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{
            color: "#0d6efd",
            marginBottom: "20px",
          }}>Visit History</h2>

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Visit No</th>
                <th>Date</th>
                <th>Doctor</th>
              </tr>
            </thead>

            <tbody>

              {visitHistory.map((visit) => (
                <tr
                  key={visit._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => loadVisit(visit)}
                >

                  <td>{visit.visitno}</td>

                  <td>
                    {new Date(
                      visit.visitDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {visit.consultant?.consultantName}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>


  );

}
export default PatientProfile;
