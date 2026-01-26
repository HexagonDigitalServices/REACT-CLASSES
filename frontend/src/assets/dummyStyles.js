// src/assets/dummyStyles.js

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Layout styles
export const layoutStyles = {
  container: "min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
  section: "max-w-7xl mx-auto mb-16 sm:mb-20",
  heroContainer: "text-center max-w-4xl mx-auto mb-16 sm:mb-20",
};

// Hero section styles
export const heroStyles = {
  title: "text-md whitespace-nowrap sm:text-4xl lg:text-5xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text p-2 text-transparent mb-4 sm:mb-6",
  subtitle: "text-sm sm:text-lg lg:text-xl text-gray-600",
};

// Core values section styles
export const coreValuesStyles = {
  grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8",
  card: "bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center sm:text-left",
  icon: "w-14 h-14 sm:w-16 sm:h-16 mb-5",
  title: "text-xl md:text-lg sm:text-2xl font-semibold mb-3 sm:mb-4",
  description: "text-gray-600 md:text-sm text-sm sm:text-base",
};

// Why choose us section styles
export const whyChooseUsStyles = {
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6",
  card: "bg-indigo-50 p-5 sm:p-6 rounded-xl group hover:bg-indigo-100 transition-colors",
  iconContainer: "p-3 bg-white rounded-lg shadow-sm",
  icon: "w-7 h-7 sm:w-8 sm:h-8 text-indigo-600",
  stat: "text-xl sm:text-2xl font-bold text-gray-900",
  statTitle: "text-gray-600 text-sm sm:text-base",
};

// Team section styles
export const teamStyles = {
  grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8",
  card: "group relative overflow-hidden rounded-2xl shadow-lg",
  image: "w-full h-72 sm:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105",
  overlay: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 sm:p-6",
  name: "text-white text-xl sm:text-2xl font-bold",
  role: "text-indigo-200 text-sm sm:text-base",
};

// Section header styles
export const sectionHeaderStyles = {
  container: "flex items-center justify-center mb-10 sm:mb-12 space-x-4 text-center",
  icon: "w-10 h-10 sm:w-12 sm:h-12",
  title: "text-3xl sm:text-4xl font-bold text-gray-900",
};

// Color classes (for dynamic usage)
export const colors = {
  indigo: "text-indigo-600",
  purple: "text-purple-600",
};

// Transitions
export const transitions = {
  hero: { duration: 0.8 },
  coreValues: (idx) => ({ delay: idx * 0.2 }),
  whyChooseUs: (idx) => ({ delay: idx * 0.1 }),
  team: (idx) => ({ delay: idx * 0.2 }),
};

export const contactStyles = {
  // Main container styles
  mainContainer: "pt-16 mt-16 flex items-center justify-center p-6",
  innerContainer: "bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto w-full flex flex-col md:flex-row lg:flex-row",
  
  // Description section styles
  descriptionSection: "flex flex-col lg:flex-row lg:items-center w-full lg:w-2/3 p-6 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
  descriptionContent: "space-y-6 w-full",
  heading: "text-3xl lg:text-4xl font-bold text-center border-b-2 whiteheading pb-4 pt-4",
  contactInfo: "space-y-2 text-md lg:text-lg",
  contactParagraph: "flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2",
  emailLink: "hover:underline text-sky-950 break-words",
  phoneLink: "hover:underline text-sky-950",
  
  // Form section styles
  formSection: "p-6 lg:p-10 w-full",
  formContainer: "space-y-4 bg-gray-50 p-6 rounded-lg shadow-lg",
  inputGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  input: "border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400",
  label: "block text-gray-600 mb-1 font-medium",
  requiredStar: "text-red-500",
  captchaLabel: "block text-gray-600 mb-2",
  
  // Button styles
  button: "w-full mt-[1.6rem] bg-emerald-500 hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
};

// assets/dummyStyles.js
export const faqPageStyles = {
  // Container styles
  container: "max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8",
  mainCard: "bg-white shadow-xl rounded-3xl mt-10 mb-10 p-4 sm:p-6 md:p-8",
  
  // Tab section styles
  tabSection: "flex justify-center",
  tabList: "flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0",
  
  // Tab button styles
  tabButton: "min-w-[60px] sm:min-w-[180px] px-4 py-2 sm:px-6 sm:py-3 text-xs md:text-lg lg:text-xl xl:text-xl sm:text-lg font-semibold transition-all duration-300 ease-in-out rounded-xl",
  tabButtonActive: "text-emerald-500 border-b-4 border-emerald-500 bg-emerald-50",
  tabButtonInactive: "text-gray-800 hover:text-emerald-500 bg-transparent",
  
  // FAQ section styles
  faqSection: "mt-6 sm:mt-8",
  faqHeading: "text-2xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-6 sm:mb-8",
  faqPanel: "space-y-4 sm:space-y-6",
  
  // FAQ item styles
  faqItem: "bg-amber-100 p-4 sm:p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:bg-white transition-all duration-300",
  faqQuestion: "text-lg sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3",
  faqAnswer: "text-sm sm:text-base text-gray-700 leading-relaxed"
};

// Export as default if needed
export default {
  faqPageStyles
};

// Add these to the existing dummyStyles.js file

// Footer styles
export const footerStyles = {
  // Container styles
  container: "bg-gradient-to-br from-zinc-900 to-zinc-800 text-gray-200 py-16 relative overflow-hidden",
  contentWrapper: "max-w-7xl mx-auto px-4 relative z-10",
  
  // Particles styles
  particlesContainer: "absolute inset-0 opacity-20 pointer-events-none",
  particle: "absolute w-1.5 h-1.5 bg-emerald-400 rounded-full animate-float",
  
  // Grid layout
  grid: "grid gap-8 mb-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4",
  
  // Brand section
  brandContainer: "space-y-6",
  logo: "text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300",
  description: "text-sm text-zinc-300 leading-relaxed",
  
  // Contact info
  contactContainer: "space-y-3",
  contactItem: "flex items-center space-x-3",
  contactIconContainer: "p-2 bg-gradient-to-br from-emerald-500/30 to-cyan-400/30 rounded-lg backdrop-blur-sm",
  contactIcon: "text-emerald-400 text-lg",
  contactLink: "text-zinc-300 hover:text-emerald-400 transition-all break-all",
  
  // Section headers
  sectionHeader: "text-lg sm:text-xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent",
  
  // Navigation links
  navList: "space-y-3",
  navItem: "group",
  navLink: "flex items-center space-x-3 text-zinc-300 hover:text-emerald-400 transition-all py-1",
  navIcon: "text-emerald-400 group-hover:scale-110 transition-transform",
  navText: "relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-px before:bg-emerald-400 before:transition-all before:duration-300 group-hover:before:w-full",
  
  // Social media
  socialContainer: "space-y-6",
  socialText: "text-sm text-zinc-300 leading-relaxed",
  socialIconsContainer: "flex flex-wrap gap-3",
  socialIcon: "p-3 rounded-xl backdrop-blur-sm bg-zinc-800/50 hover:bg-gradient-to-br from-emerald-500/50 to-cyan-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-400/20 inline-flex items-center justify-center",
  socialIconInner: "text-2xl text-emerald-400",
  
  // Copyright
  copyrightContainer: "relative pt-8 border-t border-zinc-700/50",
  copyrightText: "text-center text-sm text-zinc-400",
  copyrightLink: "font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform inline-block",
  
  // Animations (for particle positioning)
  particleAnimation: (i) => ({
    animationDelay: `${(i % 6) * 0.2}s`,
    transform: `scale(${0.8 + Math.random() * 0.8})`,
  }),
};

