import axios from "axios";
import { ASSISTANT } from "../components/Constant";

export const executeAssistantCommand = async ({
  command,
  patients,
  setSelectedPatient,
  setPatientId,
  setFormData,
  setIsEdit,
  navigate,
}) => {
  try {
    const res = await axios.post(ASSISTANT, {
  command,
  patients,
});

    const action = res.data;

    console.log("Assistant Action =>", action);

    // ---------------- SELECT PATIENT ----------------

    if (action.action === "select_patient") {
      const patient = patients.find(
        (p) => p.patientId === action.patientId
      );

      if (!patient) {
        alert("Patient not found");
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
        cityName: patient.cityName || "",
        stateName: patient.stateName || "",
        referenceBy: patient.referenceBy || "",
      });

      setIsEdit(true);

      return;
    }

    // ---------------- OPEN PROFILE ----------------

    if (action.action === "open_profile") {
      const patient = patients.find(
        (p) => p.patientId === action.patientId
      );

      if (!patient) {
        alert("Patient not found");
        return;
      }

      navigate(`/patient/${patient._id}`);

      return;
    }

    
// ---------------- CLEAR FORM ----------------

if (action.action === "clear_form") {

  setSelectedPatient(null);

  setPatientId("");

  setFormData({
    prefix: "",
    name: "",
    surname: "",
    fatherName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    cityName: "",
    stateName: "",
    referenceBy: "",
  });

  setIsEdit(false);

  return;
}

// ---------------- CANCEL EDIT ----------------

if (action.action === "cancel_edit") {

  setSelectedPatient(null);

  setPatientId("");

  setFormData({
    prefix: "",
    name: "",
    surname: "",
    fatherName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    cityName: "",
    stateName: "",
    referenceBy: "",
  });

  setIsEdit(false);

  return;
}

    // ---------------- UPDATE FIELD ----------------

    if (action.action === "update_field") {
      const patient = patients.find(
        (p) => p.patientId === action.patientId
      );

      if (!patient) {
        alert("Patient not found");
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
        cityName: patient.cityName || "",
        stateName: patient.stateName || "",
        referenceBy: patient.referenceBy || "",
        [action.field]: action.value,
      });

      setIsEdit(true);

      return;
    }
  } catch (err) {
    console.log(err);
    alert("Assistant Error");
  }
};
