import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaRocket } from "react-icons/fa";
import TextReveal from "../MagicUi/TextReveal";
import Lottie from "lottie-react";
import lottieFile from "../../assets/A2.json";
import { tutorHomePageStyles } from "../../assets/dummyStyles";

const features = [
  {
    icon: <FaUserGraduate className={tutorHomePageStyles.featureIcon} />,
    title: "For Students",
    description:
      "AI-powered tutor matching with personalized learning roadmaps",
  },
  {
    icon: <FaChalkboardTeacher className={tutorHomePageStyles.featureIcon} />,
    title: "For Tutors",
    description: "Smart profile optimization and student matching algorithm",
  },
  {
    icon: <FaRocket className={tutorHomePageStyles.featureIcon} />,
    title: "Turbo Mode",
    description: "Instant matching with AI-curated learning pathways",
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const TutorHomePage = () => {
  return (
    <div className={tutorHomePageStyles.mainContainer}>
      {/* HERO */}
      <header className={tutorHomePageStyles.heroSection}>
        <div className={tutorHomePageStyles.heroContainer}>
          {/* LEFT CONTENT */}
          <div className={tutorHomePageStyles.leftContent}>
            <motion.h1
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className={tutorHomePageStyles.mainHeading}
            >
              Unlock Your Potential with Expert Tutors
            </motion.h1>

            <div className={tutorHomePageStyles.textLottieContainer}>
              <div className="w-full">
                <TextReveal text="Join thousands of students and tutors creating a brighter future together. Whether you're looking to improve your skills or start a new career, we have something for everyone. Connect with experienced tutors and join a community of learners dedicated to achieving their goals." />
              </div>

              {/* LOTTIE FOR SMALL SCREENS */}
              <div className={tutorHomePageStyles.lottieSmallContainer}>
                <div className={tutorHomePageStyles.lottieSmallWrapper}>
                  <Lottie
                    animationData={lottieFile}
                    loop
                    style={{ width: "100%", maxWidth: 560 }}
                  />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className={tutorHomePageStyles.ctaContainer}>
              <a href="/get-tutor" className={tutorHomePageStyles.ctaButton}>
                Get Started
              </a>
            </div>
          </div>

          {/* RIGHT LOTTIE — DESKTOP ONLY */}
          <div className={tutorHomePageStyles.lottieDesktopContainer}>
            <div style={{ height: "200vh", width: "100%" }}>
              <div className={tutorHomePageStyles.lottieDesktopSticky}>
                <Lottie
                  animationData={lottieFile}
                  loop
                  style={{ width: "100%", maxWidth: 600 }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className={tutorHomePageStyles.featuresSection}>
        <div className={tutorHomePageStyles.featuresContainer}>
          <div className={tutorHomePageStyles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className={tutorHomePageStyles.featureCard}
              >
                <div className={tutorHomePageStyles.featureIconContainer}>
                  {feature.icon}
                </div>
                <h3 className={tutorHomePageStyles.featureTitle}>
                  {feature.title}
                </h3>
                <p className={tutorHomePageStyles.featureDescription}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={tutorHomePageStyles.bottomCtaSection}>
        <h2 className={tutorHomePageStyles.bottomCtaHeading}>
          Ready to Level Up?
        </h2>
        <p className={tutorHomePageStyles.bottomCtaParagraph}>
          Join thousands already transforming their learning experience.
        </p>
        <a href="/get-tutor" className={tutorHomePageStyles.bottomCtaButton}>
          Get Started Now
        </a>
      </section>
    </div>
  );
};

export default TutorHomePage;