import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/rg.png";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { teacherLoginStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";

const TeacherLogin = () => {
  const { uid } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    uid: "",
    rememberMe: false,
  });
  const [submittedData, setSubmittedData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedEmail = localStorage.getItem("email");
    const savedUid = localStorage.getItem("rememberedUid");
    if (savedEmail && savedUid) {
      setFormData({
        email: savedEmail,
        uid: savedUid,
        password: "",
        rememberMe: true,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUidChange = (e) => {
    const value = e.target.value.slice(0, 4);
    setFormData((prev) => ({
      ...prev,
      uid: value.toString() || "", // Convert to string
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate UID before proceeding
    const formattedUID = String(formData.uid).padStart(4, "0").slice(0, 4);
    if (formattedUID.length !== 4) {
      toast.error("UID must be 4 digits", teacherLoginStyles.errorToast);
      return;
    }

    // Build the data to log/persist
    const dataToSubmit = {
      email: formData.email.trim().toLowerCase(),
      uid: formattedUID,
      password: formData.password,
      rememberMe: formData.rememberMe,
      timestamp: new Date().toISOString(),
    };

    setSubmittedData(dataToSubmit);

    try {
      // POST to backend login endpoint
      const res = await axios.post(
        `${API_BASE}/api/tutors/login`,
        {
          email: dataToSubmit.email,
          uid: dataToSubmit.uid,
          password: dataToSubmit.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );
      console.log(res);

      const payload = res?.data;

      if (!payload) {
        toast.error("No response from server", teacherLoginStyles.errorToast);
        return;
      }

      if (!payload.success) {
        // server returned success: false
        toast.error(payload.message || "Login failed", teacherLoginStyles.errorToast);
        return;
      }

      // success
      const token = payload.token;
      const tutor = payload.tutor || null;
      const tutorUid = (tutor && tutor.uid) || formattedUID;

      // store token & uid
      if (token) localStorage.setItem("authToken", token);
      localStorage.setItem("uid", tutorUid);

      // Store email/uid for "remember me" functionality if checked
      if (formData.rememberMe) {
        localStorage.setItem("email", formData.email.trim().toLowerCase());
        localStorage.setItem("rememberedUid", tutorUid);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("rememberedUid");
      }

      // console final payload (keeps parity with your previous behavior)
      console.log("Final Submitted Data:", dataToSubmit);
      if (payload.tutor) console.log("Logged in tutor:", payload.tutor);

      // Notify success
      toast.success("Login successful", teacherLoginStyles.successToast);

      // Ensure other tabs/components can react
      window.dispatchEvent(new Event("storage"));

      // Navigate using the UID
      navigate(`/profile/${tutorUid}`);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, teacherLoginStyles.timeoutToast);
      } else if (err.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.", teacherLoginStyles.timeoutToast);
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again.",
          teacherLoginStyles.timeoutToast
        );
      }
    }
  };

  // Log all submitted data when it changes
  useEffect(() => {
    if (submittedData) {
      console.log("Final Submitted Data:", submittedData);
    }
  }, [submittedData]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className={teacherLoginStyles.pageContainer}>
        <div className={teacherLoginStyles.innerContainer}>
          <div className={teacherLoginStyles.flexWrapper}>
            <div className={teacherLoginStyles.imageContainer}>
              <img
                src={img}
                alt="Login Illustration"
                className={teacherLoginStyles.image}
              />
            </div>
            <div className={teacherLoginStyles.formContainer}>
              <h2 className={teacherLoginStyles.formTitle}>Login </h2>
              <p className={teacherLoginStyles.formSubtitle}>
                Access your account{" "}
              </p>
              <form onSubmit={handleSubmit} className={teacherLoginStyles.form}>
                <div className={teacherLoginStyles.formField}>
                  <label className={teacherLoginStyles.fieldLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={teacherLoginStyles.inputField}
                    required
                  />
                </div>
                <div className={teacherLoginStyles.formField}>
                  <label className={teacherLoginStyles.fieldLabel}>
                    UID
                  </label>
                  <input
                    type="number"
                    name="uid"
                    value={formData.uid || ""}
                    onChange={handleUidChange}
                    placeholder="Enter your 4-digit UID"
                    className={teacherLoginStyles.inputField}
                    required
                  />
                </div>
                <div className={teacherLoginStyles.formField}>
                  <label className={teacherLoginStyles.fieldLabel}>
                    Password
                  </label>
                  <div className={teacherLoginStyles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={teacherLoginStyles.passwordInput}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={teacherLoginStyles.togglePasswordButton}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={teacherLoginStyles.passwordIcon}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={teacherLoginStyles.passwordIcon}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className={teacherLoginStyles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className={teacherLoginStyles.checkbox}
                  />
                  <label className={teacherLoginStyles.checkboxLabel}>
                    Remember Me
                  </label>
                </div>
                <button
                  type="submit"
                  className={teacherLoginStyles.submitButton}
                >
                  Login
                </button>
              </form>
              <div className={teacherLoginStyles.linkContainer}>
                <p className={teacherLoginStyles.linkText}>
                  Don't have an account?{" "}
                  <Link
                    to="/fullregistor-tutor"
                    className={teacherLoginStyles.link}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeacherLogin;