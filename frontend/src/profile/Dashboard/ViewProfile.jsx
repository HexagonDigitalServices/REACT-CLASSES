import React, { useEffect, useState } from "react";
import { useParams, Outlet, useOutlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogleDrive, FaLock, FaYoutube } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import SideNav from "./SideNavbar";
import Footer from "../../components/Footer/Footer";
import { viewProfileStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";

const classSubjectsToMap = (cs) => {
  const map = {};
  if (!cs) return map;

  // try parse JSON string
  if (typeof cs === "string" && cs.trim()) {
    try {
      cs = JSON.parse(cs);
    } catch {
      // treat string as a single subject under 'General'
      map["General"] = [cs];
      return map;
    }
  }

  // array handling (many possible shapes)
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
        // common shapes:
        // { class: '7th', subject: 'Math' }
        // { class: '7th', subjects: ['Math','Sci'] }
        // { '7th': ['Math'] }
        const grade =
          item.class ||
          item.grade ||
          item.className ||
          item.level ||
          // fallback: if object has a single key that looks like a grade, use it
          (Object.keys(item).length === 1 ? Object.keys(item)[0] : undefined);

        if (grade) {
          const subjects = item.subjects ?? item.subject ?? item[grade];
          if (Array.isArray(subjects)) {
            map[grade] = (map[grade] || []).concat(subjects.map(String));
          } else if (subjects != null && typeof subjects === "object") {
            // e.g. nested object -> stringify values
            map[grade] = (map[grade] || []).concat(
              Object.values(subjects).map(String)
            );
          } else if (subjects != null) {
            map[grade] = (map[grade] || []).concat(String(subjects));
          } else {
            // if no 'subject(s)' property, try to extract any non-grade keys as subjects
            Object.entries(item).forEach(([k, v]) => {
              if (k === grade) return;
              if (Array.isArray(v))
                map[grade] = (map[grade] || []).concat(v.map(String));
              else if (v != null)
                map[grade] = (map[grade] || []).concat(String(v));
            });
          }
          return;
        }

        // fallback: iterate entries: { '7th': ['Math'], other: 'x' }
        Object.entries(item).forEach(([k, v]) => {
          if (!k) return;
          if (Array.isArray(v)) map[k] = (map[k] || []).concat(v.map(String));
          else if (v != null && typeof v === "object")
            map[k] = (map[k] || []).concat(Object.values(v).map(String));
          else if (v != null) map[k] = (map[k] || []).concat(String(v));
        });

        return;
      }

      // other primitives
      map["General"] = map["General"] || [];
      map["General"].push(String(item));
    });

    return map;
  }

  // if object mapping grade -> subjects
  if (typeof cs === "object") {
    Object.entries(cs).forEach(([k, v]) => {
      if (Array.isArray(v)) map[k] = v.map(String);
      else if (v == null) map[k] = [];
      else if (typeof v === "object") {
        // nested shape -> try subject(s) keys or stringify
        if (Array.isArray(v.subjects)) map[k] = v.subjects.map(String);
        else if (v.subject) map[k] = [String(v.subject)];
        else map[k] = [JSON.stringify(v)];
      } else map[k] = [String(v)];
    });
    return map;
  }

  return map;
};

const profileSrc = (pic) => {
  if (!pic) return "https://via.placeholder.com/150/cccccc/ffffff?text=Avatar";
  if (typeof pic !== "string")
    return "https://via.placeholder.com/150/cccccc/ffffff?text=Avatar";
  if (
    pic.startsWith("http://") ||
    pic.startsWith("https://") ||
    pic.startsWith("data:")
  )
    return pic;
  if (pic.startsWith("/")) return `${API_BASE}${pic}`;
  return pic;
};

