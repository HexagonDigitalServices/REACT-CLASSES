import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiMenuFries, CiCircleRemove } from "react-icons/ci";
import Logo from "../../assets/logo.jpg";

// Import styles from dummyStyles
import {
  navbarStyles,
  devAuth,
  storageKeys,
  events,
} from "../../assets/dummyStyles";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(storageKeys.authToken);
      const storedUid = localStorage.getItem(storageKeys.uid) || "";
      if (token && storedUid) {
        setIsLoggedIn(true);
        setUid(storedUid);
      } else {
        setIsLoggedIn(false);
        setUid("");
      }
    };

    checkAuth();

    // Listen for storage events (other tabs) and custom authChange events (same tab)
    const onStorage = () => checkAuth();
    const onAuthChange = () => checkAuth();

    window.addEventListener(events.storage, onStorage);
    window.addEventListener(events.authChange, onAuthChange);

    return () => {
      window.removeEventListener(events.storage, onStorage);
      window.removeEventListener(events.authChange, onAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(storageKeys.authToken);
    localStorage.removeItem(storageKeys.uid);
    localStorage.removeItem(storageKeys.teacherProfile);
    localStorage.clear();
    setIsLoggedIn(false);
    setUid("");
    setIsDrawerOpen(false);
    // notify other parts of app that auth changed
    window.dispatchEvent(new Event(events.authChange));
    navigate("/");
  };

  // expose dev helpers on window so you can mock quickly from the console
  useEffect(() => {
    window.devAuth = window.devAuth || {};
    window.devAuth.mockLoginTeacher = devAuth.mockLoginTeacher;
    window.devAuth.mockLogout = devAuth.mockLogout;
    return () => {
      // clean up to avoid leaking in production if needed
      try {
        if (window.devAuth) {
          delete window.devAuth.mockLoginTeacher;
          delete window.devAuth.mockLogout;
        }
      } catch {}
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen((s) => !s);
  };

  // -----------------------
  // Active link helpers
  // -----------------------
  const pathname = location?.pathname || "";

  /**
   * isActiveLink:
   * - if `href` is "/" check exact equality
   * - else check if pathname startsWith href (helps for nested routes like /profile/:uid)
   */
  const isActiveLink = (href) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    // Normalize trailing slash
    const p = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const h = href.endsWith("/") ? href.slice(0, -1) : href;
    return p === h || p.startsWith(h + "/") || p.startsWith(h);
  };

  // -----------------------
  // JSX
  // -----------------------
  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        {/* Logo */}
        <Link
          to="/"
          aria-label="Company logo"
          className={navbarStyles.logoContainer}
        >
          <img src={Logo} alt="Company Logo" className={navbarStyles.logo} />
        </Link>

        {/* Desktop Links */}
        <nav className={navbarStyles.desktopNav}>
          <div className={navbarStyles.desktopNavInner}>
            <Link
              to="/"
              className={navbarStyles.desktopLinkClass(isActiveLink("/"))}
              aria-current={isActiveLink("/") ? "page" : undefined}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={navbarStyles.desktopLinkClass(isActiveLink("/about"))}
              aria-current={isActiveLink("/about") ? "page" : undefined}
            >
              About Us
            </Link>

            <Link
              to="/search-tutor"
              className={navbarStyles.desktopLinkClass(isActiveLink("/search-tutor"))}
              aria-current={isActiveLink("/search-tutor") ? "page" : undefined}
            >
              Search Tutor
            </Link>

            <Link
              to="/tuition-job"
              className={navbarStyles.desktopLinkClass(isActiveLink("/tuition-job"))}
              aria-current={isActiveLink("/tuition-job") ? "page" : undefined}
            >
              Tuition Jobs
            </Link>

            <Link
              to="/how-works"
              className={navbarStyles.desktopLinkClass(isActiveLink("/how-works"))}
              aria-current={isActiveLink("/how-works") ? "page" : undefined}
            >
              How it Works
            </Link>

            <Link
              to="/faq"
              className={navbarStyles.desktopLinkClass(isActiveLink("/faq"))}
              aria-current={isActiveLink("/faq") ? "page" : undefined}
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              className={navbarStyles.desktopLinkClass(isActiveLink("/contact"))}
              aria-current={isActiveLink("/contact") ? "page" : undefined}
            >
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to={`/profile/${uid}`}
                  className={navbarStyles.desktopLinkClass(isActiveLink(`/profile`))}
                  aria-current={isActiveLink(`/profile`) ? "page" : undefined}
                >
                  Profile
                </Link>
                <Link
                  to={`/profile/${uid}/editprofile`}
                  className={navbarStyles.desktopLinkClass(isActiveLink(`/profile/${uid}/editprofile`))}
                  aria-current={
                    isActiveLink(`/profile/${uid}/editprofile`)
                      ? "page"
                      : undefined
                  }
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className={navbarStyles.desktopLinkClass(false)}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login-tutor"
                className={navbarStyles.desktopLinkClass(isActiveLink("/login-tutor"))}
                aria-current={isActiveLink("/login-tutor") ? "page" : undefined}
              >
                Teacher Login
              </Link>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className={navbarStyles.actionButtonsContainer}>
          {!isLoggedIn && (
            <>
              <Link
                to="/get-tutor"
                className={navbarStyles.getTutorButton}
              >
                Get Tutor
              </Link>

              <Link
                to="/fullregistor-tutor"
                className={navbarStyles.registerTutorButton}
              >
                Register as Tutor
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className={navbarStyles.mobileMenuButton}
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
        className={navbarStyles.mobileDrawer(isDrawerOpen)}
      >
        <div className={navbarStyles.mobileDrawerContent}>
          <div>
            <Link to="/" onClick={toggleDrawer}>
              <img
                src={Logo}
                alt="Company Logo"
                className={navbarStyles.mobileLogoContainer}
              />
            </Link>
          </div>

          <div className={navbarStyles.mobileLinksContainer}>
            <Link
              to="/"
              onClick={toggleDrawer}
              className={navbarStyles.mobileLinkClass(isActiveLink("/"))}
              aria-current={isActiveLink("/") ? "page" : undefined}
            >
              Home
            </Link>

            <Link
              to="/search-tutor"
              onClick={toggleDrawer}
              className={navbarStyles.mobileLinkClass(isActiveLink("/search-tutor"))}
              aria-current={isActiveLink("/search-tutor") ? "page" : undefined}
            >
              Search Tutor
            </Link>

            <Link
              to="/about"
              onClick={toggleDrawer}
              className={navbarStyles.mobileLinkClass(isActiveLink("/about"))}
              aria-current={isActiveLink("/about") ? "page" : undefined}
            >
              About Us
            </Link>

            <Link
              to="/tuition-job"
              onClick={toggleDrawer}
              className={navbarStyles.mobileLinkClass(isActiveLink("/tuition-job"))}
              aria-current={isActiveLink("/tuition-job") ? "page" : undefined}
            >
              Tuition Jobs
            </Link>

            <Link
              to="/how-works"
              onClick={toggleDrawer}
              className={navbarStyles.mobileLinkClass(isActiveLink("/how-works"))}
              aria-current={isActiveLink("/how-works") ? "page" : undefined}
            >
              How it Works
            </Link>

            <Link
              to="/faq"
              onClick={toggleDrawer}
              className={navbarStyles.mobileLinkClass(isActiveLink("/faq"))}
              aria-current={isActiveLink("/faq") ? "page" : undefined}
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              onClick={toggleDrawer}
              className={navbarStyles.mobileLinkClass(isActiveLink("/contact"))}
              aria-current={isActiveLink("/contact") ? "page" : undefined}
            >
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to={`/profile/${uid}`}
                  onClick={toggleDrawer}
                  className={navbarStyles.mobileLinkClass(isActiveLink("/profile"))}
                  aria-current={isActiveLink("/profile") ? "page" : undefined}
                >
                  Profile
                </Link>

                <Link
                  to={`/profile/${uid}/editprofile`}
                  onClick={toggleDrawer}
                  className={navbarStyles.mobileLinkClass(isActiveLink(`/profile/${uid}/editprofile`))}
                  aria-current={
                    isActiveLink(`/profile/${uid}/editprofile`)
                      ? "page"
                      : undefined
                  }
                >
                  Edit Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    toggleDrawer();
                  }}
                  className={navbarStyles.mobileLinkClass(false)}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login-tutor"
                  onClick={toggleDrawer}
                  className={navbarStyles.mobileLinkClass(isActiveLink("/login-tutor"))}
                  aria-current={
                    isActiveLink("/login-tutor") ? "page" : undefined
                  }
                >
                  Teacher Login
                </Link>

                <Link
                  to="/get-tutor"
                  onClick={toggleDrawer}
                  className={navbarStyles.mobileGetTutorButton}
                >
                  Get Tutor
                </Link>

                <Link
                  to="/fullregistor-tutor"
                  onClick={toggleDrawer}
                  className={navbarStyles.mobileRegisterTutorButton}
                >
                  Register as Tutor
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className={navbarStyles.overlay}
          onClick={toggleDrawer}
        ></div>
      )}
    </header>
  );
};

export default Navbar;