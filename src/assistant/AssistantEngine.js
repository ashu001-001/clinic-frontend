export const executeAssistantCommand = ({
  command,
  patients,
  setSelectedPatient,
  setPatientId,
  setFormData,
  setIsEdit,
  navigate,
}) => {

  const text = command.toLowerCase().trim();

  //--------------------------------------------------
  // SELECT PATIENT
  //--------------------------------------------------

  const patient = patients.find((p) => {

    const fullName =
      `${p.name} ${p.surname || ""}`.toLowerCase().trim();

    return (
      text.includes(fullName) ||
      text.includes(p.name.toLowerCase())
    );

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

  }

  //--------------------------------------------------
  // PROFILE
  //--------------------------------------------------

  if (
    patient &&
    (
      text.includes("profile") ||
      text.includes("open profile") ||
      text.includes("profile kholo")
    )
  ) {

    navigate(`/patient/${patient._id}`);

    return;

  }

  //--------------------------------------------------
  // UPDATE GENDER
  //--------------------------------------------------

  if (
    patient &&
    text.includes("gender")
  ) {

    let gender = "";

    if (text.includes("male"))
      gender = "Male";

    if (text.includes("female"))
      gender = "Female";

    if (text.includes("other"))
      gender = "Other";

    if (gender !== "") {

      setFormData((prev) => ({
        ...prev,
        gender,
      }));

      return;

    }

  }

};