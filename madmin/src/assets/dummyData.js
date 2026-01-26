// Generate avatar images from initials
export const makeAvatar = (name, w = 320, h = 320) => {
  const initials = (name || "U").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  const bg = ["#fde68a","#bbf7d0","#bfdbfe","#fbcfe8","#dbeafe"][Math.floor(Math.random()*5)];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='${bg}' rx='20' ry='20'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='72' fill='#0f172a'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Dummy teachers data
export const dummyTeachers = [
  {
    id: 1,
    uid: "TCH-1001",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    city: "Lucknow",
    area: "Gomti Nagar",
    profilePicture: makeAvatar("Priya Sharma"),
    subjects: ["Mathematics", "Physics"],
    classes: ["9", "10", "11", "12"],
    experience: "6 years",
    status: "Active",
    joinDate: "2023-05-15",
    lastLogin: "2024-01-15",
    studentsTaught: 42,
    rating: 4.8,
  },
  {
    id: 2,
    uid: "TCH-1002",
    name: "Aman Verma",
    email: "aman.verma@example.com",
    phone: "+91 8765432109",
    city: "Lucknow",
    area: "Aliganj",
    profilePicture: makeAvatar("Aman Verma"),
    subjects: ["Science", "Biology"],
    classes: ["8", "9", "10"],
    experience: "3 years",
    status: "Active",
    joinDate: "2023-08-22",
    lastLogin: "2024-01-14",
    studentsTaught: 28,
    rating: 4.5,
  },
  {
    id: 3,
    uid: "TCH-1003",
    name: "Rita Singh",
    email: "rita.singh@example.com",
    phone: "+91 7654321098",
    city: "Delhi",
    area: "Indira Nagar",
    profilePicture: makeAvatar("Rita Singh"),
    subjects: ["English", "Social Studies"],
    classes: ["Nursery", "1", "2", "3"],
    experience: "10 years",
    status: "Inactive",
    joinDate: "2022-11-10",
    lastLogin: "2023-12-20",
    studentsTaught: 67,
    rating: 4.9,
  },
];

// Dummy parents data
export const dummyParents = [
  {
    id: 1,
    name: "Mr. Verma",
    email: "verma.family@example.com",
    phone: "+91 9123456780",
    city: "Lucknow",
    area: "Aashiana Colony",
    profilePicture: makeAvatar("Mr. Verma"),
    children: ["Class 8 - Math, Science"],
    postedJobs: 3,
    status: "Active",
    joinDate: "2023-06-10",
    lastLogin: "2024-01-14",
  },
  {
    id: 2,
    name: "Suman Patel",
    email: "suman.patel@example.com",
    phone: "+91 8987654321",
    city: "Lucknow",
    area: "Hazratganj",
    profilePicture: makeAvatar("Suman Patel"),
    children: ["Class 10 - Physics"],
    postedJobs: 1,
    status: "Active",
    joinDate: "2023-09-05",
    lastLogin: "2024-01-13",
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul.singh@example.com",
    phone: "+91 7890123456",
    city: "Lucknow",
    area: "Mahanagar",
    profilePicture: makeAvatar("Rahul Singh"),
    children: ["Class 5 - English"],
    postedJobs: 2,
    status: "Inactive",
    joinDate: "2023-07-18",
    lastLogin: "2023-12-15",
  },
];

// Dummy contact submissions (from TutorProfile contact form)
export const dummyContactSubmissions = [
  {
    id: 1,
    parentName: "Rajesh Kumar",
    parentMobile: "9876543210",
    address: "Sector 15, Indira Nagar, Lucknow",
    tutorName: "Priya Sharma",
    tutorUid: "TCH-1001",
    submittedAt: "2024-01-15T14:30:00Z",
    status: "New"
  },
  {
    id: 2,
    parentName: "Sunita Devi",
    parentMobile: "8765432109",
    address: "Hazratganj, Lucknow",
    tutorName: "Aman Verma",
    tutorUid: "TCH-1002",
    submittedAt: "2024-01-14T10:15:00Z",
    status: "Contacted"
  },
  {
    id: 3,
    parentName: "Vikram Singh",
    parentMobile: "7654321098",
    address: "Alambagh, Lucknow",
    tutorName: "Rita Singh",
    tutorUid: "TCH-1003",
    submittedAt: "2024-01-13T16:45:00Z",
    status: "Completed"
  },
];

// Dummy job applications (from GetJobPage)
export const dummyJobApplications = [
  {
    id: 1,
    teacherName: "Priya Sharma",
    teacherUid: "TCH-1001",
    jobId: "J-1001",
    parentName: "Mr. Verma",
    jobDetails: "Class 8 - Math, Science in Aashiana Colony",
    appliedAt: "2024-01-15T11:20:00Z",
    status: "Pending"
  },
  {
    id: 2,
    teacherName: "Aman Verma",
    teacherUid: "TCH-1002",
    jobId: "J-1002",
    parentName: "Suman Patel",
    jobDetails: "Class 10 - Physics in Hazratganj",
    appliedAt: "2024-01-14T09:45:00Z",
    status: "Approved"
  },
  {
    id: 3,
    teacherName: "Rita Singh",
    teacherUid: "TCH-1003",
    jobId: "J-1003",
    parentName: "Rahul Singh",
    jobDetails: "Class 5 - English in Mahanagar",
    appliedAt: "2024-01-13T15:30:00Z",
    status: "Rejected"
  },
];