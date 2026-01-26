import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Check, X, Eye, EyeOff } from 'lucide-react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { profileStyles } from '../assets/dummyStyles';

// Set app element for accessibility
Modal.setAppElement('#root');

const BASE_URL = 'https://trackerexpense-backend.onrender.com/api';

// Move PasswordInput component outside of ProfilePage to prevent recreation on every render
const PasswordInput = memo(({ name, label, value, error, showField, onToggle, onChange, disabled }) => (
  <div>
    <label className={profileStyles.passwordLabel}>
      {label}
    </label>
    <div className={profileStyles.passwordContainer}>
      <input
        type={showField ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className={`${profileStyles.inputWithError} ${
          error ? 'border-red-300' : 'border-gray-200'
        }`}
        placeholder={`Enter ${label.toLowerCase()}`}
        disabled={disabled}
        // Add key prop to help React identify the input
        key={`password-input-${name}`}
      />
      <button
        type="button"
        onClick={onToggle}
        className={profileStyles.passwordToggle}
        disabled={disabled}
      >
        {showField ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {error && (
      <p className={profileStyles.errorText}>{error}</p>
    )}
  </div>
));

PasswordInput.displayName = 'PasswordInput';

const ProfilePage = ({ user: propUser, onUpdateProfile, onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    name: '', 
    email: '',
    joinDate: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Get auth token helper
  const getAuthToken = useCallback(() => localStorage.getItem('token'), []);

  // API request handler
  const handleApiRequest = useCallback(async (method, endpoint, data = null) => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return null;
    }

    try {
      setLoading(true);
      const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers: { Authorization: `Bearer ${token}` },
      };
      
      if (data) config.data = data;
      
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`${method} request error:`, error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, navigate]);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await handleApiRequest('get', '/user/me');
        if (data) {
          const userData = data.user || data;
          setUser(userData);
          setTempUser(userData);
        }
      } catch (err) {
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, [handleApiRequest]);

  // Input change handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setTempUser(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    setPasswordErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  // Password visibility toggle
  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  }, []);

  // Save profile
  const handleSaveProfile = async () => {
    try {
      const data = await handleApiRequest('put', '/user/profile', tempUser);
      
      if (data) {
        const updatedUser = data.user || data;
        setUser(updatedUser);
        setTempUser(updatedUser);
        setEditMode(false);
        
        onUpdateProfile?.(updatedUser);
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = useCallback(() => {
    setTempUser(user);
    setEditMode(false);
  }, [user]);

  // Password validation
  const validatePassword = useCallback(() => {
    const errors = {};
    if (!passwordData.current) errors.current = 'Current password is required';
    if (!passwordData.new) {
      errors.new = 'New password is required';
    } else if (passwordData.new.length < 8) {
      errors.new = 'Password must be at least 8 characters';
    }
    if (passwordData.new !== passwordData.confirm) {
      errors.confirm = 'Passwords do not match';
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  }, [passwordData]);

  // Password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    try {
      await handleApiRequest('put', '/user/password', {
        currentPassword: passwordData.current,
        newPassword: passwordData.new,
      });
      
      toast.success('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({ current: '', new: '', confirm: '' });
      setPasswordErrors({});
      // Reset password visibility
      setShowPassword({ current: false, new: false, confirm: false });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password. Please try again.');
    }
  };

  const handleLogout = useCallback(() => {
    onLogout?.();
    navigate('/signup');
  }, [onLogout, navigate]);

  const closePasswordModal = useCallback(() => {
    if (!loading) {
      setShowPasswordModal(false);
      setPasswordData({ current: '', new: '', confirm: '' });
      setPasswordErrors({});
      setShowPassword({ current: false, new: false, confirm: false });
    }
  }, [loading]);

  return (
    <div className={profileStyles.container}>
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className={profileStyles.mainContainer}>
        {/* Profile Header */}
        <div className={profileStyles.header}>
          <div className={profileStyles.avatar}>
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className={profileStyles.userName}>{user.name || 'Loading...'}</h1>
          <p className={profileStyles.userEmail}>{user.email || 'Loading...'}</p>
        </div>
        
        {/* Profile Content */}
        <div className={profileStyles.content}>
          <div className={profileStyles.grid}>
            {/* Personal Info */}
            <div className={profileStyles.card}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={profileStyles.cardTitle}>
                  <User className={profileStyles.icon} />
                  Personal Information
                </h2>
                {!editMode && (
                  <button 
                    onClick={() => setEditMode(true)}
                    className={profileStyles.editButton}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Edit'}
                  </button>
                )}
              </div>
              
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className={profileStyles.label}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={tempUser.name}
                      onChange={handleInputChange}
                      className={profileStyles.input}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className={profileStyles.label}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={tempUser.email}
                      onChange={handleInputChange}
                      className={profileStyles.input}
                      disabled={loading}
                    />
                  </div>
                 
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className={profileStyles.buttonPrimary}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className={profileStyles.buttonSecondary}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className={profileStyles.label}>Full Name</p>
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>
                  
                  <div>
                    <p className={profileStyles.label}>Email Address</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Account Security */}
            <div className={profileStyles.card}>
              <h2 className={profileStyles.cardTitle}>
                <Lock className={profileStyles.icon} />
                Account Security
              </h2>
              
              <div className="space-y-4">
                <div className={profileStyles.securityItem}>
                  <div>
                    <p className={profileStyles.securityText}>Password</p>
                  </div>
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className={profileStyles.changeButton}
                    disabled={loading}
                  >
                    Change
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className={`${profileStyles.buttonPrimary} mt-6 w-full hover:opacity-90 transition-opacity`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onRequestClose={closePasswordModal}
        contentLabel="Change Password"
        className="modal"
        overlayClassName="modal-overlay"
        // Prevent unnecessary re-renders
        shouldCloseOnOverlayClick={!loading}
        shouldCloseOnEsc={!loading}
      >
        <div className={profileStyles.modalContent}>
          <div className={profileStyles.modalHeader}>
            <h3 className={profileStyles.modalTitle}>Change Password</h3>
            <button 
              onClick={closePasswordModal}
              className="text-gray-500 hover:text-gray-800 disabled:opacity-50"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4 lg:-mx-20">
            <PasswordInput
              name="current"
              label="Current Password"
              value={passwordData.current}
              error={passwordErrors.current}
              showField={showPassword.current}
              onToggle={() => togglePasswordVisibility('current')}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            
            <PasswordInput
              name="new"
              label="New Password"
              value={passwordData.new}
              error={passwordErrors.new}
              showField={showPassword.new}
              onToggle={() => togglePasswordVisibility('new')}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            
            <PasswordInput
              name="confirm"
              label="Confirm New Password"
              value={passwordData.confirm}
              error={passwordErrors.confirm}
              showField={showPassword.confirm}
              onToggle={() => togglePasswordVisibility('confirm')}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className={profileStyles.buttonPrimary}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
              <button
                type="button"
                onClick={closePasswordModal}
                className={profileStyles.buttonSecondary}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;