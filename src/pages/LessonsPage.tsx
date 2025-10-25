import { Link } from "react-router-dom";
import { lessons } from "../data/lessons.ts";
import Card from "../components/Card.tsx";
import { useProgress } from "../contexts/ProgressContext.tsx";

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
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "32px" }}>SQL Lessons</h1>
        <p style={{ color: "var(--muted)", margin: 0 }}>
          Master SQL from basics to advanced topics. Track your progress as you
          learn.
        </p>
      </div>

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
                  to={`/lessons/${lesson.id}`}
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
                      <span>📝 {lesson.exercises.length} exercises</span>
                      <span>⏱️ {lesson.estimatedTime} min</span>
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
