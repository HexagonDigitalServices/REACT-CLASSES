// Add to src/assets/dummyStyles.js

export const adminLoginStyles = {
  // Layout
  container: "min-h-screen bg-gray-50 flex items-center justify-center p-6",
  card: "w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden",
  cardContent: "p-6",
  
  // Header
  title: "text-2xl font-bold text-gray-900 mb-1",
  subtitle: "text-sm text-gray-500 mb-6",
  
  // Error Messages
  serverError: "mb-4 text-sm text-red-700 bg-red-50 p-3 rounded",
  fieldError: "text-xs text-red-600 mt-1",
  
  // Form Elements
  label: "block mb-2 text-xs font-medium text-gray-600",
  inputBase: "block w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400",
  inputNormal: "border-gray-200",
  inputError: "border-red-300",
  
  // Password Input Container
  passwordContainer: "relative",
  passwordToggle: "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 p-1 rounded",
  
  // Submit Button
  submitButton: "mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60",
  
  // Footer
  footerNote: "mt-5 text-xs text-gray-500",
};

// Add this to assets/dummyStyles.js
export const contactSubmissionsStyles = {
  // Main container
  mainContainer: "p-6 pt-14",
  
  // Header section
  headerContainer: "flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4",
  headerTitle: "text-2xl font-bold text-gray-800",
  headerSubtitle: "text-sm text-gray-500 mt-1",
  
  // Stats section
  statsContainer: "flex items-center gap-3 flex-wrap",
  statsLabel: "text-sm text-gray-500",
  statsCard: "bg-white/90 px-3 py-2 rounded-lg shadow text-sm",
  statsCardLabel: "text-xs text-gray-500",
  statsCardValue: "font-semibold text-gray-900",
  
  // Search section
  searchContainer: "mb-6 flex flex-col sm:flex-row gap-4",
  searchWrapper: "relative flex-1 max-w-lg",
  searchIconWrapper: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
  searchIcon: "h-5 w-5 text-gray-400",
  searchInput: "focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-200 rounded-lg bg-white/90 shadow-sm",
  
  // Loading and empty states
  loadingText: "text-center py-8",
  emptyStateContainer: "bg-white rounded-lg shadow p-6 text-center",
  emptyStateText: "text-gray-500",
  
  // Mobile/Tablet cards
  mobileCardsContainer: "lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4",
  mobileCard: "bg-white shadow overflow-hidden rounded-2xl border border-white/20 p-4",
  cardHeader: "flex items-start justify-between gap-3",
  avatarContainer: "flex items-start",
  avatar: "flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold",
  avatarTextContainer: "ml-3",
  avatarName: "text-sm font-medium text-gray-900",
  avatarContact: "text-sm text-gray-500",
  tutorInfoContainer: "text-right",
  tutorName: "text-sm text-gray-900",
  tutorUid: "text-xs text-gray-400 mt-1",
  cardFooter: "mt-3 flex items-center justify-between text-sm text-gray-500",
  viewButton: "text-blue-600 hover:text-blue-900 inline-flex items-center text-sm",
  deleteButton: "text-red-600 hover:text-red-800 inline-flex items-center text-sm",
  
  // Desktop table
  desktopTableContainer: "hidden lg:block bg-white shadow overflow-hidden rounded-lg",
  table: "min-w-full divide-y divide-gray-200",
  tableHeader: "bg-gray-50",
  tableHeaderCell: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  tableBody: "bg-white divide-y divide-gray-200",
  tableRow: "hover:bg-gray-50",
  tableCell: "px-6 py-4 whitespace-nowrap",
  tableCellAvatarContainer: "flex items-center",
  tableCellAvatar: "flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold",
  tableCellAvatarText: "ml-4",
  tableCellAvatarName: "text-sm font-medium text-gray-900",
  tableCellAvatarContact: "text-sm text-gray-500",
  tableCellTutorName: "text-sm text-gray-900",
  tableCellTutorUid: "text-sm text-gray-500",
  tableCellDate: "text-sm text-gray-500",
  tableCellTime: "text-xs text-gray-400",
  tableActions: "px-6 py-4 whitespace-nowrap text-sm font-medium",
  tableActionButton: "text-blue-600 hover:text-blue-900 mr-3",
  tableDeleteButton: "text-red-600 hover:text-red-800",
  
  // Modal
  modalOverlay: "fixed inset-0 overflow-y-auto z-50 flex items-start md:items-center justify-center p-4",
  modalBackdrop: "fixed inset-0 bg-black/45 backdrop-blur-sm",
  modalContainer: "relative w-full max-w-3xl mx-auto mt-20 md:mt-0 transform rounded-2xl bg-white/90 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden",
  modalContent: "p-6 max-h-[80vh] overflow-y-auto",
  modalHeader: "flex justify-between items-start pb-3 border-b border-white/20",
  modalTitle: "text-xl font-medium text-gray-900",
  modalSubtitle: "mt-2 text-sm font-semibold text-indigo-700",
  modalSubtitleSpan: "font-medium text-gray-900",
  modalRequestId: "mt-2 text-xs text-gray-500",
  modalRequestIdSpan: "text-gray-700 font-medium",
  modalCloseButton: "text-gray-400 hover:text-gray-600",
  modalCloseIcon: "w-6 h-6",
  
  // Modal content sections
  modalSection: "mt-4 space-y-4",
  modalInfoCard: "p-4 rounded-xl bg-gradient-to-br from-white/60 to-slate-50/60 border border-white/10 shadow-sm",
  modalInfoTitle: "text-sm font-medium text-slate-700 mb-3",
  modalInfoGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  modalInfoItem: "flex items-center text-sm text-gray-800",
  modalInfoIconWrapper: "inline-flex items-center justify-center w-8 h-8 rounded-md mr-3",
  modalInfoIconBlue: "bg-blue-50 text-blue-700",
  modalInfoIconIndigo: "bg-indigo-50 text-indigo-700",
  modalInfoTextContainer: "",
  modalInfoLabel: "text-xs text-gray-500",
  modalInfoValue: "font-medium",
  modalInfoTutorUid: "text-xs text-gray-400",
  modalInfoTutorPhone: "mt-1 text-sm text-gray-500 flex items-center gap-2",
  
  // Address section
  addressSection: "bg-gray-50 p-4 rounded-lg",
  addressTitle: "font-medium text-gray-700 mb-2",
  addressContent: "flex items-center",
  addressIcon: "text-gray-500 mr-2",
  addressText: "text-sm text-gray-700",
  
  // Notes section
  notesTitle: "font-medium text-gray-700 mb-2",
  notesContent: "text-sm text-gray-600",
  
  // Modal footer
  modalFooter: "mt-6 flex items-center justify-between",
  modalDeleteButton: "inline-flex items-center gap-2 text-sm px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md border border-red-100",
  modalCloseActionButton: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
};

// Add jobApplicationsStyles to the existing export object
export const jobApplicationsStyles = {
  // Main container
  mainContainer: "p-6 pt-14",
  
  // Header section
  headerContainer: "flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4",
  headerTitle: "text-2xl font-bold text-gray-800",
  headerSubtitle: "text-sm text-gray-500 mt-1",
  statsContainer: "flex items-center gap-3 flex-wrap",
  statsLabel: "text-sm text-gray-500",
  statsCards: "flex items-center gap-2",
  statCard: "bg-white/90 px-3 py-2 rounded-lg shadow text-sm",
  statLabel: "text-xs text-gray-500",
  statValue: "font-semibold text-gray-900",
  
  // Filters & Search
  filtersContainer: "mb-6 flex flex-col sm:flex-row gap-4",
  searchContainer: "relative flex-1 max-w-lg",
  searchIconContainer: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
  searchIcon: "h-5 w-5 text-gray-400",
  searchInput: "focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-200 rounded-lg bg-white/90 shadow-sm",
  filterContainer: "flex items-center gap-2",
  filterIcon: "text-gray-500",
  filterSelect: "border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/90",
  
  // Status styles
  statusIcon: "w-3 h-3 rounded-full mr-2",
  statusBadge: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
  
  // Loading/Error/Empty states
  loadingContainer: "bg-white rounded-lg shadow p-6 text-center",
  errorContainer: "bg-red-50 rounded-lg shadow p-6 text-center text-red-700",
  emptyContainer: "bg-white rounded-lg shadow p-6 text-center",
  emptyText: "text-gray-500",
  
  // Mobile/Tablet card grid
  mobileGrid: "lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4",
  mobileCard: "bg-white shadow rounded-2xl border border-white/20 p-4",
  mobileCardHeader: "flex items-start justify-between gap-3",
  mobileAvatar: "flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold",
  mobileCardContent: "ml-3",
  mobileCardName: "text-sm font-medium text-gray-900",
  mobileCardPhone: "text-sm text-gray-500",
  mobileCardLocation: "text-xs text-gray-400 mt-1",
  mobileCardTutorInfo: "text-right",
  mobileCardTutorName: "text-sm text-gray-900",
  mobileCardTutorUid: "text-xs text-gray-400 mt-1",
  mobileCardDate: "mt-3 text-sm text-gray-500 flex items-center justify-between",
  mobileCardActions: "mt-3 flex items-center justify-between gap-2",
  mobileViewButton: "text-blue-600 hover:text-blue-900 inline-flex items-center text-sm",
  mobileViewIcon: "inline mr-1",
  mobileStatusSelect: "border border-gray-200 rounded-md px-2 py-1 text-sm",
  mobileDeleteButton: "text-red-600 hover:text-red-800 inline-flex items-center text-sm",
  mobileDeleteIcon: "inline mr-1",
  
  // Desktop table
  desktopTable: "hidden lg:block bg-white shadow overflow-hidden rounded-2xl border border-white/20",
  table: "min-w-full divide-y divide-gray-200",
  tableHeader: "bg-gray-50",
  tableHeaderCell: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  tableRow: "hover:bg-gray-50",
  tableCell: "px-6 py-4 whitespace-nowrap align-top",
  tableAvatar: "flex items-start",
  tableAvatarCircle: "flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold",
  tableCellContent: "ml-4",
  tableName: "text-sm font-medium text-gray-900",
  tablePhone: "text-sm text-gray-500",
  tableLocation: "text-xs text-gray-400 mt-1",
  tableUid: "text-sm text-gray-500",
  tableEmail: "text-xs text-gray-400 mt-1",
  tableDate: "text-sm text-gray-500",
  tableTime: "text-xs text-gray-400",
  tableActions: "px-6 py-4 whitespace-nowrap text-sm font-medium align-top",
  tableActionsContainer: "flex items-center gap-2",
  tableViewButton: "text-blue-600 hover:text-blue-900 inline-flex items-center",
  tableViewIcon: "inline mr-1",
  tableStatusSelect: "border border-gray-200 rounded-md px-2 py-1 text-sm mr-2",
  tableDeleteButton: "text-red-600 hover:text-red-800 ml-2 inline-flex items-center",
  tableDeleteIcon: "inline mr-1",
  
  // Detail Modal
  modalOverlay: "fixed inset-0 z-50 flex items-start md:items-center justify-center p-4",
  modalBackground: "fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity",
  modalDialog: "relative w-full max-w-3xl mx-auto mt-20 md:mt-0 transform rounded-2xl bg-white/90 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden",
  modalContent: "p-6 max-h-[80vh] overflow-y-auto",
  modalHeader: "flex justify-between items-start pb-3 border-b border-white/20",
  modalTitle: "text-xl font-medium text-gray-900",
  modalSubtitle: "mt-2 text-sm font-semibold text-indigo-700",
  modalUid: "mt-2 text-xs text-gray-500",
  modalCloseButton: "text-gray-400 hover:text-gray-600",
  modalCloseIcon: "w-6 h-6",
  
  // Modal sections
  modalSection: "mt-4 space-y-4",
  contactSection: "p-4 rounded-xl bg-gradient-to-br from-white/60 to-slate-50/60 border border-white/10 shadow-sm",
  contactTitle: "text-sm font-medium text-slate-700 mb-3",
  contactGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  contactItem: "flex items-center text-sm text-gray-800",
  contactIconContainer: "inline-flex items-center justify-center w-8 h-8 rounded-md mr-3",
  contactIconLabel: "text-xs text-gray-500",
  contactIconValue: "font-medium",
  
  // Address section
  addressSection: "bg-gray-50 p-4 rounded-lg",
  addressTitle: "font-medium text-gray-700 mb-2",
  addressContent: "flex items-center",
  addressIcon: "text-gray-500 mr-2",
  addressText: "text-sm text-gray-700",
  
  // Contact methods
  contactMethods: "mb-4",
  contactMethodsTitle: "font-medium text-gray-700 mb-2",
  contactMethod: "flex items-center text-sm",
  contactMethodIcon: "mr-2",
  contactMethodStrong: "font-bold",
  
  // Status section
  statusSection: "mb-4",
  statusTitle: "font-medium text-gray-700 mb-2",
  statusBadgeContainer: "flex items-center",
  statusButtons: "ml-4 flex space-x-2",
  statusButton: "px-3 py-1 text-xs rounded hover:bg-yellow-200",
  contactedButton: "bg-yellow-100 text-yellow-800",
  completedButton: "bg-green-100 text-green-800 hover:bg-green-200",
  
  // Notes section
  notesSection: "mb-4",
  notesTitle: "font-medium text-gray-700 mb-2",
  notesText: "text-sm text-gray-600",
  
  // Modal footer
  modalFooter: "mt-6 flex items-center justify-between",
  modalDeleteButton: "inline-flex items-center gap-2 text-sm px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md border border-red-100",
  modalDeleteIcon: "",
  modalCloseActionButton: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400",
};

// Add to src/assets/dummyStyles.js

export const adminNavbarStyles = {
  // Main Header
  header: "navbar fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 h-24 flex items-center text-navy font-medium text-sm",
  innerContainer: "flex items-center justify-between w-full max-w-7xl mx-auto",
  
  // Logo Section
  logoContainer: "flex items-center",
  logoImage: "w-12 h-12",
  logoText: "ml-2 text-sm md:text-lg xl:text-lg lg:text-xl font-bold text-gray-800",
  
  // Desktop Navigation
  desktopNav: "hidden lg:flex items-center justify-center flex-1",
  navLinksContainer: "flex items-center gap-4 rounded-full bg-white/75 bg-gradient-to-r from-pink-200/40 via-violet-200/40 to-indigo-200/40 border border-white/50 px-5 py-4 text-sm font-medium text-gray-800 ring-1 ring-gray-800/[.075] backdrop-blur-xl",
  navLinkBase: "hover:text-blue-600 hover:bg-sky-50/40 transition-colors px-3 py-1 rounded-full",
  navLinkActive: "text-blue-600 bg-sky-50/40",
  
  // User Info & Logout (Desktop)
  userContainer: "ml-5 flex-none flex items-center gap-3 rounded-full bg-white/75 bg-gradient-to-r from-pink-200/40 via-violet-200/40 to-indigo-200/40 border border-white/50 px-4 py-2 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl",
  avatar: "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2",
  logoutButton: "ml-2 inline-flex cursor-pointer items-center gap-2 px-3 py-1 rounded-md bg-transparent hover:bg-gray-100 text-sm text-red-600",
  
  // Mobile Menu Button
  mobileMenuButton: "lg:hidden flex items-center justify-center text-2xl text-gray-800",
  
  // Mobile Drawer
  drawer: (isOpen) => `fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-lg z-50 transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300`,
  drawerContent: "flex flex-col items-start p-4 space-y-6 bg-white h-full",
  drawerLogoContainer: "flex items-center",
  drawerLogoImage: "h-12 w-auto mr-2",
  drawerLogoText: "text-xl font-bold text-gray-800",
  drawerLinksContainer: "max-h-full space-y-4 overflow-y-auto scrollbar-hidden w-full",
  drawerLinkBase: "flex items-center text-sm py-1.5 transition-colors w-full text-left px-4 rounded-md",
  drawerLinkActive: "bg-blue-100 text-blue-600",
  drawerLinkInactive: "text-navy-950 hover:text-sky-600 hover:bg-gray-100",
  drawerUserSection: "pt-4 mt-4 border-t border-gray-200 w-full",
  drawerUserInfo: "flex items-center px-4 justify-between",
  drawerLogoutButton: "text-sm text-red-600 hover:underline",
  
  // Overlay
  overlay: "fixed inset-0 bg-black opacity-40 z-30 lg:hidden",
};

