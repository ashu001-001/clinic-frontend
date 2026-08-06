import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import "./Master.css";

import {
  ADDCOMPLAINT, ADDALLERGY, ADDCONSULTANT, ADDDISEASE, ADDINVESTIGATION,
  ADDPRESCRIPTION, ADDPROCEDURE, ADDTREATMENT, ADDSURGERY, ADDREFERENCE, ADDCITY
} from "./Constant";

import {
  GETALLERGY, GETCOMPLAINT, GETCONSULTANT, GETDISEASE, GETINVESTIGATION,
  GETPRESCRIPTION, GETPROCEDURE, GETTREATMENT, GETSURGERY, GETREFERENCE, GETCITY
} from "./Constant";

import {
  UPDATEALLERGY, UPDATECOMPLAINT, UPDATECONSULTANT, UPDATEDISEASE, UPDATEINVESTIGATION,
  UPDATESURGERY, UPDATEPRESCRIPTION, UPDATEPROCEDURE, UPDATEREFERENCE, UPDATETREATMENT, UPDATECITY
} from "./Constant";

import { ADDMARQUEE, GETMARQUEE, UPDATEMARQUEE, DELETEMARQUEE } from "./Constant"



const Masters = () => {
  const [masterType, setMasterType] = useState("");
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [amount, setamount] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [stateName, setStateName] = useState("");

  const loadCity = async () => {
    resetForm();
    const res = await axios.get(GETCITY);
    setData(res.data.data);
    setMasterType("city");
  };

  const loadProcedure = async () => {
    resetForm();
    const res = await axios.get(GETPROCEDURE);
    setData(res.data);
    setMasterType("procedure");
  };

  const loadSurgery = async () => {
    resetForm();
    const res = await axios.get(GETSURGERY);
    setData(res.data);
    setMasterType("surgery");
  };

  const loadConsultant = async () => {
    resetForm();
    const res = await axios.get(GETCONSULTANT);
    setData(res.data);
    setMasterType("consultant");
  };

  const loadAllergy = async () => {
    resetForm();
    const res = await axios.get(GETALLERGY);
    setData(res.data);
    setMasterType("allergy");
  };

  const loadDisease = async () => {
    resetForm();
    const res = await axios.get(GETDISEASE);
    setData(res.data);
    setMasterType("disease");
  };

  const loadComplaint = async () => {
    resetForm();
    const res = await axios.get(GETCOMPLAINT);
    setData(res.data);
    setMasterType("complaint");
  };

  const loadInvestigation = async () => {
    resetForm();
    const res = await axios.get(GETINVESTIGATION);
    setData(res.data);
    setMasterType("investigation");
  };

  const loadPrescription = async () => {
    resetForm();
    const res = await axios.get(GETPRESCRIPTION);
    setData(res.data);
    setMasterType("medicine");
  };

  const loadTreatment = async () => {
    resetForm();
    const res = await axios.get(GETTREATMENT);
    setData(res.data);
    setMasterType("treatment");
  };

  const loadReference = async () => {
    resetForm();
    const res = await axios.get(GETREFERENCE);
    setData(res.data.data);
    setMasterType("reference");
  };


  const loadMarquee = async () => {
    resetForm();
    const res = await axios.get(GETMARQUEE);

    setData(res.data.data);
    setMasterType("marquee");
  };

  const handleActivate = (id, message) => {
    localStorage.setItem("activeMarqueeId", id);
    localStorage.setItem("activeMarqueeText", message);
  };

  const handleDeactivate = () => {
    localStorage.removeItem("activeMarqueeId");
    localStorage.removeItem("activeMarqueeText");
  };


  const handleClose = () => {
  setMasterType("");
  resetForm();
  setData([]);
};



  const resetForm = () => {

    setName("");
    setFee("");
    setamount("");
    setEditId(null);
    setStateName("");

  }

  const handleSave = async () => {
    try {

      if (masterType === "procedure") {
        await axios.post(ADDPROCEDURE, {
          procedureName: name,
        });
      }
      if (masterType === "surgery") {
        await axios.post(ADDSURGERY, {
          surgeryName: name,
        });
      }

      if (masterType === "consultant") {
        await axios.post(ADDCONSULTANT, {
          consultantName: name,
          consultantFee: fee,
        });
      }

      if (masterType === "disease") {
        await axios.post(ADDDISEASE, {
          diseaseName: name,
        });
      }

      if (masterType === "allergy") {
        await axios.post(ADDALLERGY, {
          allergyName: name,
        });
      }

      if (masterType === "complaint") {
        await axios.post(ADDCOMPLAINT, {
          complaintName: name,
        });
      }

      if (masterType === "investigation") {
        await axios.post(ADDINVESTIGATION, {
          investigationName: name,
        });
      }

      if (masterType === "medicine") {
        await axios.post(ADDPRESCRIPTION, {
          medicine: name,
        });
      }

      if (masterType === "treatment") {
        await axios.post(ADDTREATMENT, {
          treatmentName: name,
          amount: amount
        });
      }

      if (masterType === "reference") {
        await axios.post(ADDREFERENCE, {
          referenceBy: name,
        });
      }

      if (masterType === "city") {
        await axios.post(ADDCITY, {
          stateName,
          cityName: name
        });
      }

      if (masterType === "marquee") {
        await axios.post(ADDMARQUEE, {
          message: name,
        });
      }

      alert("Saved Successfully");

      setName("");
      setFee("");
      setamount("");

      if (masterType === "procedure") {
        loadProcedure();
      }

      if (masterType === "surgery") {
        loadSurgery();
      }

      if (masterType === "consultant") {
        loadConsultant();
      }

      if (masterType === "disease") {
        loadDisease();
      }

      if (masterType === "allergy") {
        loadAllergy();
      }

      if (masterType === "complaint") {
        loadComplaint();
      }

      if (masterType === "investigation") {
        loadInvestigation();
      }

      if (masterType === "medicine") {
        loadPrescription();
      }

      if (masterType === "treatment") {
        loadTreatment();
      }

      if (masterType === "reference") {
        loadReference();
      }

      if (masterType === "city") {
        loadCity();
      }
      if (masterType === "marquee") {
        loadMarquee();
      }

    } catch (err) {
      console.log(err);
      alert("Error");
    }


  }; const handleEdit = (item) => {

    setEditId(item._id);

    if (masterType === "marquee") {
      setName(item.message);
    }

    if (masterType === "consultant") {
      setName(item.consultantName);
      setFee(item.consultantFee);
    }

    if (masterType === "treatment") {
      setName(item.treatmentName);
      setamount(item.amount);
    }

    if (masterType === "medicine") {
      setName(item.medicine);
    }

    if (masterType === "allergy") {
      setName(item.allergyName);
    }

    if (masterType === "complaint") {
      setName(item.complaintName);
    }

    if (masterType === "disease") {
      setName(item.diseaseName);
    }

    if (masterType === "investigation") {
      setName(item.investigationName);
    }

    if (masterType === "procedure") {
      setName(item.procedureName);
    }

    if (masterType === "surgery") {
      setName(item.surgeryName);
    }

    if (masterType === "reference") {
      setName(item.referenceBy);
    }

    if (masterType === "city") {
      setStateName(item.stateName);
      setName(item.cityName);
    }

  }; const handleUpdate = async () => {

    try {

      if (masterType === "consultant") {
        await axios.put(`${UPDATECONSULTANT}${editId}`, {
          consultantName: name,
          consultantFee: fee
        });
      }

      if (masterType === "treatment") {
        await axios.put(`${UPDATETREATMENT}${editId}`, {
          treatmentName: name,
          amount
        });
      }

      if (masterType === "medicine") {
        await axios.put(`${UPDATEPRESCRIPTION}${editId}`, {
          medicine: name
        });
      }

      if (masterType === "allergy") {
        await axios.put(`${UPDATEALLERGY}${editId}`, {
          allergyName: name
        });
      }

      if (masterType === "complaint") {
        await axios.put(`${UPDATECOMPLAINT}${editId}`, {
          complaintName: name
        });
      }

      if (masterType === "disease") {
        await axios.put(`${UPDATEDISEASE}${editId}`, {
          diseaseName: name
        });
      }

      if (masterType === "investigation") {
        await axios.put(`${UPDATEINVESTIGATION}${editId}`, {
          investigationName: name
        });
      }

      if (masterType === "procedure") {
        await axios.put(`${UPDATEPROCEDURE}${editId}`, {
          procedureName: name
        });
      }

      if (masterType === "surgery") {
        await axios.put(`${UPDATESURGERY}${editId}`, {
          surgeryName: name
        });
      }

      if (masterType === "reference") {
        await axios.put(`${UPDATEREFERENCE}${editId}`, {
          referenceBy: name
        });
      }

      if (masterType === "city") {
        await axios.put(`${UPDATECITY}${editId}`, {
          stateName,
          cityName: name
        });
      }

      if (masterType === "marquee") {
        await axios.put(`${UPDATEMARQUEE}${editId}`, {
          message: name,
        });
      }

      alert("Updated Successfully");

      setEditId(null);
      setName("");
      setFee("");
      setamount("");

      if (masterType === "consultant") loadConsultant();
      if (masterType === "treatment") loadTreatment();
      if (masterType === "medicine") loadPrescription();
      if (masterType === "allergy") loadAllergy();
      if (masterType === "complaint") loadComplaint();
      if (masterType === "disease") loadDisease();
      if (masterType === "investigation") loadInvestigation();
      if (masterType === "procedure") loadProcedure();
      if (masterType === "surgery") loadSurgery();
      if (masterType === "reference") loadReference();
      if (masterType === "city") { loadCity(); }
      if (masterType === "marquee") { loadMarquee(); }

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }

  };


  return (
    <>
      <Header />

      <div className="container mt-4">

        <div className="card shadow-sm border-0 mb-4">
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(135deg,#0d6efd,#0dcaf0)",
              borderRadius: "10px 10px 0 0"
            }}
          >

          </div>

          <div className="card-body">

            <div style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "20px",
              boxShadow:
                "0 4px 15px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              marginTop: "10px",
            }}
              className="master-menu">

              <button className="master-btn" onClick={loadConsultant}>

                <span>👨‍⚕️ Consultant Master</span>
              </button>

              <button className="master-btn" onClick={loadTreatment}>

                <span>💰 Treatment Master</span>
              </button>

              <button className="master-btn" onClick={loadPrescription}>

                <span>💊 Medicine Master</span>
              </button>

              <button className="master-btn" onClick={loadProcedure}>

                <span>🦷 Procedure Master</span>
              </button>

              <button className="master-btn" onClick={loadSurgery}>

                <span>🏥 Surgery Master</span>
              </button>

              <button className="master-btn" onClick={loadAllergy}>

                <span>🤧 Allergy Master</span>
              </button>

              <button className="master-btn" onClick={loadComplaint}>

                <span>😣 Complaint Master</span>
              </button>

              <button className="master-btn" onClick={loadInvestigation}>

                <span>🔬 Investigation Master</span>
              </button>

              <button className="master-btn" onClick={loadDisease}>

                <span>🩺 Disease Master</span>
              </button>

              <button className="master-btn" onClick={loadReference}>
                <span>📍 Reference Master</span>
              </button>

              <button className="master-btn" onClick={loadCity}>
                <span>🏙️ City Master</span>
              </button>

              <button className="master-btn" onClick={loadMarquee}>
                <span>📢 Marquee Master</span>
              </button>

            </div>

          </div>
        </div>


       {masterType && (

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
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    margin: "20px",
    width:"90vh"
  }}
  className="card mt-4 shadow"
>
            <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  }}
>
  <button
    onClick={handleClose}
    style={{
      width: "35px",
      height: "35px",
      border: "none",
      borderRadius: "50%",
      background: "#dc3545",
      color: "#fff",
      fontSize: "20px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    ×
  </button>
</div>

             {masterType && (
          <div style={{
            background: "#fff",
            borderRadius: "15px",
          }} className="card shadow">

            <div style={{
              marginTop:"-50px"
            }}>
              <h4>{masterType.toUpperCase()} MASTER</h4>
            </div>

            <div className="card-body">

              <div className="mb-3">
                {masterType === "city" && (
                  <div className="mb-3">
                    <label style={{
                      width: "120px",
                      display: "inline-block",
                      fontWeight: "600"
                    }}>State Name</label>

                    <input
                      type="text"
                      className="form-control"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                    />
                  </div>
                )}
                <label style={{
                  width: "120px",
                  display: "inline-block",
                  fontWeight: "600"
                }}>Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

              {masterType === "consultant" && (
                <div className="mb-3">

                  <label style={{
                    width: "120px",
                    display: "inline-block",
                    fontWeight: "600"
                  }}>Consultant Fee</label>

                  <input
                    type="number"
                    className="form-control"
                    value={fee}
                    onChange={(e) =>
                      setFee(e.target.value)
                    }
                  />

                </div>
              )}

              {masterType === "treatment" && (
                <div className="mb-3">

                  <label style={{
                    width: "120px",
                    display: "inline-block",
                    fontWeight: "600"
                  }}>Amount</label>

                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) =>
                      setamount(e.target.value)
                    }
                  />

                </div>
              )}

  
              <button style={{
                marginRight:"10px"
              }}
                className={editId ? "btn btn-warning" : "btn btn-primary"}
                onClick={editId ? handleUpdate : handleSave}
              >

                {editId ? "✏ Update" : "💾 Save"}

              </button>
              {editId && (

                <button
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                >

                  Cancel

                </button>

              )}


            </div>

          </div>
        )}
        <hr></hr>

          <div className="card-header">
            <h4>Master List</h4>
          </div>

          <div className="card-body">

            <div
  style={{
    maxHeight: "50vh",
    overflowY: "auto",
  }}
