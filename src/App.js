import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import Logout from "./components/Logout";
import PatientProfile from "./components/PatientProfile";
import MASTERS from "./components/Masters";
import RegistrationPrint from "./components/RegistrationPrint";
import ConsultationPrint  from "./components/ConsultationPrint";
import Teeth from "./components/Teeth";
import Reports from "./components/Reports";
import PatientReport from "./components/PatientReport";
import ConsultationReport from "./components/ConsultationReport";
import TreatmentReport from "./components/TreatmentReport";
import BillPrint from "./components/BillPrint";
import OPDPrint from "./components/OPDPrint";
import PrescriptionPrint from "./components/PrescriptionPrint";
import DentalCanvas from "./components/DentalCanvas"
import ChangePassword from "./components/ChangePassword"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Token check kar raha hai
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/home" element={ <ProtectedRoute> {" "} <Home />{" "} </ProtectedRoute> } /> 
        
        <Route path="/masters" element={ <ProtectedRoute> {" "} <MASTERS />{" "} </ProtectedRoute> } /> 

        <Route path="/about" element={ <ProtectedRoute> {" "} <About />{" "} </ProtectedRoute> } />

        <Route path="/teeth" element={ <ProtectedRoute> {" "} <Teeth />{" "} </ProtectedRoute> } />

        <Route path="/Reports" element={ <ProtectedRoute> {" "} <Reports />{" "} </ProtectedRoute> } />

        <Route path="/logout" element={ <ProtectedRoute> {" "} <Logout />{" "} </ProtectedRoute> } />

        <Route path="/patient/:id" element= { <ProtectedRoute> {" "} <PatientProfile />{" "} </ProtectedRoute> } />

        <Route path="/registration-print/:id" element={ <ProtectedRoute> {" "} <RegistrationPrint /> </ProtectedRoute>} />

        <Route path="/consultation-print" element={ <ProtectedRoute> {" "} <ConsultationPrint /> </ProtectedRoute>} />

        <Route path="/prescription-print" element={ <ProtectedRoute> {" "} <PrescriptionPrint /> </ProtectedRoute>} />

        <Route path="/patient-report" element={ <ProtectedRoute> {" "} <PatientReport />{" "} </ProtectedRoute> } />

        <Route path="/Consultation-report" element={ <ProtectedRoute> {" "} <ConsultationReport />{" "} </ProtectedRoute> } />

        <Route path="/Treatment-report" element={ <ProtectedRoute> {" "} <TreatmentReport />{" "} </ProtectedRoute> } />

        <Route path="/billprint" element={ <ProtectedRoute> {" "} <BillPrint /> {" "} </ProtectedRoute> } />

        <Route path="/OPD-print" element={ <ProtectedRoute> {" "} <OPDPrint /> </ProtectedRoute>} />

        <Route path="/DentalCanvas" element={ <ProtectedRoute> {" "} <DentalCanvas /> </ProtectedRoute>} />
        

        {/* Default Redirect to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
