import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaTooth,
  FaChartBar,
  FaInfoCircle,
  FaPaintBrush,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setShowMenu(false);
  };

  const isActive = (path) => location.pathname.toLowerCase() === path.toLowerCase();

  const navItems = [
    {
      path: "/home",
      label: "Home",
      icon: <FaHome />,
    },
    {
      path: "/Masters",
      label: "Masters",
      icon: <FaBook />,
    },
    {
      path: "/teeth",
      label: "Teeth",
      icon: <FaTooth />,
    },
    {
      path: "/Reports",
      label: "Reports",
      icon: <FaChartBar />,
    },
    {
      path: "/about",
      label: "About",
      icon: <FaInfoCircle />,
    },
    {
      path: "/DentalCanvas",
      label: "Canvas",
      icon: <FaPaintBrush />,
    },
  ];

  return (
    <header className="app-header">

      {/* TOP HEADER */}

      <div className="header-main">

        <div className="header-brand">

          <div className="brand-icon">
            🦷
          </div>

          <div className="brand-content">
            <div className="brand-title">
              DENTAL CLINIC
            </div>

            <div className="brand-subtitle">
              Management System
            </div>
          </div>

        </div>


        {/* DESKTOP NAVIGATION */}

        <nav className="desktop-navigation">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header-nav-link ${
                isActive(item.path) ? "active" : ""
              }`}
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </Link>
          ))}

          <Link
            to="/logout"
            className="header-nav-link logout-link"
          >
            <span className="nav-icon">
              <FaSignOutAlt />
            </span>

            <span>
              Logout
            </span>
          </Link>

        </nav>


        {/* MOBILE MENU BUTTON */}

        <button
          className="mobile-menu-button"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle navigation"
        >
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>

      </div>


      {/* MOBILE NAVIGATION */}

      <AnimatePresence>

        {showMenu && (

          <motion.div
            className="mobile-navigation"
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
          >

            <div className="mobile-nav-inner">

              {navItems.map((item) => (

                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`mobile-nav-link ${
                    isActive(item.path) ? "active" : ""
                  }`}
                >

                  <span className="mobile-nav-icon">
                    {item.icon}
                  </span>

                  <span>
                    {item.label}
                  </span>

                </Link>

              ))}


              <Link
                to="/logout"
                onClick={closeMenu}
                className="mobile-nav-link mobile-logout"
              >

                <span className="mobile-nav-icon">
                  <FaSignOutAlt />
                </span>

                <span>
                  Logout
                </span>

              </Link>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  );
};

export default Header;