// Animation variants for Footer
export const footerAnimations = {
  footerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  columnVariants: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
};

// Responsive particle counts
export const particleCounts = {
  xs: 6,
  sm: 10,
  lg: 15,
};

// Add heroHomeStyles to the existing export object
export const heroHomeStyles = {
  // Main container styles
  mainContainer: "relative min-h-screen flex flex-col lg:flex-row items-center justify-center py-12 lg:py-0",
  
  // Left side content styles
  leftContainer: "w-full lg:w-1/2 mt-8 px-6 lg:px-12 pb-8 lg:pb-0 flex flex-col justify-center",
  leftContent: "space-y-8 lg:space-y-10 max-w-3xl mx-auto",
  boxRevealBg: "bg-emerald-500",
  
  // Text styles
  title: "font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-tight",
  titleDot: "text-orange-500",
  subtitle: "mt-2 text-sm sm:text-base md:text-lg lg:text-[1rem] text-gray-800",
  subtitleHighlight: "text-emerald-500 font-medium",
  description: "mt-4 text-sm sm:text-sm md:text-base text-gray-700",
  descriptionHighlight: "font-semibold text-emerald-500",
  
  // Button styles
  buttonsContainer: "mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4",
  buttonTutor: "w-full sm:w-auto mt-0 bg-emerald-500",
  buttonStudent: "w-full sm:w-auto mt-0 bg-blue-500",
  
  // Many_One styles
  manyOneContainer: "mt-8 mx-auto w-full max-w-3xl",
  
  // Mobile/Tablet styles
  mobileContainer: "lg:hidden mt-8 w-full max-w-3xl mx-auto",
  mobileLottieContainer: "w-full flex justify-center",
  mobileLottieStyle: { width: "100%", maxWidth: 560, height: "auto" },
  mobileFeatureGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 sm:px-6 mt-6",
  
  // Feature card styles (shared)
  featureCard: "bg-white shadow-md rounded-lg p-4 text-center",
  featureTitleMobile: "text-lg font-bold text-emerald-600",
  featureTitleDesktop: "text-xl md:text-lg lg:text-lg whitespace-nowrap xl:text-xl font-bold text-emerald-600",
  featureDescription: "text-gray-600 text-sm",
  
  // Right side desktop styles
  rightContainer: "hidden lg:flex lg:w-1/2 flex-col justify-center items-center space-y-8 px-10",
  desktopLottieStyle: { width: "100%", maxWidth: 600, height: "auto" },
  desktopFeatureGrid: "grid grid-cols-2 gap-4 w-full px-13",
};

// Add this to assets/dummyStyles.js
export const howItWorksPageStyles = {
  // Container styles
  container: "mt-10 pt-10",
  tabContainer: "flex justify-center",
  
  // Steps section
  stepsSection: "relative container mx-auto px-6 sm:px-12 py-16 sm:py-24 min-h-screen",
  
  // SVG line styles
  svgLine: "absolute top-0 left-1/2 transform -translate-x-1/2 z-10",
  
  // Step container
  stepContainer: "relative z-10 flex flex-col sm:flex-row items-center mb-12 sm:mb-16",
  stepContainerEven: "sm:flex-row-reverse",
  
  // Connector circle
  connectorCircle: "w-6 h-6 bg-emerald-600 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10",
  
  // Outer box
  outerBox: "relative flex flex-col items-start sm:items-center p-4 sm:p-6 bg-white shadow-lg rounded-3xl w-full sm:w-1/2",
  outerBoxEven: "sm:ml-auto",
  outerBoxOdd: "sm:mr-auto",
  
  // Inner colored box
  innerBox: "p-6 rounded-2xl w-full",
  
  // Title and description
  stepTitle: "text-lg sm:text-xl font-semibold mb-3",
  stepDescription: "text-gray-700 text-sm sm:text-base leading-relaxed",
  
  // Apply now button container
  applyContainer: "flex justify-center flex-none items-center rounded-full bg-white/75 bg-gradient-to-r from-pink-200/40 via-violet-200/40 to-indigo-200/40 border border-white/50 px-3 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl",
  
  // Apply now button
  applyButton: "rounded-r-[20px] rounded-l-[20px] ml-1.5 my-1 sm:text-sm bg-clip-padding px-4 py-2 bg-emerald-400 text-white hover:bg-emerald-500/80 shadow transition"
};

// Add these to the existing dummyStyles.js file