// Add adminParentsStyles to the existing export object
export const adminParentsStyles = {
  // Main container
  mainContainer: "p-6 pt-14",
  title: "text-2xl font-bold text-gray-800 mb-6",
  
  // Search bar
  searchContainer: "mb-6 max-w-lg",
  searchWrapper: "relative rounded-md shadow-sm",
  searchIconContainer: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
  searchIcon: "h-5 w-5 text-gray-400",
  searchInput: "block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-200 rounded-lg bg-white/90",
  
  // Loading state
  loadingContainer: "text-center py-8 text-gray-600",
  
  // Empty state
  emptyContainer: "bg-white rounded-lg shadow p-6 text-center",
  emptyText: "text-gray-500",
  
  // Table container
  tableContainer: "bg-white shadow overflow-hidden rounded-lg",
  tableScrollContainer: "overflow-x-auto",
  table: "min-w-full divide-y divide-gray-200 table-auto",
  tableHeader: "bg-gray-50",
  tableHeaderCell: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  tableRow: "bg-white divide-y divide-gray-200",
  
  // Table cells
  tableCell: "px-6 py-4 align-top",
  parentCell: "min-w-0",
  parentAvatarContainer: "flex items-center min-w-0",
  parentAvatar: "flex-shrink-0 h-10 w-10",
  parentAvatarImage: "h-10 w-10 rounded-full object-cover",
  parentInfo: "ml-4 min-w-0",
  parentName: "text-sm font-medium text-gray-900 truncate",
  
  // Contact info
  contactInfo: "text-sm text-gray-900 break-words",
  contactPhone: "text-sm text-gray-500 break-words",
  
  // Location info
  locationCity: "text-sm text-gray-900 break-words",
  locationArea: "text-sm text-gray-500 break-words",
  
  // Children/Classes info
  childrenContainer: "text-sm text-gray-900 break-words",
  childrenText: "text-gray-400",
  classLine: "truncate",
  childItem: "truncate",
  
  // Actions
  actionsCell: "px-6 py-4 align-top text-sm font-medium",
  actionsContainer: "flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0",
  viewButton: "text-blue-600 hover:text-blue-900 whitespace-nowrap text-left sm:text-center",
  viewIcon: "inline mr-1",
  deleteButton: "text-red-600 hover:text-red-900 text-left whitespace-nowrap sm:text-center",
  deleteIcon: "inline mr-1",
  
  // Detail Modal
  modalOverlay: "fixed inset-0 overflow-y-auto h-full w-full z-50",
  modalBackground: "fixed inset-0 bg-black/45 backdrop-blur-sm",
  modalContainer: "relative top-20 mx-auto p-5 w-11/12 sm:w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-2xl bg-white",
  modalContent: "mt-3",
  modalHeader: "flex justify-between items-center pb-3 border-b",
  modalTitle: "text-xl font-medium text-gray-900",
  modalCloseButton: "text-gray-400 hover:text-gray-600",
  modalCloseIcon: "w-6 h-6",
  
  // Modal body
  modalBody: "mt-4",
  profileContainer: "flex items-center mb-6",
  profileImage: "h-24 w-24 rounded-full border-4 border-blue-100 object-cover",
  profileInfo: "ml-6 min-w-0",
  profileName: "text-2xl font-bold text-gray-900 truncate",
  profileJoinDate: "text-sm text-gray-500 mt-1",
  
  // Modal grid
  modalGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  
  // Contact info box
  contactBox: "bg-gray-50 p-4 rounded-lg",
  contactBoxTitle: "font-medium text-gray-700 mb-2",
  contactItems: "space-y-2",
  contactItem: "flex items-center",
  contactIcon: "text-gray-500 mr-2",
  contactText: "text-sm break-words",
  
  // Family details box
  familyBox: "bg-gray-50 p-4 rounded-lg",
  familyBoxTitle: "font-medium text-gray-700 mb-2",
  familyItems: "space-y-2",
  familyIcon: "text-gray-500 mr-2",
  familyItemContainer: "text-sm ml-6 break-words",
  
  // Modal footer
  modalFooter: "mt-6 flex justify-end",
  modalCloseActionButton: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700",
};

// Add this to assets/dummyStyles.js
export const adminTeachersStyles = {
  // Main container
  mainContainer: "p-6 pt-14",
  
  // Header
  mainHeading: "text-2xl font-bold text-gray-800 mb-6",
  
  // Search
  searchContainer: "mb-6",
  searchWrapper: "relative rounded-md shadow-sm max-w-lg",
  searchIconWrapper: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
  searchIcon: "h-5 w-5 text-gray-400",
  searchInput: "focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-200 rounded-lg bg-white/90 shadow-sm",
  
  // Empty state
  emptyStateContainer: "bg-white rounded-lg shadow p-6 text-center",
  emptyStateText: "text-gray-500",
  
  // Table container
  tableContainer: "bg-white shadow overflow-hidden rounded-lg",
  tableWrapper: "overflow-x-auto",
  table: "min-w-full divide-y divide-gray-200 table-auto",
  tableHeader: "bg-gray-50",
  tableHeaderCell: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  tableBody: "bg-white divide-y divide-gray-200",
  tableRow: "",
  tableCell: "px-6 py-4 align-top",
  tableCellAvatarContainer: "flex items-center",
  tableCellAvatar: "flex-shrink-0 h-10 w-10 rounded-full object-cover",
  tableCellAvatarText: "ml-4 min-w-0",
  tableCellName: "text-sm font-medium text-gray-900",
  tableCellUid: "text-sm text-gray-500",
  tableCellContact: "text-sm text-gray-900 break-words",
  tableCellPhone: "text-sm text-gray-500 break-words",
  tableCellSubjects: "text-sm text-gray-900 break-words",
  tableCellClasses: "text-sm text-gray-500 break-words",
  tableActionsCell: "px-6 py-4 align-top text-sm font-medium",
  tableActionsContainer: "flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0",
  tableViewButton: "text-blue-600 whitespace-nowrap cursor-pointer hover:text-blue-900 text-left sm:text-center",
  tableDeleteButton: "text-red-600 whitespace-nowrap cursor-pointer hover:text-red-900 text-left sm:text-center",
  
  // Modal
  modalOverlay: "fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full z-50",
  modalBackdrop: "fixed inset-0 bg-black/45 backdrop-blur-sm",
  modalContainer: "relative top-20 mx-auto p-5 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-2xl bg-white",
  modalContent: "mt-3",
  modalHeader: "flex justify-between items-center pb-3 border-b",
  modalTitle: "text-xl font-medium text-gray-900",
  modalCloseButton: "text-gray-400 hover:text-gray-600",
  modalCloseIcon: "w-6 h-6",
  
  // Teacher info in modal
  modalTeacherInfo: "mt-4",
  modalTeacherHeader: "flex items-center mb-6",
  modalTeacherImage: "h-24 w-24 rounded-full border-4 border-blue-100 object-cover",
  modalTeacherTextContainer: "ml-6",
  modalTeacherName: "text-2xl font-bold text-gray-900",
  modalTeacherUid: "text-gray-500",
  modalLoadingText: "text-sm text-gray-500 mt-1",
  
  // Modal grid
  modalGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  
  // Info cards in modal
  modalInfoCard: "bg-gray-50 p-4 rounded-lg",
  modalInfoTitle: "font-medium text-gray-700 mb-2",
  modalInfoItem: "space-y-2",
  modalInfoRow: "flex items-center",
  modalInfoIcon: "text-gray-500 mr-2",
  modalInfoText: "text-sm break-words",
  
  // Modal footer
  modalFooter: "mt-6 flex justify-end",
  modalCloseButtonAction: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
};