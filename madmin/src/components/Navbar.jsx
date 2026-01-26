// src/components/AdminNavbar/AdminNavbar.jsx
import React from "react";
import { CiMenuFries, CiCircleRemove } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { STORAGE_KEY, EMAIL_KEY } from "./login"; // optional: keep keys in sync
import { adminNavbarStyles } from "../assets/dummyStyles";

const AdminNavbar = ({ onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const location = useLocation();
  const [email, setEmail] = React.useState(() => {
    try {
      return localStorage.getItem(EMAIL_KEY) || "Admin User";
    } catch {
      return "Admin User";
    }
  });

  const toggleDrawer = () => {
    setIsDrawerOpen((s) => !s);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EMAIL_KEY);
    } catch {}
    if (typeof onLogout === "function") onLogout();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={adminNavbarStyles.header}>
      <div className={adminNavbarStyles.innerContainer}>
        {/* Logo */}
        <div className={adminNavbarStyles.logoContainer}>
          <img src={Logo} alt="Company Logo" className={adminNavbarStyles.logoImage} />
          <span className={adminNavbarStyles.logoText}>
            Major Admin
          </span>
        </div>

        {/* Desktop Links */}
        <nav className={adminNavbarStyles.desktopNav}>
          <div className={adminNavbarStyles.navLinksContainer}>
            <Link
              to="/teachers"
              className={`${adminNavbarStyles.navLinkBase} ${
                isActive("/teachers") ? adminNavbarStyles.navLinkActive : ""
              }`}
            >
              Teachers
            </Link>
            <Link
              to="/parents"
              className={`${adminNavbarStyles.navLinkBase} ${
                isActive("/parents") ? adminNavbarStyles.navLinkActive : ""
              }`}
            >
              Parents
            </Link>
            <Link
              to="/jobs"
              className={`${adminNavbarStyles.navLinkBase} ${
                isActive("/jobs") ? adminNavbarStyles.navLinkActive : ""
              }`}
            >
              Job Applications
            </Link>
            <Link
              to="/contacts"
              className={`${adminNavbarStyles.navLinkBase} ${
                isActive("/contacts") ? adminNavbarStyles.navLinkActive : ""
              }`}
            >
              Contact Requests
            </Link>
          </div>
        </nav>

        {/* User Info + Logout */}
        <div className={adminNavbarStyles.userContainer}>
          <div className="flex items-center">
            <div className={adminNavbarStyles.avatar}>
              {String(email || "A")
                .charAt(0)
                .toUpperCase()}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={adminNavbarStyles.logoutButton}
            title="Logout"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className={adminNavbarStyles.mobileMenuButton}
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? (
            <CiCircleRemove className="text-gray-500" />
          ) : (
            <CiMenuFries className="text-gray-500" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <nav
        className={adminNavbarStyles.drawer(isDrawerOpen)}
      >
        <div className={adminNavbarStyles.drawerContent}>
          <div className={adminNavbarStyles.drawerLogoContainer}>
            <img src={Logo} alt="Company Logo" className={adminNavbarStyles.drawerLogoImage} />
            <span className={adminNavbarStyles.drawerLogoText}>Admin Panel</span>
          </div>

          <div className={adminNavbarStyles.drawerLinksContainer}>
            <Link
              to="/teachers"
              onClick={() => setIsDrawerOpen(false)}
              className={`${adminNavbarStyles.drawerLinkBase} ${
                isActive("/teachers") 
                  ? adminNavbarStyles.drawerLinkActive 
                  : adminNavbarStyles.drawerLinkInactive
              }`}
            >
              Teachers
            </Link>
            <Link
              to="/parents"
              onClick={() => setIsDrawerOpen(false)}
              className={`${adminNavbarStyles.drawerLinkBase} ${
                isActive("/parents") 
                  ? adminNavbarStyles.drawerLinkActive 
                  : adminNavbarStyles.drawerLinkInactive
              }`}
            >
              Parents
            </Link>
            <Link
              to="/jobs"
              onClick={() => setIsDrawerOpen(false)}
              className={`${adminNavbarStyles.drawerLinkBase} ${
                isActive("/jobs") 
                  ? adminNavbarStyles.drawerLinkActive 
                  : adminNavbarStyles.drawerLinkInactive
              }`}
            >
              Job Applications
            </Link>
            <Link
              to="/contacts"
              onClick={() => setIsDrawerOpen(false)}
              className={`${adminNavbarStyles.drawerLinkBase} ${
                isActive("/contacts") 
                  ? adminNavbarStyles.drawerLinkActive 
                  : adminNavbarStyles.drawerLinkInactive
              }`}
            >
              Contact Requests
            </Link>

            <div className={adminNavbarStyles.drawerUserSection}>
              <div className={adminNavbarStyles.drawerUserInfo}>
                <div className="flex items-center">
                  <div className={adminNavbarStyles.avatar}>
                    {String(email || "A")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <span>{email || "Admin User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={adminNavbarStyles.drawerLogoutButton}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className={adminNavbarStyles.overlay}
          onClick={toggleDrawer}
        ></div>
      )}
    </header>
  );
};

export default AdminNavbar;