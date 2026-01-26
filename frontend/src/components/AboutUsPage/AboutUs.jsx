import React from "react";
import {
  HiUserGroup,
  HiAcademicCap,
  HiLightningBolt,
  HiShieldCheck,
  HiHand,
  HiStar,
  HiBriefcase,
  HiHeart,
} from "react-icons/hi";
import { motion } from "framer-motion";
import i3 from "../../assets/i3.jpg";
import i4 from "../../assets/i4.jpg";
import i5 from "../../assets/i5.jpg";

// Import styles from dummyStyles
import {
  fadeIn,
  layoutStyles,
  heroStyles,
  coreValuesStyles,
  whyChooseUsStyles,
  teamStyles,
  sectionHeaderStyles,
  colors,
  transitions,
} from "../../assets/dummyStyles";

const AboutUs = () => {
  const SectionHeader = ({ icon: Icon, title, color }) => (
    <div className={sectionHeaderStyles.container}>
      <Icon className={`${sectionHeaderStyles.icon} ${color}`} />
      <h2 className={sectionHeaderStyles.title}>{title}</h2>
    </div>
  );

  return (
    <div className={layoutStyles.container}>
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={transitions.hero}
        className={layoutStyles.heroContainer}
      >
        <h1 className={heroStyles.title}>
          Empowering Educational Excellence
        </h1>
        <p className={heroStyles.subtitle}>
          Where innovation meets dedication in transforming education
        </p>
      </motion.div>

      {/* Core Values */}
      <section className={layoutStyles.section}>
        <SectionHeader
          icon={HiStar}
          title="Our Core Values"
          color={colors.purple}
        />
        <div className={coreValuesStyles.grid}>
          {[
            {
              icon: HiUserGroup,
              title: "Community First",
              desc: "Building collaborative learning ecosystems",
              color: colors.indigo,
            },
            {
              icon: HiAcademicCap,
              title: "Expert Mentorship",
              desc: "Industry leaders guiding your journey",
              color: colors.purple,
            },
            {
              icon: HiLightningBolt,
              title: "Innovation Driven",
              desc: "Pioneering educational technologies",
              color: colors.indigo,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={transitions.coreValues(idx)}
              className={coreValuesStyles.card}
            >
              <item.icon className={`${coreValuesStyles.icon} ${item.color}`} />
              <h3 className={coreValuesStyles.title}>{item.title}</h3>
              <p className={coreValuesStyles.description}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={layoutStyles.section}>
        <SectionHeader
          icon={HiShieldCheck}
          title="Why Choose Us"
          color={colors.indigo}
        />
        <div className={whyChooseUsStyles.grid}>
          {[
            {
              icon: HiBriefcase,
              title: "Comprehensive Solutions",
              stat: "1000+ Tools",
            },
            {
              icon: HiHeart,
              title: "Satisfaction Rate",
              stat: "99% Positive",
            },
            {
              icon: HiStar,
              title: "Industry Recognition",
              stat: "50+ Awards",
            },
            {
              icon: HiHand,
              title: "Community Support",
              stat: "24/7 Help",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={transitions.whyChooseUs(idx)}
              className={whyChooseUsStyles.card}
            >
              <div className="flex items-center space-x-4">
                <div className={whyChooseUsStyles.iconContainer}>
                  <item.icon className={whyChooseUsStyles.icon} />
                </div>
                <div>
                  <p className={whyChooseUsStyles.stat}>{item.stat}</p>
                  <p className={whyChooseUsStyles.statTitle}>{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className={layoutStyles.section}>
        <SectionHeader
          icon={HiUserGroup}
          title="Leadership Team"
          color={colors.purple}
        />
        <div className={teamStyles.grid}>
          {[
            {
              name: "Alex Johnson",
              role: "CEO & Founder",
              img: i3,
            },
            {
              name: "Sarah Chen",
              role: "CTO",
              img: i4,
            },
            {
              name: "Michael Ruiz",
              role: "Head of Education",
              img: i5,
            },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={transitions.team(idx)}
              className={teamStyles.card}
            >
              <img
                src={member.img}
                alt={member.name}
                className={teamStyles.image}
              />
              <div className={teamStyles.overlay}>
                <div>
                  <h3 className={teamStyles.name}>{member.name}</h3>
                  <p className={teamStyles.role}>{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;