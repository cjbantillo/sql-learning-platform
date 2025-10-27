import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card.tsx";
import Button from "../components/Button.tsx";
import SQLPlayground from "../components/SQLPlayground.tsx";
import Modal from "../components/Modal.tsx";
import { Play, BookOpen, Trophy, Code } from "lucide-react";

interface HomePageProps {
  externalModal?: string | null;
  onCloseExternalModal?: () => void;
}

export default function HomePage({
  externalModal,
  onCloseExternalModal,
}: HomePageProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Sync with external modal from Header
  useEffect(() => {
    if (externalModal) {
      setActiveModal(externalModal);
    }
  }, [externalModal]);

  const handleCloseModal = () => {
    setActiveModal(null);
    onCloseExternalModal?.();
  };

  const scrollToPlayground = () => {
    const element = document.getElementById("sqlInput");
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    element?.focus();
  };

  const renderModalContent = (modalName: string) => {
    switch (modalName) {
      case "about":
        return (
          <>
            <p>
              CSU Digital Academy is an interactive web app built to teach SQL
              fundamentals to Caraga State University students. The platform
              includes lessons, a playground, and progress tracking.
            </p>
            <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
              <li>Modular lessons — beginner to advanced</li>
              <li>Practice playground — run sample queries (mocked)</li>
              <li>Progress badges and certificates</li>
            </ul>
          </>
        );

      case "achievements":
        return (
          <>
            <p>Track completed lessons and earn badges.</p>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  background: "var(--light)",
                  minWidth: "120px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 700 }}>SQL Novice</div>
                <div className="muted" style={{ fontSize: "12px" }}>
                  Complete Intro
                </div>
              </div>
              <div
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  background: "var(--light)",
                  minWidth: "120px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 700 }}>Joiner</div>
                <div className="muted" style={{ fontSize: "12px" }}>
                  Master JOINs
                </div>
              </div>
            </div>
          </>
        );

      case "contact":
        return (
          <>
            <p>Need help? Contact the project team.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent (mock)");
                handleCloseModal();
              }}
            >
              <label
                style={{ display: "block", marginTop: "8px", fontWeight: 600 }}
              >
                Your name
              </label>
              <input
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  marginTop: "4px",
                }}
              />
              <label
                style={{ display: "block", marginTop: "12px", fontWeight: 600 }}
              >
                Message
              </label>
              <textarea
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  marginTop: "4px",
                  minHeight: "100px",
                }}
              />
              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                <Button variant="primary" type="submit">
                  Send
                </Button>
                <Button onClick={handleCloseModal}>Close</Button>
              </div>
            </form>
          </>
        );

      case "socials":
        return (
          <>
            <p>Follow the project:</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <a
                href="#"
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "var(--light)",
                  textDecoration: "none",
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                Facebook
              </a>
              <a
                href="#"
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "var(--light)",
                  textDecoration: "none",
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                Twitter
              </a>
              <a
                href="#"
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "var(--light)",
                  textDecoration: "none",
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                YouTube
              </a>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getModalTitle = (modalName: string) => {
    const titles: Record<string, string> = {
      about: "About CSU Digital Academy",
      achievements: "Achievements & Badges",
      contact: "Contact & Support",
      socials: "Socials",
    };
    return titles[modalName] || "Modal";
  };

  return (
    <>
      <main
        style={{
          maxWidth: "1100px",
          margin: "28px auto",
          padding: "0 20px",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* Left Column - Hero Card */}
          <div>
            <Card>
              <h1 style={{ margin: "0 0 12px 0", fontSize: "34px" }}>
                Learn SQL the CSU way
              </h1>
              <p
                className="lead"
                style={{ margin: "0 0 18px", color: "var(--muted)" }}
              >
                Hands-on lessons, instant feedback, and a lightweight playground
                to practice SELECTs, JOINs and more — designed for Caraga State
                University students.
              </p>

              <div
                style={{ display: "flex", gap: "12px", marginBottom: "22px" }}
              >
                <Button
                  variant="primary"
                  onClick={scrollToPlayground}
                  icon={<Play size={16} />}
                >
                  Try Playground
                </Button>
                <Link to="/lessons">
                  <Button variant="accent" icon={<BookOpen size={16} />}>
                    Browse Lessons
                  </Button>
                </Link>
              </div>

              {/* Features Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  marginTop: "22px",
                }}
              >
                <div
                  style={{
                    padding: "14px",
                    borderRadius: "10px",
                    background: "linear-gradient(180deg, #fbfff8, #ffffff)",
                    border: "1px solid #f0f6f0",
                  }}
                  className="feature"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <BookOpen size={16} color="var(--csu-green)" />
                    <strong>Interactive Lessons</strong>
                  </div>
                  <div className="muted" style={{ fontSize: "13px" }}>
                    Step-by-step learning modules and quizzes
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px",
                    borderRadius: "10px",
                    background: "linear-gradient(180deg, #fbfff8, #ffffff)",
                    border: "1px solid #f0f6f0",
                  }}
                  className="feature"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <Code size={16} color="var(--csu-green)" />
                    <strong>SQL Playground</strong>
                  </div>
                  <div className="muted" style={{ fontSize: "13px" }}>
                    Type queries, run, and see sample results
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px",
                    borderRadius: "10px",
                    background: "linear-gradient(180deg, #fbfff8, #ffffff)",
                    border: "1px solid #f0f6f0",
                  }}
                  className="feature"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <Trophy size={16} color="var(--csu-green)" />
                    <strong>Certificates</strong>
                  </div>
                  <div className="muted" style={{ fontSize: "13px" }}>
                    Earn badges and track progress
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Playground & Progress */}
          <div>
            <SQLPlayground />

            <div style={{ height: "14px" }} />

            <Card style={{ padding: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>Course Progress</div>
                  <div className="muted" style={{ fontSize: "13px" }}>
                    Your learning dashboard
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background: "var(--light)",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Student • Beginner
                </div>
              </div>
              <div style={{ marginTop: "12px" }}>
                <div
                  style={{
                    height: "10px",
                    background: "#eee",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "42%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, var(--csu-green), var(--csu-gold))",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    marginTop: "8px",
                  }}
                >
                  42% completed
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Featured Lessons */}
        <section style={{ marginTop: "22px" }}>
          <Card>
            <h3 style={{ margin: "0 0 10px 0" }}>Featured Lessons</h3>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <div
                style={{
                  flex: 1,
                  minWidth: "220px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "var(--light)",
                }}
              >
                <strong>Intro to SELECT</strong>
                <div className="muted" style={{ fontSize: "13px" }}>
                  Start with basic SELECT statements and filters
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: "220px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "var(--light)",
                }}
              >
                <strong>JOINs & Relationships</strong>
                <div className="muted" style={{ fontSize: "13px" }}>
                  Learn how to combine tables
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: "220px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "var(--light)",
                }}
              >
                <strong>Aggregations</strong>
                <div className="muted" style={{ fontSize: "13px" }}>
                  GROUP BY, COUNT, SUM, and more
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Modal */}
      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={handleCloseModal}
          title={getModalTitle(activeModal)}
        >
          {renderModalContent(activeModal)}
        </Modal>
      )}
    </>
  );
}
