import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";


const Header = () => {
  const headerRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div style={{ backgroundColor: "white", padding: "15px" }}>
      <div
        ref={headerRef}
        style={{
          width: "full",
          background: "linear-gradient(135deg,#005AA7,#00C6FB)",
          padding: "15px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          border: "1px solid black",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          color: "white",
          textTransform: "uppercase",
          letterSpacing: "2px",
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
          fontFamily: "Rouge Script, cursive",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.span
          drag
          dragConstraints={headerRef}
          dragElastic={0.2}
          whileTap={{ scale: 1.1 }}
          style={{
            cursor: "grab",
            display: "inline-block",
            fontSize: "inherit",
          }}
          className="header-title"
        >
          DENTAL CLINIC
        </motion.span>

        {/* 🍔 Menu Icon for Mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>

      <br />

      {/* 🔗 Navigation Links */}
      <div
        className={`nav-links ${showMenu ? "show" : ""}`}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          background: "linear-gradient(135deg,#fff,#00c6ff)",
          padding: "10px",
          
          borderRadius: "5px",
          overflow: "hidden",
          boxShadow: "0 8px 18px rgb(255, 255, 255), inset 0 2px 2px rgba(255,255,255,0.25)",
                              transition: "all .3s ease",
        }}
      >
        <div className="links-wrapper">
          <Link to="/home" style={navLinkStyle} className="nav-link">
            Home
          </Link>
          <Link to="/Masters" style={navLinkStyle} className="nav-link">
            Masters
          </Link>
          <Link to="/teeth" style={navLinkStyle} className="nav-link">
            Teeth
          </Link>
          <Link to="/Reports" style={navLinkStyle} className="nav-link">
            Reports
          </Link>
          <Link to="/about" style={navLinkStyle} className="nav-link">
            About
          </Link>
          <Link to="/logout" style={navLinkStyle} className="nav-link">
            Logout
          </Link>
        </div>
      </div>

      {/* 🎨 Styles */}
      <style>
        {`
          .nav-link {
            transition: color 0.1s ease, background-color 0.01s ease;
          }
          .nav-link:hover {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  transition: 0.3s;
}

          .menu-icon {
            display: none;
            position: absolute;
            right: 20px;
            top: 15px;
            cursor: pointer;
            font-size: 24px;
          }

          @media (max-width: 500px) {
              .nav-link {
                font-size: 14px !important;
                margin-left: 10px;
                padding: 6px;
              }
            }

          @media (max-width: 450px) {
            .nav-links {
              display: none !important;
              flex-direction: column;
              align-items: flex-end;
            }

            .nav-links.show {
              display: flex !important;
            }

            .links-wrapper {
              display: flex;
              flex-direction: column;
              gap: 10px;
              padding: 10px;
            }

            .menu-icon {
              display: block;
            }

            .header-title {
              font-size: 18px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const navLinkStyle = {
  color: "black",
  textDecoration: "none",
  marginLeft: "20px",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "9px",
  textShadow: "3px 3px 6px rgb(255, 255, 255)",
};

export default Header;

