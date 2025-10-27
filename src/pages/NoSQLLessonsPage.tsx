import { Link } from "react-router-dom";
import { getAllNoSQLLessons } from "../data/nosql-lessons.ts";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/Card.tsx";
import { Server, Database, Clock, CheckCircle, ArrowLeft } from "lucide-react";

export default function NoSQLLessonsPage() {
  const nosqlLessons = getAllNoSQLLessons();
  const { progress } = useProgress();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "var(--success)";
      case "Intermediate":
        return "var(--csu-gold)";
      case "Advanced":
        return "#e74c3c";
      default:
        return "var(--muted)";
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.lessonsCompleted.some((l) => l.lessonId === lessonId);
  };

  const getLessonScore = (lessonId: string) => {
    const completed = progress.lessonsCompleted.find(
      (l) => l.lessonId === lessonId
    );
    return completed?.score || 0;
  };

  const groupedLessons = nosqlLessons.reduce((acc, lesson) => {
    if (!acc[lesson.category]) {
      acc[lesson.category] = [];
    }
    acc[lesson.category].push(lesson);
    return acc;
  }, {} as Record<string, typeof nosqlLessons>);

  return (
    <main
      style={{ maxWidth: "1100px", margin: "28px auto", padding: "0 20px" }}
    >
      {/* Header */}
      <Card style={{ marginBottom: "32px", textAlign: "center" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              marginBottom: "12px",
              color: "var(--csu-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <Server size={36} />
            CSU Digital Academy - NoSQL Mastery
          </h1>
          <p
            style={{ fontSize: "18px", lineHeight: 1.6, color: "var(--muted)" }}
          >
            Explore modern database technologies beyond traditional SQL - from
            lightning-fast Redis to flexible MongoDB and powerful graph
            databases.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "var(--csu-green)",
              }}
            >
              {nosqlLessons.length}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>
              NoSQL Lessons
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "var(--csu-gold)",
              }}
            >
              {Object.keys(groupedLessons).length}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>
              Database Types
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "var(--success)",
              }}
            >
              {
                nosqlLessons.filter((lesson) => isLessonCompleted(lesson.id))
                  .length
              }
            </div>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>
              Completed
            </div>
          </div>
        </div>
      </Card>

      {/* Database Type Categories */}
      {Object.entries(groupedLessons).map(([category, lessons]) => (
        <div key={category} style={{ marginBottom: "40px" }}>
          <h2
            style={{
              marginBottom: "20px",
              paddingBottom: "8px",
              borderBottom: "3px solid var(--csu-green)",
              color: "var(--csu-green)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {category === "NoSQL" ? (
                <Server size={20} />
              ) : (
                <Database size={20} />
              )}
              {category}
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {lessons.map((lesson) => {
              const completed = isLessonCompleted(lesson.id);
              const score = getLessonScore(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      border: completed
                        ? "2px solid var(--success)"
                        : "2px solid transparent",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Status indicator */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          background: getDifficultyColor(lesson.difficulty),
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {lesson.difficulty}
                      </span>
                      {completed && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              color: "var(--success)",
                              fontSize: "18px",
                            }}
                          >
                            ✓
                          </span>
                          <span
                            style={{
                              color: "var(--success)",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {score}% Score
                          </span>
                        </div>
                      )}
                    </div>

                    <h3
                      style={{
                        marginBottom: "8px",
                        color: completed ? "var(--success)" : "inherit",
                      }}
                    >
                      {lesson.title}
                    </h3>

                    <p
                      style={{
                        color: "var(--muted)",
                        marginBottom: "12px",
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      {lesson.description}
                    </p>

                    {/* Footer with time estimate */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                        paddingTop: "12px",
                        borderTop: "1px solid #eee",
                        fontSize: "12px",
                        color: "var(--muted)",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={14} />
                        {lesson.estimatedTime} min
                      </span>
                      <span>{lesson.exercises?.length || 0} exercises</span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {/* Navigation */}
      <Card style={{ textAlign: "center", marginTop: "40px" }}>
        <h3 style={{ marginBottom: "16px" }}>
          Ready to explore different database paradigms?
        </h3>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link to="/lessons" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "var(--csu-green)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ArrowLeft size={16} />
              Back to SQL Lessons
            </button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "var(--csu-gold)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              🏠 Home
            </button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
