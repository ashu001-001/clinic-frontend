import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import ChangePassword from "./ChangePassword";
import { GETLICENSE } from "./Constant";
import "./About.css";

function About() {
  const [license, setLicense] = useState(null);
  const [licenseLoading, setLicenseLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    loadLicense();
  }, []);

  const loadLicense = async () => {
    try {
      const res = await axios.get(GETLICENSE);
      setLicense(res.data);
    } catch (error) {
      console.log("License Error:", error);
      setLicense(null);
    } finally {
      setLicenseLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="about-page">
        <div className="about-container">

          {/* ================= HERO ================= */}

          <div className="about-hero">

            <div className="hero-content">

              <div className="about-badge">
                🦷 CLINIC MANAGEMENT SOFTWARE
              </div>

              <h1>
                Dental Clinic
                <span> Management System</span>
              </h1>

              <p>
                A complete solution for managing patients, visits,
                treatments, prescriptions, billing and daily clinic
                operations.
              </p>

            </div>

            <div className="about-logo-box">

              <div className="about-logo">
                🦷
              </div>

              <div className="about-logo-text">
                DENTAL
                <br />
                <strong>CARE</strong>
              </div>

            </div>

          </div>


          {/* ================= SOFTWARE INFO ================= */}

          <div className="about-info-grid">

            <InfoCard
              icon="⚡"
              title="Software Version"
              value="Version 1.0.0"
            />

            <InfoCard
              icon="🔐"
              title="Security"
              value="Protected Account"
            />

            <InfoCard
              icon="📊"
              title="System"
              value="Clinic Management"
            />

          </div>


          {/* ================= ABOUT SOFTWARE ================= */}

          <div className="about-section">

            <div className="about-section-title">

              <div className="section-icon">
                ℹ️
              </div>

              <span>
                About the Software
              </span>

            </div>

            <p>
              Welcome to our Dental Clinic Management System, a complete
              solution designed to simplify patient management, visit
              tracking, treatment records, prescriptions, billing and
              daily clinic operations.
            </p>

            <p>
              The application allows registration of new patients,
              management of existing patients, recording visit history,
              consultant details, diseases, allergies, investigations,
              procedures, surgeries, prescriptions and treatments.
            </p>

            <p>
              Every patient visit can be stored and accessed whenever the
              patient returns to the clinic, helping staff maintain
              accurate records while reducing paperwork.
            </p>

          </div>


          {/* ================= FEATURES ================= */}

          <div className="about-section">

            <div className="about-section-title">

              <div className="section-icon">
                ✨
              </div>

              <span>
                Clinic Features
              </span>

            </div>

            <div className="feature-grid">

              <Feature
                icon="👤"
                title="Patient Management"
                text="Registration, profiles and patient records."
              />

              <Feature
                icon="📋"
                title="Visit History"
                text="Complete history of patient visits."
              />

              <Feature
                icon="🦷"
                title="Treatment Management"
                text="Manage treatments and dental procedures."
              />

              <Feature
                icon="💊"
                title="Prescription"
                text="Manage medicines and prescriptions."
              />

              <Feature
                icon="🧾"
                title="Billing"
                text="Consultation and treatment billing."
              />

              <Feature
                icon="🏥"
                title="Master Management"
                text="Consultants, diseases, allergies and investigations."
              />

              <Feature
                icon="📊"
                title="Reports"
                text="Daily collection and clinic reports."
              />

              <Feature
                icon="🖨️"
                title="Print Support"
                text="Registration, consultation and visit printing."
              />

            </div>

          </div>


          {/* ================= SECURITY ================= */}

          <div className="security-card">

            <div className="security-left">

              <div className="security-icon">
                🔐
              </div>

              <div>

                <div className="security-title">
                  Account & Security
                </div>

                <div className="security-text">
                  Keep your administrator account secure by changing
                  your password regularly.
                </div>

              </div>

            </div>

            <button
              className="password-button"
              onClick={() => setShowPasswordModal(true)}
            >
              🔑 Change Password
            </button>

          </div>


          {/* ================= LIVE LICENSE ================= */}

          <div
            className={`license-card ${
              license?.expired ? "license-expired" : ""
            }`}
          >

            <div
              className={`license-icon ${
                license?.expired ? "license-icon-expired" : ""
              }`}
            >
              {license?.expired ? "⚠️" : "🛡️"}
            </div>


            <div className="license-content">

              <div className="license-title">
                Software License
              </div>

              <div className="license-text">

                {licenseLoading
                  ? "Checking software license..."
                  : license?.expired
                    ? "Your software license has expired. Please contact the software provider for renewal."
                    : "Your software license is active and valid."
                }

              </div>


              {!licenseLoading && license && (

                <div
                  className={`license-status ${
                    license.expired
                      ? "license-status-expired"
                      : ""
                  }`}
                >

                  <span className="status-dot"></span>

                  {license.expired
                    ? "License Expired"
                    : "License Active"
                  }

                </div>

              )}

            </div>


            <div className="valid-box">

              <div className="valid-label">
                VALID UNTIL
              </div>

              <div
                className={`valid-date ${
                  license?.expired ? "valid-date-expired" : ""
                }`}
              >

                {licenseLoading
                  ? "Checking..."
                  : license?.expiryDate
                    ? new Date(
                        license.expiryDate
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Not Available"
                }

              </div>

            </div>

          </div>


          {/* ================= FOOTER ================= */}

          <div className="about-footer">

            <span>
              © 2026 Dental Clinic Management System
            </span>

            <span>
              Secure • Reliable • Easy to Use
            </span>

          </div>

        </div>
      </div>


      {/* ================= PASSWORD MODAL ================= */}

      {showPasswordModal && (

        <div
          className="password-modal-overlay"
          onClick={() => setShowPasswordModal(false)}
        >

          <div
            className="password-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="password-modal-close"
              onClick={() => setShowPasswordModal(false)}
              aria-label="Close"
            >
              ×
            </button>

            <ChangePassword
              onClose={() => setShowPasswordModal(false)}
            />

          </div>

        </div>

      )}

    </>
  );
}


/* ================= INFO CARD ================= */

function InfoCard({ icon, title, value }) {
  return (
    <div className="about-info-card">

      <div className="info-icon">
        {icon}
      </div>

      <div>

        <div className="info-title">
          {title}
        </div>

        <div className="info-value">
          {value}
        </div>

      </div>

    </div>
  );
}


/* ================= FEATURE ================= */

function Feature({ icon, title, text }) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <div>

        <div className="feature-title">
          {title}
        </div>

        <div className="feature-text">
          {text}
        </div>

      </div>

    </div>
  );
}


export default About;