// Navbar styles
export const navbarStyles = {
  // Container and layout
  header: "navbar relative z-50 container mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center text-navy font-medium text-sm",
  container: "flex items-center justify-between w-full max-w-7xl mx-auto",
  
  // Logo
  logoContainer: "flex items-center -mx-3",
  logo: "w-auto h-12",
  
  // Desktop navigation
  desktopNav: "hidden lg:flex items-center justify-center flex-1",
  desktopNavInner: "flex items-center lg:gap-2 xl:gap-4 gap-4 whitespace-nowrap lg:text-xs xl:text-sm rounded-full bg-white/75 bg-gradient-to-r from-pink-200/40 via-violet-200/40 to-indigo-200/40 border border-white/50 px-5 py-4 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl",
  
  // Action buttons container
  actionButtonsContainer: "md:ml-3 lg:ml-3 xl:ml-3 flex-none flex items-center rounded-full px-2 sm:px-3 bg-white/75 bg-gradient-to-r from-pink-200/40 via-violet-200/40 to-indigo-200/40 border border-white/50 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl",
  
  // Individual buttons
  getTutorButton: "flex-none group relative text-xs sm:text-sm my-1 inline-flex items-center h-7 sm:h-8 pl-2 sm:pl-3 pr-2 sm:pr-[10px] bg-clip-padding rounded-l-[20px] rounded-r-[8px] border bg-white/40 border-white/90 shadow hover:text-blue-600 hover:bg-blue-50/40 transition-colors duration-300",
  registerTutorButton: "ml-1 my-1 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-clip-padding rounded-r-[20px] rounded-l-[8px] bg-emerald-400 text-white hover:bg-emerald-500/80 shadow transition",
  
  // Mobile menu button
  mobileMenuButton: "lg:hidden flex items-center justify-center text-2xl text-gray-800",
  
  // Mobile drawer
  mobileDrawer: (isOpen) => `fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-lg z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`,
  mobileDrawerContent: "flex flex-col items-start p-4 space-y-6 bg-white h-full",
  mobileLogoContainer: "h-12 w-auto sm:h-16 md:h-20 mx-auto",
  mobileLinksContainer: "max-h-full space-y-4 overflow-y-auto scrollbar-hidden",
  
  // Mobile action buttons
  mobileGetTutorButton: "block bg-emerald-400 text-white px-4 py-2 rounded-md mt-4 text-center",
  mobileRegisterTutorButton: "block bg-blue-500 text-white px-4 py-2 rounded-md text-center",
  
  // Overlay
  overlay: "fixed inset-0 bg-black opacity-40 z-30 lg:hidden",
  
  // Link classes (functions to generate dynamic classes)
  desktopLinkClass: (isActive) => {
    const base = "hover:text-blue-600 hover:bg-sky-50/40 transition-colors px-2 py-1 rounded";
    const active = "text-blue-600 bg-sky-50/60 ring-1 ring-blue-200 font-semibold";
    const inactive = "text-gray-800";
    return `${base} ${isActive ? active : inactive}`;
  },
  
  mobileLinkClass: (isActive) => {
    const base = "flex items-center text-sm py-1.5 transition-colors";
    const active = "text-sky-600 font-semibold";
    const inactive = "text-navy-950";
    return `${base} ${isActive ? active : inactive}`;
  },
};

// Dev auth helpers (for testing)
export const devAuth = {
  mockLoginTeacher: () => {
    // Simple mock used during frontend-only testing
    localStorage.setItem("authToken", "mock-token");
    localStorage.setItem("uid", "TCH-00123");
    localStorage.setItem(
      "teacherProfile",
      JSON.stringify({
        name: "Aman Sahu",
        uid: "TCH-00123",
        address: "Aashiana, Lucknow",
        _id: "teacher123",
      })
    );
    window.dispatchEvent(new Event("authChange"));
    alert("Mock teacher logged in (use window.devAuth.mockLogout() to clear).");
  },
  
  mockLogout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("teacherProfile");
    window.dispatchEvent(new Event("authChange"));
    alert("Mock logout done.");
  },
};

// Storage keys for consistency
export const storageKeys = {
  authToken: "authToken",
  uid: "uid",
  teacherProfile: "teacherProfile",
};

// Event names for consistency
export const events = {
  authChange: "authChange",
  storage: "storage",
};

// Add ourProcessStyles to the existing export object
export const ourProcessStyles = {
  // Section container styles
  sectionContainer: "min-h-screen flex flex-col items-center mt-14 py-10",
  
  // Heading styles
  heading: "text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center",
  
  // Grid container styles
  gridContainer: "w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  
  // Card (article) styles
  card: "bg-white rounded-lg shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow flex flex-col justify-between md:min-h-[420px] overflow-hidden",
  
  // Image container styles
  imageContainer: "relative w-full overflow-hidden rounded-md",
  image: "w-full object-cover h-44 sm:h-52 md:h-44 lg:h-52 rounded-md",
  
  // Text content styles
  textContainer: "mt-4 flex-1 flex flex-col",
  title: "text-lg sm:text-xl md:text-md lg:text-xl font-semibold text-emerald-600 mb-2 truncate",
  description: "text-sm sm:text-base text-gray-700 leading-relaxed mb-4",
  
  // Key benefits styles
  benefitsContainer: "mt-auto bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-3",
  benefitsTitle: "text-base sm:text-lg font-medium text-emerald-500 mb-3",
  benefitsList: "grid grid-cols-1 gap-2",
  benefitItem: "flex items-start sm:items-center space-x-3 text-gray-600",
  benefitIcon: "flex-shrink-0 text-lg sm:text-xl text-emerald-600",
  benefitText: "text-sm sm:text-sm",
  
  // Show more button styles
  showMoreButton: "mt-10 px-6 py-3 bg-emerald-600 text-white font-medium text-base rounded-full shadow-md hover:bg-emerald-700 transition"
};

// Add this to assets/dummyStyles.js
export const tutorHomePageStyles = {
  // Main container
  mainContainer: "relative min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-400 to-orange-300 text-gray-800",
  
  // Hero section
  heroSection: "z-10 py-12 lg:py-16",
  heroContainer: "max-w-9xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10",
  
  // Left content
  leftContent: "w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left",
  mainHeading: "font-bold text-white text-sm sm:text-4xl md:text-4xl lg:text-5xl lg:whitespace-nowrap leading-tight mb-6 text-center lg:text-left mx-auto lg:mx-0",
  
  // Text and Lottie layout
  textLottieContainer: "w-full flex flex-col md:flex-row lg:flex-row items-start gap-6",
  
  // Lottie for small screens
  lottieSmallContainer: "w-full lg:hidden",
  lottieSmallWrapper: "w-full flex justify-center",
  
  // CTA button
  ctaContainer: "w-full flex justify-center mt-8",
  ctaButton: "bg-white text-emerald-600 font-bold py-3 px-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300",
  
  // Right Lottie - desktop only
  lottieDesktopContainer: "hidden lg:flex lg:w-1/2 items-center justify-center",
  lottieDesktopSticky: "sticky top-0 w-full h-full flex items-center justify-center",
  
  // Features section
  featuresSection: "relative py-12 lg:py-20 bg-gradient-to-br from-emerald-50 to-sky-50 overflow-hidden",
  featuresContainer: "max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10",
  featuresGrid: "grid grid-cols-1 md:grid-cols-3 gap-6",
  
  // Feature card
  featureCard: "group bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all",
  featureIconContainer: "w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center mb-5 mx-auto",
  featureIcon: "text-xl text-white",
  featureTitle: "text-xl sm:text-2xl font-bold text-emerald-800 mb-3 text-center",
  featureDescription: "text-gray-600 text-center",
  
  // Bottom CTA section
  bottomCtaSection: "py-16 lg:py-24 bg-gradient-to-br from-emerald-400 to-sky-400 text-center",
  bottomCtaHeading: "text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6",
  bottomCtaParagraph: "text-lg text-emerald-100 mb-8 max-w-2xl mx-auto",
  bottomCtaButton: "bg-white text-emerald-600 font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
};


