// FaqPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import faqData from './FaqData';
import { faqPageStyles } from '../../assets/dummyStyles';

const FaqPage = () => {
  const [activeTab, setActiveTab] = useState("parents");

  return (
    <div className={faqPageStyles.container}>
      <div className={faqPageStyles.mainCard}>
        {/* Tabs Section */}
        <div className={faqPageStyles.tabSection}>
          {/* On very small screens allow horizontal scroll so tabs don't wrap awkwardly */}
          <div
            role="tablist"
            aria-label="FAQ Tabs"
            className={faqPageStyles.tabList}
          >
            {["parents", "teachers"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab}`}
                  tabIndex={0}
                  className={`${faqPageStyles.tabButton} ${
                    isActive
                      ? faqPageStyles.tabButtonActive
                      : faqPageStyles.tabButtonInactive
                  }`}
                >
                  {tab === "parents" ? "Parents / Students" : "Teachers"}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className={faqPageStyles.faqSection}>
          <h2
            id="faq-heading"
            className={faqPageStyles.faqHeading}
          >
            {activeTab === "parents"
              ? "FAQs for Parents / Students"
              : "FAQs for Teachers"}
          </h2>

          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={activeTab}
            className={faqPageStyles.faqPanel}
          >
            {faqData[activeTab].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={faqPageStyles.faqItem}
              >
                <h4 className={faqPageStyles.faqQuestion}>
                  {faq.question}
                </h4>
                <p className={faqPageStyles.faqAnswer}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;