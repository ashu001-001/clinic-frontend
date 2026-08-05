import axios from "axios";


export const executeAssistantCommand = async ({
  command,
  patients,
  selectedPatient,
  setSelectedPatient,
  setPatientId,
  setFormData,
  setIsEdit,
  navigate,
}) => {
  try {
    const res = await axios.post("https://dental-web-lvx0.onrender.com/assistant", {
  command,
  patients,
  selectedPatient,
});



    const action = res.data;    


  const loadPatient = (patient) => {
  setSelectedPatient(patient);

  setPatientId(patient.patientId);

  setFormData({
    prefix: patient.prefix || "Mr.",
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
};

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

  loadPatient(patient);

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
   prefix:"Mr.",
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
    prefix:"Mr.",
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

  loadPatient(patient);

  setFormData((prev) => ({
    ...prev,
    [action.field]: action.value,
  }));

  return;
}
if (action.action === "update_multiple_fields") {
  const patient = patients.find(
    (p) => p.patientId === action.patientId
  );

  if (!patient) {
    alert("Patient not found");
    return;
  }

  loadPatient(patient);

  setFormData((prev) => ({
    ...prev,
    ...action.fields,
  }));

  return;
}
alert("Command not understood.");

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.msg || "Assistant Error");
  }
};