// Add getJobPageStyles to the existing export object
export const getJobPageStyles = {
  // Page container styles
  pageContainer: "min-h-screen mt-20 py-8 px-6 sm:px-12",
  
  // Title styles
  title: "text-4xl pb-10 font-extrabold text-gray-800 text-center mb-8",
  
  // Search bar styles
  searchContainer: "mb-12 text-center",
  searchWrapper: "relative w-full max-w-lg mx-auto flex items-center border border-gray-300 rounded-2xl shadow-sm bg-white",
  searchInput: "w-full p-2 pl-4 text-gray-900 rounded-2xl outline-none",
  searchIcon: "absolute right-3 text-gray-500 text-xl",
  
  // Loading styles
  loadingContainer: "text-center mb-6",
  loadingText: "text-sm text-gray-600 mt-2",
  
  // Jobs grid styles
  jobsGrid: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  
  // Job card styles
  jobCard: "mx-auto w-full max-w-xs bg-white rounded-xl shadow-sm p-2 text-gray-900 flex flex-col justify-between h-full",
  jobArticle: "flex flex-col h-full",
  
  // Job header styles
  jobCardHeader: "bg-amber-100 rounded-t-xl p-6 text-sm flex-grow",
  jobHeader: "flex justify-between items-center gap-4 font-bold",
  jobIdContainer: "flex items-center cursor-pointer justify-center w-8 h-8 bg-white hover:bg-sky-400 hover:text-white rounded-full",
  jobTitle: "my-2 text-lg font-semibold pr-8",
  jobDate: "my-2 text-sm text-gray-600 italic",
  jobDetailsContainer: "flex",
  jobDetail: "my-2 text-base pr-8",
  jobDetailLabel: "font-semibold",
  jobDescription: "my-2 text-base pr-8",
  
  // Job footer styles
  jobFooter: "flex flex-col gap-4 p-3 text-sm font-bold md:flex-row md:items-center md:justify-between",
  jobUserInfo: "flex items-center gap-4",
  jobUserIcon: "flex items-center gap-2",
  
  // Button styles
  appliedButton: "bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-bold cursor-not-allowed",
  applyButton: "bg-emerald-400 text-black py-2 px-4 rounded-lg hover:bg-cyan-400 text-sm font-bold",
  loginToApplyButton: "bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm",
  paginationButton: "px-4 py-2 bg-gray-300 text-gray-900 rounded-lg disabled:opacity-50",
  paginationContainer: "mt-8 flex justify-center items-center gap-4",
  
  // Loading overlay styles
  loadingOverlay: "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50",
  loadingSpinnerContainer: "flex items-center justify-center bg-white p-4 rounded-full shadow-lg w-24 h-24",
  
  // Thank you popup styles
  thankYouPopupOverlay: "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50",
  thankYouPopup: "bg-white p-6 rounded-3xl shadow-lg w-80 text-center",
  thankYouAnimation: { height: 200, margin: "0 auto" },
  thankYouTitle: "text-xl font-bold text-emerald-700 mt-2",
  thankYouMessage: "text-sm text-gray-700 mt-2",
  
  // No jobs message
  noJobsMessage: "text-center text-gray-600",
};

// Add this to assets/dummyStyles.js
export const privacyPolicyStyles = {
  // Main container
  mainContainer: "bg-gradient-to-b from-blue-100 to-blue-300 mt-16 pt-16 py-10 px-5",
  
  // Content container
  contentContainer: "max-w-5xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-200 overflow-auto",
  
  // Main heading
  mainHeading: "text-5xl font-extrabold text-gray-800 mb-8 text-center font-serif",
  mainHeadingSpan: "text-indigo-600",
  
  // Introductory paragraph
  introParagraph: "text-gray-700 text-xl mb-8 text-center leading-relaxed",
  introSpan: "font-semibold text-indigo-500",
  
  // Section container
  sectionContainer: "space-y-12 text-justify leading-relaxed",
  
  // Section heading
  sectionHeading: "text-3xl font-bold text-gray-800 mb-4 flex items-center font-serif",
  sectionIcon: "text-indigo-500 mr-3 text-2xl",
  
  // Sub-heading
  subHeading: "text-xl font-semibold text-gray-700 mb-2",
  
  // Paragraph text
  paragraph: "text-gray-600 text-lg mb-4",
  paragraphNoMargin: "text-gray-600 text-lg",
  
  // Unordered list
  unorderedList: "list-disc pl-6 text-gray-600 space-y-2 text-lg",
  
  // Contact section
  contactSection: "bg-indigo-50 p-6 rounded-lg shadow-md",
  contactHeading: "text-2xl font-semibold text-indigo-600 mb-4 text-center font-serif",
  contactParagraph: "text-gray-600 text-lg text-center",
  contactInfo: "text-gray-600 mt-4 space-y-2 text-center",
  contactInfoSpan: "font-semibold"
};

// Add this to assets/dummyStyles.js
export const termsConditionStyles = {
  // Main container
  mainContainer: "bg-gradient-to-br from-blue-50 to-purple-100 mt-8 pt-16 py-10 px-5",
  
  // Content wrapper
  contentWrapper: "max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8",
  
  // Main heading
  mainHeading: "text-4xl sm:text-5xl font-serif text-center text-indigo-700 mb-8",
  
  // Introductory paragraph
  introParagraph: "text-lg sm:text-xl text-center text-gray-700 mb-6 leading-relaxed",
  introSpan: "font-semibold text-indigo-600",
  
  // Main content card
  contentCard: "bg-white shadow-2xl rounded-lg p-8 sm:p-10 md:p-12 border-t-4 border-indigo-500",
  
  // Section container
  sectionContainer: "space-y-10",
  
  // Section heading
  sectionHeading: "text-2xl sm:text-3xl font-serif font-bold text-indigo-600",
  
  // Section paragraph
  sectionParagraph: "text-gray-700 text-lg mt-4 leading-relaxed",
  sectionSpan: "font-semibold text-indigo-600",
  
  // Sub-section heading
  subSectionHeading: "text-xl sm:text-2xl font-semibold mt-6 text-indigo-500",
  
  // Unordered list
  unorderedList: "list-disc pl-8 text-gray-700 text-lg space-y-3 mt-4 leading-relaxed",
  listItemSpan: "font-semibold text-indigo-600",
  
  // Strong text (for bold text inside paragraphs)
  strongText: "text-indigo-500"
};

// Add this to assets/dummyStyles.js
export const fullRegistrationStyles = {
  // Main container
  mainContainer: "min-h-screen flex items-center py-32 justify-center overflow-y-auto overflow-x-hidden",
  
  // Content wrapper
  contentWrapper: "container mx-auto px-4",
  
  // Layout
  layoutContainer: "flex flex-wrap sm:flex-nowrap md:flex-nowrap lg:gap-24 items-center lg:flex-nowrap",
  lottieContainer: "w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0",
  formContainer: "w-full lg:w-1/2 bg-white shadow-lg rounded-3xl p-8",
  
  // Step 1: Basic Info
  step1Heading: "text-xl font-semibold text-center",
  step1Subtitle: "text-center text-gray-500 mt-2",
  step1Form: "space-y-6 mt-6",
  step1InputContainer: "block text-sm font-medium text-gray-700",
  step1Input: "w-full px-4 py-2 border rounded-lg",
  passwordContainer: "relative",
  passwordToggle: "absolute top-2.5 right-3 cursor-pointer text-gray-600",
  checkboxContainer: "flex items-center",
  checkboxInput: "w-4 h-4",
  checkboxLabel: "ml-2 text-sm text-gray-600",
  checkboxLink: "text-blue-600 hover:underline",
  submitButton: "w-full bg-blue-600 text-white px-4 py-2 rounded-lg",
  loginLinkContainer: "mt-4 text-center",
  loginLinkText: "text-sm text-gray-600",
  loginLink: "text-blue-600 hover:underline",
  
  // Step 2: Location & Subjects
  step2Header: "flex items-center justify-between",
  stepCircleContainer: "text-center",
  stepCircle: "w-8 h-8 rounded-full flex items-center justify-center",
  stepCircleActive: "bg-emerald-500 text-white",
  stepCircleInactive: "bg-gray-300 text-gray-600",
  stepLabel: "block mt-2",
  stepProgressBar: "flex-1 h-1 mx-2 bg-gray-300 relative",
  stepProgressFill: "absolute left-0 top-0 h-full bg-emerald-500",
  step2Title: "text-2xl font-semibold text-center",
  
  // City/Area Selection
  gridContainer: "grid grid-cols-2 gap-4",
  selectLabel: "block text-sm font-medium",
  searchContainer: "relative",
  searchInput: "w-full pl-10 px-4 py-2 border rounded-md",
  searchIcon: "absolute top-3 left-3 text-gray-400",
  dropdownContainer: "h-32 overflow-y-auto border rounded-md mt-1 bg-white",
  dropdownItem: "p-2 cursor-pointer",
  selectedItem: "mt-2 text-emerald-600 font-medium",
  
  // Class Selection
  classSectionTitle: "font-semibold mb-2",
  classGrid: "grid grid-cols-3 lg:grid-cols-4 gap-2 mb-4",
  classButton: "py-2 px-1 lg:px-1 md:text-xs xl:text-lg md:px-0 lg:text-sm border rounded-md",
  classButtonActive: "bg-emerald-500 text-white",
  classButtonInactive: "bg-gray-100",
  
  // Subject Selection
  subjectContainer: "mb-4",
  subjectTitle: "font-semibold",
  subjectGrid: "grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2",
  subjectButton: "py-2 px-4 text-xs xl:text-lg lg:text-md border rounded-md",
  
  // Navigation Buttons
  navButtonsContainer: "flex justify-end",
  nextButton: "py-2 px-4 rounded",
  nextButtonActive: "bg-emerald-500 text-white",
  nextButtonDisabled: "bg-gray-300",
  
  // Step 3: Profile Details
  step3Form: "space-y-6",
  fileUploadContainer: "flex flex-col lg:flex-row xl:flex-row gap-4 items-center space-x-3",
  fileUploadInput: "block text-sm border rounded-md px-1 py-2 bg-white",
  imagePreview: "w-20 h-20 rounded-full object-cover",
  requiredFieldError: "text-red-500 text-xs mt-1",
  selectInput: "w-full px-4 py-2 border rounded-md bg-white",
  yearMonthGrid: "grid grid-cols-2 gap-4",
  textareaInput: "w-full px-4 py-2 border rounded-md",
  
  // Step Navigation
  stepNavContainer: "flex justify-between gap-4",
  backButton: "py-2 px-4 bg-gray-300 rounded",
  
  // Step 4: Payment
  paymentContainer: "space-y-6",
  paymentCard: "w-full max-w-md text-center bg-white p-6 rounded-md shadow mx-auto",
  paymentText: "text-lg mb-4",
  paymentAmount: "text-3xl font-bold mb-4",
  paymentStatus: "mb-4",
  paymentSuccess: "text-green-600",
  paymentPending: "text-gray-600",
  paymentDetailsContainer: "mt-4 text-xs text-gray-500 text-left",
  
  // Thank You Popup
  thankYouOverlay: "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 overflow-y-auto ",
  thankYouModal: "bg-white p-8 rounded-3xl shadow-lg w-96 text-center",
  thankYouHeading: "text-2xl font-bold text-emerald-700 mb-4",
  thankYouText: "text-lg text-gray-700 mb-2",
  uidText: "text-md text-gray-800 mb-4",
  loadingBarContainer: "relative w-full h-2 bg-gray-200 rounded-full overflow-hidden",
  loadingBar: "absolute h-full bg-emerald-400 animate-loading-bar"
};

// For the loader component (if not already in dummyStyles)
export const loaderStyles = {
  loaderContainer: "flex items-center justify-center min-h-screen"
};

// Add this to assets/dummyStyles.js
export const searchHomeTutorStyles = {
  // Main container
  mainContainer: "p-6 mt-20 min-h-screen",
  
  // Layout container
  layoutContainer: "flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto",
  
  // Filter sidebar
  filterSidebar: "lg:w-1/3 p-4 shadow-md rounded-3xl h-auto lg:sticky top-20 bg-white max-h-[80vh] overflow-y-auto",
  filterHeaderContainer: "flex justify-center items-center",
  filterHeader: "text-lg font-extrabold text-center mb-4 mr-2",
  filterIcon: "text-2xl",
  
  // Filter form
  filterForm: "grid grid-cols-1 gap-4",
  filterLabel: "block text-sm lg:text-base font-bold text-gray-800",
  filterSelect: "w-full text-sm lg:text-base p-2 border border-gray-300 rounded-lg",
  filterInput: "w-full text-sm lg:text-base p-2 border border-gray-300 rounded-lg",
  
  // Gender selection
  genderSection: "text-sm lg:text-base font-bold text-gray-800",
  genderContainer: "flex gap-2 p-2",
  genderLabel: "flex h-16 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-1",
  genderLabelActive: "border-emerald-500 shadow-md",
  genderLabelInactive: "border-gray-300 bg-gray-50",
  genderText: "text-sm uppercase text-gray-500",
  genderRadio: "sr-only",
  
  // Filter buttons
  filterButtonsContainer: "my-6 flex flex-wrap items-center gap-4 justify-between",
  searchButton: "bg-sky-500 text-white text-sm lg:text-base font-bold px-4 py-2 rounded-lg shadow hover:shadow-md",
  clearButton: "bg-gray-500 text-white text-sm lg:text-base font-bold px-4 py-2 rounded-lg shadow hover:shadow-md",
  
  // Main content
  mainContent: "flex-1 overflow-auto",
  mainHeading: "text-3xl font-extrabold mb-4",
  
  // Loading and error states
  loadingText: "text-center py-8 text-gray-600",
  errorText: "text-center py-4 text-red-600",
  noResultsText: "text-center text-gray-600",
  
  // Tutor cards
  tutorCardsContainer: "space-y-6",
  tutorCard: "flex flex-col sm:flex-row gap-4 bg-white p-4 shadow-md rounded-3xl relative",
  tutorImage: "w-28 h-36 object-cover rounded-tl-2xl",
  tutorInfo: "flex-grow",
  tutorName: "text-base font-bold",
  tutorDetail: "text-base text-gray-700",
  tutorBoldDetail: "text-base font-bold text-gray-800 mt-2",
  viewProfileButton: "rounded-r-[8px] rounded-l-[20px] ml-1.5 my-1 sm:text-sm bg-emerald-400 text-white hover:bg-emerald-500/80 shadow transition px-4 py-2 absolute top-4 right-4",
  
  // Pagination
  paginationContainer: "flex justify-center mt-6 space-x-4",
  paginationButton: "px-4 py-2 rounded-2xl",
  paginationPreviousNext: "px-4 py-2 text-sm font-semibold bg-emerald-200 rounded-2xl",
  paginationDisabled: "disabled:opacity-70",
  paginationPageActive: "bg-emerald-500 text-white",
  paginationPageInactive: "bg-emerald-200 text-black",
  
  // Page info
  pageInfo: "text-right text-sm text-gray-500 mt-4"
};

// Add teacherLoginStyles to the existing export object
export const teacherLoginStyles = {
  // Page container styles
  pageContainer: "min-h-screen flex items-center py-24 justify-center",
  innerContainer: "container mx-auto px-4",
  flexWrapper: "flex flex-wrap lg:gap-24 items-center md:flex-nowrap sm:flex-nowrap xl:flex-nowrap lg:flex-nowrap",
  
  // Image styles
  imageContainer: "w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0",
  image: "w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto",
  
  // Form container styles
  formContainer: "w-full lg:w-1/2 bg-white shadow-lg rounded-3xl p-8",
  formTitle: "title",
  formSubtitle: "text-center text-gray-500 mt-2",
  
  // Form styles
  form: "space-y-6 mt-6",
  formField: "space-y-2",
  fieldLabel: "block text-sm font-medium text-gray-700",
  inputField: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
  passwordContainer: "relative",
  passwordInput: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10",
  togglePasswordButton: "absolute inset-y-0 right-0 pr-3 flex items-center",
  passwordIcon: "w-5 h-5 text-gray-500",
  
  // Checkbox styles
  checkboxContainer: "flex items-center",
  checkbox: "w-4 h-4 text-blue-500 border-gray-300 rounded",
  checkboxLabel: "ml-2 text-sm text-gray-600",
  
  // Button styles
  submitButton: "w-full btn text-white bg-blue-600 hover:bg-blue-700 cursor-pointer mt-2 flex items-center justify-center space-x-2 border border-gray-50 px-4 py-2 rounded-lg shadow hover:shadow-md hover:border-gray-100 transition",
  
  // Link styles
  linkContainer: "mt-4 text-center",
  linkText: "text-sm text-gray-600",
  link: "text-blue-600 hover:underline",
  
  // Toast styles
  errorToast: {
    position: "top-right",
    autoClose: 3000,
  },
  successToast: {
    position: "top-right", 
    autoClose: 2000,
  },
  timeoutToast: {
    position: "top-right",
    autoClose: 4000,
  }
};

