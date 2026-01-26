import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import Lottie from "lottie-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import lottieFile from "../../assets/animate.json";
import tickAnimation from "../../assets/tick.json";
import { fullRegistrationStyles, loaderStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";
const CREATE_SESSION_URL = `${API_BASE}/api/tutors/create-registration-session`;
const CONFIRM_PAYMENT_URL = `${API_BASE}/api/tutors/confirm-payment`;
const REG_FEE = 1500;

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
  Mumbai: ["Andheri", "Bandra", "Colaba", "Dadar", "Juhu", "Powai", "Borivali"],
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

const FullRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classSubjects, setClassSubjects] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [successUid, setSuccessUid] = useState(null);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    agree: false,
    city: "",
    area: "",
    profilePicture: null,
    videoLink: "",
    gender: "",
    experienceYears: "",
    experienceMonths: "",
    collegeName: "",
    homeAddress: "",
    graduationYear: "",
    major: "",
    selfDescription: "",
    skillsDescription: "",
  });

  // If Stripe redirects with a session id, confirm payment
  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const session_id =
      qs.get("session_id") ||
      qs.get("sessionId") ||
      qs.get("checkout_session_id");
    if (session_id) {
      setStep(4);
      confirmRegistrationPayment(session_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // after thank-you show, redirect to login
  useEffect(() => {
    if (!showThankYouPopup) return;
    const t = setTimeout(() => navigate("/login-tutor"), 3000);
    return () => clearTimeout(t);
  }, [showThankYouPopup, navigate]);

  const getFilteredAreas = () =>
    formData.city ? cityAreas[formData.city] || [] : [];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((p) => ({ ...p, profilePicture: files?.[0] ?? null }));
      return;
    }
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleClass = (cls) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
    setClassSubjects((prev) =>
      prev[cls]
        ? (({ [cls]: _, ...rest }) => rest)(prev)
        : { ...prev, [cls]: [] }
    );
  };

  const toggleSubject = (cls, subject) =>
    setClassSubjects((prev) => {
      const list = prev[cls] || [];
      return {
        ...prev,
        [cls]: list.includes(subject)
          ? list.filter((s) => s !== subject)
          : [...list, subject],
      };
    });

  const persistRegistration = (reg) => {
    try {
      const raw = localStorage.getItem("dummyRegistrations");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(reg);
      localStorage.setItem("dummyRegistrations", JSON.stringify(arr));
    } catch (e) {
      console.error("persistRegistration:", e);
    }
  };

  const buildFormData = () => {
    const fd = new FormData();
    Object.entries({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      city: formData.city,
      area: formData.area,
      address: formData.address,
      homeAddress: formData.homeAddress,
      videoLink: formData.videoLink,
      gender: formData.gender,
      experienceYears: formData.experienceYears,
      experienceMonths: formData.experienceMonths,
      collegeName: formData.collegeName,
      graduationYear: formData.graduationYear,
      major: formData.major,
      selfDescription: formData.selfDescription,
      skillsDescription: formData.skillsDescription,
      agree: formData.agree ? "true" : "false",
      submittedAt: new Date().toISOString(),
    }).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, v);
    });

    fd.append("classSubjects", JSON.stringify(classSubjects || {}));
    if (formData.profilePicture) {
      fd.append("profilePicture", formData.profilePicture);
      fd.append("profilePictureName", formData.profilePicture.name || "");
    }
    return fd;
  };

  const handleNext = () => {
    if (step === 1) {
      const required = ["name", "email", "address", "phone", "password"];
      for (const f of required)
        if (!formData[f]) {
          alert("Please fill all the fields.");
          return;
        }
      const phoneNormalized = String(formData.phone).replace(/[^0-9]/g, "");
      if (!/^\d{10}$/.test(phoneNormalized)) {
        alert("Phone number must be exactly 10 digits.");
        return;
      }
      setFormData((p) => ({ ...p, phone: phoneNormalized, classSubjects }));
    }
    if (step === 3) {
      const checks = [
        "profilePicture",
        "gender",
        "experienceYears",
        "experienceMonths",
        "collegeName",
        "homeAddress",
        "graduationYear",
        "major",
        "selfDescription",
        "skillsDescription",
        "videoLink",
      ];
      for (const c of checks)
        if (!formData[c]) {
          alert("Please fill all the fields.");
          return;
        }
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const fd = buildFormData();
      const res = await fetch(CREATE_SESSION_URL, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        console.error("create session failed", data);
        alert((data && data.message) || "Failed to start payment session.");
        setIsLoading(false);
        return;
      }
      const url = data.checkoutUrl || data.url;
      if (!url) {
        console.warn("No checkout url returned:", data);
        alert("Payment session created but no checkout URL returned.");
        setIsLoading(false);
        return;
      }
      window.location.href = url;
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("Failed to start payment. See console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmRegistrationPayment = async (session_id) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${CONFIRM_PAYMENT_URL}?session_id=${encodeURIComponent(session_id)}`
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Confirm payment failed", data);
        alert((data && data.message) || "Failed to confirm payment.");
        setIsLoading(false);
        return;
      }

      const tutor = data.tutor || {};
      const paymentInfo = tutor.paymentInfo || {};
      setPaymentDetails({
        id: paymentInfo.id || session_id,
        amount: paymentInfo.amount || REG_FEE,
        method: paymentInfo.method || "card",
        paidAt: paymentInfo.paidAt || new Date().toISOString(),
      });
      setIsPaid(true);
      if (data.token) localStorage.setItem("authToken", data.token);

      const uid = tutor.uid || tutor.registrationId || null;
      setSuccessUid(uid);
      setShowThankYouPopup(true);

      try {
        navigate(location.pathname, { replace: true });
      } catch (e) {}
    } catch (err) {
      console.error("confirmRegistrationPayment:", err);
      alert("An error occurred while confirming payment. See console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      if (!isPaid) {
        alert(
          `Please complete the registration fee payment of ₹${REG_FEE} before submitting.`
        );
        setIsLoading(false);
        return;
      }
      const formatted = Object.keys(classSubjects).reduce((acc, g) => {
        if (classSubjects[g]?.length) acc[g] = classSubjects[g];
        return acc;
      }, {});
      if (Object.keys(formatted).length === 0) {
        alert("Please select at least one grade and subject.");
        setIsLoading(false);
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        agree: formData.agree,
        city: formData.city,
        area: formData.area,
        classSubjects: formatted,
        profilePictureName: formData.profilePicture?.name || null,
        videoLink: formData.videoLink,
        gender: formData.gender,
        experienceYears: formData.experienceYears,
        experienceMonths: formData.experienceMonths,
        collegeName: formData.collegeName,
        homeAddress: formData.homeAddress,
        graduationYear: formData.graduationYear,
        major: formData.major,
        selfDescription: formData.selfDescription,
        skillsDescription: formData.skillsDescription,
        paymentInfo: paymentDetails,
        submittedAt: new Date().toISOString(),
      };

      console.log("FullRegistration — Final payload (frontend-only):", payload);
      persistRegistration(payload);
      setShowThankYouPopup(true);
    } catch (error) {
      console.error("Error during final submission:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className={loaderStyles.loaderContainer}>
        <Loader />
      </div>
    );

  return (
    <>
      <Navbar />
      <div className={fullRegistrationStyles.mainContainer}>
        <div className={fullRegistrationStyles.contentWrapper}>
          <div className={fullRegistrationStyles.layoutContainer}>
            <div className={fullRegistrationStyles.lottieContainer}>
              <Lottie
                animationData={lottieFile}
                loop
                style={{ width: "100%", maxWidth: 600 }}
              />
            </div>

            <div className={fullRegistrationStyles.formContainer}>
              {step === 1 && (
                <>
                  <h2 className={fullRegistrationStyles.step1Heading}>
                    Register as a Tutor
                  </h2>
                  <p className={fullRegistrationStyles.step1Subtitle}>
                    Join us today and unlock your teaching potential.
                  </p>

                  <form className={fullRegistrationStyles.step1Form}>
                    <div>
                      <label className={fullRegistrationStyles.step1InputContainer}>
                        Name
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={fullRegistrationStyles.step1Input}
                        required
                      />
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.step1InputContainer}>
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={fullRegistrationStyles.step1Input}
                        required
                      />
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.step1InputContainer}>
                        Area
                      </label>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your Location"
                        className={fullRegistrationStyles.step1Input}
                        required
                      />
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.step1InputContainer}>
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        maxLength="10"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) e.preventDefault();
                        }}
                        className={fullRegistrationStyles.step1Input}
                        required
                      />
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.step1InputContainer}>
                        Set Password
                      </label>
                      <div className={fullRegistrationStyles.passwordContainer}>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          className={fullRegistrationStyles.step1Input}
                          required
                        />
                        <span
                          className={fullRegistrationStyles.passwordToggle}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible size={20} />
                          ) : (
                            <AiOutlineEye size={20} />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className={fullRegistrationStyles.checkboxContainer}>
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className={fullRegistrationStyles.checkboxInput}
                      />
                      <label className={fullRegistrationStyles.checkboxLabel}>
                        I agree to the{" "}
                        <Link
                          to="/terms-conditions"
                          className={fullRegistrationStyles.checkboxLink}
                        >
                          Terms and Conditions
                        </Link>
                        .
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className={fullRegistrationStyles.submitButton}
                    >
                      Register
                    </button>
                  </form>

                  <div className={fullRegistrationStyles.loginLinkContainer}>
                    <p className={fullRegistrationStyles.loginLinkText}>
                      Already have an account?{" "}
                      <Link
                        to="/login-tutor"
                        className={fullRegistrationStyles.loginLink}
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className={fullRegistrationStyles.step2Header}>
                    <div className={fullRegistrationStyles.stepCircleContainer}>
                      <div className={`${fullRegistrationStyles.stepCircle} ${fullRegistrationStyles.stepCircleActive}`}>
                        1
                      </div>
                      <span className={fullRegistrationStyles.stepLabel}>Location</span>
                    </div>
                    <div className={fullRegistrationStyles.stepProgressBar}>
                      <div
                        className={fullRegistrationStyles.stepProgressFill}
                        style={{ width: "33%" }}
                      />
                    </div>
                    <div className={fullRegistrationStyles.stepCircleContainer}>
                      <div className={`${fullRegistrationStyles.stepCircle} ${fullRegistrationStyles.stepCircleInactive}`}>
                        2
                      </div>
                      <span className={fullRegistrationStyles.stepLabel}>Profile</span>
                    </div>
                  </div>

                  <h2 className={fullRegistrationStyles.step2Title}>
                    Select Location, Class, and Subjects
                  </h2>

                  <div className={fullRegistrationStyles.gridContainer}>
                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Select City
                      </label>
                      <div className={fullRegistrationStyles.searchContainer}>
                        <input
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          placeholder="Search City"
                          className={fullRegistrationStyles.searchInput}
                        />
                        <FiSearch className={fullRegistrationStyles.searchIcon} />
                        <div className={fullRegistrationStyles.dropdownContainer}>
                          {cities
                            .filter((c) =>
                              c.toLowerCase().includes(citySearch.toLowerCase())
                            )
                            .map((c) => (
                              <div
                                key={c}
                                className={`${fullRegistrationStyles.dropdownItem} ${
                                  formData.city === c ? "bg-emerald-200" : ""
                                }`}
                                onClick={() => {
                                  setFormData((p) => ({
                                    ...p,
                                    city: c,
                                    area: "",
                                  }));
                                  setAreaSearch("");
                                }}
                              >
                                {c}
                              </div>
                            ))}
                        </div>
                        {formData.city && (
                          <div className={fullRegistrationStyles.selectedItem}>
                            Selected City: {formData.city}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Select Area
                      </label>
                      <div className={fullRegistrationStyles.searchContainer}>
                        <input
                          value={areaSearch}
                          onChange={(e) => setAreaSearch(e.target.value)}
                          placeholder="Search Area"
                          className={fullRegistrationStyles.searchInput}
                          disabled={!formData.city}
                        />
                        <FiSearch className={fullRegistrationStyles.searchIcon} />
                        <div className={fullRegistrationStyles.dropdownContainer}>
                          {getFilteredAreas()
                            .filter((a) =>
                              a.toLowerCase().includes(areaSearch.toLowerCase())
                            )
                            .map((a) => (
                              <div
                                key={a}
                                className={`${fullRegistrationStyles.dropdownItem} ${
                                  formData.area === a ? "bg-emerald-200" : ""
                                }`}
                                onClick={() =>
                                  setFormData((p) => ({ ...p, area: a }))
                                }
                              >
                                {a}
                              </div>
                            ))}
                        </div>
                        {formData.area && (
                          <div className={fullRegistrationStyles.selectedItem}>
                            Selected Area: {formData.area}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={fullRegistrationStyles.classSectionTitle}>Select Classes</h3>
                    <div className={fullRegistrationStyles.classGrid}>
                      {classOptions.map((opt) => (
                        <button
                          key={opt.name}
                          onClick={() => toggleClass(opt.name)}
                          className={`${fullRegistrationStyles.classButton} ${
                            selectedClasses.includes(opt.name)
                              ? fullRegistrationStyles.classButtonActive
                              : fullRegistrationStyles.classButtonInactive
                          }`}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>

                    {selectedClasses.map((cls) => (
                      <div key={cls} className={fullRegistrationStyles.subjectContainer}>
                        <h4 className={fullRegistrationStyles.subjectTitle}>
                          Select Subjects for {cls}:
                        </h4>
                        <div className={fullRegistrationStyles.subjectGrid}>
                          {classOptions
                            .find((o) => o.name === cls)
                            ?.subjects.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => toggleSubject(cls, sub)}
                                className={`${fullRegistrationStyles.subjectButton} ${
                                  classSubjects[cls]?.includes(sub)
                                    ? fullRegistrationStyles.classButtonActive
                                    : fullRegistrationStyles.classButtonInactive
                                }`}
                              >
                                {sub}
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={fullRegistrationStyles.navButtonsContainer}>
                    <button
                      onClick={handleNext}
                      disabled={
                        !formData.city ||
                        !formData.area ||
                        selectedClasses.length === 0
                      }
                      className={`${fullRegistrationStyles.nextButton} ${
                        formData.city &&
                        formData.area &&
                        selectedClasses.length > 0
                          ? fullRegistrationStyles.nextButtonActive
                          : fullRegistrationStyles.nextButtonDisabled
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 ">
                  <div className={fullRegistrationStyles.step2Header}>
                    <div className={fullRegistrationStyles.stepCircleContainer}>
                      <div className={`${fullRegistrationStyles.stepCircle} ${fullRegistrationStyles.stepCircleActive}`}>
                        2
                      </div>
                      <span className={fullRegistrationStyles.stepLabel}>Profile</span>
                    </div>
                    <div className={fullRegistrationStyles.stepProgressBar}>
                      <div
                        className={fullRegistrationStyles.stepProgressFill}
                        style={{ width: "66%" }}
                      />
                    </div>
                    <div className={fullRegistrationStyles.stepCircleContainer}>
                      <div className={`${fullRegistrationStyles.stepCircle} ${fullRegistrationStyles.stepCircleInactive}`}>
                        3
                      </div>
                      <span className={fullRegistrationStyles.stepLabel}>Verification</span>
                    </div>
                  </div>

                  <h2 className={fullRegistrationStyles.step2Title}>
                    Complete Your Profile
                  </h2>

                  <form className={fullRegistrationStyles.step3Form}>
                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Upload Profile Picture*
                      </label>
                      <div className={fullRegistrationStyles.fileUploadContainer}>
                        {formData.profilePicture?.name && (
                          <img
                            src={URL.createObjectURL(formData.profilePicture)}
                            alt="Preview"
                            className={fullRegistrationStyles.imagePreview}
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className={fullRegistrationStyles.fileUploadInput}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Teaching Video Link (YouTube/Drive)*
                      </label>
                      <input
                        name="videoLink"
                        type="url"
                        value={formData.videoLink}
                        onChange={handleChange}
                        className={fullRegistrationStyles.searchInput}
                        required
                      />
                      {!formData.videoLink && (
                        <p className={fullRegistrationStyles.requiredFieldError}>
                          This field is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Gender*
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, gender: e.target.value }))
                        }
                        className={fullRegistrationStyles.selectInput}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Total Teaching Experience (Years and Months)*
                      </label>
                      <div className={fullRegistrationStyles.yearMonthGrid}>
                        <input
                          type="number"
                          placeholder="Years"
                          value={formData.experienceYears}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              experienceYears: e.target.value,
                            }))
                          }
                          className={fullRegistrationStyles.searchInput}
                        />
                        <input
                          type="number"
                          placeholder="Months"
                          value={formData.experienceMonths}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              experienceMonths: e.target.value,
                            }))
                          }
                          className={fullRegistrationStyles.searchInput}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Your College Name*
                      </label>
                      <input
                        value={formData.collegeName}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            collegeName: e.target.value,
                          }))
                        }
                        className={fullRegistrationStyles.searchInput}
                      />
                    </div>
                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Home Address*
                      </label>
                      <input
                        value={formData.homeAddress}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            homeAddress: e.target.value,
                          }))
                        }
                        className={fullRegistrationStyles.searchInput}
                      />
                    </div>
                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Graduation Year*
                      </label>
                      <input
                        type="number"
                        value={formData.graduationYear}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            graduationYear: e.target.value.slice(0, 4),
                          }))
                        }
                        className={fullRegistrationStyles.searchInput}
                      />
                    </div>
                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Major*
                      </label>
                      <input
                        value={formData.major}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, major: e.target.value }))
                        }
                        className={fullRegistrationStyles.searchInput}
                      />
                    </div>
                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Define yourself in one sentence*
                      </label>
                      <input
                        value={formData.selfDescription}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            selfDescription: e.target.value,
                          }))
                        }
                        className={fullRegistrationStyles.searchInput}
                      />
                    </div>
                    <div>
                      <label className={fullRegistrationStyles.selectLabel}>
                        Define your skills and experience*
                      </label>
                      <textarea
                        rows="4"
                        value={formData.skillsDescription}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            skillsDescription: e.target.value,
                          }))
                        }
                        className={fullRegistrationStyles.textareaInput}
                      />
                    </div>
                  </form>

                  <div className={fullRegistrationStyles.stepNavContainer}>
                    <button
                      onClick={handleBack}
                      className={fullRegistrationStyles.backButton}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={
                        !formData.profilePicture ||
                        !formData.gender ||
                        !formData.experienceYears ||
                        !formData.experienceMonths ||
                        !formData.collegeName ||
                        !formData.homeAddress ||
                        !formData.graduationYear ||
                        !formData.major ||
                        !formData.selfDescription ||
                        !formData.skillsDescription ||
                        !formData.videoLink
                      }
                      className={`${fullRegistrationStyles.nextButton} ${
                        formData.profilePicture && formData.gender
                          ? fullRegistrationStyles.nextButtonActive
                          : fullRegistrationStyles.nextButtonDisabled
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className={fullRegistrationStyles.paymentContainer}>
                  <h2 className={fullRegistrationStyles.step2Title}>
                    Step 3: Registration Fee
                  </h2>

                  <div className={fullRegistrationStyles.paymentCard}>
                    <p className={fullRegistrationStyles.paymentText}>
                      Please pay the registration fee to complete your
                      application.
                    </p>
                    <div className={fullRegistrationStyles.paymentAmount}>₹{REG_FEE}</div>

                    {isPaid ? (
                      <div className={`${fullRegistrationStyles.paymentStatus} ${fullRegistrationStyles.paymentSuccess}`}>
                        Payment received ✓
                      </div>
                    ) : (
                      <div className={`${fullRegistrationStyles.paymentStatus} ${fullRegistrationStyles.paymentPending}`}>
                        Payment pending
                      </div>
                    )}

                    <div className={fullRegistrationStyles.stepNavContainer}>
                      <button
                        onClick={handleBack}
                        className={fullRegistrationStyles.backButton}
                      >
                        Back
                      </button>
                      {!isPaid ? (
                        <button
                          onClick={handlePayment}
                          className={fullRegistrationStyles.submitButton}
                        >
                          Pay ₹{REG_FEE}
                        </button>
                      ) : (
                        <button
                          onClick={handleFinalSubmit}
                          className={fullRegistrationStyles.nextButtonActive}
                        >
                          Submit
                        </button>
                      )}
                    </div>

                    {isPaid && paymentDetails && (
                      <div className={fullRegistrationStyles.paymentDetailsContainer}>
                        <div>Payment ID: {paymentDetails.id}</div>
                        <div>Amount: ₹{paymentDetails.amount}</div>
                        <div>Method: {paymentDetails.method}</div>
                      </div>
                    )}
                  </div>

                  {showThankYouPopup && (
                    <div className={fullRegistrationStyles.thankYouOverlay}>
                      <div className={fullRegistrationStyles.thankYouModal}>
                        <Lottie
                          animationData={tickAnimation}
                          loop={false}
                          style={{ height: 300, width: 300, margin: "0 auto" }}
                        />
                        <h2 className={fullRegistrationStyles.thankYouHeading}>
                          Application Submitted!
                        </h2>
                        <p className={fullRegistrationStyles.thankYouText}>
                          Thank you for applying! We will contact you soon.
                        </p>
                        {successUid && (
                          <p className={fullRegistrationStyles.uidText}>
                            Your UID: <strong>{successUid}</strong>
                          </p>
                        )}
                        <div className={fullRegistrationStyles.loadingBarContainer}>
                          <div
                            className={fullRegistrationStyles.loadingBar}
                            style={{ animationDuration: "3s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FullRegistration;