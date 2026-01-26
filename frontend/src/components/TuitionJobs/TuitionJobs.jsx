import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser, CiSearch } from "react-icons/ci";
import { TfiNewWindow } from "react-icons/tfi";
import axios from "axios";
import Loader from "../Loader/Loader";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/tick.json";
import { getJobPageStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";
const jobsPerPage = 9;

const decodeJwtPayload = (token) => {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const getAuthToken = () =>
  localStorage.getItem("authToken") ||
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  null;

const GetJobPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(false);

  const decodeLocalProfile = useCallback(() => {
    const keys = [
      "teacherProfile",
      "profile",
      "user",
      "userData",
      "authUser",
      "userProfile",
    ];
    for (const k of keys) {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      try {
        const obj = JSON.parse(raw);
        if (obj && (obj.name || obj.uid || obj._id || obj.email)) return obj;
      } catch {
        // ignore
      }
    }
    const token = getAuthToken();
    const payload = decodeJwtPayload(token);
    if (!payload) return null;
    return {
      name:
        payload.name || payload.fullname || payload.username || payload.email,
      uid: payload.uid || payload.sub || payload.id,
      address: payload.address || payload.addr,
      _id: payload._id || payload.id || payload.sub,
      role: payload.role || payload.userType || payload.userrole,
      isTeacher: payload.isTeacher === true,
    };
  }, []);

  const checkAuth = useCallback(() => {
    const token = getAuthToken();
    setIsLoggedIn(
      !!token ||
        ["teacherProfile", "profile", "user", "userData", "authUser"].some(
          (k) => !!localStorage.getItem(k)
        )
    );

    const roleRaw = localStorage.getItem("role");
    if (roleRaw && String(roleRaw).toLowerCase() === "teacher") {
      setIsTeacher(true);
      return;
    }

    const profile = decodeLocalProfile();
    if (profile) {
      if (
        (profile.role && String(profile.role).toLowerCase() === "teacher") ||
        profile.isTeacher === true ||
        profile.userType === "teacher" ||
        profile.userrole === "teacher" ||
        profile.uid ||
        profile._id ||
        profile.name
      ) {
        setIsTeacher(true);
        return;
      }
    }

    const payload = decodeJwtPayload(token);
    if (
      payload &&
      (payload.role === "teacher" ||
        payload.isTeacher === true ||
        payload.userType === "teacher" ||
        payload.userrole === "teacher")
    ) {
      setIsTeacher(true);
      return;
    }

    setIsTeacher(false);
  }, [decodeLocalProfile]);

  const getJobByKey = useCallback(
    (key) => {
      if (!jobs || jobs.length === 0) return null;
      const k = String(key);
      const byField = jobs.find(
        (j) => String(j._id) === k || String(j.jobId) === k
      );
      if (byField) return byField;
      const idx = Number(k);
      if (!Number.isNaN(idx) && idx >= 0 && idx < jobs.length) return jobs[idx];
      return null;
    },
    [jobs]
  );

  const fetchAppliedJobIds = useCallback(async () => {
    if (!isLoggedIn || !isTeacher) {
      setAppliedJobIds(new Set());
      return;
    }
    const token = getAuthToken();
    if (!token) {
      setAppliedJobIds(new Set());
      return;
    }

    setLoadingAppliedJobs(true);
    try {
      const response = await axios.get(
        `${API_BASE}/api/applications/applied-jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.appliedJobIds)
      ) {
        setAppliedJobIds(
          new Set(response.data.appliedJobIds.map((id) => String(id)))
        );
      } else {
        setAppliedJobIds(new Set());
      }
    } catch {
      const stored = localStorage.getItem("appliedJobsFrontend");
      if (stored) {
        try {
          const arr = JSON.parse(stored);
          setAppliedJobIds(new Set(arr.map((id) => String(id))));
        } catch {
          setAppliedJobIds(new Set());
        }
      } else {
        setAppliedJobIds(new Set());
      }
    } finally {
      setLoadingAppliedJobs(false);
    }
  }, [isLoggedIn, isTeacher]);

  useEffect(() => {
    checkAuth();
    let mounted = true;

    const loadJobs = async () => {
      setLoadingJobs(true);
      try {
        const res = await axios.get(`${API_BASE}/api/parents`, {
          params: { limit: 100 },
        });
        if (!mounted) return;
        if (res?.data?.success && Array.isArray(res.data.jobs))
          setJobs(res.data.jobs);
        else if (Array.isArray(res?.data)) setJobs(res.data);
        else setJobs([]);
      } catch {
        setJobs([]);
      } finally {
        setLoadingJobs(false);
      }
    };

    loadJobs();

    const onFocus = () => checkAuth();
    const onStorage = () => checkAuth();

    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);

    return () => {
      mounted = false;
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, [checkAuth]);

  useEffect(() => {
    fetchAppliedJobIds();
  }, [fetchAppliedJobIds]);

  const handleApplyClick = async (jobIdKey) => {
    checkAuth();
    if (!isLoggedIn) {
      navigate("/login-tutor");
      return;
    }
    if (!isTeacher) {
      alert("Only teachers can apply. Please login with a teacher account.");
      return;
    }

    const jobKeyStr = String(jobIdKey);
    if (appliedJobIds.has(jobKeyStr)) return;

    const teacher = decodeLocalProfile();
    const studentJob = getJobByKey(jobIdKey);
    setShowLoading(true);

    try {
      const token = getAuthToken();
      if (!token) throw new Error("No authentication token found");

      const endpointId = studentJob?.jobId || studentJob?._id || jobIdKey;
      const url = `${API_BASE}/api/applications/${encodeURIComponent(
        endpointId
      )}/apply`;

      const payload = {
        tutorUid: teacher?.uid || teacher?._id || null,
        tutorName: teacher?.name || null,
        message: null,
      };

      const res = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      if (res?.data?.success) {
        setAppliedJobIds((prev) => {
          const next = new Set(prev);
          next.add(jobKeyStr);
          return next;
        });
        localStorage.removeItem("appliedJobsFrontend");
        setShowThankYouPopup(true);
        setTimeout(() => setShowThankYouPopup(false), 3000);
      } else throw new Error(res?.data?.message || "Application failed");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("You have already applied for this job.");
        fetchAppliedJobIds();
      } else if (err.response && err.response.status === 401) {
        alert("Please login again to apply for jobs.");
        navigate("/login-tutor");
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } finally {
      setShowLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const q = filter.toLowerCase().trim();
    if (!q) return true;
    const address = String(job.address || "").toLowerCase();
    const city = String(job.city || "").toLowerCase();
    const jobIdStr = String(job.jobId || job._id || "").toLowerCase();
    return address.includes(q) || city.includes(q) || jobIdStr.includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className={getJobPageStyles.pageContainer}>
      <h1 className={getJobPageStyles.title}>
        Available Jobs
      </h1>

      <div className={getJobPageStyles.searchContainer}>
        <div className={getJobPageStyles.searchWrapper}>
          <input
            type="text"
            placeholder="Filter by Job ID, Area, or City (e.g., 12345, Aashiana, Lucknow)"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={getJobPageStyles.searchInput}
          />
          <CiSearch className={getJobPageStyles.searchIcon} />
        </div>
      </div>

      {(loadingJobs || loadingAppliedJobs) && (
        <div className={getJobPageStyles.loadingContainer}>
          <Loader />
          <p className={getJobPageStyles.loadingText}>
            {loadingJobs && "Loading jobs..."}
            {loadingAppliedJobs && " Loading applied jobs..."}
          </p>
        </div>
      )}

      <div className={getJobPageStyles.jobsGrid}>
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => {
            const jobKey = job.jobId || job._id || index;
            const jobIdStr = String(jobKey);
            const alreadyApplied = appliedJobIds.has(jobIdStr);

            return (
              <div
                key={jobKey}
                className={getJobPageStyles.jobCard}
              >
                <article className={getJobPageStyles.jobArticle}>
                  <section className={getJobPageStyles.jobCardHeader}>
                    <header className={getJobPageStyles.jobHeader}>
                      <span>Job ID: {job.jobId || job._id}</span>
                      <div className={getJobPageStyles.jobIdContainer}>
                        <TfiNewWindow />
                      </div>
                    </header>

                    <p className={getJobPageStyles.jobTitle}>
                      Tuition For:{" "}
                      {job.classSubjects && job.classSubjects.length > 0
                        ? job.classSubjects
                            .map((cs) => `Class ${cs.class} - ${cs.subject}`)
                            .join(", ")
                        : "No tuition details"}
                    </p>

                    <p className={getJobPageStyles.jobDate}>
                      Posted on:{" "}
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </p>

                    <div className={getJobPageStyles.jobDetailsContainer}>
                      <p className={getJobPageStyles.jobDetail}>
                        <span className={getJobPageStyles.jobDetailLabel}>Area:</span>
                        <br />
                        {job.address || "N/A"}
                      </p>
                      <p className={getJobPageStyles.jobDetail}>
                        <span className={getJobPageStyles.jobDetailLabel}>City:</span>
                        <br />
                        {job.city || "N/A"}
                      </p>
                    </div>

                    <p className={getJobPageStyles.jobDescription}>
                      <span className={getJobPageStyles.jobDetailLabel}>Job Description:</span>
                      <br />
                      {job.notes || "No description provided"}
                    </p>
                  </section>

                  <footer className={getJobPageStyles.jobFooter}>
                    <div className={getJobPageStyles.jobUserInfo}>
                      <CiUser size={30} />
                      <div>
                        <p>
                          Parent Name: <br />
                          <span className="text-sm font-medium">
                            {job.parentName || "Unknown"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className={getJobPageStyles.jobUserIcon}>
                      {isLoggedIn && isTeacher ? (
                        alreadyApplied ? (
                          <button
                            disabled
                            className={getJobPageStyles.appliedButton}
                          >
                            Applied
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApplyClick(jobKey)}
                            className={getJobPageStyles.applyButton}
                            disabled={showLoading}
                          >
                            Apply Now
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            alert(
                              "Please login as teacher to apply. Use login page for teachers."
                            );
                            navigate("/login-tutor");
                          }}
                          className={getJobPageStyles.loginToApplyButton}
                        >
                          Login to Apply
                        </button>
                      )}
                    </div>
                  </footer>
                </article>
              </div>
            );
          })
        ) : (
          <p className={getJobPageStyles.noJobsMessage}>No jobs available.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className={getJobPageStyles.paginationContainer}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={getJobPageStyles.paginationButton}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={getJobPageStyles.paginationButton}
          >
            Next
          </button>
        </div>
      )}

      {showLoading && (
        <div className={getJobPageStyles.loadingOverlay}>
          <div className={getJobPageStyles.loadingSpinnerContainer}>
            <Loader />
          </div>
        </div>
      )}

      {showThankYouPopup && (
        <div className={getJobPageStyles.thankYouPopupOverlay}>
          <div className={getJobPageStyles.thankYouPopup}>
            <Lottie
              animationData={tickAnimation}
              loop={false}
              style={getJobPageStyles.thankYouAnimation}
            />
            <h2 className={getJobPageStyles.thankYouTitle}>
              Application Submitted!
            </h2>
            <p className={getJobPageStyles.thankYouMessage}>
              We will revert back to you soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetJobPage;