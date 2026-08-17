import React, { useState } from "react";
import axios from "axios";
import { CHANGE_PASSWORD } from "./Constant";

const ChangePassword = ({ onClose }) => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const handleChangePassword = async (e) => {

    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }


    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        CHANGE_PASSWORD,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      alert("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      if (onClose) {
        onClose();
      }

    } catch (error) {

      console.log(
        "Change Password Error:",
        error
      );

      alert(
        error.response?.data?.msg ||
        "Unable to change password"
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="change-password-card">

      {/* HEADER */}

      <div className="change-password-header">

        <div className="change-password-icon">
          🔐
        </div>

        <div>
          <h2>
            Change Password
          </h2>

          <p>
            Update your administrator account password
          </p>
        </div>

      </div>


      {/* FORM */}

      <form
        className="change-password-form"
        onSubmit={handleChangePassword}
      >


        {/* OLD PASSWORD */}

        <div className="password-field">

          <label>
            Current Password
          </label>

          <div className="password-input-wrapper">

            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) =>
                setOldPassword(e.target.value)
              }
              placeholder="Enter current password"
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? "🙈" : "👁️"}
            </button>

          </div>

        </div>


        {/* NEW PASSWORD */}

        <div className="password-field">

          <label>
            New Password
          </label>

          <div className="password-input-wrapper">

            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Enter new password"
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? "🙈" : "👁️"}
            </button>

          </div>

          <small>
            Minimum 6 characters
          </small>

        </div>


        {/* CONFIRM PASSWORD */}

        <div className="password-field">

          <label>
            Confirm New Password
          </label>

          <div className="password-input-wrapper">

            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>

          </div>

        </div>


        {/* BUTTON */}

        <button
          type="submit"
          className="change-password-submit"
          disabled={loading}
        >

          {loading ? (
            <>
              <span className="password-spinner"></span>
              Changing Password...
            </>
          ) : (
            <>
              🔒 Update Password
            </>
          )}

        </button>

      </form>


      <div className="password-security-note">
        🛡️ Your password is securely encrypted and never stored
        as plain text.
      </div>

    </div>
  );
};

export default ChangePassword;