>

            <table className="table table-hover table-striped align-middle">

              <thead style={{
                position:"sticky",
                top:"0",
                zindex: 10,
                background:"rgb(31, 182, 89)",
              }}>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>

                  {masterType === "city" && (
                    <th>State</th>
                  )}

                  {masterType === "consultant" && (
                    <th>Fee</th>
                  )}

                  {masterType === "treatment" && (
                    <th>Amount</th>
                  )}
                  <th>Action</th>
                  {masterType === "marquee" && (
                    <th>Status</th>
                  )}

                </tr>
              </thead>

              <tbody>

                {data.map((item, index) => (
                  <tr key={item._id}>

                    <td>{index + 1}</td>

                    <td>
                      {masterType === "consultant" && item.consultantName}
                      {masterType === "allergy" && item.allergyName}
                      {masterType === "complaint" && item.complaintName}
                      {masterType === "disease" && item.diseaseName}
                      {masterType === "investigation" && item.investigationName}
                      {masterType === "procedure" && item.procedureName}
                      {masterType === "surgery" && item.surgeryName}
                      {masterType === "treatment" && item.treatmentName}
                      {masterType === "medicine" && item.medicine}
                      {masterType === "reference" && item.referenceBy}
                      {masterType === "city" && item.cityName}
                      {masterType === "marquee" && item.message}


                    </td>

                    {masterType === "city" && (
                      <td>{item.stateName}</td>
                    )}

                    {masterType === "consultant" && (
                      <td>{item.consultantFee}</td>
                    )}
                    {masterType === "treatment" && (
                      <td>{item.amount}</td>
                    )}

                    <td>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                    </td>
                    {masterType === "marquee" && (
                      <td>
                        {localStorage.getItem("activeMarqueeId") === item._id ?
                          (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleDeactivate()}
                            >
                              Running
                            </button>
                          ) :
                          (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                handleActivate(item._id, item.message)
                              }
                            >
                              Start
                            </button>
                          )}
                      </td>)}

                  </tr>
                ))}

              </tbody>

             

            </table>

            </div>

          </div>

        </div>

        </div>
       )}



      </div>
    </>
  );
};

export default Masters;


