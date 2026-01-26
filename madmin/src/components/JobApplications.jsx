import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiEye,
  FiUser,
  FiPhone,
  FiMapPin,
  FiMail,
  FiCalendar,
  FiFilter,
  FiTrash,
} from "react-icons/fi";
import { jobApplicationsStyles } from "../assets/dummyStyles";

const API_BASE = "http://localhost:5000/api";

const getStatusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "new":
      return "bg-blue-100 text-blue-800";
    case "contacted":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  switch ((status || "").toLowerCase()) {
    case "new":
      return <div className={`${jobApplicationsStyles.statusIcon} bg-blue-500`} />;
    case "contacted":
      return <div className={`${jobApplicationsStyles.statusIcon} bg-yellow-500`} />;
    case "completed":
      return <div className={`${jobApplicationsStyles.statusIcon} bg-green-500`} />;
    default:
      return <div className={`${jobApplicationsStyles.statusIcon} bg-gray-500`} />;
  }
};

export default function JobApplications() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // fetch all applications from backend
  const loadApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/applications`);
      console.log(res);

      if (res?.data?.applications) {
        setSubmissions(res.data.applications);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
      setError(err?.response?.data?.message || err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // view details (fetch fresh single record)
  const viewDetails = async (submission) => {
    try {
      // try to get fresh single application (backend may return masked parentMobile if not owner)
      const res = await axios.get(
        `${API_BASE}/applications/${submission._id || submission.id}`
      );
      console.log(res.data.application);

      const app = res?.data?.application ?? submission;
      setSelectedSubmission(app);
    } catch (err) {
      // fallback to existing object if GET fails
      console.warn(
        "Could not fetch single application; using local copy.",
        err
      );
      setSelectedSubmission(submission);
    } finally {
      setShowDetailModal(true);
    }
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedSubmission(null);
  };

  // update status (optimistic update)
  const updateStatus = async (submissionId, newStatus) => {
    // optimistic update
    const prev = submissions;
    setSubmissions((prevList) =>
      prevList.map((s) =>
        String(s._id || s.id) === String(submissionId)
          ? { ...s, status: newStatus }
          : s
      )
    );

    try {
      await axios.patch(`${API_BASE}/applications/${submissionId}/status`, {
        status: newStatus,
      });
      // reload to get canonical server data (optional)
      await loadApplications();
    } catch (err) {
      alert(
        "Failed to update status: " +
          (err?.response?.data?.message || err.message)
      );
      setSubmissions(prev);
    }
  };

  // delete (confirm + call backend)
  const deleteSubmission = async (submissionId) => {
    if (!window.confirm("Delete this submission? This cannot be undone."))
      return;
    try {
      await axios.delete(`${API_BASE}/applications/${submissionId}`);
      setSubmissions((prev) =>
        prev.filter((s) => String(s._id || s.id) !== String(submissionId))
      );
      if (
        selectedSubmission &&
        (selectedSubmission._id || selectedSubmission.id) === submissionId
      ) {
        closeModal();
      }
    } catch (err) {
      console.error("delete error", err);
      alert(
        "Failed to delete: " + (err?.response?.data?.message || err.message)
      );
    }
  };

  // client-side filtered list (search + status)
  const filteredSubmissions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return submissions.filter((submission) => {
      const matchesSearch =
        !q ||
        (submission.parentName || "").toLowerCase().includes(q) ||
        (submission.tutorName || "").toLowerCase().includes(q) ||
        (submission.tutorUid || "").toLowerCase().includes(q) ||
        (submission.jobSnapshot?.address || submission.address || "")
          .toLowerCase()
          .includes(q) ||
        (submission.parentMobile || "").toLowerCase().includes(q) ||
        (submission.tutorPhone || "").toLowerCase().includes(q) ||
        (submission.tutorEmail || "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (submission.status || "").toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchTerm, statusFilter]);

  const total = submissions.length;
  const newCount = submissions.filter(
    (s) => (s.status || "").toLowerCase() === "new"
  ).length;
  const completedCount = submissions.filter(
    (s) => (s.status || "").toLowerCase() === "completed"
  ).length;

  return (
    <div className={jobApplicationsStyles.mainContainer}>
      <div className={jobApplicationsStyles.headerContainer}>
        <div>
          <h2 className={jobApplicationsStyles.headerTitle}>Job Applications</h2>
          <p className={jobApplicationsStyles.headerSubtitle}>
            Manage tutor applications — review, contact, or remove.
          </p>
        </div>

        <div className={jobApplicationsStyles.statsContainer}>
          <div className={jobApplicationsStyles.statsLabel}>Quick stats</div>
          <div className={jobApplicationsStyles.statsCards}>
            <div className={jobApplicationsStyles.statCard}>
              <div className={jobApplicationsStyles.statLabel}>Total</div>
              <div className={jobApplicationsStyles.statValue}>{total}</div>
            </div>
            <div className={jobApplicationsStyles.statCard}>
              <div className={jobApplicationsStyles.statLabel}>New</div>
              <div className={jobApplicationsStyles.statValue}>{newCount}</div>
            </div>
            <div className={jobApplicationsStyles.statCard}>
              <div className={jobApplicationsStyles.statLabel}>Completed</div>
              <div className={jobApplicationsStyles.statValue}>
                {completedCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className={jobApplicationsStyles.filtersContainer}>
        <div className={jobApplicationsStyles.searchContainer}>
          <div className={jobApplicationsStyles.searchIconContainer}>
            <FiSearch className={jobApplicationsStyles.searchIcon} />
          </div>
          <input
            type="text"
            className={jobApplicationsStyles.searchInput}
            placeholder="Search by parent, tutor, UID, address, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={jobApplicationsStyles.filterContainer}>
          <FiFilter className={jobApplicationsStyles.filterIcon} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={jobApplicationsStyles.filterSelect}
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={jobApplicationsStyles.loadingContainer}>
          Loading applications...
        </div>
      ) : error ? (
        <div className={jobApplicationsStyles.errorContainer}>
          Error: {error}
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className={jobApplicationsStyles.emptyContainer}>
          <p className={jobApplicationsStyles.emptyText}>
            No submissions found matching your search.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile / Tablet view (sm, md) */}
          <div className={jobApplicationsStyles.mobileGrid}>
            {filteredSubmissions.map((submission) => {
              const id = submission._id || submission.id;
              return (
                <div
                  key={id}
                  className={jobApplicationsStyles.mobileCard}
                >
                  <div className={jobApplicationsStyles.mobileCardHeader}>
                    <div className="flex items-start">
                      <div className={jobApplicationsStyles.mobileAvatar}>
                        {submission.parentName?.charAt(0) || "P"}
                      </div>
                      <div className={jobApplicationsStyles.mobileCardContent}>
                        <div className={jobApplicationsStyles.mobileCardName}>
                          {submission.parentName}
                        </div>
                        <div className={jobApplicationsStyles.mobileCardPhone}>
                          {submission.parentMobile}
                        </div>
                        <div className={jobApplicationsStyles.mobileCardLocation}>
                          {submission.city || submission.jobSnapshot?.city}
                        </div>
                      </div>
                    </div>

                    <div className={jobApplicationsStyles.mobileCardTutorInfo}>
                      <div className={jobApplicationsStyles.mobileCardTutorName}>
                        {submission.tutorName}
                      </div>
                      <div className={jobApplicationsStyles.mobileCardTutorUid}>
                        TCH-{submission.tutorUid}
                      </div>
                    </div>
                  </div>

                  <div className={jobApplicationsStyles.mobileCardDate}>
                    <div>
                      <div>
                        {submission.appliedAt
                          ? new Date(submission.appliedAt).toLocaleDateString()
                          : new Date(
                              submission.submittedAt || submission.createdAt
                            ).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {submission.appliedAt
                          ? new Date(submission.appliedAt).toLocaleTimeString()
                          : new Date(
                              submission.submittedAt || submission.createdAt
                            ).toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="flex items-center">
                      {getStatusIcon(submission.status)}
                      <span
                        className={`${jobApplicationsStyles.statusBadge} ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {submission.status}
                      </span>
                    </div>
                  </div>

                  <div className={jobApplicationsStyles.mobileCardActions}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewDetails(submission)}
                        className={jobApplicationsStyles.mobileViewButton}
                      >
                        <FiEye className={jobApplicationsStyles.mobileViewIcon} /> View
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(id, e.target.value)}
                        className={jobApplicationsStyles.mobileStatusSelect}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <button
                        onClick={() => deleteSubmission(id)}
                        className={jobApplicationsStyles.mobileDeleteButton}
                      >
                        <FiTrash className={jobApplicationsStyles.mobileDeleteIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop table - unchanged visually and functionally, only visible at lg and above */}
          <div className={jobApplicationsStyles.desktopTable}>
            <table className={jobApplicationsStyles.table}>
              <thead className={jobApplicationsStyles.tableHeader}>
                <tr>
                  <th className={jobApplicationsStyles.tableHeaderCell}>
                    Parent
                  </th>
                  <th className={jobApplicationsStyles.tableHeaderCell}>
                    Tutor / UID
                  </th>
                  <th className={jobApplicationsStyles.tableHeaderCell}>
                    Submitted On
                  </th>
                  <th className={jobApplicationsStyles.tableHeaderCell}>
                    Status
                  </th>
                  <th className={jobApplicationsStyles.tableHeaderCell}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => {
                  const id = submission._id || submission.id;
                  return (
                    <tr key={id} className={jobApplicationsStyles.tableRow}>
                      <td className={jobApplicationsStyles.tableCell}>
                        <div className={jobApplicationsStyles.tableAvatar}>
                          <div className={jobApplicationsStyles.tableAvatarCircle}>
                            {submission.parentName?.charAt(0) || "P"}
                          </div>
                          <div className={jobApplicationsStyles.tableCellContent}>
                            <div className={jobApplicationsStyles.tableName}>
                              {submission.parentName}
                            </div>
                            <div className={jobApplicationsStyles.tablePhone}>
                              {submission.parentMobile}
                            </div>
                            <div className={jobApplicationsStyles.tableLocation}>
                              {submission.city || submission.jobSnapshot?.city}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className={jobApplicationsStyles.tableCell}>
                        <div className={jobApplicationsStyles.tableName}>
                          {submission.tutorName}
                        </div>
                        <div className={jobApplicationsStyles.tableUid}>
                          TCH-{submission.tutorUid}
                        </div>
                        <div className={jobApplicationsStyles.tableEmail}>
                          {submission.tutorEmail}
                        </div>
                      </td>

                      <td className={jobApplicationsStyles.tableCell}>
                        <div className={jobApplicationsStyles.tableDate}>
                          {submission.appliedAt
                            ? new Date(
                                submission.appliedAt
                              ).toLocaleDateString()
                            : new Date(
                                submission.submittedAt || submission.createdAt
                              ).toLocaleDateString()}
                        </div>
                        <div className={jobApplicationsStyles.tableTime}>
                          {submission.appliedAt
                            ? new Date(
                                submission.appliedAt
                              ).toLocaleTimeString()
                            : new Date(
                                submission.submittedAt || submission.createdAt
                              ).toLocaleTimeString()}
                        </div>
                      </td>

                      <td className={jobApplicationsStyles.tableCell}>
                        <div className="flex items-center">
                          {getStatusIcon(submission.status)}
                          <span
                            className={`${jobApplicationsStyles.statusBadge} ${getStatusColor(
                              submission.status
                            )}`}
                          >
                            {submission.status}
                          </span>
                        </div>
                      </td>

                      <td className={jobApplicationsStyles.tableActions}>
                        <div className={jobApplicationsStyles.tableActionsContainer}>
                          <button
                            onClick={() => viewDetails(submission)}
                            className={jobApplicationsStyles.tableViewButton}
                          >
                            <FiEye className={jobApplicationsStyles.tableViewIcon} /> View
                          </button>

                          <select
                            value={submission.status}
                            onChange={(e) => updateStatus(id, e.target.value)}
                            className={jobApplicationsStyles.tableStatusSelect}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <button
                            onClick={() => deleteSubmission(id)}
                            className={jobApplicationsStyles.tableDeleteButton}
                          >
                            <FiTrash className={jobApplicationsStyles.tableDeleteIcon} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedSubmission && (
        <div className={jobApplicationsStyles.modalOverlay}>
          <div
            className={jobApplicationsStyles.modalBackground}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-app-modal-title"
            className={jobApplicationsStyles.modalDialog}
          >
            <div className={jobApplicationsStyles.modalContent}>
              <div className={jobApplicationsStyles.modalHeader}>
                <div>
                  <h3
                    id="job-app-modal-title"
                    className={jobApplicationsStyles.modalTitle}
                  >
                    Application Details
                  </h3>

                  <h4 className={jobApplicationsStyles.modalSubtitle}>
                    Teacher{" "}
                    <span className="font-medium text-gray-900">
                      {selectedSubmission.tutorName}
                    </span>{" "}
                    applied for job application{" "}
                    <span className="font-medium text-gray-900">
                      {selectedSubmission.jobId || selectedSubmission.id}
                    </span>{" "}
                    (
                    <span className="text-gray-700 font-medium">
                      {selectedSubmission.parentName}
                    </span>
                    )
                  </h4>

                  <p className={jobApplicationsStyles.modalUid}>
                    UID:{" "}
                    <span className="text-gray-700 font-medium">
                      TCH-{selectedSubmission.tutorUid}
                    </span>
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className={jobApplicationsStyles.modalCloseButton}
                  aria-label="Close details"
                >
                  <svg
                    className={jobApplicationsStyles.modalCloseIcon}
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

              <div className={jobApplicationsStyles.modalSection}>
                <div className={jobApplicationsStyles.contactSection}>
                  <h5 className={jobApplicationsStyles.contactTitle}>
                    Contact Information
                  </h5>

                  <div className={jobApplicationsStyles.contactGrid}>
                    <div className="space-y-2">
                      <div className={jobApplicationsStyles.contactItem}>
                        <span className={`${jobApplicationsStyles.contactIconContainer} bg-blue-50 text-blue-700`}>
                          <FiUser />
                        </span>
                        <div>
                          <div className={jobApplicationsStyles.contactIconLabel}>Parent</div>
                          <div className={jobApplicationsStyles.contactIconValue}>
                            {selectedSubmission.parentName}
                          </div>
                        </div>
                      </div>

                      <div className={jobApplicationsStyles.contactItem}>
                        <span className={`${jobApplicationsStyles.contactIconContainer} bg-blue-50 text-blue-700`}>
                          <FiPhone />
                        </span>
                        <div>
                          <div className={jobApplicationsStyles.contactIconLabel}>Phone</div>
                          <div className={jobApplicationsStyles.contactIconValue}>
                            {selectedSubmission.parentMobile}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className={jobApplicationsStyles.contactItem}>
                        <span className={`${jobApplicationsStyles.contactIconContainer} bg-indigo-50 text-indigo-700`}>
                          <FiUser />
                        </span>
                        <div>
                          <div className={jobApplicationsStyles.contactIconLabel}>Tutor</div>
                          <div className={jobApplicationsStyles.contactIconValue}>
                            {selectedSubmission.tutorName}{" "}
                            <span className="text-xs text-gray-400">
                              (TCH-{selectedSubmission.tutorUid})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={jobApplicationsStyles.contactItem}>
                        <span className={`${jobApplicationsStyles.contactIconContainer} bg-indigo-50 text-indigo-700`}>
                          <FiCalendar />
                        </span>
                        <div>
                          <div className={jobApplicationsStyles.contactIconLabel}>Submitted</div>
                          <div className={jobApplicationsStyles.contactIconValue}>
                            {selectedSubmission.appliedAt
                              ? new Date(
                                  selectedSubmission.appliedAt
                                ).toLocaleString()
                              : new Date(
                                  selectedSubmission.submittedAt ||
                                    selectedSubmission.createdAt
                                ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={jobApplicationsStyles.addressSection}>
                  <h5 className={jobApplicationsStyles.addressTitle}>Address</h5>
                  <div className={jobApplicationsStyles.addressContent}>
                    <FiMapPin className={jobApplicationsStyles.addressIcon} />
                    <span className={jobApplicationsStyles.addressText}>
                      {selectedSubmission.address ||
                        selectedSubmission.jobSnapshot?.address ||
                        "-"}
                    </span>
                  </div>
                </div>

                <div className={jobApplicationsStyles.contactMethods}>
                  <h5 className={jobApplicationsStyles.contactMethodsTitle}>
                    Contact Methods
                  </h5>
                  <div className="flex flex-col gap-2">
                    <div className={jobApplicationsStyles.contactMethod}>
                      <FiPhone className={jobApplicationsStyles.contactMethodIcon} /> <strong className={jobApplicationsStyles.contactMethodStrong}>Tutor phone:</strong>
                      &nbsp;{selectedSubmission.tutorPhone}
                    </div>
                    <div className={jobApplicationsStyles.contactMethod}>
                      <FiMail className={jobApplicationsStyles.contactMethodIcon} /> <strong className={jobApplicationsStyles.contactMethodStrong}>Tutor email:</strong>
                      &nbsp;{selectedSubmission.tutorEmail}
                    </div>
                    <div className={jobApplicationsStyles.contactMethod}>
                      <FiPhone className={jobApplicationsStyles.contactMethodIcon} />{" "}
                      <strong className={jobApplicationsStyles.contactMethodStrong}>Parent phone:</strong>&nbsp;
                      {selectedSubmission.parentMobile}
                    </div>
                  </div>
                </div>

                <div className={jobApplicationsStyles.statusSection}>
                  <h5 className={jobApplicationsStyles.statusTitle}>Status</h5>
                  <div className={jobApplicationsStyles.statusBadgeContainer}>
                    <span
                      className={`${jobApplicationsStyles.statusBadge} ${getStatusColor(
                        selectedSubmission.status
                      )}`}
                    >
                      {selectedSubmission.status}
                    </span>

                    <div className={jobApplicationsStyles.statusButtons}>
                      <button
                        onClick={() =>
                          updateStatus(
                            selectedSubmission._id || selectedSubmission.id,
                            "Contacted"
                          )
                        }
                        className={`${jobApplicationsStyles.statusButton} ${jobApplicationsStyles.contactedButton}`}
                      >
                        Mark as Contacted
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(
                            selectedSubmission._id || selectedSubmission.id,
                            "Completed"
                          )
                        }
                        className={`${jobApplicationsStyles.statusButton} ${jobApplicationsStyles.completedButton}`}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  </div>
                </div>

                <div className={jobApplicationsStyles.notesSection}>
                  <h5 className={jobApplicationsStyles.notesTitle}>Notes</h5>
                  <p className={jobApplicationsStyles.notesText}>
                    {selectedSubmission.notes ||
                      selectedSubmission.jobSnapshot?.notes ||
                      "-"}
                  </p>
                </div>
              </div>

              <div className={jobApplicationsStyles.modalFooter}>
                <div>
                  <button
                    onClick={() =>
                      deleteSubmission(
                        selectedSubmission._id || selectedSubmission.id
                      )
                    }
                    className={jobApplicationsStyles.modalDeleteButton}
                  >
                    <FiTrash /> Delete
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    className={jobApplicationsStyles.modalCloseActionButton}
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
}