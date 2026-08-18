import React from "react";
import Header from "./Header";

function About() {
  return (
    <>
      <Header />

      <div style={styles.container}> 
      <div style={styles.futureBox}>

  <div style={styles.futureHeader}>
    <div style={styles.futureIcon}>
      🦷
    </div>

    <div>
      <div style={styles.futureBadge}>
        🚀 COMING SOON
      </div>

      <h2 style={styles.subHeading}>
        3D Dental Education Module
      </h2>
    </div>
  </div>

  <p style={styles.paragraph}>
    We are currently developing an advanced 3D Dental Education Module
    that will help doctors explain dental conditions and treatment
    procedures to patients using realistic and interactive 3D dental
    models.
  </p>


  <div style={styles.featureGrid}>

    <div style={styles.featureCard}>
      <span>🦷</span>
      <div>
        <strong>Full Teeth 3D Anatomy</strong>
        <small>Interactive tooth models</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>😖</span>
      <div>
        <strong>Dental Cavity Visualization</strong>
        <small>Highlight affected areas</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>🩸</span>
      <div>
        <strong>Gum Disease Simulation</strong>
        <small>Visual disease explanation</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>🪥</span>
      <div>
        <strong>Plaque & Tartar</strong>
        <small>Build-up visualization</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>🩺</span>
      <div>
        <strong>Root Canal Animation</strong>
        <small>Step-by-step procedure</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>👑</span>
      <div>
        <strong>Crown Placement</strong>
        <small>Interactive demonstration</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>🪛</span>
      <div>
        <strong>Dental Implant</strong>
        <small>Procedure visualization</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>🦷</span>
      <div>
        <strong>Tooth Extraction</strong>
        <small>Procedure animation</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>😬</span>
      <div>
        <strong>Orthodontic Braces</strong>
        <small>Alignment visualization</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>🌉</span>
      <div>
        <strong>Dental Bridge</strong>
        <small>Restoration explanation</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>🧼</span>
      <div>
        <strong>Scaling & Cleaning</strong>
        <small>Cleaning procedure</small>
      </div>
    </div>

    <div style={styles.featureCard}>
      <span>📖</span>
      <div>
        <strong>Patient Education</strong>
        <small>Easy visual explanation</small>
      </div>
    </div>

  </div>


  <div style={styles.noteBox}>

    <div style={styles.noteTitle}>
      💡 Future Vision
    </div>

    <p style={styles.noteText}>
      Doctors will be able to rotate a realistic 3D teeth model,
      select individual teeth, highlight affected areas, demonstrate
      dental conditions and explain treatment procedures interactively.
    </p>

    <div style={styles.developmentStatus}>
      <span style={styles.statusDot}></span>
      Currently under development
    </div>

  </div>

</div>
      </div>
    </>
  );
}

const styles = {

  futureBox: {
  width: "100%",
  maxWidth: "1050px",
  boxSizing: "border-box",
  marginTop: "15px",
  padding: "28px",
  background:
    "linear-gradient(135deg,#f8fbff,#ffffff)",
  borderRadius: "18px",
  border: "1px solid #dcecff",
  boxShadow: "0 6px 22px rgba(13,110,253,.06)",
},

futureHeader: {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "15px",
},

futureIcon: {
  width: "55px",
  height: "55px",
  minWidth: "55px",
  borderRadius: "15px",
  background: "#eaf4ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "27px",
},

futureBadge: {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: "800",
  letterSpacing: ".7px",
  color: "#0d6efd",
  background: "#eaf4ff",
  padding: "5px 9px",
  borderRadius: "20px",
  marginBottom: "4px",
},

subHeading: {
  fontSize: "24px",
  color: "#243447",
  margin: "0",
  fontWeight: "800",
},

paragraph: {
  fontSize: "15px",
  color: "#5d6975",
  lineHeight: "1.75",
  marginBottom: "20px",
},

featureGrid: {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(240px,1fr))",
  gap: "12px",
  marginTop: "20px",
},

featureCard: {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  background: "#ffffff",
  borderRadius: "13px",
  border: "1px solid #e5edf5",
  boxShadow: "0 3px 12px rgba(0,0,0,.04)",
  transition: "all .2s ease",
  boxSizing: "border-box",
},

noteBox: {
  marginTop: "25px",
  padding: "18px 20px",
  background: "#fffaf0",
  borderRadius: "13px",
  borderLeft: "4px solid #ffc107",
},

noteTitle: {
  fontSize: "16px",
  fontWeight: "800",
  color: "#7a5b00",
  marginBottom: "7px",
},

noteText: {
  margin: "0 0 12px",
  fontSize: "13px",
  lineHeight: "1.7",
  color: "#6f654b",
},

developmentStatus: {
  display: "flex",
  alignItems: "center",
  gap: "7px",
  fontSize: "11px",
  fontWeight: "700",
  color: "#a07800",
},

statusDot: {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#ffc107",
  display: "inline-block",
},










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
featureCardIcon: {
  width: "40px",
  height: "40px",
  minWidth: "40px",
  borderRadius: "10px",
  background: "#eef6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
},
};

export default About;
