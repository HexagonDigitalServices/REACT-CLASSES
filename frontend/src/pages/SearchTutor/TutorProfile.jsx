import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaLock, FaGoogleDrive, FaYoutube } from "react-icons/fa";
import { tutorProfileStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";

const makeAvatar = (name = "U", w = 320, h = 320) => {
  const initials = String(name || "U")
    .split(" ")
    .map((s) => s[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg = ["#fde68a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#dbeafe"][
    Math.floor(Math.random() * 5)
  ];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='${bg}' rx='20' ry='20'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='72' fill='#0f172a'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const getLinkType = (link) =>
  !link
    ? "other"
    : link.includes("youtube.com") || link.includes("youtu.be")
    ? "youtube"
    : link.includes("drive.google.com")
    ? "drive"
    : "other";

const extractYouTubeId = (link) => {
  if (!link) return null;
  const m = link.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  );
  return m && m[2] && m[2].length === 11 ? m[2] : null;
};

const getPreviewContent = (link) => {
  const type = getLinkType(link);
  if (type === "youtube") {
    const id = extractYouTubeId(link);
    if (id)
      return {
        type: "youtube",
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        icon: (
          <FaYoutube className="w-16 h-16 mb-4 mx-auto group-hover:scale-110 transition-transform" />
        ),
      };
  }
  if (type === "drive")
    return {
      type: "drive",
      thumbnail: null,
      icon: (
        <FaGoogleDrive className="w-16 h-16 mb-4 mx-auto group-hover:scale-110 transition-transform" />
      ),
    };
  return {
    type: "other",
    thumbnail: null,
    icon: (
      <FaLock className="w-16 h-16 mb-4 mx-auto group-hover:scale-110 transition-transform" />
    ),
  };
};

const profileSrc = (pic, name) => {
  if (!pic) return makeAvatar(name || "U");
  if (typeof pic !== "string") return makeAvatar(name || "U");
  if (pic.startsWith("http") || pic.startsWith("data:")) return pic;
  if (pic.startsWith("/")) return `${API_BASE}${pic}`;
  return pic;
};

const classSubjectsToMap = (cs) => {
  const map = {};
  if (!cs) return map;
  if (typeof cs === "string") {
    try {
      cs = JSON.parse(cs);
    } catch {
      /* ignore */
    }
  }
  const add = (grade, subj) => {
    const g = grade || "General";
    map[g] = map[g] || [];
    if (Array.isArray(subj))
      subj.forEach((s) => s != null && map[g].push(String(s)));
    else if (subj != null) map[g].push(String(subj));
  };

  const handle = (item) => {
    if (item == null) return;
    if (typeof item === "string") return add("General", item);
    if (Array.isArray(item)) return item.forEach(handle);
    if (typeof item === "object") {
      const grade = item.class || item.grade || item.className || item.level;
      if (grade) {
        if (Array.isArray(item.subjects)) add(grade, item.subjects);
        else if (Array.isArray(item.subject)) add(grade, item.subject);
        else if (item.subject) add(grade, item.subject);
        else Object.entries(item).forEach(([k, v]) => k && add(k, v));
      } else {
        Object.entries(item).forEach(([k, v]) => k && add(k, v));
      }
    } else add("General", String(item));
  };

  handle(cs);
  return map;
};

const persistContactSubmission = (submission) => {
  try {
    const raw = localStorage.getItem("contactSubmissions");
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(submission);
    localStorage.setItem("contactSubmissions", JSON.stringify(arr));
  } catch {
    /* ignore */
  }
};

const TutorProfile = () => {
  const { uid } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    parentMobile: "",
    address: "",
    email: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [lastRequestId, setLastRequestId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!uid) {
        setTutor(null);
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(
          `${API_BASE}/api/tutors/${encodeURIComponent(uid)}`,
          { headers, timeout: 8000 }
        );
        const t =
          res?.data?.tutor ||
          (Array.isArray(res?.data) ? res.data[0] : res?.data);
        if (!cancelled && t) {
          setTutor({
            _id: t._id || t.id,
            uid: t.uid || uid,
            name: t.name || t.fullname || "No name",
            phone: t.phone,
            major: t.major || t.subject || "",
            graduationYear: t.graduationYear || "",
            city: t.city || "",
            area: t.area || "",
            profilePicture:
              t.profilePicture || makeAvatar(t.name || t.email || "U"),
            videoLink: t.videoLink || t.demoVideo || "",
            selfDescription: t.selfDescription || t.about || "",
            experienceYears: t.experienceYears || 0,
            experienceMonths: t.experienceMonths || 0,
            address: t.address || t.homeAddress || "",
            skillsDescription: t.skillsDescription || "",
            classSubjects: t.classSubjects || {},
          });
        } else if (!cancelled) setTutor(null);
      } catch {
        if (!cancelled) setTutor(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "parentMobile")
      setFormData((p) => ({
        ...p,
        [name]: value.replace(/\D/g, "").slice(0, 10),
      }));
    else setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleVideoClick = (link) => {
    if (link) window.open(link, "_blank");
  };

  const handleContactOpen = () => {
    setShowContactModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if ((formData.parentMobile || "").replace(/\D/g, "").length !== 10) {
      setSubmitError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const payload = {
      parentName: formData.parentName,
      phone: formData.parentMobile,
      address: formData.address,
      email: formData.email || null,
      notes:
        formData.notes ||
        (tutor
          ? `Interested in tutor ${tutor.name} (uid: ${tutor.uid || uid})`
          : ""),
      city: tutor?.city || null,
      requestedTutorUid: tutor?.uid || uid,
      requestedTutorName: tutor?.name || undefined,
      tutorPhone: tutor?.phone,
    };

    setSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      const res = await axios.post(`${API_BASE}/api/tutor-requests`, payload, {
        headers,
        timeout: 10000,
      });

      if (res?.data?.success && res?.data?.request) {
        const returned = res.data.request;
        setLastRequestId(returned.uniqueId || returned._id || null);
        persistContactSubmission({
          id: returned.uniqueId || returned._id || `local-${Date.now()}`,
          parentName: payload.parentName,
          parentMobile: payload.phone,
          address: payload.address,
          tutor: {
            uid: tutor?.uid || uid,
            name: tutor?.name || null,
            city: tutor?.city || null,
            area: tutor?.area || null,
          },
          createdAt: returned.createdAt || new Date().toISOString(),
        });
      } else {
        persistContactSubmission({
          id: `local-${Date.now()}`,
          parentName: payload.parentName,
          parentMobile: payload.phone,
          address: payload.address,
          tutor: {
            uid: tutor?.uid || uid,
            name: tutor?.name || null,
            city: tutor?.city || null,
            area: tutor?.area || null,
          },
          createdAt: new Date().toISOString(),
        });
      }

      setShowContactModal(false);
      setFormData({
        parentName: "",
        parentMobile: "",
        address: "",
        email: "",
        notes: "",
      });
      setThankYouMessage(true);
      setTimeout(() => setThankYouMessage(false), 5000);
    } catch (err) {
      persistContactSubmission({
        id: `local-${Date.now()}`,
        parentName: payload.parentName,
        parentMobile: payload.phone,
        address: payload.address,
        tutor: {
          uid: tutor?.uid || uid,
          name: tutor?.name || null,
          city: tutor?.city || null,
          area: tutor?.area || null,
        },
        createdAt: new Date().toISOString(),
        error: err?.message || "network error",
      });
      setSubmitError("Failed to submit to server — saved locally.");
      setShowContactModal(false);
      setFormData({
        parentName: "",
        parentMobile: "",
        address: "",
        email: "",
        notes: "",
      });
      setThankYouMessage(true);
      setTimeout(() => setThankYouMessage(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={tutorProfileStyles.loadingContainer}>
          <div className={tutorProfileStyles.loadingText}>Loading tutor profile...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!tutor) {
    return (
      <>
        <Navbar />
        <div className={tutorProfileStyles.notFoundContainer}>
          Tutor not found!
        </div>
        <Footer />
      </>
    );
  }

  const classMap = classSubjectsToMap(tutor?.classSubjects);
  const preview = getPreviewContent(tutor.videoLink);

  // helper to extract Google Drive file id (if present)
  const extractDriveFileId = (link) => {
    if (!link) return null;
    const m1 = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (m1 && m1[1]) return m1[1];
    const m2 = link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m2 && m2[1]) return m2[1];
    return null;
  };

  return (
    <>
      <Navbar />
      <div className={tutorProfileStyles.mainContainer}>
        {showContactModal && (
          <div className={tutorProfileStyles.contactModalOverlay}>
            <div className={tutorProfileStyles.contactModal}>
              <h3 className={tutorProfileStyles.contactModalTitle}>
                Contact {tutor.name}
              </h3>
              {submitError && (
                <div className={tutorProfileStyles.errorMessage}>{submitError}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className={tutorProfileStyles.contactForm}>
                  <div>
                    <label className={tutorProfileStyles.formLabel}>
                      Parent Name
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      className={tutorProfileStyles.formInput}
                      value={formData.parentName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className={tutorProfileStyles.formLabel}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="parentMobile"
                      required
                      pattern="[0-9]{10}"
                      inputMode="numeric"
                      placeholder="Enter 10-digit mobile number"
                      className={tutorProfileStyles.formInput}
                      value={formData.parentMobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className={tutorProfileStyles.formLabel}>
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={tutorProfileStyles.formInput}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className={tutorProfileStyles.formLabel}>Address</label>
                    <textarea
                      name="address"
                      required
                      className={tutorProfileStyles.formTextarea}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className={tutorProfileStyles.formLabel}>
                      Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      className={tutorProfileStyles.formTextarea}
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={tutorProfileStyles.formButtonContainer}>
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className={tutorProfileStyles.cancelButton}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={tutorProfileStyles.submitButton}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={tutorProfileStyles.profileCard}>
          <div className={tutorProfileStyles.uidBadge}>
            UID: {uid}
          </div>

          <div className={tutorProfileStyles.profileHeader}>
            <div className={tutorProfileStyles.profileImageContainer}>
              <img
                src={profileSrc(tutor.profilePicture, tutor.name)}
                alt={`${tutor.name}'s profile`}
                className={tutorProfileStyles.profileImage}
              />
            </div>
            <div className={tutorProfileStyles.profileInfo}>
              <h2 className={tutorProfileStyles.profileName}>{tutor.name}</h2>
              <p className={tutorProfileStyles.profileMajor}>
                {tutor.major} Tutor | Class of {tutor.graduationYear}
              </p>
              <p className={tutorProfileStyles.profileLocation}>
                Based in {tutor.city}, {tutor.area}
              </p>
              <button
                className={tutorProfileStyles.contactButton}
                onClick={handleContactOpen}
                disabled={submitting}
              >
                Contact {tutor.name}
              </button>
              {thankYouMessage && (
                <p className={tutorProfileStyles.thankYouMessage}>
                  Thank you for your interest! We will connect you soon.
                </p>
              )}
              {lastRequestId && (
                <p className={tutorProfileStyles.lastRequestInfo}>
                  Last request:{" "}
                  <span className={tutorProfileStyles.lastRequestId}>{lastRequestId}</span>
                </p>
              )}
            </div>
          </div>

          {tutor.videoLink && (
            <div className={tutorProfileStyles.videoSection}>
              <h3 className={tutorProfileStyles.videoTitle}>
                Demo Lecture 
              </h3>

              <div
                className={tutorProfileStyles.videoContainer}
                onClick={() => handleVideoClick(tutor.videoLink)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleVideoClick(tutor.videoLink);
                }}
              >
                {(() => {
                  // YouTube embed if valid ID
                  const ytId = extractYouTubeId(tutor.videoLink);
                  if (ytId) {
                    const embedUrl = `https://www.youtube.com/embed/${ytId}`;
                    return (
                      <div className={tutorProfileStyles.youtubeEmbed}>
                        <iframe
                          title="YouTube preview"
                          src={embedUrl}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className={tutorProfileStyles.iframe}
                        />
                      </div>
                    );
                  }

                  // Google Drive embed if file id found
                  const driveId = extractDriveFileId(tutor.videoLink);
                  if (driveId) {
                    const previewUrl = `https://drive.google.com/file/d/${driveId}/preview`;
                    return (
                      <div className={tutorProfileStyles.driveEmbed}>
                        <iframe
                          title="Google Drive preview"
                          src={previewUrl}
                          allow="autoplay"
                          className={tutorProfileStyles.iframe}
                        />
                      </div>
                    );
                  }

                  // fallback: existing blurred-thumbnail / icon card UI (click opens link)
                  if (preview.type === "youtube" && preview.thumbnail) {
                    return (
                      <div className="relative h-96">
                        <img
                          src={preview.thumbnail}
                          alt="YouTube preview"
                          className={`w-full h-full object-cover ${tutorProfileStyles.imageHover}`}
                        />
                      </div>
                    );
                  }

                  return (
                    <div className={tutorProfileStyles.fallbackVideoContainer}>
                      {preview.type === "drive" ? (
                        <div className="text-center">
                          <FaGoogleDrive className={tutorProfileStyles.fallbackIcon} />
                          <p className={tutorProfileStyles.fallbackText}>
                            Google Drive Video
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <FaLock className={tutorProfileStyles.fallbackIcon} />
                          <p className={tutorProfileStyles.fallbackText}>
                            Demo Content
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className={tutorProfileStyles.videoTypeIndicator}>
                {getLinkType(tutor.videoLink) === "youtube" && (
                  <>
                    <FaYoutube className={`${tutorProfileStyles.videoIcon} ${tutorProfileStyles.youtubeIconColor}`} />
                    YouTube Video
                  </>
                )}
                {getLinkType(tutor.videoLink) === "drive" && (
                  <>
                    <FaGoogleDrive className={`${tutorProfileStyles.videoIcon} ${tutorProfileStyles.driveIconColor}`} />
                    Google Drive File
                  </>
                )}
              </div>
            </div>
          )}

          <div className={tutorProfileStyles.aboutSection}>
            <h3 className={tutorProfileStyles.aboutTitle}>About Me</h3>
            <p className={tutorProfileStyles.aboutText}>
              {tutor.selfDescription}
            </p>
          </div>

          <hr className={tutorProfileStyles.divider} />

          <div className={tutorProfileStyles.detailsGrid}>
            <div>
              <h3 className={tutorProfileStyles.sectionTitle}>
                Teaching Details
              </h3>
              <p className={tutorProfileStyles.detailText}>
                <strong className={tutorProfileStyles.strongText}>Experience:</strong> {tutor.experienceYears ?? 0} years
                and {tutor.experienceMonths ?? 0} months
              </p>
              <p className={tutorProfileStyles.detailText}>
                <strong className={tutorProfileStyles.strongText}>Preferred Locations:</strong> {tutor.address}
              </p>
            </div>
            <div>
              <h3 className={tutorProfileStyles.sectionTitle}>Skills</h3>
              <p className={tutorProfileStyles.detailText}>{tutor.skillsDescription}</p>
            </div>
          </div>

          <hr className={tutorProfileStyles.divider} />

          <div className={tutorProfileStyles.classesSection}>
            <h3 className={tutorProfileStyles.classesTitle}>
              Classes and Subjects
            </h3>
            <div className={tutorProfileStyles.classesGrid}>
              {Object.keys(classMap).length === 0 ? (
                <div className={tutorProfileStyles.noClassesText}>No classes listed.</div>
              ) : (
                Object.keys(classMap).map((grade) => (
                  <div
                    key={grade}
                    className={tutorProfileStyles.classCard}
                  >
                    <h4 className={tutorProfileStyles.classGrade}>
                      Class {grade}
                    </h4>
                    <p className={tutorProfileStyles.classSubjects}>
                      Subjects:{" "}
                      {(Array.isArray(classMap[grade])
                        ? classMap[grade]
                        : []
                      ).join(", ")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorProfile;