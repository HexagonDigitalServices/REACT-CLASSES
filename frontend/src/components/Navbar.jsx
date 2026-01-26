import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from '../assets/logo.png';
import { navbarStyles } from '../assets/dummyStyles'; // Import styles

const BASE_URL = 'http://localhost:4000/api';

const Navbar = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Use the user data directly from props
  const user = propUser || { 
    name: "", 
    email: "" 
  };

  // Fetch user data if not provided via props
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const userData = response.data.user || response.data;
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user in navbar', error);
      }
    };

    // Only fetch if user not provided via props
    if (!propUser) {
      fetchUserData();
    }
  }, [propUser]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  
  const handleLogout = () => {
    setMenuOpen(false);
    localStorage.removeItem('token');
    onLogout?.();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        {/* Logo */}
        <div 
          className={navbarStyles.logoContainer}
          onClick={() => navigate("/")}
        >
          <div className={navbarStyles.logoImage}>
            <img src={img1} alt="Expense Tracker Logo" />
          </div>
          
          <span className={navbarStyles.logoText}>
            Expense Tracker
          </span>
        </div>

        {/* User Profile - Only show if user exists */}
        {user && (
          <div className={navbarStyles.userContainer} ref={menuRef}>
            <button
              onClick={toggleMenu}
              className={navbarStyles.userButton}
            >
              <div className="relative">
                <div className={navbarStyles.userAvatar}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className={navbarStyles.statusIndicator}></div>
              </div>

              <div className={navbarStyles.userTextContainer}>
                <p className={navbarStyles.userName}>
                  {user?.name || "User"}
                </p>
                <p className={navbarStyles.userEmail}>
                  {user?.email || "user@expensetracker.com"}
                </p>
              </div>

              <ChevronDown
                className={navbarStyles.chevronIcon(menuOpen)}
              />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className={navbarStyles.dropdownMenu}>
                <div className={navbarStyles.dropdownHeader}>
                  <div className="flex items-center gap-3">
                    <div className={navbarStyles.dropdownAvatar}>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className={navbarStyles.dropdownName}>
                        {user?.name || "User"}
                      </div>
                      <div className={navbarStyles.dropdownEmail}>
                        {user?.email || "user@expensetracker.com"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={navbarStyles.menuItemContainer}>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className={navbarStyles.menuItem}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                </div>
               
                <div className={navbarStyles.menuItemBorder}>
                  <button
                    onClick={handleLogout}
                    className={navbarStyles.logoutButton}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;