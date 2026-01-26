import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { loginStyles } from "../assets/dummyStyles";

const LoginPage = ({ API_URL = "http://localhost:4000", onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // helper to fetch profile if API returns only token
  const fetchProfile = async (token) => {
    if (!token) return null;
    const res = await axios.get(`${API_URL}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const persistAuth = (profile, token) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    try {
      if (token) storage.setItem("token", token);
      if (profile) storage.setItem("user", JSON.stringify(profile));
    } catch (err) {
      console.error("Storage error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data || {};
      const token = data.token || null;

      // Try to derive profile from response:
      // 1) prefer data.user
      // 2) else, if response contains other user fields besides token, use them
      // 3) else, fetch /api/user/me using token (if token present)
      let profile = data.user ?? null;
      if (!profile) {
        // remove known auth fields and check if anything remains representing user
        const copy = { ...data };
        delete copy.token;
        delete copy.user;
        if (Object.keys(copy).length) {
          profile = copy;
        }
      }

      if (!profile && token) {
        // fetch profile endpoint
        try {
          profile = await fetchProfile(token);
        } catch (fetchErr) {
          console.warn("Could not fetch profile after login token:", fetchErr);
          // fallback to minimal profile
          profile = { email };
        }
      }

      // final fallback minimal profile
      if (!profile) profile = { email };

      // persist token + user (local/session based on rememberMe)
      persistAuth(profile, token);

      // inform parent (App.jsx) if handler provided, else handle navigation here
      if (typeof onLogin === "function") {
        try {
          onLogin(profile, rememberMe, token);
        } catch (callErr) {
          // still navigate if parent handler fails for some reason
          console.warn("onLogin threw:", callErr);
          navigate("/");
        }
      } else {
        navigate("/");
      }

      // clear sensitive fields
      setPassword("");
    } catch (err) {
      console.error("Login error:", err?.response || err);
      const serverMsg =
        err.response?.data?.message ||
        (err.response?.data ? JSON.stringify(err.response.data) : null) ||
        err.message ||
        "Login failed";
      setError(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={loginStyles.pageContainer}>
      <div className={loginStyles.cardContainer}>
        <div className={loginStyles.header}>
          <div className={loginStyles.avatar}>
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className={loginStyles.headerTitle}>Welcome Back</h1>
          <p className={loginStyles.headerSubtitle}>Sign in to your ExpenseTracker account</p>
        </div>

        <div className={loginStyles.formContainer}>
          {error && (
            <div className={loginStyles.errorContainer}>
              <div className={loginStyles.errorIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className={loginStyles.errorText}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className={loginStyles.label}>
                Email Address
              </label>
              <div className={loginStyles.inputContainer}>
                <div className={loginStyles.inputIcon}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={loginStyles.input}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className={loginStyles.label}>
                Password
              </label>
              <div className={loginStyles.inputContainer}>
                <div className={loginStyles.inputIcon}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={loginStyles.passwordInput}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={loginStyles.passwordToggle}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className={loginStyles.checkboxContainer}>
              <input
                type="checkbox"
                id="remember"
                required
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={loginStyles.checkbox}
              />
              <label htmlFor="remember" className={loginStyles.checkboxLabel}>
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className={`${loginStyles.button} ${isLoading ? loginStyles.buttonDisabled : ""}`}
            >
              {isLoading ? (
                <>
                  <svg className={loginStyles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className={loginStyles.signUpContainer}>
            <p className={loginStyles.signUpText}>
              Don't have an account?{" "}
              <Link to="/signup" className={loginStyles.signUpLink}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;