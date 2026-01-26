// src/App.jsx
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Background from "./components/MagicUi/Background";

// UI ROUTES
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";
import TermsCondition from "./pages/TermsCondition/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import HowWork from "./pages/HowWork/HowWork";
import SearchTutor from "./pages/SearchTutor/SearchTutor";
import TutorProfile from "./pages/SearchTutor/TutorProfile";
import TuitionJob from "./pages/TuitionJob/TuitionJob";
import GetTutor from "./pages/GetTutor/GetTutor";
import StudentRequests from "./profile/Dashboard/SRequest";
import FullRegistration from "./pages/RegisterTutor/FullRegisterTutor";
import TeacherLogin from "./pages/TeacherLogin/TeacherLogin";

// PROFILE ROUTES
import ViewProfile from "./profile/Dashboard/ViewProfile";
import EditProfile from "./profile/Dashboard/EditProfile";
import Logout from "./components/Logout/Logout";

// ⬇️ ScrollToTop logic inside same file
const ScrollToTopWrapper = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return children;
};

const App = () => {
  return (
    // FIX: allow natural page scrolling
    <div className="relative min-h-screen">
      <div
        className="absolute -z-20 aspect-square top-0 left-0 w-full h-40 bg-gradient-to-r
       from-pink-300/40 via-violet-300/40 to-sky-300/40 blur-3xl filter rounded-b-full"
      ></div>

      <Background
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={0.5}
        className={[
          "mask-image:radial-gradient(500px_circle_at_center,white,transparent)",
          "inset-x-0 inset-y-[-30%] h-[220%] skew-y-12",
        ]}
      />

      {/* Wrap all routes — auto scroll to top */}
      <ScrollToTopWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms-conditions" element={<TermsCondition />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/how-works" element={<HowWork />} />
          <Route path="/search-tutor" element={<SearchTutor />} />
          <Route path="/search-tutor/:uid" element={<TutorProfile />} />

          <Route path="/tuition-job" element={<TuitionJob />} />
          <Route path="/get-tutor" element={<GetTutor />} />
          <Route path="/login-tutor" element={<TeacherLogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/fullregistor-tutor" element={<FullRegistration />} />

          {/* Profile Layout */}
          <Route path="/profile/:uid" element={<ViewProfile />}>
            {/* Nested relative routes */}
            <Route path="requests" element={<StudentRequests />} />
            <Route path="editprofile" element={<EditProfile />} />
          </Route>
        </Routes>
      </ScrollToTopWrapper>
    </div>
  );
};

export default App;
