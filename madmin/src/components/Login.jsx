import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 
import { adminLoginStyles } from "../assets/dummyStyles";

export const STORAGE_KEY = "admin_auth_token";
export const EMAIL_KEY = "admin_email";

const API_BASE = "http://localhost:5000"; 

export default function AdminLogin({ redirectTo = "/admin", onLogin } = {}) {
  const navigate = useNavigate?.() ?? (() => {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      e.email = "Enter a valid email";

    if (!password) e.password = "Password is required";
    else if (password.length < 8)
      e.password = "Password must be at least 8 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!resp.ok) {
        let message = `Login failed (${resp.status})`;
        try {
          const json = await resp.json();
          message = json?.message || json?.error || message;
        } catch {
          // keep default
        }
        setServerError(message);
        setLoading(false);
        return;
      }

      const data = await resp.json();
      const token = data?.token || data?.accessToken || data?.authToken;
      if (!token) {
        setServerError("No token returned from server.");
        setLoading(false);
        return;
      }

      localStorage.setItem(STORAGE_KEY, token);
      localStorage.setItem(EMAIL_KEY, email.trim());

      if (typeof onLogin === "function")
        onLogin({ token, email: email.trim(), admin: data?.admin || null });

      try {
        navigate(redirectTo);
      } catch {
        // If no router available, parent onLogin should update UI
      }
    } catch (err) {
      setServerError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={adminLoginStyles.container}>
      <div className={adminLoginStyles.card}>
        <div className={adminLoginStyles.cardContent}>
          <h1 className={adminLoginStyles.title}>Admin Login</h1>
          <p className={adminLoginStyles.subtitle}>
            Sign in with your admin credentials.
          </p>

          {serverError && (
            <div className={adminLoginStyles.serverError}>
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <label className={adminLoginStyles.label}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${adminLoginStyles.inputBase} ${
                errors.email ? adminLoginStyles.inputError : adminLoginStyles.inputNormal
              }`}
              placeholder="you@company.com"
              autoComplete="email"
              disabled={loading}
            />
            {errors.email && (
              <p className={adminLoginStyles.fieldError}>{errors.email}</p>
            )}

            <label className={`${adminLoginStyles.label} mt-4 mb-2`}>
              Password
            </label>
            <div className={adminLoginStyles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${adminLoginStyles.inputBase} ${
                  errors.password ? adminLoginStyles.inputError : adminLoginStyles.inputNormal
                }`}
                placeholder="Enter password (min 8 characters)"
                autoComplete="current-password"
                disabled={loading}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className={adminLoginStyles.passwordToggle}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className={adminLoginStyles.fieldError}>{errors.password}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={adminLoginStyles.submitButton}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className={adminLoginStyles.footerNote}>
            Password must be at least <strong>8 characters</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}