import { Link } from "react-router-dom";
import { lessons } from "../data/lessons.ts";
import Card from "../components/Card.tsx";
import { useProgress } from "../hooks/useProgress";
import { BookOpen, Clock, CheckCircle, Trophy, Database } from "lucide-react";

export default function LessonsPage() {
  const { progress } = useProgress();

  const isLessonCompleted = (lessonId: string) => {
    return progress.lessonsCompleted.some(
      (l) => l.lessonId === lessonId && l.completed
    );
  };

  const getLessonScore = (lessonId: string) => {
    const lesson = progress.lessonsCompleted.find(
      (l) => l.lessonId === lessonId
    );
    return lesson?.score;
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.category]) {
      acc[lesson.category] = [];
    }
    acc[lesson.category].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);

  const difficultyColors = {
    Beginner: "#2ECC71",
    Intermediate: "#FFC727",
    Advanced: "#E74C3C",
  };

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "28px auto",
        padding: "0 20px",
      }}
    >
      {/* Header with Navigation */}
      <Card style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 8px 0",
                fontSize: "32px",
                color: "var(--csu-green)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Database size={36} />
              CSU Digital Academy - SQL Mastery
            </h1>
            <p style={{ color: "var(--muted)", margin: 0 }}>
              Master SQL from basics to advanced topics at Caraga State
              University. Track your progress as you learn through our
              comprehensive curriculum.
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid #eee",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <BookOpen size={20} color="var(--csu-green)" />
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "var(--csu-green)",
              }}
            >
              {lessons.length}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>
              SQL Lessons
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <CheckCircle size={20} color="var(--success)" />
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "var(--success)",
              }}
            >
              {lessons.filter((lesson) => isLessonCompleted(lesson.id)).length}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>
              Completed
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <Trophy size={20} color="var(--csu-gold)" />
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "var(--csu-gold)",
              }}
            >
              {Math.round(
                (lessons.filter((lesson) => isLessonCompleted(lesson.id))
                  .length /
                  lessons.length) *
                  100
              )}
              %
            </div>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>
              Progress
            </div>
          </div>
        </div>
      </Card>

      {/* Progress Overview */}
      <Card
        style={{
          marginBottom: "28px",
          background: "linear-gradient(135deg, var(--csu-green), #008000)",
        }}
      >
        <div style={{ color: "white" }}>
          <h3 style={{ margin: "0 0 12px 0" }}>Your Progress</h3>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "32px", fontWeight: 700 }}>
                {progress.lessonsCompleted.length}/{lessons.length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Lessons Completed
              </div>
            </div>
            <div>
              <div style={{ fontSize: "32px", fontWeight: 700 }}>
                {progress.totalScore}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>Total Score</div>
            </div>
            <div>
              <div style={{ fontSize: "32px", fontWeight: 700 }}>
                {progress.badges.length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Badges Earned
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Lessons by Category */}
      {Object.entries(groupedLessons).map(([category, categoryLessons]) => (
        <div key={category} style={{ marginBottom: "32px" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "24px" }}>{category}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "16px",
            }}
          >
            {categoryLessons.map((lesson) => {
              const completed = isLessonCompleted(lesson.id);
              const score = getLessonScore(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    style={{
                      height: "100%",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "pointer",
                      position: "relative",
                      border: completed ? "2px solid var(--success)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(21, 21, 21, 0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(21, 21, 21, 0.06)";
                    }}
                  >
                    {completed && (
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "var(--success)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        ✓ Completed {score && `• ${score}%`}
                      </div>
                    )}

                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        background: difficultyColors[lesson.difficulty],
                        color: "white",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginBottom: "12px",
                      }}
                    >
                      {lesson.difficulty}
                    </div>

                    <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                      {lesson.title}
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: "14px",
                        margin: "0 0 12px 0",
                        lineHeight: 1.5,
                      }}
                    >
                      {lesson.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "13px",
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
                        <BookOpen size={14} /> {lesson.exercises.length}{" "}
                        exercises
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={14} /> {lesson.estimatedTime} min
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