const ViewProfile = () => {
  const { uid } = useParams();
  const outlet = useOutlet(); // Checks if a nested route is active
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if no uid in route, redirect to login
    if (!uid) {
      console.error("UID is missing from the route.");
      navigate("/login-tutor");
      return;
    }

    const fetchTutor = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        // not logged in
        navigate("/login-tutor");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/tutors/${encodeURIComponent(uid)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(res);

        if (res.data && res.data.success && res.data.tutor) {
          let t = res.data.tutor;

          // normalize classSubjects into a plain object map { grade: [subjects...] }
          t.classSubjects = classSubjectsToMap(t.classSubjects ?? {});

          // ensure fields exist so render won't crash
          t.profilePicture = t.profilePicture || "";
          t.major = t.major || "";
          t.graduationYear = t.graduationYear || "";
          t.area = t.area || "";
          t.city = t.city || "";
          t.email = t.email || "";
          t.phone = t.phone || "";
          t.selfDescription = t.selfDescription || "";
          t.experienceYears = t.experienceYears ?? 0;
          t.experienceMonths = t.experienceMonths ?? 0;
          t.skillsDescription = t.skillsDescription || "";

          setTutor(t);
        } else {
          console.error("Unexpected response from server:", res.data);
          navigate("/login-tutor");
        }
      } catch (err) {
        console.error("Failed to fetch tutor:", err);
        const status = err?.response?.status;
        // If unauthorized or forbidden, clear auth and navigate to login
        if (status === 401 || status === 403) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("uid");
          navigate("/login-tutor");
        } else if (status === 404) {
          alert("Tutor not found");
          navigate("/"); // or navigate somewhere appropriate
        } else {
          alert("Server error while fetching profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, navigate]);

  if (loading || !tutor) {
    return (
      <>
        <Navbar />
        <div className={viewProfileStyles.loadingContainer}>
          Loading tutor data...
        </div>
        <Footer />
      </>
    );
  }

  // determine link type
  const getLinkType = (url) => {
    if (!url || typeof url !== "string") return null;
    if (/(?:youtube\.com\/watch\?v=|youtu\.be\/)/i.test(url)) return "youtube";
    if (/drive\.google\.com/i.test(url)) return "drive";
    return "other";
  };

  // get YouTube video id (returns null if not found)
  const getYouTubeId = (url) => {
    if (!url) return null;
    const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[&?#]|$)/);
    return m ? m[1] : null;
  };

  // get a usable YouTube thumbnail URL or null
  const getYouTubeThumbnail = (url) => {
    const id = getYouTubeId(url);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  };

  // simple click handler — opens the link in a new tab
  const handleVideoClick = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const classKeys = Object.keys(tutor.classSubjects || {});

  return (
    <>
      <Navbar />
      <div className={viewProfileStyles.mainContainer}>
        <SideNav className={viewProfileStyles.sidebar} />
        <div className={viewProfileStyles.contentContainer}>
          {/* UID Tag */}
          <div className={viewProfileStyles.uidBadge}>
            UID: {uid}
          </div>

          {outlet ? (
            // If a nested route (e.g. editprofile) is active, render only its content
            <div className={viewProfileStyles.outletContainer}>
              <Outlet />
            </div>
          ) : (
            // Otherwise, render the default tutor profile UI
            <>
              {/* Header Section */}
              <div className={viewProfileStyles.headerSection}>
                <div className={viewProfileStyles.profileImageContainer}>
                  <img
                    src={profileSrc(tutor.profilePicture)}
                    alt={`${tutor.name}'s profile`}
                    className={viewProfileStyles.profileImage}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150/cccccc/ffffff?text=Avatar";
                    }}
                  />
                </div>
                <div className={viewProfileStyles.profileInfo}>
                  <h2 className={viewProfileStyles.profileName}>{tutor.name}</h2>
                  <p className={viewProfileStyles.profileMajor}>
                    {tutor.major} Tutor{" "}
                    {tutor.graduationYear
                      ? `| Class of ${tutor.graduationYear}`
                      : ""}
                  </p>
                  <p className={viewProfileStyles.profileLocation}>
                    Based in {tutor.area}, {tutor.city}
                  </p>
                  <p className={viewProfileStyles.profileContact}>
                    {tutor.email} {tutor.phone ? `| ${tutor.phone}` : ""}
                  </p>
                </div>
              </div>

              {/* === VIDEO PREVIEW: embedded like EditProfile === */}
              {tutor.videoLink && (
                <div className={viewProfileStyles.videoSection}>
                  <h3 className={viewProfileStyles.videoTitle}>
                    Demo Lecture 
                  </h3>

                  {(() => {
                    const url = tutor.videoLink;
                    const ytId = getYouTubeId(url);

                    const isDrive =
                      (/drive\.google\.com/i.test(url) &&
                        /\/file\/d\/([a-zA-Z0-9_-]+)/i.test(url)) ||
                      /drive\.google\.com\/open\?id=/i.test(url);

                    if (ytId) {
                      const embedUrl = `https://www.youtube.com/embed/${ytId}`;
                      return (
                        <div className="mt-4">
                          <div className={viewProfileStyles.videoTypeLabel}>
                            YouTube preview
                          </div>
                          <div className={viewProfileStyles.youtubeEmbed}>
                            <iframe
                              title="YouTube preview"
                              src={embedUrl}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className={viewProfileStyles.iframe}
                            />
                          </div>
                        </div>
                      );
                    }

                    if (isDrive) {
                      const fileId =
                        (url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || [])[1] ||
                        (url.match(/[?&]id=([a-zA-Z0-9_-]+)/) || [])[1];

                      if (fileId) {
                        const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                        return (
                          <div className="mt-4">
                            <div className={viewProfileStyles.videoTypeLabel}>
                              Drive preview
                            </div>
                            <div className={viewProfileStyles.driveEmbed}>
                              <iframe
                                title="Google Drive preview"
                                src={previewUrl}
                                allow="autoplay"
                                className={viewProfileStyles.iframe}
                              />
                            </div>
                            
                          </div>
                        );
                      }
                    }

                    // fallback: show clickable card that opens in new tab and indicates type
                    const type = getLinkType(url);
                    const icon =
                      type === "youtube" ? (
                        <FaYoutube className={`${viewProfileStyles.fallbackIcon} ${viewProfileStyles.youtubeIconColor}`} />
                      ) : type === "drive" ? (
                        <FaGoogleDrive className={`${viewProfileStyles.fallbackIcon} ${viewProfileStyles.driveIconColor}`} />
                      ) : (
                        <FaLock className={`${viewProfileStyles.fallbackIcon} ${viewProfileStyles.lockIconColor}`} />
                      );

                    return (
                      <div
                        className={viewProfileStyles.fallbackVideoCard}
                        onClick={() => handleVideoClick(url)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            handleVideoClick(url);
                        }}
                      >
                        <div className={viewProfileStyles.fallbackVideoContainer}>
                          <div className="text-center">{icon}</div>
                        </div>

                        <div className={viewProfileStyles.fallbackContent}>
                          <div className={viewProfileStyles.fallbackIconHover}>
                            {icon}
                          </div>
                          <div className="space-y-2">
                            <p className={viewProfileStyles.fallbackTitle}>
                              Demo Lecture
                            </p>
                            <div className={viewProfileStyles.fallbackAction}>
                              <span>Click to open</span>
                            </div>
                            <p className={viewProfileStyles.fallbackDescription}>
                              {type === "youtube"
                                ? "Opens on YouTube"
                                : type === "drive"
                                ? "Opens in Google Drive"
                                : "Opens the demo content"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className={viewProfileStyles.videoTypeIndicator}>
                    {getLinkType(tutor.videoLink) === "youtube" && (
                      <>
                        <FaYoutube className={`${viewProfileStyles.videoIcon} text-red-600`} />
                        YouTube Video
                      </>
                    )}
                    {getLinkType(tutor.videoLink) === "drive" && (
                      <>
                        <FaGoogleDrive className={`${viewProfileStyles.videoIcon} text-blue-600`} />
                        Google Drive File
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* About Me Section */}
              <div className={viewProfileStyles.aboutSection}>
                <h3 className={viewProfileStyles.aboutTitle}>About Me</h3>
                <p className={viewProfileStyles.aboutText}>
                  {tutor.selfDescription}
                </p>
              </div>

              <hr className={viewProfileStyles.divider} />

              {/* Teaching Details Section */}
              <div className={viewProfileStyles.detailsGrid}>
                <div>
                  <h3 className={viewProfileStyles.sectionTitle}>
                    Teaching Details
                  </h3>
                  <p className={viewProfileStyles.detailText}>
                    <strong className={viewProfileStyles.strongText}>Experience:</strong> {tutor.experienceYears ?? 0}{" "}
                    years and {tutor.experienceMonths ?? 0} months
                  </p>
                  <p className={viewProfileStyles.detailText}>
                    <strong className={viewProfileStyles.strongText}>Preferred Locations: </strong>
                    {tutor.area}, {tutor.city}
                  </p>
                </div>
                <div>
                  <h3 className={viewProfileStyles.sectionTitle}>Skills</h3>
                  <p className={viewProfileStyles.detailText}>
                    {tutor.skillsDescription}
                  </p>
                </div>
              </div>

              <hr className={viewProfileStyles.divider} />

              {/* Classes and Subjects Section */}
              <div className={viewProfileStyles.classesSection}>
                <h3 className={viewProfileStyles.classesTitle}>
                  Classes and Subjects
                </h3>
                <div className={viewProfileStyles.classesGrid}>
                  {classKeys.length === 0 ? (
                    <div className={viewProfileStyles.noClassesText}>No classes listed.</div>
                  ) : (
                    classKeys.map((grade) => (
                      <div
                        key={grade}
                        className={viewProfileStyles.classCard}
                      >
                        <h4 className={viewProfileStyles.classGrade}>
                          Class {grade}
                        </h4>
                        <p className={viewProfileStyles.classSubjects}>
                          Subjects:{" "}
                          {(tutor.classSubjects[grade] || []).join(", ")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewProfile;