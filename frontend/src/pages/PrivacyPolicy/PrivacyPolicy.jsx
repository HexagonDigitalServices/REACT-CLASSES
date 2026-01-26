import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaUserShield, FaCookieBite, FaLock, FaExternalLinkAlt, FaChartBar, FaUserCheck } from 'react-icons/fa';
import { privacyPolicyStyles } from '../../assets/dummyStyles';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className={privacyPolicyStyles.mainContainer}>
                <div className={privacyPolicyStyles.contentContainer}>
                    <h1 className={privacyPolicyStyles.mainHeading}>
                        <span className={privacyPolicyStyles.mainHeadingSpan}>Privacy</span> Policy
                    </h1>
                    <p className={privacyPolicyStyles.introParagraph}>
                        At <span className={privacyPolicyStyles.introSpan}>[Your Tutor Website Name]</span>, we value your privacy. Here's how we collect, use, and protect your information collected
                        from users ("Users") of our website ("Site"). This policy applies to the Site and all services provided by [Your Tutor Website Name].
                    </p>

                    <div className={privacyPolicyStyles.sectionContainer}>
                        <section>
                            <h2 className={privacyPolicyStyles.sectionHeading}>
                                <FaUserShield className={privacyPolicyStyles.sectionIcon} />
                                1. Collection of Information
                            </h2>
                            <h3 className={privacyPolicyStyles.subHeading}>Personal Identification Information</h3>
                            <p className={privacyPolicyStyles.paragraph}>
                                Personal Identification Information
                                We may collect personal identification information from Users in various ways, including, but not limited to:
                                When Users register on the Site, subscribe to our services, or interact with features such as forms, surveys, or newsletters.
                                When Users provide details for transactions, inquiries, or other activities on our Site.
                            </p>
                            <ul className={privacyPolicyStyles.unorderedList}>
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Mailing address</li>
                                <li>Phone number</li>
                                <li>Payment details</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className={privacyPolicyStyles.sectionHeading}>
                                <FaCookieBite className={privacyPolicyStyles.sectionIcon} />
                                2. Use of Cookies
                            </h2>
                            <p className={privacyPolicyStyles.paragraphNoMargin}>
                                Cookies enhance User experience by analyzing traffic and personalizing interactions. Users can disable cookies in their browser settings, but certain features may be impacted.
                            </p>
                        </section>

                        <section>
                            <h2 className={privacyPolicyStyles.sectionHeading}>
                                <FaChartBar className={privacyPolicyStyles.sectionIcon} />
                                3. Use of Collected Information
                            </h2>
                            <p className={privacyPolicyStyles.paragraphNoMargin}>
                                We use collected data to personalize experiences, improve services, and provide support. This includes:
                            </p>
                            <ul className={privacyPolicyStyles.unorderedList}>
                                <li>Providing tailored content.</li>
                                <li>Enhancing our Site based on feedback.</li>
                                <li>Responding to queries and requests.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className={privacyPolicyStyles.sectionHeading}>
                                <FaLock className={privacyPolicyStyles.sectionIcon} />
                                4. Protection of Information
                            </h2>
                            <p className={privacyPolicyStyles.paragraphNoMargin}>
                                Your data is stored securely using encryption and access controls to prevent unauthorized access.
                            </p>
                        </section>

                        <section>
                            <h2 className={privacyPolicyStyles.sectionHeading}>
                                <FaExternalLinkAlt className={privacyPolicyStyles.sectionIcon} />
                                5. Third-Party Websites
                            </h2>
                            <p className={privacyPolicyStyles.paragraphNoMargin}>
                                We are not responsible for the content or policies of external websites. Please review their privacy policies before engaging.
                            </p>
                        </section>

                        <section>
                            <h2 className={privacyPolicyStyles.sectionHeading}>
                                <FaUserCheck className={privacyPolicyStyles.sectionIcon} />
                                6. User Consent
                            </h2>
                            <p className={privacyPolicyStyles.paragraphNoMargin}>
                                By using our Site, you consent to this Privacy Policy. Continued use signifies agreement to any updates.
                            </p>
                        </section>

                        <section className={privacyPolicyStyles.contactSection}>
                            <h2 className={privacyPolicyStyles.contactHeading}>Contact Us</h2>
                            <p className={privacyPolicyStyles.contactParagraph}>Have questions? We're here to help:</p>
                            <div className={privacyPolicyStyles.contactInfo}>
                                <p><span className={privacyPolicyStyles.contactInfoSpan}>Email:</span> [Your Email Address]</p>
                                <p><span className={privacyPolicyStyles.contactInfoSpan}>Phone:</span> [Your Phone Number]</p>
                                <p><span className={privacyPolicyStyles.contactInfoSpan}>Website:</span> [Your Website URL]</p>
                                <p><span className={privacyPolicyStyles.contactInfoSpan}>Last Updated:</span> [Insert Date]</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;