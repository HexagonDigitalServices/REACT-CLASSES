import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { adminParentsStyles } from "../assets/dummyStyles";

const API_BASE = "http://localhost:5000";

/* deterministic initials avatar as data URI */
const makeAvatar = (name = "U", size = 48) => {
  const initials = String(name || "U")
    .split(" ")
    .map((s) => (s ? s[0] : ""))
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colors = ["#E9F5FF", "#FEEFF0", "#FEF3C7", "#ECFFEF", "#EEF2FF"];
  const idx =
    Math.abs(
      initials.split("").reduce((acc, c) => acc + (c.charCodeAt(0) || 0), 0)
    ) % colors.length;
  const bg = colors[idx];
  const fontSize = Math.round(size / 2.3);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><rect width='100%' height='100%' fill='${bg}' rx='999'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='${fontSize}' fill='#0f172a'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/* normalize classSubjects into a map: { grade: [subjects...] } */
const classSubjectsToMap = (cs) => {
  const map = {};
  if (!cs) return map;

  const add = (grade, subj) => {
    if (!grade) grade = "General";
    map[grade] = map[grade] || [];
    if (Array.isArray(subj))
      subj.forEach((s) => s != null && map[grade].push(String(s)));
    else if (subj != null) map[grade].push(String(subj));
  };

  const handle = (item) => {
    if (item == null) return;
    if (typeof item === "string") {
      add("General", item);
      return;
    }
    if (Array.isArray(item)) {
      item.forEach(handle);
      return;
    }
    if (typeof item === "object") {
      // common shapes:
      const grade =
        item.class ||
        item.grade ||
        item.className ||
        item.gradeName ||
        item.level ||
        item.classLevel;
      if (grade) {
        if (Array.isArray(item.subjects)) add(grade, item.subjects);
        else if (Array.isArray(item.subject)) add(grade, item.subject);
        else if (item.subject) add(grade, item.subject);
        else {
          // maybe object like { "8": ["Math"] }
          Object.entries(item).forEach(([k, v]) => {
            if (k && (Array.isArray(v) || typeof v === "string")) {
              add(k, v);
            }
          });
        }
      } else {
        // fallback: treat keys as grade => subjects
        Object.entries(item).forEach(([k, v]) => {
          if (k && (Array.isArray(v) || typeof v === "string")) add(k, v);
        });
      }
    }
  };

  handle(cs);
  return map;
};

/* normalize backend parent/job object to UI shape (jobs removed from UI) */
const normalizeParent = (p) => {
  console.log(p);

  if (!p) {
    return {
      id: String(Math.random()).slice(2),
      profilePicture: makeAvatar("Unknown"),
      name: "Unknown",
      email: "—",
      phone: "—",
      city: "—",
      area: "—",
      children: [],
      classMap: {},
      classLines: [],
      joinDate: "—",
      raw: p,
    };
  }

  // children extraction (various shapes)
  let children = [];
  if (Array.isArray(p.children)) children = p.children;
  else if (Array.isArray(p.classSubjects))
    children = p.classSubjects.map((c) =>
      typeof c === "string" ? c : c.childName || c.name || c.subject || c
    );
  else if (p.children && typeof p.children === "string")
    children = [p.children];
  else if (p.children && typeof p.children === "object")
    children = Object.values(p.children).flat();

  const classMap = classSubjectsToMap(
    p.classSubjects || p.classSubjectsList || p.classMap || {}
  );
  // create display lines like "Class 8 - Math, Science"
  const classLines = Object.entries(classMap).map(([grade, subjects]) => {
    const s = (Array.isArray(subjects) ? subjects : [subjects])
      .map(String)
      .filter(Boolean);
    return `Class ${grade} - ${s.length ? s.join(", ") : "—"}`;
  });

  const rawPic = p.profilePicture || p.avatar || p.profilePic || null;
  const hasRemote =
    typeof rawPic === "string" &&
    (rawPic.startsWith("http") || rawPic.startsWith("data:"));
  const profilePicture = hasRemote
    ? rawPic
    : makeAvatar(p.parentName || p.name || p.fullName || "U");

  return {
    id:
      p.id || p._id || p.parentId || p.jobId || String(Math.random()).slice(2),
    profilePicture,
    name: p.name || p.parentName || p.fullName || "Unknown",
    email: p.email || p.parentEmail || "—",
    phone: p.phone || p.parentMobile || "—",
    city: p.city || p.addressCity || p.cityName || p.city || "—",
    area: p.area || p.address || p.locality || "—",
    children: children || [],
    classMap,
    classLines,
    joinDate: p.createdAt
      ? new Date(p.createdAt).toLocaleDateString()
      : p.joinDate || "—",
    raw: p,
  };
};

const AdminParents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/parents`, {
          headers,
          params: { limit: 200 },
          timeout: 8000,
        });
        console.log(res);

        if (!mounted) return;
        let arr = [];
        const data = res?.data;
        if (!data) arr = [];
        else if (Array.isArray(data)) arr = data;
        else if (Array.isArray(data.parents)) arr = data.parents;
        else if (Array.isArray(data.jobs)) arr = data.jobs;
        else if (Array.isArray(data.data)) arr = data.data;
        else arr = [];
        setParents(arr.map(normalizeParent));
      } catch (err) {
        console.warn("Failed to fetch parents:", err?.message || err);
        setParents([]);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const filtered = parents.filter((p) => {
    const q = (searchTerm || "").toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.city || "").toLowerCase().includes(q) ||
      (p.area || "").toLowerCase().includes(q)
    );
  });

  const viewDetails = async (parent) => {
    setSelectedParent(parent);
    setShowDetailModal(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/parents/${encodeURIComponent(parent.id)}`,
        { headers, timeout: 7000 }
      );
      console.log(res);

      if (res && (res.data?.parent || res.data?.job || res.data)) {
        const payload = res.data.parent || res.data.job || res.data;
        const normalized = normalizeParent(payload);
        setSelectedParent(normalized);
        setParents((prev) =>
          prev.map((x) => (x.id === parent.id ? normalized : x))
        );
      }
    } catch {
      // try jobs endpoint or keep optimistic copy
      try {
        const r2 = await axios.get(
          `${API_BASE}/api/jobs/${encodeURIComponent(parent.id)}`,
          { headers, timeout: 7000 }
        );
        if (r2 && (r2.data?.job || r2.data)) {
          const normalized = normalizeParent(r2.data.job || r2.data);
          setSelectedParent(normalized);
          setParents((prev) =>
            prev.map((x) => (x.id === parent.id ? normalized : x))
          );
        }
      } catch {
        /* ignore */
      }
    }
  };

  const handleDelete = async (parent) => {
    if (!window.confirm(`Delete parent/job for \"${parent.name}\"?`)) return;
    setParents((prev) => prev.filter((p) => p.id !== parent.id));
    try {
      await axios.delete(
        `${API_BASE}/api/parents/${encodeURIComponent(parent.id)}`,
        { headers }
      );
    } catch {
      try {
        await axios.delete(
          `${API_BASE}/api/jobs/${encodeURIComponent(parent.id)}`,
          { headers }
        );
      } catch (err) {
        console.warn("Delete failed:", err?.message || err);
      }
    }
    if (selectedParent?.id === parent.id) {
      setSelectedParent(null);
      setShowDetailModal(false);
    }
  };

  return (
    <div className={adminParentsStyles.mainContainer}>
      <h2 className={adminParentsStyles.title}>
        Parent Management
      </h2>

      <div className={adminParentsStyles.searchContainer}>
        <div className={adminParentsStyles.searchWrapper}>
          <div className={adminParentsStyles.searchIconContainer}>
            <FiSearch className={adminParentsStyles.searchIcon} />
          </div>
          <input
            type="text"
            className={adminParentsStyles.searchInput}
            placeholder="Search parents by name, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className={adminParentsStyles.loadingContainer}>Loading parents…</div>
      ) : filtered.length === 0 ? (
        <div className={adminParentsStyles.emptyContainer}>
          <p className={adminParentsStyles.emptyText}>
            No parents found matching your search.
          </p>
        </div>
      ) : (
        <div className={adminParentsStyles.tableContainer}>
          <div className={adminParentsStyles.tableScrollContainer}>
            <table className={adminParentsStyles.table}>
              <thead className={adminParentsStyles.tableHeader}>
                <tr>
                  <th className={adminParentsStyles.tableHeaderCell}>
                    Parent
                  </th>
                  <th className={adminParentsStyles.tableHeaderCell}>
                    Contact
                  </th>
                  <th className={adminParentsStyles.tableHeaderCell}>
                    Location
                  </th>
                  <th className={adminParentsStyles.tableHeaderCell}>
                    Children
                  </th>
                  <th className={adminParentsStyles.tableHeaderCell}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className={adminParentsStyles.tableRow}>
                {filtered.map((parent) => (
                  <tr key={parent.id}>
                    <td className={adminParentsStyles.tableCell}>
                      <div className={adminParentsStyles.parentAvatarContainer}>
                        <div className={adminParentsStyles.parentAvatar}>
                          <img
                            className={adminParentsStyles.parentAvatarImage}
                            src={parent.profilePicture}
                            alt={parent.name}
                          />
                        </div>
                        <div className={adminParentsStyles.parentInfo}>
                          <div className={adminParentsStyles.parentName}>
                            {parent.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className={adminParentsStyles.tableCell}>
                      <div className={adminParentsStyles.contactInfo}>
                        {parent.email}
                      </div>
                      <div className={adminParentsStyles.contactPhone}>
                        {parent.phone && parent.phone.length === 10
                          ? `+91 ${parent.phone}`
                          : parent.phone}
                      </div>
                    </td>

                    <td className={adminParentsStyles.tableCell}>
                      <div className={adminParentsStyles.locationCity}>
                        {parent.city}
                      </div>
                      <div className={adminParentsStyles.locationArea}>
                        {parent.area}
                      </div>
                    </td>

                    <td className={adminParentsStyles.tableCell}>
                      <div className={adminParentsStyles.childrenContainer}>
                        {parent.classLines.length > 0 ? (
                          parent.classLines.map((l, i) => (
                            <div key={i} className={adminParentsStyles.classLine}>
                              {l}
                            </div>
                          ))
                        ) : parent.children.length > 0 ? (
                          parent.children.map((c, i) => (
                            <div key={i} className={adminParentsStyles.childItem}>
                              {c}
                            </div>
                          ))
                        ) : (
                          <div className={adminParentsStyles.childrenText}>
                            No children listed
                          </div>
                        )}
                      </div>
                    </td>

                    <td className={adminParentsStyles.actionsCell}>
                      <div className={adminParentsStyles.actionsContainer}>
                        <button
                          onClick={() => viewDetails(parent)}
                          className={adminParentsStyles.viewButton}
                        >
                          <FiEye className={adminParentsStyles.viewIcon} /> View
                        </button>
                        <button
                          onClick={() => handleDelete(parent)}
                          className={adminParentsStyles.deleteButton}
                        >
                          <FiTrash2 className={adminParentsStyles.deleteIcon} /> Delete
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

      {showDetailModal && selectedParent && (
        <div className={adminParentsStyles.modalOverlay}>
          <div
            className={adminParentsStyles.modalBackground}
            aria-hidden="true"
          />
          <div className={adminParentsStyles.modalContainer}>
            <div className={adminParentsStyles.modalContent}>
              <div className={adminParentsStyles.modalHeader}>
                <h3 className={adminParentsStyles.modalTitle}>
                  Parent Details
                </h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedParent(null);
                  }}
                  className={adminParentsStyles.modalCloseButton}
                >
                  <svg
                    className={adminParentsStyles.modalCloseIcon}
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

              <div className={adminParentsStyles.modalBody}>
                <div className={adminParentsStyles.profileContainer}>
                  <img
                    className={adminParentsStyles.profileImage}
                    src={selectedParent.profilePicture}
                    alt={selectedParent.name}
                  />
                  <div className={adminParentsStyles.profileInfo}>
                    <h4 className={adminParentsStyles.profileName}>
                      {selectedParent.name}
                    </h4>
                    <div className={adminParentsStyles.profileJoinDate}>
                      {selectedParent.joinDate}
                    </div>
                  </div>
                </div>

                <div className={adminParentsStyles.modalGrid}>
                  <div className={adminParentsStyles.contactBox}>
                    <h5 className={adminParentsStyles.contactBoxTitle}>
                      Contact Information
                    </h5>
                    <div className={adminParentsStyles.contactItems}>
                      <div className={adminParentsStyles.contactItem}>
                        <FiMail className={adminParentsStyles.contactIcon} />
                        <span className={adminParentsStyles.contactText}>
                          {selectedParent.email}
                        </span>
                      </div>
                      <div className={adminParentsStyles.contactItem}>
                        <FiPhone className={adminParentsStyles.contactIcon} />
                        <span className={adminParentsStyles.contactText}>
                          {selectedParent.phone &&
                          selectedParent.phone.length === 10
                            ? `+91 ${selectedParent.phone}`
                            : selectedParent.phone}
                        </span>
                      </div>
                      <div className={adminParentsStyles.contactItem}>
                        <FiMapPin className={adminParentsStyles.contactIcon} />
                        <span className={adminParentsStyles.contactText}>
                          {selectedParent.city}, {selectedParent.area}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={adminParentsStyles.familyBox}>
                    <h5 className={adminParentsStyles.familyBoxTitle}>
                      Family Details
                    </h5>
                    <div className={adminParentsStyles.familyItems}>
                      <div className={adminParentsStyles.contactItem}>
                        <FiUsers className={adminParentsStyles.familyIcon} />
                        <span className="text-sm">
                          <strong>Children / Classes:</strong>
                        </span>
                      </div>
                      {selectedParent.classLines.length > 0 ? (
                        selectedParent.classLines.map((l, i) => (
                          <div key={i} className={adminParentsStyles.familyItemContainer}>
                            {l}
                          </div>
                        ))
                      ) : selectedParent.children.length > 0 ? (
                        selectedParent.children.map((c, i) => (
                          <div key={i} className={adminParentsStyles.familyItemContainer}>
                            {c}
                          </div>
                        ))
                      ) : (
                        <div className={`${adminParentsStyles.familyItemContainer} text-gray-500`}>
                          No children listed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={adminParentsStyles.modalFooter}>
                <button
                  type="button"
                  className={adminParentsStyles.modalCloseActionButton}
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedParent(null);
                  }}
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

export default AdminParents;