import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { studentRequestsStyles } from "../../assets/dummyStyles";

// Responsive improvements only: adjusted Tailwind classes for small/medium/tablet screens
// Kept LG (desktop) grid and layout unchanged. No backend functionality changed.

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "Unknown";
  }
};
const formatTime = (iso) => {
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Unknown";
  }
};

const API_BASE = "http://localhost:5000";

const StudentRequests = () => {
  const { tutorUid } = useParams(); // route param (left unchanged)
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchRequests = async () => {
      setLoading(true);
      setError("");

      // preserve original behaviour — fetch uid from localStorage (same as before)
      const storedUid = localStorage.getItem("uid");

      try {
        const url = `${API_BASE}/api/tutor-requests/${encodeURIComponent(
          storedUid
        )}`;

        const resp = await axios.get(url);
        console.log(resp);

        if (!mounted) return;

        if (
          resp.data &&
          resp.data.success &&
          Array.isArray(resp.data.request)
        ) {
          // Ensure each request has a submittedAt field (map createdAt if necessary)
          const normalized = resp.data.request.map((r) => ({
            ...r,
            submittedAt:
              r.submittedAt || r.createdAt || new Date().toISOString(),
          }));

          setRequests(normalized);
        } else {
          setRequests([]);
        }
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        setError(
          "No request found yet! Once the parents requests, it will be shown here."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRequests();

    return () => {
      mounted = false;
    };
  }, [tutorUid]);

  return (
    // added overflow-x-hidden to prevent accidental horizontal scroll on very small screens
    <div className={studentRequestsStyles.container}>
      <div className={studentRequestsStyles.innerContainer}>
        <header className={studentRequestsStyles.headerContainer}>
          <h1 className={studentRequestsStyles.title}>
            Student Requests
          </h1>
          <p className={studentRequestsStyles.subtitle}>
            Showing parent submissions — Parent name, Mobile, Address, Date
            &amp; Time.
          </p>
        </header>

        <main>
          {loading ? (
            <div className={studentRequestsStyles.loading}>Loading requests…</div>
          ) : error ? (
            <div className={studentRequestsStyles.error}>{error}</div>
          ) : requests.length === 0 ? (
            <div className={studentRequestsStyles.noRequests}>
              No requests found.
            </div>
          ) : (
            // Grid: mobile 1 column, small screens 2 columns, md keep 2, lg keep original 2, xl 3
            <div className={studentRequestsStyles.grid}>
              {requests.map((r, index) => {
                const id = r._id || r.id || `req-${index + 1}`;
                const submittedAt = r.submittedAt || new Date().toISOString();

                return (
                  <div
                    key={id}
                    // make cards stretch but allow internal content to shrink; avoid fixed max-w on mobile
                    className={studentRequestsStyles.card}
                  >
                    <article className={studentRequestsStyles.cardArticle}>
                      <section className={studentRequestsStyles.cardHeaderSection}>
                        <header className={studentRequestsStyles.cardHeader}>
                          <div className={studentRequestsStyles.requestIdContainer}>
                            <p className={studentRequestsStyles.requestIdLabel}>Request ID</p>
                            <div className={studentRequestsStyles.requestIdValue}>
                              {id}
                            </div>
                          </div>

                          <div className={studentRequestsStyles.indexBadge}>
                            #{index + 1}
                          </div>
                        </header>

                        <div className={studentRequestsStyles.cardBody}>
                          <p className={studentRequestsStyles.parentName}>
                            Parent:{" "}
                            <span className={studentRequestsStyles.parentNameValue}>
                              {r.parentName || "—"}
                            </span>
                          </p>

                          <p className={studentRequestsStyles.mobileLabel}>
                            <span className="font-medium">Mobile:</span>
                            <br />
                            <span className={studentRequestsStyles.mobileValue}>
                              {r.phone || "—"}
                            </span>
                          </p>

                          <p className={studentRequestsStyles.addressLabel}>
                            <span className="font-medium">Address:</span>
                            <br />
                            <span className={studentRequestsStyles.addressValue}>
                              {r.address || "—"}
                            </span>
                          </p>

                          <p className={studentRequestsStyles.postedDate}>
                            Posted on: {formatDate(submittedAt)}
                          </p>
                        </div>
                      </section>

                      {/* Footer: stack on small screens, row on sm+ (keeps lg look intact) */}
                      <footer className={studentRequestsStyles.cardFooter}>
                        <div className={studentRequestsStyles.dateContainer}>
                          <div className={studentRequestsStyles.dateLabel}>Date</div>
                          <div className={studentRequestsStyles.dateValue}>
                            {formatDate(submittedAt)}
                          </div>
                        </div>

                        <div className={studentRequestsStyles.timeContainer}>
                          <div className={studentRequestsStyles.timeLabel}>Time</div>
                          <div className={studentRequestsStyles.timeValue}>
                            {formatTime(submittedAt)}
                          </div>
                        </div>
                      </footer>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentRequests;