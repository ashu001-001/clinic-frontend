import React from "react";
import Header from "./Header";

function About() {
  return (
    <>
      <Header />

      <div style={styles.container}>
        <div style={styles.contentBox}>

          <h1 style={styles.heading}>
            Dental Clinic Management System
          </h1>

          <p style={styles.paragraph}>
            Welcome to our Dental Clinic Management System, a complete
            solution designed to simplify patient management, visit
            tracking, treatment records, prescriptions, billing, and
            clinic operations. The system helps dentists and clinic staff
            manage daily activities efficiently while maintaining accurate
            patient records.
          </p>

          <p style={styles.paragraph}>
            The application allows registration of new patients, management
            of existing patients, recording visit history, consultant
            details, diseases, allergies, investigations, procedures,
            surgeries, prescriptions, and treatments. Every patient visit
            is stored securely and can be accessed instantly whenever the
            patient returns to the clinic.
          </p>

          <p style={styles.paragraph}>
            With powerful master modules and visit management features,
            clinic staff can reduce paperwork and focus more on patient
            care. The system also supports consultation charges, treatment
            charges, visit history tracking, and future reporting modules
            for better clinic administration.
          </p>

          <div style={styles.taskExampleBox}>
            <h2 style={styles.subHeading}>
              Clinic Features
            </h2>

            <ul style={styles.taskList}>

              <li style={styles.taskItem}>
                👤 Patient Registration & Profile Management
              </li>

              <li style={styles.taskItem}>
                📋 Complete Patient Visit History
              </li>

              <li style={styles.taskItem}>
                🦷 Treatment & Procedure Management
              </li>

              <li style={styles.taskItem}>
                💊 Prescription Management
              </li>

              <li style={styles.taskItem}>
                🧾 Consultation & Treatment Billing
              </li>

              <li style={styles.taskItem}>
                🏥 Consultant, Disease, Allergy & Investigation Masters
              </li>

              <li style={styles.taskItem}>
                📊 Daily Collection & Clinic Reports
              </li>

              <li style={styles.taskItem}>
                🖨️ Registration Slip & Visit Print Support
              </li>

            </ul>
          </div>

          <p style={styles.paragraph}>
            Our goal is to provide a fast, secure and user-friendly clinic
            management solution that improves productivity and enhances
            patient care. Thank you for using Dental Clinic Management
            System.
          </p>

        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: "#f4f7fa",
    padding: "40px 20px",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  contentBox: {
    maxWidth: "900px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px 40px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  heading: {
    fontSize: "36px",
    color: "#2c3e50",
    marginBottom: "20px",
    textAlign: "center",
  },
  subHeading: {
    fontSize: "24px",
    color: "#34495e",
    marginTop: "30px",
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.7",
    marginBottom: "20px",
  },
  taskExampleBox: {
    backgroundColor: "#ecf0f1",
    padding: "20px",
    borderRadius: "10px",
  },
  taskList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  taskItem: {
    fontSize: "17px",
    padding: "8px 0",
    borderBottom: "1px solid #dcdcdc",
  },
};

export default About;
