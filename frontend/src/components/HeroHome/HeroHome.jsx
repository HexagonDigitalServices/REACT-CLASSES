import React from "react";
import { useNavigate } from "react-router-dom";
import BoxReveal from "../MagicUi/BoxReveal";
import Button from "../MagicUi/ShineBtn";
import Lottie from "lottie-react";
import lottieFile from "../../assets/heroanimation.json";
import Many_One from "../MagicUi/AnimatedBeam/Many_One";
import { heroHomeStyles } from "../../assets/dummyStyles";

const HeroHome = () => {
  const navigate = useNavigate();

  return (
    <div className={heroHomeStyles.mainContainer}>
      {/* Left Side Content (always visible; becomes full-width on small screens and half on lg) */}
      <div className={heroHomeStyles.leftContainer}>
        <div className={heroHomeStyles.leftContent}>
          <BoxReveal className={heroHomeStyles.boxRevealBg} duration={0.5}>
            <p className={heroHomeStyles.title}>
              Home Tutors<span className={heroHomeStyles.titleDot}>.</span>
            </p>
          </BoxReveal>

          <BoxReveal className={heroHomeStyles.boxRevealBg} duration={0.5}>
            <h2 className={heroHomeStyles.subtitle}>
              Unlock the Best Learning Experience with{" "}
              <span className={heroHomeStyles.subtitleHighlight}>
                Best Teachers
              </span>
            </h2>
          </BoxReveal>

          <BoxReveal className={heroHomeStyles.boxRevealBg} duration={0.5}>
            <div className={heroHomeStyles.description}>
              <p>
                -&gt; <strong>2000+</strong> students • -&gt;{" "}
                <strong>500+</strong> qualified tutors across Lucknow. Best
                academic excellence in{" "}
                <span className={heroHomeStyles.descriptionHighlight}>Physics</span>,{" "}
                <span className={heroHomeStyles.descriptionHighlight}>Maths</span>,{" "}
                <span className={heroHomeStyles.descriptionHighlight}>
                  Chemistry
                </span>
                ,{" "}
                <span className={heroHomeStyles.descriptionHighlight}>Biology</span>,
                and{" "}
                <span className={heroHomeStyles.descriptionHighlight}>
                  Other Subjects
                </span>
                .
              </p>
              <p className="mt-2">
                -&gt; <strong>100% Excellence</strong>, personalized one-to-one
                sessions for all classes and subjects.
              </p>
            </div>
          </BoxReveal>

          {/* Buttons: responsive stacking on small screens, inline on larger */}
          <BoxReveal className={heroHomeStyles.boxRevealBg} duration={0.5}>
            <div className={heroHomeStyles.buttonsContainer}>
              <Button
                className={heroHomeStyles.buttonTutor}
                onClick={() => navigate("/search-tutor")}
                aria-label="Get Tutor"
              >
                Get Tutor
              </Button>

              <Button
                className={heroHomeStyles.buttonStudent}
                onClick={() => navigate("/tuition-job")}
                aria-label="Get Student"
              >
                Get Student
              </Button>
            </div>
          </BoxReveal>
        </div>

        {/* Decorative / animated Many_One remains visible in all sizes */}
        <div className={heroHomeStyles.manyOneContainer}>
          <Many_One />
        </div>

        {/* Mobile / Tablet Lottie + Feature cards (shown only on < lg) */}
        <div className={heroHomeStyles.mobileContainer}>
          {/* Lottie animation (responsive) */}
          <div className={heroHomeStyles.mobileLottieContainer}>
            <Lottie
              animationData={lottieFile}
              loop={true}
              style={heroHomeStyles.mobileLottieStyle}
            />
          </div>

          {/* Feature grid for small/medium screens */}
          <div className={heroHomeStyles.mobileFeatureGrid}>
            <div className={heroHomeStyles.featureCard}>
              <h3 className={heroHomeStyles.featureTitleMobile}>
                7,000+ Tutors
              </h3>
              <p className={heroHomeStyles.featureDescription}>
                Verified, experienced, and reliable professionals.
              </p>
            </div>
            <div className={heroHomeStyles.featureCard}>
              <h3 className={heroHomeStyles.featureTitleMobile}>
                Personalized Sessions
              </h3>
              <p className={heroHomeStyles.featureDescription}>
                Tailored one-to-one teaching for every student.
              </p>
            </div>
            <div className={heroHomeStyles.featureCard}>
              <h3 className={heroHomeStyles.featureTitleMobile}>
                Free Trials
              </h3>
              <p className={heroHomeStyles.featureDescription}>
                Get started with a no-commitment trial session.
              </p>
            </div>
            <div className={heroHomeStyles.featureCard}>
              <h3 className={heroHomeStyles.featureTitleMobile}>
                Competitive Pricing
              </h3>
              <p className={heroHomeStyles.featureDescription}>
                Affordable rates without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side — keep EXACT desktop behavior: hidden on small, flex on lg (unchanged functionality/structure) */}
      <div className={heroHomeStyles.rightContainer}>
        <Lottie
          animationData={lottieFile}
          loop={true}
          style={heroHomeStyles.desktopLottieStyle}
        />
        <div className={heroHomeStyles.desktopFeatureGrid}>
          <div className={heroHomeStyles.featureCard}>
            <h3 className={heroHomeStyles.featureTitleDesktop}>
              7,000+ Tutors
            </h3>
            <p className={heroHomeStyles.featureDescription}>
              Verified, experienced, and reliable professionals.
            </p>
          </div>
          <div className={heroHomeStyles.featureCard}>
            <h3 className={heroHomeStyles.featureTitleDesktop}>
              Personalized Sessions
            </h3>
            <p className={heroHomeStyles.featureDescription}>
              Tailored one-to-one teaching for every student.
            </p>
          </div>
          <div className={heroHomeStyles.featureCard}>
            <h3 className={heroHomeStyles.featureTitleDesktop}>Free Trials</h3>
            <p className={heroHomeStyles.featureDescription}>
              Get started with a no-commitment trial session.
            </p>
          </div>
          <div className={heroHomeStyles.featureCard}>
            <h3 className={heroHomeStyles.featureTitleDesktop}>
              Competitive Pricing
            </h3>
            <p className={heroHomeStyles.featureDescription}>
              Affordable rates without compromising quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHome;