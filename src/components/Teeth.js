import React from "react";
import Header from "./Header";

function About() {
  return (
    <>
      <Header />

      <div style={styles.container}> 
        <div style={styles.futureBox}>

  <h2 style={styles.subHeading}>
    🚀 Upcoming 3D Dental Education Module
  </h2>

  <p style={styles.paragraph}>
    We are currently developing an advanced 3D Dental Education Module
    which will help doctors explain dental problems to patients using
    realistic interactive 3D teeth models.
  </p>

  <div style={styles.featureGrid}>

    <div style={styles.featureCard}>
      🦷 Full Teeth 3D Anatomy
    </div>

    <div style={styles.featureCard}>
      😖 Dental Cavity Visualization
    </div>

    <div style={styles.featureCard}>
      🩸 Gum Disease Simulation
    </div>

    <div style={styles.featureCard}>
      🪥 Plaque & Tartar Build-up
    </div>

    <div style={styles.featureCard}>
      🩺 Root Canal Treatment Animation
    </div>

    <div style={styles.featureCard}>
      👑 Crown Placement
    </div>

    <div style={styles.featureCard}>
      🪛 Dental Implant Procedure
    </div>

    <div style={styles.featureCard}>
      🦷 Tooth Extraction Animation
    </div>

    <div style={styles.featureCard}>
      😬 Orthodontic Braces
    </div>

    <div style={styles.featureCard}>
      🌉 Dental Bridge
    </div>

    <div style={styles.featureCard}>
      🧼 Scaling & Cleaning
    </div>

    <div style={styles.featureCard}>
      📖 Interactive Patient Education
    </div>

  </div>

  <div style={styles.noteBox}>
    <h3>Future Vision</h3>

    <p>
      Doctors will be able to rotate a realistic 3D teeth model, highlight
      affected teeth, demonstrate dental diseases, and explain treatment
      procedures interactively. This feature is currently under development
      and will be integrated in future versions of the application.
    </p>

  </div>

</div>
      </div>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: "#f4f7fa",
    padding: "20px 20px",
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
    color: "#538fb8",
    marginBottom: "20px",
    textAlign: "center",
  },
  subHeading: {
    fontSize: "24px",
    color: "#34495e",
    marginTop: "5px",
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
  futureBox: {
  marginTop: "15px",
  padding: "25px",
  background: "#f8fbff",
  borderRadius: "12px",
  border: "2px solid #d9ecff",
},

featureGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
  gap: "15px",
  marginTop: "20px",
},

featureCard: {
  background: "#ffffff",
  padding: "18px",
  borderRadius: "10px",
  textAlign: "center",
  fontWeight: "600",
  fontSize: "17px",
  boxShadow: "0 3px 10px rgba(0,0,0,.08)",
  border: "1px solid #dce8f5",
},

noteBox: {
  marginTop: "30px",
  padding: "20px",
  background: "#fff8e6",
  borderRadius: "10px",
  borderLeft: "5px solid #ffc107",
},
};

export default About;
