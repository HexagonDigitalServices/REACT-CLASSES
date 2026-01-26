// src/pages/ContactSubmissions.jsx
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiEye,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiTrash,
} from "react-icons/fi";
import axios from "axios";
import { contactSubmissionsStyles } from "../assets/dummyStyles";

const API_BASE = "http://localhost:5000";
const STORAGE_KEY = "contactSubmissions_cache_v1";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveToStorage = (arr) => {
  try {
    if (!Array.isArray(arr)) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {
    // ignore
  }
};

const normalize = (d = {}) => {
  return {
    id:
      d.uniqueId ||
      d._id ||
      d.id ||
      (d.rawId && d.rawId.toString()) ||
      `local-${Date.now()}`,
    parentName: d.parentName || d.name || d.parent || "-",
    parentMobile: d.phone || d.parentMobile || d.parent_phone || "",
    tutorName:
      d.requestedTutorName ||
      (d.tutor && d.tutor.name) ||
      d.tutorName ||
      (d.tutorNameFallback && d.tutorNameFallback) ||
      "-",
    tutorUid:
      d.requestedTutorUid ||
      (d.tutor && d.tutor.uid) ||
      d.tutorUid ||
      (d.tutorUidFallback && d.tutorUidFallback) ||
      "",
    tutorPhone: d.tutorPhone,
    address: d.address || d.city || d.area || "",
    submittedAt:
      d.createdAt || d.submittedAt || d.appliedAt || new Date().toISOString(),
    notes: d.notes || d.message || "",
    raw: d,
  };
};

const ContactSubmissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submissions, setSubmissions] = useState(() => loadFromStorage());
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/tutor-requests`, {
          params: { limit: 500 },
          timeout: 8000,
        });

        if (!mounted) return;

        let data = [];
        if (res && res.data) {
          if (Array.isArray(res.data)) data = res.data;
          else if (Array.isArray(res.data.requests)) data = res.data.requests;
          else if (Array.isArray(res.data.data)) data = res.data.data;
          else if (Array.isArray(res.data.items)) data = res.data.items;
        }

        if (data.length > 0) {
          const normalized = data.map(normalize);
          setSubmissions(normalized);
          saveToStorage(normalized);
        } else {
          // keep cache as-is
        }
      } catch (err) {
        console.warn(
          "Failed to fetch contact submissions — using cache.",
          err?.message || err
        );
        // keep cache
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    const onStorage = (e) => {
      if (!e.key || e.key === STORAGE_KEY) {
        setSubmissions(loadFromStorage());
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      mounted = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    saveToStorage(submissions);
  }, [submissions]);

  const filteredSubmissions = submissions.filter((submission) => {
    const lowerSearch = (searchTerm || "").toLowerCase();
    const matchesSearch =
      (submission.parentName || "").toLowerCase().includes(lowerSearch) ||
      (submission.tutorName || "").toLowerCase().includes(lowerSearch) ||
      (submission.tutorUid || "").toLowerCase().includes(lowerSearch) ||
      (submission.address || "").toLowerCase().includes(lowerSearch);

    return matchesSearch;
  });

  const viewDetails = async (submission) => {
    if (submission && submission.raw) {
      setSelectedSubmission(submission);
      setShowDetailModal(true);
      return;
    }

    const id = submission && (submission.id || submission._id);
    if (!id) {
      setSelectedSubmission(submission);
      setShowDetailModal(true);
      return;
    }

    try {
      const token =
        localStorage.getItem("admin_auth_token") ||
        localStorage.getItem("authToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(
        `${API_BASE}/api/tutor-requests/${encodeURIComponent(id)}`,
        { headers, timeout: 8000 }
      );

      if (res && res.data) {
        const doc =
          res.data.request ||
          res.data ||
          (Array.isArray(res.data.requests) && res.data.requests[0]);
        if (doc) {
          setSelectedSubmission(normalize(doc));
          setShowDetailModal(true);
          return;
        }
      }
    } catch (err) {
      console.warn(
        "Failed to fetch single contact request — showing available data.",
        err?.message || err
      );
    }

    setSelectedSubmission(submission);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedSubmission(null);
  };

  const deleteSubmission = async (submissionId) => {
    const ok = window.confirm(
      "Are you sure you want to delete this contact request?"
    );
    if (!ok) return;

    const previous = submissions.slice();

    setSubmissions((prev) => {
      const next = prev.filter((s) => s.id !== submissionId);
      try {
        saveToStorage(next);
      } catch (e) {
        console.warn("Failed to save cache after optimistic delete", e);
      }
      return next;
    });

    try {
      await axios.delete(
        `${API_BASE}/api/tutor-requests/${encodeURIComponent(submissionId)}`,
        { timeout: 8000 }
      );

      try {
        const res = await axios.get(`${API_BASE}/api/tutor-requests`, {
          params: { limit: 500 },
          timeout: 8000,
        });

        let data = [];
        if (res && res.data) {
          if (Array.isArray(res.data)) data = res.data;
          else if (Array.isArray(res.data.requests)) data = res.data.requests;
          else if (Array.isArray(res.data.data)) data = res.data.data;
          else if (Array.isArray(res.data.items)) data = res.data.items;
        }

        if (data.length > 0) {
          const normalized = data.map(normalize);
          setSubmissions(normalized);
          saveToStorage(normalized);
        } else {
          // keep optimistic removal already applied
        }
      } catch (fetchErr) {
        console.warn(
          "Deleted on server but failed to refresh list:",
          fetchErr?.message || fetchErr
        );
      }
    } catch (err) {
      console.warn(
        "Failed to delete contact request on server — local deletion applied.",
        err?.message || err
      );
      // optional rollback commented out
      // setSubmissions(previous);
      // saveToStorage(previous);
    } finally {
      if (selectedSubmission && selectedSubmission.id === submissionId) {
        closeModal();
      }
      window.dispatchEvent(new Event("contactSubmissionsUpdated"));
    }
  };

  const total = submissions.length;

  return (
    <div className={contactSubmissionsStyles.mainContainer}>
      <div className={contactSubmissionsStyles.headerContainer}>
        <div>
          <h2 className={contactSubmissionsStyles.headerTitle}>
            Contact Submissions
          </h2>
          <p className={contactSubmissionsStyles.headerSubtitle}>
            Manage tutor Submissions — review or remove.
          </p>
        </div>

        <div className={contactSubmissionsStyles.statsContainer}>
          <div className={contactSubmissionsStyles.statsLabel}>Quick stats</div>
          <div className="flex items-center gap-2">
            <div className={contactSubmissionsStyles.statsCard}>
              <div className={contactSubmissionsStyles.statsCardLabel}>Total</div>
              <div className={contactSubmissionsStyles.statsCardValue}>{total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={contactSubmissionsStyles.searchContainer}>
        <div className={contactSubmissionsStyles.searchWrapper}>
          <div className={contactSubmissionsStyles.searchIconWrapper}>
            <FiSearch className={contactSubmissionsStyles.searchIcon} />
          </div>
          <input
            type="text"
            className={contactSubmissionsStyles.searchInput}
            placeholder="Search by parent, tutor, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className={contactSubmissionsStyles.loadingText}>Loading contact submissions...</div>
      ) : filteredSubmissions.length === 0 ? (
        <div className={contactSubmissionsStyles.emptyStateContainer}>
          <p className={contactSubmissionsStyles.emptyStateText}>
            No contact submissions found matching your search.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile / Tablet cards (visible below lg) */}
          <div className={contactSubmissionsStyles.mobileCardsContainer}>
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={contactSubmissionsStyles.mobileCard}
              >
                <div className={contactSubmissionsStyles.cardHeader}>
                  <div className={contactSubmissionsStyles.avatarContainer}>
                    <div className={contactSubmissionsStyles.avatar}>
                      {submission.parentName
                        ? submission.parentName.charAt(0)
                        : "P"}
                    </div>
                    <div className={contactSubmissionsStyles.avatarTextContainer}>
                      <div className={contactSubmissionsStyles.avatarName}>
                        {submission.parentName}
                      </div>
                      <div className={contactSubmissionsStyles.avatarContact}>
                        {submission.parentMobile}
                      </div>
                    </div>
                  </div>

                  <div className={contactSubmissionsStyles.tutorInfoContainer}>
                    <div className={contactSubmissionsStyles.tutorName}>
                      {submission.tutorName}
                    </div>
                    <div className={contactSubmissionsStyles.tutorUid}>
                      TCH-{submission.tutorUid}
                    </div>
                  </div>
                </div>

                <div className={contactSubmissionsStyles.cardFooter}>
                  <div>
                    <div>
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(submission.submittedAt).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewDetails(submission)}
                      className={contactSubmissionsStyles.viewButton}
                    >
                      <FiEye className="inline mr-1" /> View
                    </button>

                    <button
                      onClick={() => deleteSubmission(submission.id)}
                      className={contactSubmissionsStyles.deleteButton}
                    >
                      <FiTrash className="inline mr-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table (visible at lg and above) */}
          <div className={contactSubmissionsStyles.desktopTableContainer}>
            <table className={contactSubmissionsStyles.table}>
              <thead className={contactSubmissionsStyles.tableHeader}>
                <tr>
                  <th className={contactSubmissionsStyles.tableHeaderCell}>
                    Parent
                  </th>
                  <th className={contactSubmissionsStyles.tableHeaderCell}>
                    Tutor
                  </th>
                  <th className={contactSubmissionsStyles.tableHeaderCell}>
                    Submitted On
                  </th>
                  <th className={contactSubmissionsStyles.tableHeaderCell}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={contactSubmissionsStyles.tableBody}>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className={contactSubmissionsStyles.tableRow}>
                    <td className={contactSubmissionsStyles.tableCell}>
                      <div className={contactSubmissionsStyles.tableCellAvatarContainer}>
                        <div className={contactSubmissionsStyles.tableCellAvatar}>
                          {submission.parentName
                            ? submission.parentName.charAt(0)
                            : "P"}
                        </div>
                        <div className={contactSubmissionsStyles.tableCellAvatarText}>
                          <div className={contactSubmissionsStyles.tableCellAvatarName}>
                            {submission.parentName}
                          </div>
                          <div className={contactSubmissionsStyles.tableCellAvatarContact}>
                            {submission.parentMobile}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className={contactSubmissionsStyles.tableCell}>
                      <div className={contactSubmissionsStyles.tableCellTutorName}>
                        {submission.tutorName}
                      </div>
                      <div className={contactSubmissionsStyles.tableCellTutorUid}>
                        TCH-{submission.tutorUid}
                      </div>
                    </td>

                    <td className={contactSubmissionsStyles.tableCell}>
                      <div className={contactSubmissionsStyles.tableCellDate}>
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                      <div className={contactSubmissionsStyles.tableCellTime}>
                        {new Date(submission.submittedAt).toLocaleTimeString()}
                      </div>
                    </td>

                    <td className={contactSubmissionsStyles.tableActions}>
                      <button
                        onClick={() => viewDetails(submission)}
                        className={contactSubmissionsStyles.tableActionButton}
                      >
                        <FiEye className="inline mr-1" /> View
                      </button>
                      <button
                        onClick={() => deleteSubmission(submission.id)}
                        className={contactSubmissionsStyles.tableDeleteButton}
                        title="Delete"
                      >
                        <FiTrash className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showDetailModal && selectedSubmission && (
        <div className={contactSubmissionsStyles.modalOverlay}>
          <div
            className={contactSubmissionsStyles.modalBackdrop}
            aria-hidden="true"
          />

          <div className={contactSubmissionsStyles.modalContainer}>
            <div className={contactSubmissionsStyles.modalContent}>
              <div className={contactSubmissionsStyles.modalHeader}>
                <div>
                  <h3 className={contactSubmissionsStyles.modalTitle}>
                    Contact Request Details
                  </h3>

                  <h4 className={contactSubmissionsStyles.modalSubtitle}>
                    Parent{" "}
                    <span className={contactSubmissionsStyles.modalSubtitleSpan}>
                      {selectedSubmission.parentName}
                    </span>{" "}
                    wants to contact this teacher{" "}
                    <span className={contactSubmissionsStyles.modalSubtitleSpan}>
                      {selectedSubmission.tutorName}
                    </span>{" "}
                    (
                    <span className="text-xs text-gray-500">
                      TCH-{selectedSubmission.tutorUid}
                    </span>
                    )
                  </h4>

                  <p className={contactSubmissionsStyles.modalRequestId}>
                    Request ID:{" "}
                    <span className={contactSubmissionsStyles.modalRequestIdSpan}>
                      {selectedSubmission.id}
                    </span>
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className={contactSubmissionsStyles.modalCloseButton}
                >
                  <svg
                    className={contactSubmissionsStyles.modalCloseIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className={contactSubmissionsStyles.modalSection}>
                <div className={contactSubmissionsStyles.modalInfoCard}>
                  <h5 className={contactSubmissionsStyles.modalInfoTitle}>
                    Contact Information
                  </h5>

                  <div className={contactSubmissionsStyles.modalInfoGrid}>
                    <div className="space-y-2">
                      <div className={contactSubmissionsStyles.modalInfoItem}>
                        <span className={`${contactSubmissionsStyles.modalInfoIconWrapper} ${contactSubmissionsStyles.modalInfoIconBlue}`}>
                          <FiUser />
                        </span>
                        <div>
                          <div className={contactSubmissionsStyles.modalInfoLabel}>Parent</div>
                          <div className={contactSubmissionsStyles.modalInfoValue}>
                            {selectedSubmission.parentName}
                          </div>
                        </div>
                      </div>

                      <div className={contactSubmissionsStyles.modalInfoItem}>
                        <span className={`${contactSubmissionsStyles.modalInfoIconWrapper} ${contactSubmissionsStyles.modalInfoIconBlue}`}>
                          <FiPhone />
                        </span>
                        <div>
                          <div className={contactSubmissionsStyles.modalInfoLabel}>Phone</div>
                          <div className={contactSubmissionsStyles.modalInfoValue}>
                            {selectedSubmission.parentMobile}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className={contactSubmissionsStyles.modalInfoItem}>
                        <span className={`${contactSubmissionsStyles.modalInfoIconWrapper} ${contactSubmissionsStyles.modalInfoIconIndigo}`}>
                          <FiUser />
                        </span>
                        <div>
                          <div className={contactSubmissionsStyles.modalInfoLabel}>Tutor</div>
                          <div className={contactSubmissionsStyles.modalInfoValue}>
                            {selectedSubmission.tutorName}{" "}
                            <span className={contactSubmissionsStyles.modalInfoTutorUid}>
                              (TCH-{selectedSubmission.tutorUid})
                            </span>
                          </div>

                          {selectedSubmission.tutorPhone ? (
                            <div className={contactSubmissionsStyles.modalInfoTutorPhone}>
                              <FiPhone className="text-gray-400" />{" "}
                              <span>{selectedSubmission.tutorPhone}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className={contactSubmissionsStyles.modalInfoItem}>
                        <span className={`${contactSubmissionsStyles.modalInfoIconWrapper} ${contactSubmissionsStyles.modalInfoIconIndigo}`}>
                          <FiCalendar />
                        </span>
                        <div>
                          <div className={contactSubmissionsStyles.modalInfoLabel}>Submitted</div>
                          <div className={contactSubmissionsStyles.modalInfoValue}>
                            {new Date(
                              selectedSubmission.submittedAt
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={contactSubmissionsStyles.addressSection}>
                  <h5 className={contactSubmissionsStyles.addressTitle}>Address</h5>
                  <div className={contactSubmissionsStyles.addressContent}>
                    <FiMapPin className={contactSubmissionsStyles.addressIcon} />
                    <span className={contactSubmissionsStyles.addressText}>
                      {selectedSubmission.address}
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className={contactSubmissionsStyles.notesTitle}>Notes</h5>
                  <div className={contactSubmissionsStyles.notesContent}>
                    {selectedSubmission.notes || "-"}
                  </div>
                </div>
              </div>

              <div className={contactSubmissionsStyles.modalFooter}>
                <div>
                  <button
                    onClick={() => deleteSubmission(selectedSubmission.id)}
                    className={contactSubmissionsStyles.modalDeleteButton}
                  >
                    <FiTrash /> Delete
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    className={contactSubmissionsStyles.modalCloseActionButton}
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissions;