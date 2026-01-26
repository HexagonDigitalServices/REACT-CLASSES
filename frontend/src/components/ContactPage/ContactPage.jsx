import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../MagicUi/ShineBtn";
import { contactStyles } from "../../assets/dummyStyles";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "role",
    location: "",
    city: "",
    email: "",
    message: "",
  });

  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  // Generate random CAPTCHA on reload or first render
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptchaCode(randomCode);
    setCaptchaInput("");
    setIsCaptchaValid(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits and limit to 10 characters
      const validValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: validValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const sendEmail = async (formData) => {
    try {
      const response = await emailjs.send(
        "service_6ptnob2",
        "template_ak59iro",
        {
          ...formData,
        },
        "MFc-XQnZqphzTsnna"
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    setCaptchaInput(value);
    setIsCaptchaValid(value === captchaCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCaptchaValid) {
      try {
        await sendEmail(formData);
        toast.success("Form Submitted and Email Sent Successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          role: "role",
          location: "",
          city: "",
          email: "",
          message: "",
        });
        generateCaptcha(); // Reset CAPTCHA after submission
      } catch (error) {
        toast.error("Failed to send email. Please try again later.");
      }
    } else {
      toast.error("Invalid CAPTCHA. Please try again.");
    }
  };

  return (
    <div className={contactStyles.mainContainer}>
      <ToastContainer />
      <div className={contactStyles.innerContainer}>
        {/* Description Section */}
        <div className={contactStyles.descriptionSection}>
          <div className={contactStyles.descriptionContent}>
            <h2 className={contactStyles.heading}>
              Contact Us
            </h2>
            <div className={contactStyles.contactInfo}>
              <p className={contactStyles.contactParagraph}>
                <strong>Email:</strong>
                <a
                  href="mailto:hexagonsservices@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactStyles.emailLink}
                >
                  hexagonsservices@gmail.com
                </a>
              </p>
              <p className={contactStyles.contactParagraph}>
                <strong>Phone:</strong>
                <a
                  href="https://wa.me/8299431275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactStyles.phoneLink}
                >
                  8299431275
                </a>
              </p>
              <p>
                <strong>Address:</strong> <br />
                160/4, <br />
                226022 Lucknow, INDIA
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className={contactStyles.formSection}>
          <form
            onSubmit={handleSubmit}
            className={contactStyles.formContainer}
          >
            <div className={contactStyles.inputGrid}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={contactStyles.input}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={contactStyles.input}
              />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits."
              className={contactStyles.input}
            />

            <div>
              <label className={contactStyles.label}>
                Select a Role <span className={contactStyles.requiredStar}>*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className={contactStyles.input}
              >
                <option value="role">Select a Role</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
            </div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className={contactStyles.input}
            />
            <input
              type="text"
              name="city"
              placeholder="Your City"
              value={formData.city}
              onChange={handleInputChange}
              required
              className={contactStyles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={contactStyles.input}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className={contactStyles.input}
            />
            <div>
              <label className={contactStyles.captchaLabel}>
                Enter CAPTCHA: <strong>{captchaCode}</strong>
              </label>
              <input
                type="text"
                placeholder="Enter CAPTCHA"
                value={captchaInput}
                onChange={handleCaptchaChange}
                required
                className={contactStyles.input}
              />
            </div>
            <Button className={contactStyles.button}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;