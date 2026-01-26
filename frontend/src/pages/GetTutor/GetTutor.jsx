// src/pages/GetTutor/GetTutor.jsx
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Lottie from "lottie-react";
import lottieFile from "../../assets/study2.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000";

function GetTutor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    name: "",
    phone: "",
  });

  const [showSecondForm, setShowSecondForm] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [detailedForm, setDetailedForm] = useState({
    classSubjects: [{ class: "", subject: "" }],
    fee: "",
    address: "",
    notes: "",
    email: "",
  });

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

  const getFilteredAreas = () => {
    if (!formData.city) return [];
    return cityAreas[formData.city] || [];
  };

  const generateUniqueId = () => {
    const ts = Date.now();
    const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
    return `TJ-${ts}-${rand}`;
  };

  const persistSubmission = (submission) => {
    try {
      const raw = localStorage.getItem("dummyTutorSubmissions");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(submission);
      localStorage.setItem("dummyTutorSubmissions", JSON.stringify(arr));
    } catch (e) {
      console.error("Failed to persist submission locally:", e);
    }
  };

  const handleFirstFormSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setDetailedForm((prev) => ({
      ...prev,
      location: formData.city,
    }));

    console.log("GetTutor — First form submitted:", { ...formData });

    setThankYouMessage(true);
    setShowSecondForm(true);
    toast.success(
      `Thank you ${formData.name}, please complete the next form to generate your ID.`
    );
  };

  const handleSecondFormSubmit = async (e) => {
    e.preventDefault();

    if (!detailedForm.email) {
      toast.error("Please provide an email address.");
      return;
    }

    if (!detailedForm.address) {
      toast.error("Please select an area.");
      return;
    }

    // Build the payload expected by backend createJob (removed preferGender & isOnlineAllowed)
    const payload = {
      parentName: String(formData.name || "").trim(),
      parentMobile: String(formData.phone || "").trim(),
      parentEmail: String(detailedForm.email || "").trim(),
      classSubjects: detailedForm.classSubjects.map((cs) => ({
        class: cs.class,
        subject: cs.subject,
      })),
      address: detailedForm.address,
      city: formData.city,
      notes: detailedForm.notes || "",
    };

    const combinedData = {
      ...formData,
      ...detailedForm,
      area: detailedForm.address || "",
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      const url = `${API_BASE}/api/parents`;
      const resp = await axios.post(url, payload);

      if (resp?.data?.success) {
        const job = resp.data.job || {};
        const serverJobId = job.jobId || job._id || resp.data.jobId || null;
        const uniqueId = serverJobId || generateUniqueId();
        const submissionWithId = { uniqueId, ...combinedData, serverJob: job };

        persistSubmission(submissionWithId);

        console.log(
          "GetTutor — Final submission (saved via backend):",
          submissionWithId
        );
        toast.success(`Submission Successful! Job ID: ${uniqueId}`);

        setTimeout(() => navigate(`/tuition-job`), 1500);
      } else {
        console.warn(
          "Backend returned non-success; falling back to local persist",
          resp?.data
        );
        const uniqueId = generateUniqueId();
        const submissionWithId = { uniqueId, ...combinedData };
        persistSubmission(submissionWithId);
        console.log(
          "GetTutor — Final submission (saved locally fallback):",
          submissionWithId
        );
        toast.success(`Submission saved locally. Your ID: ${uniqueId}`);
        setTimeout(() => navigate(`/tuition-job`), 1500);
      }
    } catch (err) {
      console.error(
        "Error submitting to backend, saving locally:",
        err?.message || err
      );
      const uniqueId = generateUniqueId();
      const submissionWithId = {
        uniqueId,
        ...combinedData,
        error: String(err?.message || err),
      };
      persistSubmission(submissionWithId);
      toast.success(
        `Unable to reach server — saved locally. Your ID: ${uniqueId}`
      );
      setTimeout(() => navigate(`/tuition-job`), 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e, formType, index = null) => {
    const { name, value, type, checked } = e.target;

    if (formType === "second" && name.includes("classSubjects")) {
      const updatedSubjects = [...detailedForm.classSubjects];
      const part = name.split(".")[1];
      updatedSubjects[index] = { ...updatedSubjects[index], [part]: value };
      setDetailedForm((prev) => ({ ...prev, classSubjects: updatedSubjects }));
    } else {
      if (formType === "first") {
        setFormData((prev) => ({ ...prev, [name]: value }));
      } else {
        if (type === "checkbox") {
          setDetailedForm((prev) => ({ ...prev, [name]: checked }));
        } else {
          setDetailedForm((prev) => ({ ...prev, [name]: value }));
        }
      }
    }
  };

  const addAnotherClass = () => {
    setDetailedForm((prev) => ({
      ...prev,
      classSubjects: [...prev.classSubjects, { class: "", subject: "" }],
    }));
  };

  const removeClass = (index) => {
    if (index === 0) {
      toast.warn("The first class and subject cannot be deleted.");
      return;
    }
    setDetailedForm((prev) => ({
      ...prev,
      classSubjects: prev.classSubjects.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <Navbar />
      <div className="min-h-screen flex items-center py-16 lg:py-32 justify-center ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:flex-nowrap sm:flex-nowrap lg:gap-24 items-center lg:flex-nowrap">
            <div className="w-full lg:w-1/2  flex justify-center mb-10 lg:mb-0">
              <Lottie
                animationData={lottieFile}
                loop={true}
                style={{ width: "100%", maxWidth: "600px", height: "auto" }}
              />
            </div>

            <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-3xl p-8">
              <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded-lg">
                <p className="font-bold">Important Announcement:</p>
                <p>
                  Please remember your unique ID after submitting the form. If
                  you need to search your application on the Tuition Job Page.
                </p>
              </div>

              {!showSecondForm ? (
                <form onSubmit={handleFirstFormSubmit}>
                  <h2 className="text-3xl font-extrabold text-center mb-4">
                    Get a Home Tutor
                  </h2>
                  <p className="text-gray-800 font-medium text-center mb-6">
                    Your search for a perfect home tutor ends here. Fill out the
                    details below & we’ll help you find the best tutor for you
                    or your child.
                  </p>

                  <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-800">
                      Select City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange(e, "first")}
                      required
                      className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="" disabled>
                        Select a city
                      </option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-800">
                      Parent Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, "first")}
                      required
                      className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-800">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      maxLength="10"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-full text-lg font-bold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Get a Home Tutor
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-sm mt-10 text-gray-600">
                      By filling this form you agree to our terms and policies
                    </p>
                  </div>
                </form>
              ) : (
                <>
                  {thankYouMessage && (
                    <div className="mb-6 flex items-center gap-4 p-4 bg-green-100  rounded-lg">
                      <p>
                        Thank you {formData.name}, we've received your request!
                        A team member will contact you soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSecondFormSubmit}>
                    <div className="mb-4 p-6 bg-sky-50 rounded-lg shadow-md">
                      <h2 className="title">Provide Additional Details</h2>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Tuition Details
                        </h3>

                        {detailedForm.classSubjects.map((field, index) => (
                          <div
                            key={index}
                            className="mb-4 flex flex-col md:flex-row gap-4"
                          >
                            <div className="flex-1">
                              <label className="block text-lg font-semibold text-gray-800">
                                Class
                              </label>
                              <input
                                type="text"
                                name={`classSubjects.class`}
                                value={field.class}
                                onChange={(e) =>
                                  handleInputChange(e, "second", index)
                                }
                                required
                                className="w-full px-4 py-2 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                            <div className="flex-1">
                              <label className="block text-lg font-semibold text-gray-800">
                                Subject
                              </label>
                              <input
                                type="text"
                                name={`classSubjects.subject`}
                                value={field.subject}
                                onChange={(e) =>
                                  handleInputChange(e, "second", index)
                                }
                                required
                                className="w-full px-4 py-2 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeClass(index)}
                                className="self-center text-gray-400 "
                              >
                                <FaTrash size={20} />
                              </button>
                            )}
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addAnotherClass}
                          className="text-blue-500 hover:text-blue-700 font-semibold mt-2"
                        >
                          + Add Another Class
                        </button>
                      </div>

                      <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-800">
                          Tuition Fee
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 text-lg">
                            ₹
                          </span>
                          <input
                            type="number"
                            name="fee"
                            value={detailedForm.fee}
                            onChange={(e) => handleInputChange(e, "second")}
                            onKeyDown={(e) => {
                              if (
                                e.key === "e" ||
                                e.key === "E" ||
                                e.key === "+" ||
                                e.key === "-" ||
                                e.key === "."
                              ) {
                                e.preventDefault();
                              }
                            }}
                            inputMode="numeric"
                            required
                            className="w-full pl-10 px-4 py-2 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                            style={{ MozAppearance: "textfield" }}
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-800">
                          Address (Area)
                        </label>
                        <select
                          name="address"
                          value={detailedForm.address}
                          onChange={(e) => handleInputChange(e, "second")}
                          required
                          className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select your Area</option>
                          {getFilteredAreas().map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-800">
                          Job Description
                        </label>
                        <textarea
                          name="notes"
                          value={detailedForm.notes}
                          onChange={(e) => handleInputChange(e, "second")}
                          className="w-full px-4 py-2 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-800">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={detailedForm.email}
                          onChange={(e) => handleInputChange(e, "second")}
                          required
                          className="w-full px-4 py-2 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-full text-lg font-bold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Details"}
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm mt-10 text-gray-600">
                        By filling this form you agree to our terms and policies
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GetTutor;