// Add tutorProfileStyles to the existing export object
export const tutorProfileStyles = {
  // Loading states
  loadingContainer: "mt-20 min-h-screen flex items-center justify-center",
  loadingText: "text-gray-600",
  notFoundContainer: "text-center text-red-500 mt-20 min-h-screen",
  
  // Main container
  mainContainer: "mt-20 p-6 min-h-screen",
  
  // Contact modal styles
  contactModalOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
  contactModal: "bg-white rounded-lg p-6 max-w-md w-full",
  contactModalTitle: "text-2xl font-bold text-emerald-600 mb-4",
  errorMessage: "mb-3 text-sm text-red-600",
  contactForm: "space-y-4",
  formLabel: "block text-gray-700 mb-2",
  formInput: "w-full p-2 border rounded",
  formTextarea: "w-full p-2 border rounded",
  formButtonContainer: "mt-6 flex justify-end space-x-3",
  cancelButton: "px-4 py-2 text-gray-600 hover:text-gray-800",
  submitButton: "px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50",
  
  // Profile header styles
  profileCard: "max-w-6xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden relative",
  uidBadge: "absolute top-4 right-0 bg-orange-500 border border-gray-100 text-white text-sm font-semibold px-4 py-2 rounded-l-xl",
  
  // Profile header
  profileHeader: "flex flex-col md:flex-row items-center p-8 bg-emerald-500 text-white",
  profileImageContainer: "flex-shrink-0",
  profileImage: "w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover",
  profileInfo: "mt-6 md:mt-0 md:ml-8 text-center md:text-left",
  profileName: "text-3xl font-bold",
  profileMajor: "mt-2 text-lg",
  profileLocation: "mt-1 text-sm",
  contactButton: "mt-4 bg-white text-emerald-500 px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transition",
  thankYouMessage: "mt-3 text-green-200",
  lastRequestInfo: "mt-2 text-sm text-white/90",
  lastRequestId: "font-medium",
  
  // Video section styles
  videoSection: "p-8 border-t border-gray-200",
  videoTitle: "text-2xl font-bold text-gray-800 mb-6",
  
  // Video player container
  videoContainer: "relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300",
  youtubeEmbed: "w-full aspect-video rounded overflow-hidden border border-gray-200",
  driveEmbed: "w-full aspect-video rounded overflow-hidden border border-gray-200",
  fallbackVideoContainer: "w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center",
  fallbackIcon: "w-24 h-24 text-gray-400 mb-4",
  fallbackText: "text-gray-500 font-medium",
  videoTypeIndicator: "mt-4 flex items-center justify-center text-gray-500 text-sm",
  videoIcon: "mr-2",
  youtubeIconColor: "text-red-600",
  driveIconColor: "text-blue-600",
  
  // About section
  aboutSection: "p-8",
  aboutTitle: "text-2xl font-bold text-gray-800",
  aboutText: "mt-4 text-gray-600 leading-relaxed",
  
  // Divider
  divider: "border-gray-300",
  
  // Teaching details & skills grid
  detailsGrid: "p-8 grid grid-cols-1 md:grid-cols-2 gap-8",
  sectionTitle: "text-2xl font-bold text-gray-800",
  detailText: "mt-4 text-gray-700",
  strongText: "font-bold",
  
  // Classes and subjects section
  classesSection: "p-8",
  classesTitle: "text-2xl font-bold text-gray-800",
  classesGrid: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4",
  noClassesText: "text-gray-500",
  classCard: "bg-gray-50 p-4 border border-l-2 border-l-sky-600 rounded-lg shadow-sm",
  classGrade: "text-lg font-bold text-emerald-500",
  classSubjects: "text-gray-600 mt-2",
  
  // Image hover effects
  imageHover: "group-hover:blur-sm transition-all duration-300",
  
  // Iframe styles
  iframe: "w-full h-full",
};

// Add sideNavStyles to the existing export object
export const sideNavStyles = {
  // Mobile hamburger button
  hamburgerButton: "lg:hidden fixed top-20 left-4 z-5 bg-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300",
  
  // Mobile overlay
  mobileOverlay: "lg:hidden fixed inset-0 z-50 transition-all duration-300",
  mobileOverlayVisible: "pointer-events-auto",
  mobileOverlayHidden: "pointer-events-none",
  overlayBackground: "absolute inset-0 bg-black transition-opacity duration-300",
  overlayVisible: "opacity-40",
  overlayHidden: "opacity-0",
  
  // Mobile drawer
  mobileDrawer: "absolute left-0 top-32 h-[calc(100%-8rem)] bg-white rounded-r-2xl shadow-lg w-64 transform transition-transform duration-300 p-0 m-0",
  drawerOpen: "translate-x-0",
  drawerClosed: "-translate-x-full",
  
  // Drawer header
  drawerHeader: "p-3 flex items-center justify-between border-b",
  drawerTitle: "text-sm font-semibold",
  closeButton: "p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-300",
  
  // Desktop sidebar
  desktopSidebar: "hidden lg:block bg-white rounded-2xl shadow-lg transition-all duration-300",
  sidebarExpanded: "w-60 sm:w-64 md:w-64 lg:w-72",
  sidebarCollapsed: "w-20",
  
  // Sidebar header
  sidebarHeader: "p-3 sm:p-4 border-b flex justify-between items-center",
  sidebarTitle: "titles",
  sidebarToggleButton: "text-gray-700",
  
  // Navigation
  navContainer: "p-3 sm:p-4 space-y-3 sm:space-y-4",
  navButton: "w-full text-left text-gray-700 hover:bg-blue-100 p-2 rounded-lg flex items-center",
  navIcon: "mx-2 text-emerald-700 text-lg",
  navButtonWithBadge: "w-full relative text-left flex items-center gap-3 p-2 rounded-lg transition",
  badge: "absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500 text-white",
};

// Add this to assets/dummyStyles.js
export const editProfileStyles = {
  // Main container
  mainContainer: "flex-1 p-4 sm:p-6 lg:p-6",
  
  // Loading state
  loadingContainer: "text-md sm:text-4xl font-extrabold text-gray-800 mb-6",
  
  // Main heading
  mainHeading: "text-2xl sm:text-4xl font-extrabold text-gray-800 mb-6",
  
  // Sub-navbar
  subNavbar: "flex space-x-4 border-b-2 pb-2 mb-6 overflow-x-auto no-scrollbar",
  subNavbarButton: "whitespace-nowrap px-1",
  subNavbarButtonActive: "text-blue-600 font-semibold border-b-2 border-blue-600",
  subNavbarButtonInactive: "text-gray-500 hover:text-blue-600",
  
  // Form containers
  formContainer: "w-full max-w-4xl bg-white p-4 sm:p-6 shadow-lg rounded-lg mx-auto",
  formHeading: "text-xl font-bold text-gray-700 mb-4",
  
  // Form grid
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  formFullWidth: "md:col-span-2",
  
  // Labels and inputs
  formLabel: "block text-gray-700 font-medium mb-2",
  formInput: "w-full border border-gray-300 rounded-lg px-3 py-2",
  formTextarea: "w-full border border-gray-300 rounded-lg px-3 py-2",
  formSelect: "w-full border border-gray-300 rounded-lg px-3 py-2",
  
  // Experience grid
  experienceGrid: "grid grid-cols-2 gap-3",
  
  // Divider
  divider: "my-8 border-emerald-300",
  
  // File input
  fileInput: "block w-full text-sm md:text-lg xl:text-lg text-gray-500",
  
  // Button container
  buttonContainer: "mt-6 text-right",
  submitButton: "w-full sm:w-auto bg-emerald-500 text-white px-6 py-2 rounded-2xl hover:bg-emerald-600",
  
  // City/Area search
  searchContainer: "relative",
  searchInput: "w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg",
  searchIcon: "absolute top-3 left-3 text-gray-400",
  dropdownContainer: "h-36 sm:h-32 overflow-y-auto border border-gray-300 rounded-lg mt-1 bg-white",
  dropdownItem: "p-2 cursor-pointer text-sm",
  selectedItem: "mt-2 text-emerald-600 font-medium text-sm",
  
  // Class/subject selection
  classSection: "mt-4 w-full",
  classGrid: "grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4",
  subjectGrid: "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2",
  classSubjectButton: "py-2 px-3 text-sm border rounded-md truncate",
  classSubjectButtonActive: "bg-emerald-500 text-white",
  classSubjectButtonInactive: "bg-gray-100 hover:bg-emerald-100",
  
  // Video preview
  videoPreviewContainer: "mt-4",
  videoPreviewLabel: "text-sm font-medium mb-2",
  videoPreviewFrame: "w-full aspect-video rounded overflow-hidden border border-gray-200",
  videoPreviewIframe: "w-full h-full",
  videoPreviewNote: "mt-2 text-sm text-gray-500",
  videoPreviewError: "mt-3 text-sm text-red-600"
};

// Add to src/assets/dummyStyles.js

export const studentRequestsStyles = {
  // Layout
  container: "min-h-screen p-2 sm:p-6 bg-gray-50 overflow-x-hidden box-border",
  innerContainer: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  headerContainer: "mb-6 sm:mb-8 text-center",
  title: "text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 break-words",
  subtitle: "text-xs sm:text-sm md:text-base text-gray-500 mt-2",
  
  // State messages
  loading: "text-center text-gray-600",
  error: "text-center text-red-600",
  noRequests: "col-span-full text-center text-gray-500",
  
  // Grid
  grid: "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
  
  // Card
  card: "w-full bg-white rounded-xl shadow-sm p-0 sm:p-3 text-gray-900 flex flex-col h-full border overflow-hidden min-w-0",
  cardArticle: "flex flex-col h-full min-w-0",
  cardHeaderSection: "bg-amber-100 rounded-t-xl p-3 sm:p-4 flex-grow min-w-0",
  cardHeader: "flex justify-between items-start gap-4",
  requestIdContainer: "min-w-0",
  requestIdLabel: "text-xs text-gray-600",
  requestIdValue: "mt-1 text-sm font-bold break-all whitespace-normal",
  indexBadge: "flex items-center justify-center w-8 h-8 bg-white rounded-full text-sm font-semibold text-gray-700 flex-shrink-0",
  
  // Card body
  cardBody: "mt-3 text-sm text-gray-700 min-w-0",
  parentName: "text-base font-semibold text-gray-800 break-words",
  parentNameValue: "font-bold text-emerald-700",
  mobileLabel: "mt-3 text-sm text-gray-700",
  mobileValue: "text-base break-words whitespace-normal",
  addressLabel: "mt-3 text-sm text-gray-700",
  addressValue: "text-base break-words whitespace-normal",
  postedDate: "mt-4 text-sm text-gray-500 italic",
  
  // Card footer
  cardFooter: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 text-sm font-medium min-w-0",
  dateContainer: "w-full sm:w-auto min-w-0",
  dateLabel: "text-xs text-gray-400",
  dateValue: "text-sm text-gray-800 truncate",
  timeContainer: "w-full sm:w-auto text-right min-w-0",
  timeLabel: "text-xs text-gray-400",
  timeValue: "text-sm text-gray-800 truncate",
};

// Add viewProfileStyles to the existing export object
export const viewProfileStyles = {
  // Loading state
  loadingContainer: "text-center text-gray-700 mt-20",
  
  // Main container
  mainContainer: "mt-20 flex p-6 min-h-screen",
  sidebar: "sticky top-0",
  contentContainer: "flex-1 mx-5 bg-white rounded-3xl shadow-lg overflow-hidden relative",
  
  // UID Tag
  uidBadge: "absolute top-4 right-0 bg-orange-500 border border-gray-100 text-white text-sm font-semibold px-4 py-2 rounded-l-xl",
  
  // Outlet container
  outletContainer: "p-8",
  
  // Header Section
  headerSection: "flex flex-col md:flex-row items-center p-8 bg-emerald-500 text-white",
  profileImageContainer: "flex-shrink-0",
  profileImage: "w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover",
  profileInfo: "mt-6 md:mt-0 md:ml-8 text-center md:text-left",
  profileName: "text-3xl font-bold",
  profileMajor: "mt-2 text-lg",
  profileLocation: "mt-1 text-sm",
  profileContact: "mt-2 text-sm font-light",
  
  // Video Section
  videoSection: "p-8 border-t border-gray-200",
  videoTitle: "text-2xl font-bold text-gray-800 mb-6",
  videoTypeLabel: "text-sm font-medium mb-2",
  youtubeEmbed: "w-full aspect-video rounded overflow-hidden border border-gray-200",
  driveEmbed: "w-full aspect-video rounded overflow-hidden border border-gray-200",
  iframe: "w-full h-full",
  
  // Fallback video card
  fallbackVideoCard: "relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300",
  fallbackVideoContainer: "w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center",
  fallbackIcon: "w-24 h-24 mb-4",
  youtubeIconColor: "text-red-600",
  driveIconColor: "text-blue-600",
  lockIconColor: "text-gray-400",
  fallbackContent: "absolute inset-0 flex flex-col items-center justify-center p-6 text-center",
  fallbackIconHover: "mb-4 transition-transform group-hover:scale-110",
  fallbackTitle: "text-xl font-bold text-gray-800",
  fallbackAction: "flex items-center justify-center text-emerald-600 font-medium",
  fallbackDescription: "text-sm text-gray-600 mt-2",
  
  // Video type indicator
  videoTypeIndicator: "mt-4 flex items-center justify-center text-gray-500 text-sm",
  videoIcon: "mr-2",
  
  // About Section
  aboutSection: "p-8",
  aboutTitle: "text-2xl font-bold text-gray-800",
  aboutText: "mt-4 text-gray-600 leading-relaxed",
  
  // Divider
  divider: "border-gray-300",
  
  // Teaching Details Section
  detailsGrid: "p-8 grid grid-cols-1 md:grid-cols-2 gap-8",
  sectionTitle: "text-2xl font-bold text-gray-800",
  detailText: "mt-4 text-gray-700",
  strongText: "font-bold",
  
  // Classes and Subjects Section
  classesSection: "p-8",
  classesTitle: "text-2xl font-bold text-gray-800",
  classesGrid: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4",
  noClassesText: "text-gray-500",
  classCard: "bg-gray-50 p-4 border border-l-2 border-l-sky-500 rounded-lg shadow-sm",
  classGrade: "text-lg font-bold text-emerald-500",
  classSubjects: "text-gray-600 mt-2",
};