// src/pages/SearchHomeTutor/SearchHomeTutor.jsx
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import axios from "axios";
import { searchHomeTutorStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";
const tutorsPerPage = 10;

const makeAvatar = (name = "U", w = 200, h = 240) => {
  const initials = (name || "U")
    .split(" ")
    .map((s) => s[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg = ["#fde68a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#dbeafe"][
    Math.floor(Math.random() * 5)
  ];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='${bg}' rx='20' ry='20'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='48' fill='#0f172a'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const buildExperienceParam = (expLabel) => {
  if (!expLabel) return "";
  if (expLabel.includes("+")) {
    const num = expLabel.match(/\d+/);
    return num ? `${num[0]}-100` : "";
  }
  const nums = expLabel.match(/\d+/g);
  if (!nums) return "";
  return nums.length === 1 ? nums[0] : `${nums[0]}-${nums[1]}`;
};

const classSubjectsToMap = (cs) => {
  const map = {};
  if (!cs) return map;
  const add = (grade, subj) => {
    const g = grade || "General";
    map[g] = map[g] || [];
    if (Array.isArray(subj))
      subj.forEach((s) => s != null && map[g].push(String(s)));
    else if (subj != null) map[g].push(String(subj));
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
      const grade = item.class || item.grade || item.className || item.level;
      if (grade) {
        if (Array.isArray(item.subjects)) add(grade, item.subjects);
        else if (Array.isArray(item.subject)) add(grade, item.subject);
        else if (item.subject) add(grade, item.subject);
        else
          Object.entries(item).forEach(([k, v]) => {
            if (k) add(k, v);
          });
      } else {
        Object.entries(item).forEach(([k, v]) => {
          if (k) add(k, v);
        });
      }
    } else {
      add("General", String(item));
    }
  };

  handle(cs);
  return map;
};

const profileSrc = (pic) => {
  if (!pic) return null;
  if (typeof pic !== "string") return null;
  if (
    pic.startsWith("http://") ||
    pic.startsWith("https://") ||
    pic.startsWith("data:")
  )
    return pic;
  if (pic.startsWith("/")) return `${API_BASE}${pic}`;
  return pic;
};

const SearchHomeTutor = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: "",
    area: "",
    class: "",
    subject: "",
    gender: "",
    experience: "",
  });
  const [tutorData, setTutorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTutors, setTotalTutors] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTutors = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = { page, limit: tutorsPerPage };
        if (filters.city) params.city = filters.city;
        if (filters.area) params.area = filters.area;
        if (filters.class) params.class = filters.class;
        if (filters.subject) params.subject = filters.subject;
        if (filters.gender) params.gender = filters.gender;
        const expParam = buildExperienceParam(filters.experience);
        if (expParam) params.experience = expParam;

        const resp = await axios.get(`${API_BASE}/api/tutors`, { params });

        if (resp?.data?.success) {
          const tutors = resp.data.tutors || [];
          const shaped = tutors.map((t) => {
            const s = { ...t };
            s.profilePicture = s.profilePicture
              ? profileSrc(s.profilePicture) || makeAvatar(s.name || s.uid)
              : makeAvatar(s.name || s.uid);
            s.classSubjects = classSubjectsToMap(s.classSubjects || []);
            return s;
          });
          setTutorData(shaped);
          const total =
            typeof resp.data.total === "number"
              ? resp.data.total
              : resp.data.totalCount || tutors.length;
          setTotalTutors(total);
          setTotalPages(Math.max(1, Math.ceil(total / tutorsPerPage)));
          setCurrentPage(Number(resp.data.page || page));
        } else {
          setTutorData([]);
          setTotalTutors(0);
          setTotalPages(1);
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || "Failed to load tutors"
        );
        setTutorData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchTutors(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load once

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      area: "",
      class: "",
      subject: "",
      gender: "",
      experience: "",
    });
    setCurrentPage(1);
    fetchTutors(1);
  };

  const handleSearchClick = async () => {
    await fetchTutors(1);
  };

  const handlePageChange = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
    fetchTutors(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className={searchHomeTutorStyles.mainContainer}>
        <div className={searchHomeTutorStyles.layoutContainer}>
          <div className={searchHomeTutorStyles.filterSidebar}>
            <div className={searchHomeTutorStyles.filterHeaderContainer}>
              <h2 className={searchHomeTutorStyles.filterHeader}>
                Refine Search
              </h2>
              <CiFilter style={{ fontSize: searchHomeTutorStyles.filterIcon }} />
            </div>

            <div className={searchHomeTutorStyles.filterForm}>
              <div>
                <label className={searchHomeTutorStyles.filterLabel}>
                  Select City
                </label>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className={searchHomeTutorStyles.filterSelect}
                >
                  <option value="">Select City</option>
                  {[...new Set(tutorData.map((t) => t.city || ""))].map(
                    (city) =>
                      city && (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div>
                <label className={searchHomeTutorStyles.filterLabel}>
                  Select Area
                </label>
                <select
                  name="area"
                  value={filters.area}
                  onChange={handleFilterChange}
                  className={searchHomeTutorStyles.filterSelect}
                >
                  <option value="">Select Area</option>
                  {[...new Set(tutorData.map((t) => t.area || ""))].map(
                    (area) =>
                      area && (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div>
                <label className={searchHomeTutorStyles.filterLabel}>
                  Select Class
                </label>
                <select
                  name="class"
                  value={filters.class}
                  onChange={handleFilterChange}
                  className={searchHomeTutorStyles.filterSelect}
                >
                  <option value="">Select Class</option>
                  {[
                    ...new Set(
                      tutorData.flatMap((t) =>
                        Object.keys(t.classSubjects || {})
                      )
                    ),
                  ]
                    .filter(Boolean)
                    .map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className={searchHomeTutorStyles.filterLabel}>
                  Select Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  placeholder="Enter subject"
                  className={searchHomeTutorStyles.filterInput}
                />
              </div>

              <div>
                <h4 className={searchHomeTutorStyles.genderSection}>
                  Gender
                </h4>
                <div className={searchHomeTutorStyles.genderContainer}>
                  <label
                    className={`${searchHomeTutorStyles.genderLabel} ${
                      filters.gender === "Male"
                        ? searchHomeTutorStyles.genderLabelActive
                        : searchHomeTutorStyles.genderLabelInactive
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={filters.gender === "Male"}
                      onChange={handleFilterChange}
                      className={searchHomeTutorStyles.genderRadio}
                    />
                    <span className={searchHomeTutorStyles.genderText}>
                      male
                    </span>
                  </label>
                  <label
                    className={`${searchHomeTutorStyles.genderLabel} ${
                      filters.gender === "Female"
                        ? searchHomeTutorStyles.genderLabelActive
                        : searchHomeTutorStyles.genderLabelInactive
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={filters.gender === "Female"}
                      onChange={handleFilterChange}
                      className={searchHomeTutorStyles.genderRadio}
                    />
                    <span className={searchHomeTutorStyles.genderText}>
                      female
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className={searchHomeTutorStyles.filterLabel}>
                  Select Experience
                </label>
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                  className={searchHomeTutorStyles.filterSelect}
                >
                  <option value="">Select Experience</option>
                  {["1-2 years", "3-5 years", "6-10 years", "10+ years"].map(
                    (exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className={searchHomeTutorStyles.filterButtonsContainer}>
              <button
                onClick={handleSearchClick}
                className={searchHomeTutorStyles.searchButton}
              >
                Search
              </button>
              <button
                onClick={clearFilters}
                className={searchHomeTutorStyles.clearButton}
              >
                Clear
              </button>
            </div>
          </div>

          <div className={searchHomeTutorStyles.mainContent}>
            <h2 className={searchHomeTutorStyles.mainHeading}>Available Tutors</h2>

            {isLoading && (
              <div className={searchHomeTutorStyles.loadingText}>
                Loading tutors…
              </div>
            )}
            {error && (
              <div className={searchHomeTutorStyles.errorText}>{error}</div>
            )}

            <div className={searchHomeTutorStyles.tutorCardsContainer}>
              {!isLoading && tutorData.length === 0 ? (
                <div className={searchHomeTutorStyles.noResultsText}>
                  No tutors found for the selected filters.
                </div>
              ) : (
                tutorData.map((tutor) => {
                  const classes = Object.keys(tutor.classSubjects || {});
                  const subjects = Object.values(tutor.classSubjects || {})
                    .flat()
                    .map((s) =>
                      s && typeof s === "object" ? JSON.stringify(s) : String(s)
                    )
                    .filter(Boolean);
                  return (
                    <div
                      key={tutor._id || tutor.uid}
                      className={searchHomeTutorStyles.tutorCard}
                    >
                      <img
                        src={
                          tutor.profilePicture ||
                          makeAvatar(tutor.name || tutor.uid)
                        }
                        alt={`${tutor.name || tutor.uid}'s profile`}
                        className={searchHomeTutorStyles.tutorImage}
                      />
                      <div className={searchHomeTutorStyles.tutorInfo}>
                        <h3 className={searchHomeTutorStyles.tutorName}>
                          {tutor.name || tutor.uid}
                        </h3>
                        <p className={searchHomeTutorStyles.tutorDetail}>
                          <strong>City:</strong> {tutor.city}
                        </p>
                        <p className={searchHomeTutorStyles.tutorDetail}>
                          <strong>Area:</strong> {tutor.area}
                        </p>
                        <p className={searchHomeTutorStyles.tutorDetail}>
                          <strong>Classes:</strong>{" "}
                          {classes.length ? classes.join(", ") : ""}
                        </p>
                        <p className={searchHomeTutorStyles.tutorDetail}>
                          <strong>Subjects:</strong>{" "}
                          {subjects.length ? subjects.join(", ") : ""}
                        </p>
                        <p className={searchHomeTutorStyles.tutorDetail}>
                          <strong>Experience:</strong>{" "}
                          {tutor.experienceYears || tutor.experience || 0} years
                        </p>
                        <p className={searchHomeTutorStyles.tutorBoldDetail}>
                          {tutor.selfDescription}
                        </p>

                        <button
                          onClick={() => navigate(`/search-tutor/${tutor.uid}`)}
                          className={searchHomeTutorStyles.viewProfileButton}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {totalPages > 1 && (
              <div className={searchHomeTutorStyles.paginationContainer}>
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className={`${searchHomeTutorStyles.paginationPreviousNext} ${searchHomeTutorStyles.paginationDisabled}`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`${searchHomeTutorStyles.paginationButton} ${
                      index + 1 === currentPage
                        ? searchHomeTutorStyles.paginationPageActive
                        : searchHomeTutorStyles.paginationPageInactive
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`${searchHomeTutorStyles.paginationPreviousNext} ${searchHomeTutorStyles.paginationDisabled}`}
                >
                  Next
                </button>
              </div>
            )}

            <div className={searchHomeTutorStyles.pageInfo}>
              Showing page {currentPage} of {totalPages} — {totalTutors} tutors
              total
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchHomeTutor;