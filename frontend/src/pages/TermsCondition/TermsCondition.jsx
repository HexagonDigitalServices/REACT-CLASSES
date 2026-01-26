import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { termsConditionStyles } from '../../assets/dummyStyles';

const TermsCondition = () => {
    return (
        <>
            <Navbar />
            <div className={termsConditionStyles.mainContainer}>
                <div className={termsConditionStyles.contentWrapper}>
                    <h1 className={termsConditionStyles.mainHeading}>
                        Terms and Conditions
                    </h1>
                    <p className={termsConditionStyles.introParagraph}>
                        Welcome to <span className={termsConditionStyles.introSpan}>[YourWebsiteName]</span>. By using our website and services, you acknowledge and agree to the following Terms and Conditions.
                    </p>
                    <div className={termsConditionStyles.contentCard}>
                        <div className={termsConditionStyles.sectionContainer}>
                            {/* Section 1 */}
                            <div>
                                <h2 className={termsConditionStyles.sectionHeading}>
                                    Acceptance of Terms
                                </h2>
                                <p className={termsConditionStyles.sectionParagraph}>
                                    By accessing or using <span className={termsConditionStyles.sectionSpan}>[YourWebsiteName]</span>, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our website.
                                </p>
                            </div>
                            {/* Section 2 */}
                            <div>
                                <h2 className={termsConditionStyles.sectionHeading}>
                                    Nature of Services
                                </h2>
                                <p className={termsConditionStyles.sectionParagraph}>
                                    <span className={termsConditionStyles.sectionSpan}>[YourWebsiteName]</span> provides a platform to connect tutors and students/parents for educational purposes. The site enables students/parents to contact tutors and view their profiles detailing their qualifications and experience.
                                </p>
                            </div>
                            {/* Section 3 */}
                            <div>
                                <h2 className={termsConditionStyles.sectionHeading}>
                                    User Responsibilities
                                </h2>
                                <h3 className={termsConditionStyles.subSectionHeading}>
                                    For Tutors:
                                </h3>
                                <ul className={termsConditionStyles.unorderedList}>
                                    <li>Eligibility: Must be at least 18 years old and possess the necessary qualifications.</li>
                                    <li>Provide accurate and updated details, including contact information and qualifications.</li>
                                    <li>Be solely responsible for all content published.</li>
                                    <li>Acknowledge they are not employees of <span className={termsConditionStyles.listItemSpan}>[YourWebsiteName]</span>.</li>
                                </ul>
                                <h3 className={termsConditionStyles.subSectionHeading}>
                                    For Students/Parents:
                                </h3>
                                <ul className={termsConditionStyles.unorderedList}>
                                    <li>Verify tutor credentials before engagement.</li>
                                    <li>Provide detailed requirements for effective communication with tutors.</li>
                                    <li>We recommend verifying identity and address proof of tutors.</li>
                                </ul>
                            </div>
                            {/* Section 4 */}
                            <div>
                                <h2 className={termsConditionStyles.sectionHeading}>
                                    Refund and Cancellation Policy
                                </h2>
                                <p className={termsConditionStyles.sectionParagraph}>
                                    <strong className={termsConditionStyles.strongText}>For Parents:</strong> First month's tuition fee is refundable after deducting charges for classes already conducted.
                                    <br />
                                    <strong className={termsConditionStyles.strongText}>For Tutors:</strong> Registration fees are non-refundable.
                                </p>
                            </div>
                            {/* Section 5 */}
                            <div>
                                <h2 className={termsConditionStyles.sectionHeading}>
                                    Limitation of Liability
                                </h2>
                                <p className={termsConditionStyles.sectionParagraph}>
                                    <span className={termsConditionStyles.sectionSpan}>[YourWebsiteName]</span> is not liable for any loss or damage arising from interactions between tutors and students/parents.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsCondition;