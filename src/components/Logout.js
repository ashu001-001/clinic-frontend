import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);
}
