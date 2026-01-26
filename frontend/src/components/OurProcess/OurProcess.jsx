import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaClock,
  FaUserGraduate,
  FaHandshake,
  FaSearch,
  FaClipboardList,
  FaGraduationCap,
  FaBrain,
  FaKey,
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaChartBar,
  FaBriefcase,
  FaUserFriends,
  FaCommentDots,
  FaStar,
  FaRocket,
  FaTrophy,
} from "react-icons/fa";
import Process1 from "../../assets/Process1.png";
import Process2 from "../../assets/Process2.png";
import Process3 from "../../assets/Process3.png";
import Process4 from "../../assets/Process4.png";
import Process5 from "../../assets/Process5.png";
import Process6 from "../../assets/Process6.png";
import Process7 from "../../assets/Process7.png";
import Process8 from "../../assets/Process8.png";
import Process9 from "../../assets/Process9.png";
import { ourProcessStyles } from "../../assets/dummyStyles";

const OurProcess = () => {
  const [showFullProcess, setShowFullProcess] = useState(false);

  const processSteps = [
    {
      title: "Step 1: Inquiry",
      description:
        "Reach out to us with your requirements, and we'll help you get started effortlessly.",
      image: Process1,
      keyBenefits: [
        { text: "Easy communication", icon: <FaPhone /> },
        { text: "Quick response time", icon: <FaClock /> },
        { text: "Personalized guidance", icon: <FaUserGraduate /> },
      ],
    },
    {
      title: "Step 2: Consultation",
      description:
        "Our team contacts you to understand your requirements in detail.",
      image: Process2,
      keyBenefits: [
        { text: "Dedicated support", icon: <FaHandshake /> },
        { text: "Requirement clarity", icon: <FaSearch /> },
        { text: "Personalized service", icon: <FaClipboardList /> },
      ],
    },
    {
      title: "Step 3: Assessment",
      description:
        "We assess the student's academic level and goals to create a tailored plan.",
      image: Process3,
      keyBenefits: [
        { text: "Custom learning plans", icon: <FaGraduationCap /> },
        { text: "Goal-oriented assessment", icon: <FaTrophy /> },
        { text: "Improved focus areas", icon: <FaBrain /> },
      ],
    },
    {
      title: "Step 4: Tutor Match",
      description:
        "Based on the assessment, we match the student with the best-suited tutor.",
      image: Process4,
      keyBenefits: [
        { text: "Highly qualified tutors", icon: <FaUserGraduate /> },
        { text: "Perfect match for needs", icon: <FaHandshake /> },
        { text: "Smooth compatibility", icon: <FaClipboardList /> },
      ],
    },
    {
      title: "Step 5: Trial Session",
      description:
        "A trial session ensures compatibility between the tutor and the student.",
      image: Process5,
      keyBenefits: [
        { text: "Test the tutor's approach", icon: <FaGraduationCap /> },
        { text: "Identify learning styles", icon: <FaBrain /> },
        { text: "Gain initial insights", icon: <FaKey /> },
      ],
    },
    {
      title: "Step 6: Regular Classes",
      description:
        "Regular classes are scheduled, bringing progress and results over time.",
      image: Process6,
      keyBenefits: [
        { text: "Consistent progress", icon: <FaBook /> },
        { text: "Structured scheduling", icon: <FaCalendarAlt /> },
        { text: "Long-term improvement", icon: <FaChartLine /> },
      ],
    },
    {
      title: "Step 7: Monitoring Progress",
      description:
        "Receive detailed progress reports and updates from the tutor.",
      image: Process7,
      keyBenefits: [
        { text: "Monthly reports", icon: <FaChartBar /> },
        { text: "Actionable insights", icon: <FaBriefcase /> },
        { text: "Parent involvement", icon: <FaUserFriends /> },
      ],
    },
    {
      title: "Step 8: Ongoing Support",
      description:
        "We provide continuous support for both students and parents.",
      image: Process8,
      keyBenefits: [
        { text: "24/7 availability", icon: <FaClock /> },
        { text: "Immediate assistance", icon: <FaPhone /> },
        { text: "Feedback implementation", icon: <FaCommentDots /> },
      ],
    },
    {
      title: "Step 9: Support & Feedback",
      description:
        "Enjoy 24/7 support and give feedback to enhance your experience with us.",
      image: Process9,
      keyBenefits: [
        { text: "Round-the-clock support", icon: <FaStar /> },
        { text: "User-driven enhancements", icon: <FaRocket /> },
        { text: "Improved satisfaction", icon: <FaTrophy /> },
      ],
    },
  ];

  return (
    <section className={ourProcessStyles.sectionContainer}>
      <h1 className={ourProcessStyles.heading}>
        Our Process
      </h1>

      {/* Grid: 1 col (small), 2 cols (md), 3 cols (lg) — desktop layout unchanged */}
      <div className={ourProcessStyles.gridContainer}>
        {processSteps
          .slice(0, showFullProcess ? processSteps.length : 3)
          .map((step, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.18 }}
              className={ourProcessStyles.card}
              aria-labelledby={`process-title-${index}`}
            >
              {/* IMAGE */}
              <div className={ourProcessStyles.imageContainer}>
                {/* responsive heights so image remains visible on all sizes */}
                <img
                  src={step.image}
                  alt={step.title}
                  className={ourProcessStyles.image}
                />
              </div>

              {/* TEXT BLOCK */}
              <div className={ourProcessStyles.textContainer}>
                <h2
                  id={`process-title-${index}`}
                  className={ourProcessStyles.title}
                >
                  {step.title}
                </h2>

                <p className={ourProcessStyles.description}>
                  {step.description}
                </p>

                {/* KEY BENEFITS — responsive layout:
                    - on very small screens: vertical list,
                    - on small/medium: two-column grid for compactness,
                    - on desktop: shows as list inside card (unchanged visual balance)
                */}
                <div
                  className={ourProcessStyles.benefitsContainer}
                  role="group"
                  aria-label={`${step.title} key benefits`}
                >
                  <h3 className={ourProcessStyles.benefitsTitle}>
                    Key Benefits:
                  </h3>

                  <ul
                    className={ourProcessStyles.benefitsList}
                    aria-hidden={false}
                  >
                    {step.keyBenefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className={ourProcessStyles.benefitItem}
                      >
                        <span
                          className={ourProcessStyles.benefitIcon}
                          aria-hidden="true"
                        >
                          {benefit.icon}
                        </span>
                        <span className={ourProcessStyles.benefitText}>
                          {benefit.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
      </div>

      {/* SHOW MORE BUTTON — unchanged logic, added accessibility attribute */}
      <button
        onClick={() => setShowFullProcess(!showFullProcess)}
        aria-expanded={showFullProcess}
        className={ourProcessStyles.showMoreButton}
      >
        {showFullProcess ? "Show Less" : "Show More"}
      </button>
    </section>
  );
};

export default OurProcess;