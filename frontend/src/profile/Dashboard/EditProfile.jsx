// EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNavbar";
import { FiSearch } from "react-icons/fi";
import { editProfileStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";

const EditProfile = () => {
  const navigate = useNavigate();
  const params = useParams(); // optional :id route param fallback
  const routeUid = params?.id;

  const [activeTab, setActiveTab] = useState("personal-info"); // State to manage active tab
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Consolidated state for all forms
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      experienceYears: "",
      experienceMonths: "",
      collegeName: "",
      homeAddress: "",
      graduationYear: "",
      major: "",
      selfDescription: "",
      skillsDescription: "",
      videoUrl: "", // <-- added default
    },
    tuitionPreference: {
      location: { city: "", area: "" },
    },
    subjectPreference: {
      classSubjects: {},
    },
    changePassword: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    uploadDocuments: {
      profilePicture: null,
      idCardPicture: null,
    },
  });

  // Updated cities with more options
  const cities = [
    "Lucknow",
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Pune",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Jaipur",
  ];

  const cityAreas = {
    Lucknow: [
      "Aliganj",
      "Gomti Nagar",
      "Indira Nagar",
      "Rajajipuram",
      "Hazratganj",
      "Chowk",
      "Aminabad",
    ],
    Delhi: [
      "Connaught Place",
      "Karol Bagh",
      "Saket",
      "Dwarka",
      "Rohini",
      "Pitampura",
      "Laxmi Nagar",
    ],
    Mumbai: [
      "Andheri",
      "Bandra",
      "Colaba",
      "Dadar",
      "Juhu",
      "Powai",
      "Borivali",
    ],
    Kolkata: [
      "Park Street",
      "Salt Lake",
      "Howrah",
      "New Town",
      "Ballygunge",
      "Dum Dum",
    ],
    Chennai: [
      "T. Nagar",
      "Anna Nagar",
      "Adyar",
      "Velachery",
      "Chrompet",
      "Porur",
    ],
    Pune: [
      "Koregaon Park",
      "Hinjewadi",
      "Kothrud",
      "Baner",
      "Aundh",
      "Viman Nagar",
    ],
    Bangalore: [
      "Indiranagar",
      "Koramangala",
      "Whitefield",
      "Electronic City",
      "Jayanagar",
      "HSR Layout",
    ],
    Hyderabad: [
      "Banjara Hills",
      "Jubilee Hills",
      "Gachibowli",
      "Hitech City",
      "Secunderabad",
      "Kukatpally",
    ],
    Ahmedabad: [
      "Navrangpura",
      "Satellite",
      "Maninagar",
      "Vastrapur",
      "Bodakdev",
      "Prajapati Nagar",
    ],
    Jaipur: [
      "Malviya Nagar",
      "Vaishali Nagar",
      "C-Scheme",
      "Raja Park",
      "Bani Park",
      "Tonk Road",
    ],
  };

  const classOptions = [
    { name: "Nursery", subjects: ["Drawing", "Rhymes", "Basic Concepts"] },
    { name: "1st", subjects: ["Math", "English", "EVS", "Drawing"] },
    { name: "2nd", subjects: ["Math", "English", "EVS", "Drawing"] },
    { name: "3rd", subjects: ["Math", "English", "EVS", "Science", "Drawing"] },
    {
      name: "4th",
      subjects: [
        "Math",
        "English",
        "EVS",
        "Science",
        "Social Studies",
        "Drawing",
      ],
    },
    {
      name: "5th",
      subjects: [
        "Math",
        "English",
        "EVS",
        "Science",
        "Social Studies",
        "Drawing",
      ],
    },
    {
      name: "6th",
      subjects: [
        "Math",
        "English",
        "Science",
        "Social Studies",
        "History",
        "Geography",
        "Drawing",
      ],
    },
    {
      name: "7th",
      subjects: [
        "Math",
        "English",
        "Science",
        "Social Studies",
        "History",
        "Geography",
        "Drawing",
      ],
    },
    {
      name: "8th",
      subjects: [
        "Math",
        "English",
        "Science",
        "Social Studies",
        "History",
        "Geography",
        "Drawing",
      ],
    },
    {
      name: "9th",
      subjects: [
        "Math",
        "English",
        "Science",
        "Social Studies",
        "History",
        "Geography",
        "Physics",
        "Chemistry",
        "Biology",
      ],
    },
    {
      name: "10th",
      subjects: [
        "Math",
        "English",
        "Science",
        "Social Studies",
        "History",
        "Geography",
        "Physics",
        "Chemistry",
        "Biology",
      ],
    },
    {
      name: "11th",
      subjects: [
        "Math",
        "English",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "Economics",
      ],
    },
    {
      name: "12th",
      subjects: [
        "Math",
        "English",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "Economics",
      ],
    },
  ];

  const [citySearch, setCitySearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classSubjects, setClassSubjects] = useState({});

  const getFilteredAreas = () => {
    if (!formData.tuitionPreference.location.city) return [];
    return cityAreas[formData.tuitionPreference.location.city] || [];
  };

  const idToUse = routeUid || localStorage.getItem("uid");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login-tutor");
      return;
    }
    if (!idToUse) {
      console.error("No uid found in route or localStorage");
      navigate("/login-tutor");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/tutors/${idToUse}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data || !res.data.success || !res.data.tutor) {
          throw new Error("Invalid response");
        }

        const t = res.data.tutor;

        // Map backend tutor into our formData structure
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            name: t.name || "",
            email: t.email || "",
            phone: t.phone || "",
            gender: t.gender || "",
            experienceYears:
              t.experienceYears !== undefined ? String(t.experienceYears) : "",
            experienceMonths:
              t.experienceMonths !== undefined
                ? String(t.experienceMonths)
                : "",
            collegeName: t.collegeName || "",
            homeAddress: t.homeAddress || "",
            graduationYear: t.graduationYear ? String(t.graduationYear) : "",
            major: t.major || "",
            selfDescription: t.selfDescription || "",
            skillsDescription: t.skillsDescription || "",
            // Use server videoLink to populate videoUrl used in the UI
            videoUrl: t.videoLink || "",
          },
          tuitionPreference: {
            location: { city: t.city || "", area: t.area || "" },
          },
          subjectPreference: {
            classSubjects:
              t.classSubjects && typeof t.classSubjects === "object"
                ? Array.isArray(t.classSubjects)
                  ? Object.fromEntries(t.classSubjects)
                  : t.classSubjects
                : {},
          },
          uploadDocuments: {
            profilePicture: null,
            idCardPicture: null,
          },
        }));

        const cs =
          t.classSubjects && typeof t.classSubjects === "object"
            ? Array.isArray(t.classSubjects)
              ? Object.fromEntries(t.classSubjects)
              : t.classSubjects
            : {};
        setClassSubjects(cs);
        setSelectedClasses(Object.keys(cs || []));
      } catch (err) {
        console.error("Error fetching profile:", err);
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("uid");
          navigate("/login-tutor");
        } else if (status === 404) {
          alert("Profile not found");
          navigate("/");
        } else {
          alert("Failed to load profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToUse, navigate]);

  const handleClassClick = (cls) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
    setClassSubjects((prev) => {
      if (prev[cls]) {
        const { [cls]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [cls]: [] };
    });
  };

  const handleSubjectClick = (cls, subject) => {
    setClassSubjects((prev) => {
      const currentSubjects = prev[cls] || [];
      return {
        ...prev,
        [cls]: currentSubjects.includes(subject)
          ? currentSubjects.filter((sub) => sub !== subject)
          : [...currentSubjects, subject],
      };
    });
  };

  const handlePersonalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleFileChange = (fileField, file) => {
    setFormData((prev) => ({
      ...prev,
      uploadDocuments: {
        ...prev.uploadDocuments,
        [fileField]: file,
      },
    }));
  };

  // Save handler that sends data to backend. Section is one of: personalInfo, tuitionPreference, subjectPreference
  const handleSubmit = async (e, section) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login-tutor");
      return;
    }

    if (!idToUse) {
      alert("No profile id available.");
      return;
    }

    try {
      // Build payload depending on section
      let payload = {};
      let useFormData = false;
      const allowedPersonal = [
        "name",
        "email",
        "phone",
        "gender",
        "experienceYears",
        "experienceMonths",
        "collegeName",
        "homeAddress",
        "graduationYear",
        "major",
        "selfDescription",
        "skillsDescription",
        // note: we will send videoLink explicitly below (from videoUrl)
      ];

      if (section === "personalInfo") {
        // copy only allowed personal fields
        for (const k of allowedPersonal) {
          const v = formData.personalInfo[k];
          if (v !== undefined) payload[k] = v;
        }
        // map UI field videoUrl to backend videoLink
        if (formData.personalInfo.videoUrl !== undefined) {
          // allow empty string to clear on backend
          payload.videoLink = formData.personalInfo.videoUrl;
        }
      } else if (section === "tuitionPreference") {
        payload.city = formData.tuitionPreference.location.city;
        payload.area = formData.tuitionPreference.location.area;
      } else if (section === "subjectPreference") {
        payload.classSubjects = classSubjects;
      }

      // If profile picture file chosen, use multipart FormData
      if (
        formData.uploadDocuments.profilePicture instanceof File ||
        formData.uploadDocuments.idCardPicture instanceof File
      ) {
        useFormData = true;
        const fd = new FormData();
        // append JSON fields
        Object.keys(payload).forEach((k) => {
          if (k === "classSubjects") fd.append(k, JSON.stringify(payload[k]));
          else fd.append(k, payload[k]);
        });

        const pf = formData.uploadDocuments.profilePicture;
        if (pf instanceof File) fd.append("profilePicture", pf);

        const idf = formData.uploadDocuments.idCardPicture;
        if (idf instanceof File) fd.append("idCardPicture", idf);

        payload = fd;
      } else if (section === "subjectPreference") {
        // ensure classSubjects sent as JSON string if backend expects that
        payload.classSubjects = payload.classSubjects || {};
      }

      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (useFormData) {
        headers["Content-Type"] = "multipart/form-data";
      }

      const res = await axios.put(
        `${API_BASE}/api/tutors/${idToUse}`,
        payload,
        {
          headers,
        }
      );

      if (res.data && res.data.success) {
        const updated = res.data.tutor;
        // update formData with latest server values (so UI stays consistent)
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            name: updated.name || prev.personalInfo.name,
            email: updated.email || prev.personalInfo.email,
            phone: updated.phone || prev.personalInfo.phone,
            gender: updated.gender || prev.personalInfo.gender,
            experienceYears:
              updated.experienceYears !== undefined
                ? String(updated.experienceYears)
                : prev.personalInfo.experienceYears,
            experienceMonths:
              updated.experienceMonths !== undefined
                ? String(updated.experienceMonths)
                : prev.personalInfo.experienceMonths,
            collegeName: updated.collegeName || prev.personalInfo.collegeName,
            homeAddress: updated.homeAddress || prev.personalInfo.homeAddress,
            graduationYear: updated.graduationYear
              ? String(updated.graduationYear)
              : prev.personalInfo.graduationYear,
            major: updated.major || prev.personalInfo.major,
            selfDescription:
              updated.selfDescription || prev.personalInfo.selfDescription,
            skillsDescription:
              updated.skillsDescription || prev.personalInfo.skillsDescription,
            // map backend videoLink back to UI videoUrl field
            videoUrl:
              updated.videoLink !== undefined
                ? updated.videoLink
                : prev.personalInfo.videoUrl,
          },
          tuitionPreference: {
            location: {
              city: updated.city || prev.tuitionPreference.location.city,
              area: updated.area || prev.tuitionPreference.location.area,
            },
          },
          subjectPreference: {
            classSubjects: updated.classSubjects
              ? Array.isArray(updated.classSubjects)
                ? Object.fromEntries(updated.classSubjects)
                : updated.classSubjects
              : prev.subjectPreference.classSubjects,
          },
        }));

        // Keep classSubjects + selectedClasses in sync
        const cs =
          (res.data.tutor && res.data.tutor.classSubjects) || classSubjects;
        setClassSubjects(
          typeof cs === "object"
            ? Array.isArray(cs)
              ? Object.fromEntries(cs)
              : cs
            : {}
        );
        setSelectedClasses(
          Object.keys(
            typeof cs === "object"
              ? Array.isArray(cs)
                ? Object.fromEntries(cs)
                : cs
              : {}
          )
        );

        alert("Changes saved successfully");
      } else {
        console.error("Unexpected response:", res.data);
        alert("Failed to save changes");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("uid");
        navigate("/login-tutor");
      } else {
        alert(err?.response?.data?.message || "Server error while saving");
      }
    } finally {
      setLoading(false);
    }
  };

  const onProfileFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    handleFileChange("profilePicture", f || null);
  };

  if (loading) {
    return (
      <div className={editProfileStyles.mainContainer}>
        <h1 className={editProfileStyles.loadingContainer}>
          Edit Profile
        </h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className={editProfileStyles.mainContainer}>
        <h1 className={editProfileStyles.mainHeading}>
          Edit Profile
        </h1>

        {/* Sub-navbar (made horizontally scrollable on small screens) */}
        <div className={editProfileStyles.subNavbar}>
          {["tuition-preference", "subject-preference", "personal-info"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${editProfileStyles.subNavbarButton} ${
                  activeTab === tab
                    ? editProfileStyles.subNavbarButtonActive
                    : editProfileStyles.subNavbarButtonInactive
                }`}
              >
                {tab
                  .replace("-", " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </button>
            )
          )}
        </div>

        {/* Dynamic Form Rendering */}
        {activeTab === "personal-info" && (
          <form
            className={editProfileStyles.formContainer}
            onSubmit={(e) => handleSubmit(e, "personalInfo")}
          >
            <h2 className={editProfileStyles.formHeading}>
              Personal Information
            </h2>

            {/* Form Fields */}
            <div className={editProfileStyles.formGrid}>
              <div>
                <label className={editProfileStyles.formLabel}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.personalInfo.name}
                  onChange={(e) => handlePersonalChange("name", e.target.value)}
                  className={editProfileStyles.formInput}
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <label className={editProfileStyles.formLabel}>
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.personalInfo.gender}
                  onChange={(e) =>
                    handlePersonalChange("gender", e.target.value)
                  }
                  className={editProfileStyles.formSelect}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className={editProfileStyles.formLabel}>
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handlePersonalChange("phone", e.target.value.slice(0, 10))
                  }
                  className={editProfileStyles.formInput}
                  placeholder="Phone"
                  required
                />
              </div>
              <div>
                <label className={editProfileStyles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handlePersonalChange("email", e.target.value)
                  }
                  className={editProfileStyles.formInput}
                  placeholder="Email"
                  required
                />
              </div>
              <div className={editProfileStyles.formFullWidth}>
                <label className={editProfileStyles.formLabel}>
                  Home Address
                </label>
                <textarea
                  name="homeAddress"
                  value={formData.personalInfo.homeAddress}
                  onChange={(e) =>
                    handlePersonalChange("homeAddress", e.target.value)
                  }
                  className={editProfileStyles.textarea}
                  placeholder="Home Address"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <hr className={editProfileStyles.divider} />

            <h2 className={editProfileStyles.formHeading}>
              Tutoring Information
            </h2>

            <div className={editProfileStyles.formGrid}>
              <div>
                <label className={editProfileStyles.formLabel}>
                  Total Teaching Experience (Years and Months)
                </label>
                <div className={editProfileStyles.experienceGrid}>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="Years"
                    value={formData.personalInfo.experienceYears}
                    onChange={(e) =>
                      handlePersonalChange("experienceYears", e.target.value)
                    }
                    className={editProfileStyles.formInput}
                  />
                  <input
                    type="number"
                    min="0"
                    max="11"
                    placeholder="Months"
                    value={formData.personalInfo.experienceMonths}
                    onChange={(e) =>
                      handlePersonalChange("experienceMonths", e.target.value)
                    }
                    className={editProfileStyles.formInput}
                  />
                </div>
              </div>

              <div>
                <label className={editProfileStyles.formLabel}>
                  Define yourself in one sentence
                </label>
                <input
                  type="text"
                  placeholder="Describe yourself briefly"
                  value={formData.personalInfo.selfDescription}
                  onChange={(e) =>
                    handlePersonalChange("selfDescription", e.target.value)
                  }
                  className={editProfileStyles.formInput}
                />
              </div>
              <div className={editProfileStyles.formFullWidth}>
                <label className={editProfileStyles.formLabel}>
                  Define your skills and experience*
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your skills and experience"
                  value={formData.personalInfo.skillsDescription}
                  onChange={(e) =>
                    handlePersonalChange("skillsDescription", e.target.value)
                  }
                  className={editProfileStyles.textarea}
                ></textarea>
              </div>

              {/* YouTube / Google Drive URL input + preview */}
              <div className={editProfileStyles.formFullWidth}>
                <label className={editProfileStyles.formLabel}>
                  YouTube or Google Drive URL (optional)
                </label>

                <input
                  type="url"
                  inputMode="url"
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://drive.google.com/file/d/FILE_ID/view"
                  value={formData.personalInfo.videoUrl || ""}
                  onChange={(e) =>
                    handlePersonalChange("videoUrl", e.target.value)
                  }
                  className={editProfileStyles.formInput}
                  aria-describedby="video-url-help video-url-error"
                />

                {/* Validation + Preview */}
                {(() => {
                  const url = formData.personalInfo.videoUrl || "";
                  const isYouTube =
                    /(?:youtube\.com\/watch\?v=|youtu\.be\/)/i.test(url);
                  const ytMatch = url.match(
                    /(?:v=|\/)([0-9A-Za-z_-]{11})(?:[&?#]|$)/
                  ); // captures 11-char YouTube ID
                  const isDrive =
                    (/drive\.google\.com/i.test(url) &&
                      /\/file\/d\/([a-zA-Z0-9_-]+)/i.test(url)) ||
                    /drive\.google\.com\/open\?id=/i.test(url);

                  if (!url) return null;

                  if (isYouTube && ytMatch && ytMatch[1]) {
                    const embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
                    return (
                      <div className={editProfileStyles.videoPreviewContainer}>
                        <div className={editProfileStyles.videoPreviewLabel}>
                          YouTube preview
                        </div>
                        <div className={editProfileStyles.videoPreviewFrame}>
                          <iframe
                            title="YouTube preview"
                            src={embedUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={editProfileStyles.videoPreviewIframe}
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
                        <div className={editProfileStyles.videoPreviewContainer}>
                          <div className={editProfileStyles.videoPreviewLabel}>
                            Drive preview
                          </div>
                          <div className={editProfileStyles.videoPreviewFrame}>
                            <iframe
                              title="Google Drive preview"
                              src={previewUrl}
                              allow="autoplay"
                              className={editProfileStyles.videoPreviewIframe}
                            />
                          </div>
                          <p className={editProfileStyles.videoPreviewNote}>
                            If the file is not public, Drive will block the
                            preview. Make sure sharing is set to "Anyone with
                            the link" (Viewer).
                          </p>
                        </div>
                      );
                    }
                  }

                  return (
                    <p
                      id="video-url-error"
                      className={editProfileStyles.videoPreviewError}
                    >
                      Unable to preview this URL. Provide a standard YouTube
                      link (youtube.com/watch or youtu.be) or a Google Drive
                      file link (drive.google.com/file/d/FILE_ID or
                      drive.google.com/open?id=FILE_ID).
                    </p>
                  );
                })()}
              </div>
            </div>

            <hr className={editProfileStyles.divider} />

            <h2 className={editProfileStyles.formHeading}>
              Educational Information
            </h2>

            <div className={editProfileStyles.formGrid}>
              <div>
                <label className={editProfileStyles.formLabel}>
                  Your College Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter college name"
                  value={formData.personalInfo.collegeName}
                  onChange={(e) =>
                    handlePersonalChange("collegeName", e.target.value)
                  }
                  className={editProfileStyles.formInput}
                />
              </div>

              <div>
                <label className={editProfileStyles.formLabel}>
                  Graduation Completed in Year*
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2020"
                  value={formData.personalInfo.graduationYear}
                  onChange={(e) =>
                    handlePersonalChange(
                      "graduationYear",
                      e.target.value.slice(0, 4)
                    )
                  }
                  className={editProfileStyles.formInput}
                />
              </div>

              <div>
                <label className={editProfileStyles.formLabel}>
                  Major At*
                </label>
                <input
                  type="text"
                  placeholder="e.g., Computer Science"
                  value={formData.personalInfo.major}
                  onChange={(e) =>
                    handlePersonalChange("major", e.target.value)
                  }
                  className={editProfileStyles.formInput}
                />
              </div>
            </div>

            <hr className={editProfileStyles.divider} />

            {/* Profile Picture file input */}
            <div className="mt-4">
              <label className={editProfileStyles.formLabel}>
                Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onProfileFileChange}
                className={editProfileStyles.fileInput}
              />
            </div>

            <div className={editProfileStyles.buttonContainer}>
              <button
                type="submit"
                className={editProfileStyles.submitButton}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === "tuition-preference" && (
          <form
            className={editProfileStyles.formContainer}
            onSubmit={(e) => handleSubmit(e, "tuitionPreference")}
          >
            <h2 className={editProfileStyles.formHeading}>
              Tuition Preference
            </h2>

            {/* Form Fields */}
            <div className={editProfileStyles.formGrid}>
              <div>
                <label className={editProfileStyles.formLabel}>
                  Select City
                </label>
                <div className={editProfileStyles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search City"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className={editProfileStyles.searchInput}
                  />
                  <FiSearch className={editProfileStyles.searchIcon} />
                  <div className={editProfileStyles.dropdownContainer}>
                    {cities
                      .filter((c) =>
                        c.toLowerCase().includes(citySearch.toLowerCase())
                      )
                      .map((c) => (
                        <div
                          key={c}
                          className={`${editProfileStyles.dropdownItem} ${
                            formData.tuitionPreference.location.city === c
                              ? "bg-emerald-200"
                              : ""
                          }`}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              tuitionPreference: {
                                ...prev.tuitionPreference,
                                location: {
                                  ...prev.tuitionPreference.location,
                                  city: c,
                                  area: "",
                                },
                              },
                            }));
                            setAreaSearch("");
                          }}
                        >
                          {c}
                        </div>
                      ))}
                  </div>
                </div>
                {formData.tuitionPreference.location.city && (
                  <div className={editProfileStyles.selectedItem}>
                    Selected City: {formData.tuitionPreference.location.city}
                  </div>
                )}
              </div>

              <div>
                <label className={editProfileStyles.formLabel}>
                  Select Area
                </label>
                <div className={editProfileStyles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search Area"
                    value={areaSearch}
                    onChange={(e) => setAreaSearch(e.target.value)}
                    className={editProfileStyles.searchInput}
                    disabled={!formData.tuitionPreference.location.city}
                  />
                  <FiSearch className={editProfileStyles.searchIcon} />
                  <div className={editProfileStyles.dropdownContainer}>
                    {getFilteredAreas()
                      .filter((a) =>
                        a.toLowerCase().includes(areaSearch.toLowerCase())
                      )
                      .map((a) => (
                        <div
                          key={a}
                          className={`${editProfileStyles.dropdownItem} ${
                            formData.tuitionPreference.location.area === a
                              ? "bg-emerald-200"
                              : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              tuitionPreference: {
                                ...prev.tuitionPreference,
                                location: {
                                  ...prev.tuitionPreference.location,
                                  area: a,
                                },
                              },
                            }))
                          }
                        >
                          {a}
                        </div>
                      ))}
                  </div>
                </div>
                {formData.tuitionPreference.location.area && (
                  <div className={editProfileStyles.selectedItem}>
                    Selected Area: {formData.tuitionPreference.location.area}
                  </div>
                )}
              </div>
            </div>

            <div className={editProfileStyles.buttonContainer}>
              <button
                type="submit"
                className={editProfileStyles.submitButton}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === "subject-preference" && (
          <form
            className={editProfileStyles.formContainer}
            onSubmit={(e) => handleSubmit(e, "subjectPreference")}
          >
            <h2 className={editProfileStyles.formHeading}>
              Subject Preference
            </h2>

            {/* Form Fields */}
            <div className={editProfileStyles.classSection}>
              <h3 className={editProfileStyles.formLabel}>
                Select Classes
              </h3>
              <div className={editProfileStyles.classGrid}>
                {classOptions.map((cls) => (
                  <button
                    key={cls.name}
                    type="button"
                    onClick={() => handleClassClick(cls.name)}
                    className={`${editProfileStyles.classSubjectButton} ${
                      selectedClasses.includes(cls.name)
                        ? editProfileStyles.classSubjectButtonActive
                        : editProfileStyles.classSubjectButtonInactive
                    }`}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
              {selectedClasses.map((cls) => (
                <div key={cls} className="mb-4">
                  <h4 className={editProfileStyles.formLabel}>
                    Select Subjects for {cls}:
                  </h4>
                  <div className={editProfileStyles.subjectGrid}>
                    {classOptions
                      .find((option) => option.name === cls)
                      ?.subjects.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => handleSubjectClick(cls, subject)}
                          className={`${editProfileStyles.classSubjectButton} ${
                            classSubjects[cls]?.includes(subject)
                              ? editProfileStyles.classSubjectButtonActive
                              : editProfileStyles.classSubjectButtonInactive
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={editProfileStyles.buttonContainer}>
              <button
                type="submit"
                className={editProfileStyles.submitButton}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProfile;