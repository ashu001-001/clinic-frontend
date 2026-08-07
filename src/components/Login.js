import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN } from "./Constant";
import ThreeScene from "./ThreeScene";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [password, setpassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(userId, password);

    try {
      let obj = { userId, password };
      const response = await axios.post(LOGIN, obj);

      console.log("Login API Full Response:", response);

      if (response.data.token) {

        const { token } = response.data; // Extract token & user info
  
        localStorage.setItem("token", token);

        navigate("/home"); // ✅ Navigate to Home

      } else {
        
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Login Error:", error);
      alert(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div style={styles.page}>
    <ThreeScene />

    <div style={styles.container}>
      <div
className="login-box"
style={styles.formBox}
>
        <h1 style={styles.title}>Login</h1>

        <form style={styles.form} onSubmit={handleLogin} method="post">
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}></label>

            <input
              type="userId"
              id="userId"
              name="userId"
              placeholder="Enter your userId"
              style={styles.input}
              value={userId}
              onChange={(event) => setuserId(event.target.value)}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChange={(event) => setpassword(event.target.value)}
              required
            />
          </div>

       <input
type="submit"
value="LOGIN"
style={{
width:"100%",
padding:"15px",
fontSize:"17px",
borderRadius:"10px",
border:"none",
background:"#00bfff",
color:"#fff",
fontWeight:"bold",
cursor:"pointer"
}}
/>
        </form>
        
      </div>
    </div>
    </div>
  );
};

const styles = {
  page: {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
},
 container:{
    position:"absolute",
    inset:0,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"20px"
},
formBox: {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,.15)",
  borderRadius: "20px",
  padding: "30px",
  width: "90%",
  maxWidth: "400px",
  minWidth: "280px",
  boxShadow: "0 0 50px rgba(0,150,255,.35)",
},
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputContainer: {
    marginBottom: "15px",
  },
 input:{
    width:"100%",
    boxSizing:"border-box",
    padding:"15px",
    fontSize:"16px",
    borderRadius:"10px",
    border:"1px solid rgba(255,255,255,.25)",
    background:"rgba(255,255,255,.08)",
    color:"#fff",
    outline:"none"
},
  button: {
    backgroundColor: "#ff6b81",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.3s",
  },
  registerText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
    cursor: "pointer",
  },
  link: {
    color: "red",
    textDecoration: "underline",
    cursor: "pointer",
  },
  page:{
    minHeight:"100vh",
    width:"100%",
    overflow:"hidden"
}
};

export default Login;
