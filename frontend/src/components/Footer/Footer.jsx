import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineShieldCheck, HiOutlineDocumentText } from "react-icons/hi";
import { NavLink } from "react-router-dom";

// Import styles from dummyStyles
import {
  footerStyles,
  footerAnimations,
  particleCounts,
} from "../../assets/dummyStyles";

const Footer = () => {
  // responsive particle count so small screens are not overloaded
  const [particleCount, setParticleCount] = useState(particleCounts.lg);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setParticleCount(particleCounts.xs);
      else if (w < 1024) setParticleCount(particleCounts.sm);
      else setParticleCount(particleCounts.lg);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <footer className={footerStyles.container}>
      {/* Floating Particles - adaptive count, decorative only */}
      <div
        className={footerStyles.particlesContainer}
        aria-hidden="true"
      >
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className={footerStyles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              ...footerStyles.particleAnimation(i),
              zIndex: 0,
            }}
          />
        ))}
      </div>

      <div className={footerStyles.contentWrapper}>
        <motion.div
          className={footerStyles.grid}
          variants={footerAnimations.footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div 
            variants={footerAnimations.columnVariants} 
            className={footerStyles.brandContainer}
          >
            <NavLink
              to="/"
              className="group inline-block"
              aria-label="TuitionHub Home"
            >
              <h2 className={footerStyles.logo}>
                TUITIONHUB
              </h2>
            </NavLink>
            <p className={footerStyles.description}>
              Elevate your learning experience with top-tier tutors and
              innovative approaches. Let's grow together with creativity and
              passion!
            </p>

            <div className={footerStyles.contactContainer}>
              <div className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <FaPhoneAlt className={footerStyles.contactIcon} />
                </div>
                <a
                  href="tel:+917878787878"
                  className={footerStyles.contactLink}
                  aria-label="Call TuitionHub"
                >
                  +91 7878787878
                </a>
              </div>
              <div className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <FaEnvelope className={footerStyles.contactIcon} />
                </div>
                <a
                  href="mailto:contact@tuitionhub.com"
                  className={footerStyles.contactLink}
                  aria-label="Email TuitionHub"
                >
                  contact@tuitionhub.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            variants={footerAnimations.columnVariants} 
            className="space-y-6"
          >
            <h3 className={footerStyles.sectionHeader}>
              Quick Links
            </h3>
            <ul className={footerStyles.navList}>
              {[
                { icon: <AiOutlineHome />, text: "Home", to: "/" },
                {
                  icon: <AiOutlineInfoCircle />,
                  text: "About Us",
                  to: "/about",
                },
                {
                  icon: <BiMessageSquareDetail />,
                  text: "Contact",
                  to: "/contact",
                },
              ].map((link, index) => (
                <li key={index} className={footerStyles.navItem}>
                  <NavLink
                    to={link.to}
                    className={footerStyles.navLink}
                    aria-label={link.text}
                  >
                    <span className={footerStyles.navIcon}>
                      {link.icon}
                    </span>
                    <span className={footerStyles.navText}>
                      {link.text}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div 
            variants={footerAnimations.columnVariants} 
            className="space-y-6"
          >
            <h3 className={footerStyles.sectionHeader}>
              Legal
            </h3>
            <ul className={footerStyles.navList}>
              {[
                {
                  icon: <HiOutlineShieldCheck />,
                  text: "Privacy Policy",
                  to: "/privacy",
                },
                {
                  icon: <HiOutlineDocumentText />,
                  text: "Terms & Conditions",
                  to: "/terms-conditions",
                },
              ].map((link, index) => (
                <li key={index} className={footerStyles.navItem}>
                  <a
                    href={link.to}
                    className={footerStyles.navLink}
                    aria-label={link.text}
                  >
                    <span className={footerStyles.navIcon}>
                      {link.icon}
                    </span>
                    <span className={footerStyles.navText}>
                      {link.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            variants={footerAnimations.columnVariants} 
            className={footerStyles.socialContainer}
          >
            <h3 className={footerStyles.sectionHeader}>
              Connect
            </h3>
            <p className={footerStyles.socialText}>
              Join our community for the latest updates and educational
              insights!
            </p>

            <div className={footerStyles.socialIconsContainer}>
              {[
                { icon: <FaFacebookF />, href: "#", label: "Facebook" },
                { icon: <FaTwitter />, href: "#", label: "Twitter" },
                { icon: <FaInstagram />, href: "#", label: "Instagram" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={footerStyles.socialIcon}
                >
                  <span className={footerStyles.socialIconInner}>
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <div className={footerStyles.copyrightContainer}>
          <p className={footerStyles.copyrightText}>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://hexagondigitalservices.com"
              className={footerStyles.copyrightLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hexagon Digital Services"
            >
              Hexagon Digital Services
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;