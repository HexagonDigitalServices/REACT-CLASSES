// src/pages/AdminTeachers.jsx
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBook,
} from "react-icons/fi";
import axios from "axios";
import { adminTeachersStyles } from "../assets/dummyStyles";

const API_BASE = "http://localhost:5000";

const AdminTeachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const getToken = () =>
    localStorage.getItem("authToken") ||
    localStorage.getItem("admin_auth_token") ||
    null;

  const classSubjectsToMap = (cs) => {
    const map = {};
    if (!cs) return map;

    if (typeof cs === "string" && cs.trim()) {
      try {
        cs = JSON.parse(cs);
      } catch {
        map["General"] = [cs];
        return map;
      }
    }

    if (Array.isArray(cs)) {
      cs.forEach((item) => {
        if (item == null) return;
        if (typeof item === "string") {
          map["General"] = map["General"] || [];
          map["General"].push(item);
          return;
        }
        if (Array.isArray(item)) {
          map["General"] = map["General"] || [];
          item.forEach((v) => v != null && map["General"].push(String(v)));
          return;
        }
        if (typeof item === "object") {
          const grade =
            item.class ||
            item.grade ||
            item.className ||
            item.gradeName ||
            item.level ||
            item.key;
          if (grade) {
            if (Array.isArray(item.subjects)) {
              map[grade] = (map[grade] || []).concat(item.subjects.map(String));
            } else if (Array.isArray(item.subject)) {
              map[grade] = (map[grade] || []).concat(item.subject.map(String));
            } else if (item.subject) {
              map[grade] = (map[grade] || []).concat(String(item.subject));
            } else {
              Object.entries(item).forEach(([k, v]) => {
                if (!k) return;
                if (Array.isArray(v)) {
                  map[k] = (map[k] || []).concat(v.map(String));
                } else if (v != null && typeof v !== "object") {
                  map[k] = (map[k] || []).concat(String(v));
                }
              });
            }
            return;
          }
          let merged = false;
          Object.entries(item).forEach(([k, v]) => {
            if (!k) return;
            if (Array.isArray(v)) {
              map[k] = (map[k] || []).concat(v.map(String));
              merged = true;
            } else if (v != null && typeof v !== "object") {
              map[k] = (map[k] || []).concat(String(v));
              merged = true;
            }
          });
          if (!merged) {
            map["General"] = map["General"] || [];
            map["General"].push(JSON.stringify(item));
          }
          return;
        }
        map["General"] = map["General"] || [];
        map["General"].push(String(item));
      });
      return map;
    }

    if (typeof cs === "object") {
      Object.entries(cs).forEach(([k, v]) => {
        if (Array.isArray(v)) map[k] = v.map(String);
        else if (v == null) map[k] = [];
        else if (typeof v === "object") {
          if (Array.isArray(v.subjects)) map[k] = v.subjects.map(String);
          else if (v.subject) map[k] = [String(v.subject)];
          else map[k] = [JSON.stringify(v)];
        } else map[k] = [String(v)];
      });
      return map;
    }

    return map;
  };

  const mapTutorToUI = (tutor) => {
    const csRaw =
      tutor.classSubjects ?? tutor.classSubject ?? tutor.class_subject ?? {};
    const classSubjectsMap = classSubjectsToMap(csRaw);

    const classes = Object.keys(classSubjectsMap || {});
    const subjectsSet = new Set();
    Object.values(classSubjectsMap || {}).forEach((arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((s) => {
        if (s == null) return;
        if (typeof s === "object") {
          const maybe = s.subject || s.name || s.title;
          if (maybe) subjectsSet.add(String(maybe));
          else subjectsSet.add(JSON.stringify(s));
        } else {
          subjectsSet.add(String(s));
        }
      });
    });
    const subjects = Array.from(subjectsSet);

    return {
      id:
        tutor._id ||
        tutor.id ||
        (tutor.uid ? String(tutor.uid) : Math.random().toString(36).slice(2)),
      uid: tutor.uid || "",
      name: tutor.name || tutor.fullname || "",
      email: tutor.email || tutor.contactEmail || "",
      phone: tutor.phone || tutor.mobile || tutor.contact || "",
      city: tutor.city || "",
      area: tutor.area || "",
      profilePicture:
        tutor.profilePicture || tutor.avatar || "/placeholder-avatar.jpg",
      subjects,
      classes,
      experience:
        (tutor.experienceYears ? `${tutor.experienceYears}y` : "") +
        (tutor.experienceMonths ? ` ${tutor.experienceMonths}m` : ""),
      joinDate: tutor.createdAt
        ? new Date(tutor.createdAt).toLocaleDateString()
        : tutor.submittedAt
        ? new Date(tutor.submittedAt).toLocaleDateString()
        : "N/A",
      lastLogin: tutor.lastLogin
        ? new Date(tutor.lastLogin).toLocaleString()
        : "N/A",
      raw: tutor,
    };
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) {
          window.location.href = "/login-tutor";
          return;
        }

        const res = await axios.get(`${API_BASE}/api/tutors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);

        let arr = [];
        if (res?.data?.tutors && Array.isArray(res.data.tutors))
          arr = res.data.tutors;
        else if (Array.isArray(res.data)) arr = res.data;
        else if (res?.data?.data && Array.isArray(res.data.data))
          arr = res.data.data;
        else if (res?.data?.list && Array.isArray(res.data.list))
          arr = res.data.list;
        else arr = [];

        setTeachers(arr.map(mapTutorToUI));
      } catch (err) {
        console.error("Failed fetching tutors:", err);
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("uid");
          window.location.href = "/login-tutor";
          return;
        }
        alert("Failed to load teachers. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    [teacher.name, teacher.uid, teacher.email, teacher.city, teacher.area]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const imageUrl = (src) => {
    if (!src) return "";
    if (src.startsWith("http") || src.startsWith("data:")) return src;
    return `${API_BASE}${src}`;
  };

  const viewDetails = async (teacher) => {
    if (!teacher) return;

    setSelectedTeacher(teacher);
    setShowDetailModal(true);

    setLoadingDetail(true);
    try {
      const token = getToken();
      if (!token) {
        setLoadingDetail(false);
        return;
      }

      const raw = teacher.raw || {};
      const idParam = raw._id || raw.uid || teacher.id;
      const res = await axios.get(
        `${API_BASE}/api/tutors/${encodeURIComponent(idParam)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res?.data?.tutor) {
        setSelectedTeacher(mapTutorToUI(res.data.tutor));
      } else if (Array.isArray(res?.data) && res.data[0]) {
        setSelectedTeacher(mapTutorToUI(res.data[0]));
      } else if (res?.data) {
        setSelectedTeacher(mapTutorToUI(res.data));
      }
    } catch (err) {
      console.warn("Failed to fetch tutor details:", err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("uid");
        window.location.href = "/login-tutor";
        return;
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedTeacher(null);
    setLoadingDetail(false);
  };

  const handleDelete = async (teacher) => {
    const ok = window.confirm(
      `Delete teacher ${teacher.name} (UID: ${teacher.uid})? This action is irreversible.`
    );
    if (!ok) return;

    try {
      const token = getToken();
      if (!token) {
        window.location.href = "/login-tutor";
        return;
      }

      const res = await axios.delete(
        `${API_BASE}/api/tutors/${encodeURIComponent(teacher.uid)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res?.data?.success || res.status === 200 || res.status === 204) {
        setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
        alert("Teacher deleted successfully.");
        if (selectedTeacher && selectedTeacher.id === teacher.id) closeModal();
      } else {
        alert(res.data?.message || "Failed to delete teacher");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("uid");
        window.location.href = "/login-tutor";
        return;
      }
      alert("Failed to delete teacher. Check console.");
    }
  };

  if (loading) {
    return (
      <div className={adminTeachersStyles.mainContainer}>
        <h2 className={adminTeachersStyles.mainHeading}>
          Teacher Management
        </h2>
        <div>Loading teachers...</div>
      </div>
    );
  }

  return (
    <div className={adminTeachersStyles.mainContainer}>
      <h2 className={adminTeachersStyles.mainHeading}>
        Teacher Management
      </h2>

      <div className={adminTeachersStyles.searchContainer}>
        <div className={adminTeachersStyles.searchWrapper}>
          <div className={adminTeachersStyles.searchIconWrapper}>
            <FiSearch className={adminTeachersStyles.searchIcon} />
          </div>
          <input
            type="text"
            className={adminTeachersStyles.searchInput}
            placeholder="Search teachers by name, UID, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTeachers.length === 0 ? (
        <div className={adminTeachersStyles.emptyStateContainer}>
          <p className={adminTeachersStyles.emptyStateText}>
            No teachers found matching your search.
          </p>
        </div>
      ) : (
        <div className={adminTeachersStyles.tableContainer}>
          <div className={adminTeachersStyles.tableWrapper}>
            <table className={adminTeachersStyles.table}>
              <thead className={adminTeachersStyles.tableHeader}>
                <tr>
                  <th className={adminTeachersStyles.tableHeaderCell}>
                    Teacher
                  </th>
                  <th className={adminTeachersStyles.tableHeaderCell}>
                    Contact
                  </th>
                  <th className={adminTeachersStyles.tableHeaderCell}>
                    Expertise
                  </th>
                  <th className={adminTeachersStyles.tableHeaderCell}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={adminTeachersStyles.tableBody}>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td className={adminTeachersStyles.tableCell}>
                      <div className={adminTeachersStyles.tableCellAvatarContainer}>
                        <div className="flex-shrink-0">
                          <img
                            className={adminTeachersStyles.tableCellAvatar}
                            src={imageUrl(teacher.profilePicture)}
                            alt={teacher.name}
                          />
                        </div>
                        <div className={adminTeachersStyles.tableCellAvatarText}>
                          <div className={adminTeachersStyles.tableCellName}>
                            {teacher.name}
                          </div>
                          <div className={adminTeachersStyles.tableCellUid}>
                            TCH-{teacher.uid}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className={adminTeachersStyles.tableCell}>
                      <div className={adminTeachersStyles.tableCellContact}>
                        {teacher.email}
                      </div>
                      <div className={adminTeachersStyles.tableCellPhone}>
                        {teacher.phone}
                      </div>
                    </td>

                    <td className={adminTeachersStyles.tableCell}>
                      <div className={adminTeachersStyles.tableCellSubjects}>
                        {(teacher.subjects || []).join(", ")}
                      </div>
                      <div className={adminTeachersStyles.tableCellClasses}>
                        Classes: {(teacher.classes || []).join(", ")}
                      </div>
                    </td>

                    <td className={adminTeachersStyles.tableActionsCell}>
                      <div className={adminTeachersStyles.tableActionsContainer}>
                        <button
                          type="button"
                          onClick={() => viewDetails(teacher)}
                          className={adminTeachersStyles.tableViewButton}
                        >
                          <FiEye className="inline mr-1" /> View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(teacher)}
                          className={adminTeachersStyles.tableDeleteButton}
                        >
                          <FiTrash2 className="inline mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDetailModal && selectedTeacher && (
        <div className={adminTeachersStyles.modalOverlay}>
          <div
            className={adminTeachersStyles.modalBackdrop}
            aria-hidden="true"
          />
          <div className={adminTeachersStyles.modalContainer}>
            <div className={adminTeachersStyles.modalContent}>
              <div className={adminTeachersStyles.modalHeader}>
                <h3 className={adminTeachersStyles.modalTitle}>
                  Teacher Details
                </h3>
                <button
                  onClick={closeModal}
                  className={adminTeachersStyles.modalCloseButton}
                >
                  <svg
                    className={adminTeachersStyles.modalCloseIcon}
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

              <div className={adminTeachersStyles.modalTeacherInfo}>
                <div className={adminTeachersStyles.modalTeacherHeader}>
                  <img
                    className={adminTeachersStyles.modalTeacherImage}
                    src={imageUrl(selectedTeacher.profilePicture)}
                    alt={selectedTeacher.name}
                  />
                  <div className={adminTeachersStyles.modalTeacherTextContainer}>
                    <h4 className={adminTeachersStyles.modalTeacherName}>
                      {selectedTeacher.name}
                    </h4>
                    <p className={adminTeachersStyles.modalTeacherUid}>
                      TCH-{selectedTeacher.uid}
                    </p>
                    {loadingDetail && (
                      <div className={adminTeachersStyles.modalLoadingText}>
                        Loading details…
                      </div>
                    )}
                  </div>
                </div>

                <div className={adminTeachersStyles.modalGrid}>
                  <div className={adminTeachersStyles.modalInfoCard}>
                    <h5 className={adminTeachersStyles.modalInfoTitle}>
                      Contact Information
                    </h5>
                    <div className={adminTeachersStyles.modalInfoItem}>
                      <div className={adminTeachersStyles.modalInfoRow}>
                        <FiMail className={adminTeachersStyles.modalInfoIcon} />
                        <span className={adminTeachersStyles.modalInfoText}>
                          {selectedTeacher.email}
                        </span>
                      </div>
                      <div className={adminTeachersStyles.modalInfoRow}>
                        <FiPhone className={adminTeachersStyles.modalInfoIcon} />
                        <span className={adminTeachersStyles.modalInfoText}>
                          {selectedTeacher.phone}
                        </span>
                      </div>
                      <div className={adminTeachersStyles.modalInfoRow}>
                        <FiMapPin className={adminTeachersStyles.modalInfoIcon} />
                        <span className={adminTeachersStyles.modalInfoText}>
                          {selectedTeacher.city}, {selectedTeacher.area}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={adminTeachersStyles.modalInfoCard}>
                    <h5 className={adminTeachersStyles.modalInfoTitle}>
                      Teaching Details
                    </h5>
                    <div className={adminTeachersStyles.modalInfoItem}>
                      <div className={adminTeachersStyles.modalInfoRow}>
                        <FiBook className={adminTeachersStyles.modalInfoIcon} />
                        <span className={adminTeachersStyles.modalInfoText}>
                          <strong>Subjects:</strong>{" "}
                          {(selectedTeacher.subjects || []).join(", ")}
                        </span>
                      </div>
                      <div className={adminTeachersStyles.modalInfoText}>
                        <strong>Classes:</strong>{" "}
                        {(selectedTeacher.classes || []).join(", ")}
                      </div>
                      <div className={adminTeachersStyles.modalInfoText}>
                        <strong>Experience:</strong>{" "}
                        {selectedTeacher.experience}
                      </div>
                    </div>
                  </div>

                  <div className={adminTeachersStyles.modalInfoCard}>
                    <h5 className={adminTeachersStyles.modalInfoTitle}>
                      Account Info
                    </h5>
                    <div className={adminTeachersStyles.modalInfoItem}>
                      <div className={adminTeachersStyles.modalInfoText}>
                        <strong>Joined:</strong> {selectedTeacher.joinDate}
                      </div>
                      <div className={adminTeachersStyles.modalInfoText}>
                        <strong>Last Login:</strong> {selectedTeacher.lastLogin}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={adminTeachersStyles.modalFooter}>
                <button
                  type="button"
                  className={adminTeachersStyles.modalCloseButtonAction}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;