import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaChevronRight, FaChevronLeft, FaInbox } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { sideNavStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:5000";

const SideNav = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [newRequestsCount, setNewRequestsCount] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { uid } = useParams();

  const toggleSidebar = () => setIsSidebarExpanded((s) => !s);

  useEffect(() => {
    if (!uid) {
      setNewRequestsCount(0);
      return;
    }

    const controller = new AbortController();

    const fetchCount = async () => {
      try {
        const url = `${API_BASE}/api/tutor-requests/${encodeURIComponent(uid)}`;
        const res = await axios.get(url, { signal: controller.signal });
        // server returns: { success: true, request: [..], job: <count> }
        const count = res?.data?.job ?? 0;
        setNewRequestsCount(Number(count));
      } catch (err) {
        if (err.name === "CanceledError" || err.message === "canceled") return;
        console.error("Failed to fetch request count:", err);
        setNewRequestsCount(0);
      }
    };

    fetchCount();

    return () => {
      controller.abort();
    };
  }, [uid]);

  // Shared nav content as a small rendering function to avoid duplication
  const NavContent = ({ showLabels = true }) => (
    <nav
      className={sideNavStyles.navContainer}
      aria-label="Main navigation"
    >
      <button
        onClick={() => {
          navigate(`/profile/${uid}`);
          setIsMobileOpen(false);
        }}
        className={sideNavStyles.navButton}
      >
        <CgProfile className={sideNavStyles.navIcon} />
        {showLabels && "View Profile"}
      </button>

      <button
        onClick={() => {
          navigate(`/profile/${uid}/editprofile`);
          setIsMobileOpen(false);
        }}
        className={sideNavStyles.navButton}
      >
        <LiaUserEditSolid className={sideNavStyles.navIcon} />
        {showLabels && "Edit Profile"}
      </button>

      <button
        onClick={() => {
          navigate(`/profile/${uid}/requests`);
          setIsMobileOpen(false);
        }}
        className={sideNavStyles.navButtonWithBadge}
      >
        <FaInbox className="text-emerald-700 text-lg ml-1" />
        {showLabels && <span>Student Requests</span>}

        {newRequestsCount > 0 && (
          <span
            className={sideNavStyles.badge}
            aria-live="polite"
          >
            {newRequestsCount}
          </span>
        )}
      </button>
    </nav>
  );

  return (
    <>
      {/* Hamburger toggle: visible only on small screens - positioned below navbar */}
      <button
        className={sideNavStyles.hamburgerButton}
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open menu"
      >
        <GiHamburgerMenu />
      </button>

      {/* Mobile off-canvas drawer */}
      <div
        className={`${sideNavStyles.mobileOverlay} ${
          isMobileOpen ? sideNavStyles.mobileOverlayVisible : sideNavStyles.mobileOverlayHidden
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* overlay */}
        <div
          className={`${sideNavStyles.overlayBackground} ${
            isMobileOpen ? sideNavStyles.overlayVisible : sideNavStyles.overlayHidden
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* drawer: starts below the top navbar (top-20) so it doesn't sit under the navbar */}
        <aside
          className={`${sideNavStyles.mobileDrawer} ${
            isMobileOpen ? sideNavStyles.drawerOpen : sideNavStyles.drawerClosed
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className={sideNavStyles.drawerHeader}>
            <h1 className={sideNavStyles.drawerTitle}>Tutor Dashboard</h1>
            <button
              onClick={() => setIsMobileOpen(false)}
              className={sideNavStyles.closeButton}
              aria-label="Close menu"
            >
              <AiOutlineClose />
            </button>
          </div>

          {/* mobile nav content (labels always shown inside drawer) */}
          <NavContent showLabels={true} />
        </aside>
      </div>

      {/* Desktop / large sidebar: unchanged semantic & layout, visible only on lg+ */}
      <aside
        className={`${sideNavStyles.desktopSidebar} ${
          isSidebarExpanded ? sideNavStyles.sidebarExpanded : sideNavStyles.sidebarCollapsed
        }`}
        aria-label="Sidebar"
      >
        {/* Header (unchanged UI) */}
        <div className={sideNavStyles.sidebarHeader}>
          {isSidebarExpanded && <h1 className={sideNavStyles.sidebarTitle}>Tutor Dashboard</h1>}
          <button onClick={toggleSidebar} className={sideNavStyles.sidebarToggleButton}>
            {isSidebarExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Navigation (unchanged UI, only spacing responsive) */}
        <NavContent showLabels={isSidebarExpanded} />
      </aside>
    </>
  );
};

export default SideNav;