import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { getLessonById, type Exercise } from "../data/lessons.ts";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/Card.tsx";
import Button from "../components/Button.tsx";
import { ArrowLeft, HelpCircle, CheckCircle } from "lucide-react";

// Function to add basic SQL syntax highlighting
function highlightSQL(code: string): string {
  const sqlKeywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "INSERT",
    "UPDATE",
    "DELETE",
    "CREATE",
    "DROP",
    "ALTER",
    "JOIN",
    "INNER",
    "LEFT",
    "RIGHT",
    "OUTER",
    "ON",
    "GROUP",
    "BY",
    "ORDER",
    "HAVING",
    "LIMIT",
    "DISTINCT",
    "COUNT",
    "SUM",
    "AVG",
    "MIN",
    "MAX",
    "AND",
    "OR",
    "NOT",
    "IN",
    "LIKE",
    "BETWEEN",
    "IS",
    "NULL",
    "EXISTS",
    "UNION",
    "INTERSECT",
    "EXCEPT",
    "CASE",
    "WHEN",
    "THEN",
    "ELSE",
    "END",
    "AS",
    "WITH",
    "RECURSIVE",
    "PARTITION",
    "OVER",
    "ROWS",
    "RANGE",
    "WINDOW",
    "RANK",
    "ROW_NUMBER",
    "DENSE_RANK",
    "LAG",
    "LEAD",
    "FIRST_VALUE",
    "LAST_VALUE",
  ];

  let highlighted = code;

  // Highlight SQL keywords
  sqlKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<span class="sql-keyword">${keyword}</span>`
    );
  });

  // Highlight strings (single quotes)
  highlighted = highlighted.replace(
    /'([^']*)'/g,
    "<span class=\"sql-string\">'$1'</span>"
  );

  // Highlight comments (-- style)
  highlighted = highlighted.replace(
    /--\s*(.*)/g,
    '<span class="sql-comment">-- $1</span>'
  );

  return highlighted;
}

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeLesson, addBadge } = useProgress();

  const lesson = id ? getLessonById(id) : undefined;
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!lesson) {
    return (
      <main
        style={{ maxWidth: "1100px", margin: "28px auto", padding: "0 20px" }}
      >
        <Card>
          <h2>Lesson not found</h2>
          <Link to="/lessons">
            <Button variant="primary" icon={<ArrowLeft size={16} />}>
              Back to Lessons
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  const currentExercise: Exercise = lesson.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1;

  const checkQuery = () => {
    const normalized = query.trim().toLowerCase().replace(/\s+/g, " ");
    const expected = currentExercise.expectedQuery
      .toLowerCase()
      .replace(/\s+/g, " ");

    if (normalized.includes(expected)) {
      setFeedback({ type: "success", message: "✓ Correct! Well done!" });

      // Move to next exercise after a delay
      setTimeout(() => {
        if (isLastExercise) {
          // Complete lesson
          completeLesson(lesson.id, 100);
          addBadge(lesson.title);
          setFeedback({
            type: "success",
            message: "🎉 Lesson completed! Redirecting...",
          });
          setTimeout(() => navigate("/lessons"), 2000);
        } else {
          setCurrentExerciseIndex((prev) => prev + 1);
          setQuery("");
          setFeedback(null);
          setShowHint(false);
          setShowSolution(false);
        }
      }, 1500);
    } else {
      setFeedback({
        type: "error",
        message: "✗ Not quite right. Try again or check the hint.",
      });
    }
  };

  return (
    <main
      style={{ maxWidth: "1200px", margin: "28px auto", padding: "0 20px" }}
    >
      {/* Breadcrumbs */}
      <div
        style={{
          marginBottom: "16px",
          fontSize: "14px",
          color: "var(--muted)",
        }}
      >
        <Link
          to="/"
          style={{ color: "var(--csu-green)", textDecoration: "none" }}
        >
          Home
        </Link>
        {" → "}
        <Link
          to="/lessons"
          style={{ color: "var(--csu-green)", textDecoration: "none" }}
        >
          Lessons
        </Link>
        {" → "}
        <span>{lesson.title}</span>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        {/* Main Content */}
        <div>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "16px",
              }}
            >
              <div>
                <h1 style={{ margin: "0 0 8px 0", fontSize: "28px" }}>
                  {lesson.title}
                </h1>
                <p style={{ color: "var(--muted)", margin: 0 }}>
                  {lesson.description}
                </p>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background:
                    lesson.difficulty === "Beginner"
                      ? "#2ECC71"
                      : lesson.difficulty === "Intermediate"
                      ? "#FFC727"
                      : "#E74C3C",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {lesson.difficulty}
              </div>
            </div>

            {/* Lesson Content */}
            <div
              style={{
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
              dangerouslySetInnerHTML={{
                __html: lesson.content
                  .replace(
                    /```sql([\s\S]*?)```/g,
                    (_: string, code: string) =>
                      `<pre class="sql-code-block"><code>${highlightSQL(
                        code.trim()
                      )}</code></pre>`
                  )
                  .replace(
                    /```redis([\s\S]*?)```/g,
                    '<pre class="sql-code-block"><code>$1</code></pre>'
                  )
                  .replace(
                    /```javascript([\s\S]*?)```/g,
                    '<pre class="sql-code-block"><code>$1</code></pre>'
                  )
                  .replace(
                    /```cypher([\s\S]*?)```/g,
                    '<pre class="sql-code-block"><code>$1</code></pre>'
                  )
                  .replace(
                    /```json([\s\S]*?)```/g,
                    '<pre class="sql-code-block"><code>$1</code></pre>'
                  )
                  .replace(
                    /```python([\s\S]*?)```/g,
                    '<pre class="sql-code-block"><code>$1</code></pre>'
                  )
                  .replace(
                    /# (.*)/g,
                    '<h2 style="margin-top: 24px; margin-bottom: 12px;">$1</h2>'
                  )
                  .replace(
                    /## (.*)/g,
                    '<h3 style="margin-top: 20px; margin-bottom: 10px;">$1</h3>'
                  ),
              }}
            />
          </Card>

          {/* Exercise Section */}
          <Card style={{ marginTop: "24px" }}>
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  Exercise {currentExerciseIndex + 1} of{" "}
                  {lesson.exercises.length}
                </h3>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  {Math.round(
                    ((currentExerciseIndex + 1) / lesson.exercises.length) * 100
                  )}
                  % Complete
                </div>
              </div>
              <p style={{ fontSize: "16px", margin: "8px 0 0 0" }}>
                {currentExercise.question}
              </p>
            </div>

            {/* SQL Editor with Monaco */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Write your SQL query:
              </label>
              <div
                style={{
                  border: "1px solid #e6e6e6",
                  borderRadius: "8px",
                  overflow: "hidden",
                  minHeight: "200px",
                }}
              >
                <Editor
                  height="200px"
                  defaultLanguage="sql"
                  value={query}
                  onChange={(value) => setQuery(value || "")}
                  theme="vs-light"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <Button
                variant="primary"
                onClick={checkQuery}
                icon={<CheckCircle size={16} />}
              >
                Check Answer
              </Button>
              <Button
                onClick={() => setShowHint(!showHint)}
                icon={<HelpCircle size={16} />}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <Button onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? "Hide Solution" : "Show Solution"}
              </Button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background:
                    feedback.type === "success" ? "#d4edda" : "#f8d7da",
                  color: feedback.type === "success" ? "#155724" : "#721c24",
                  marginBottom: "16px",
                  fontWeight: 600,
                }}
              >
                {feedback.message}
              </div>
            )}

            {/* Hint */}
            {showHint && currentExercise.hint && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "#fff3cd",
                  color: "#856404",
                  marginBottom: "16px",
                }}
              >
                <strong
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <HelpCircle size={16} />
                  Hint:
                </strong>
                {currentExercise.hint}
              </div>
            )}

            {/* Solution */}
            {showSolution && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "#f4f4f4",
                  border: "1px solid #e0e0e0",
                }}
              >
                <strong>Solution:</strong>
                <pre style={{ margin: "8px 0 0 0", fontFamily: "monospace" }}>
                  {currentExercise.solution}
                </pre>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <h4 style={{ margin: "0 0 16px 0" }}>Lesson Info</h4>
            <div style={{ fontSize: "14px", lineHeight: 1.8 }}>
              <div style={{ marginBottom: "8px" }}>
                <strong>Category:</strong> {lesson.category}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Duration:</strong> ~{lesson.estimatedTime} minutes
              </div>
              <div>
                <strong>Exercises:</strong> {lesson.exercises.length}
              </div>
            </div>
          </Card>

          <Card style={{ marginTop: "16px" }}>
            <h4 style={{ margin: "0 0 12px 0" }}>Progress</h4>
            <div
              style={{
                height: "8px",
                background: "#eee",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${
                    ((currentExerciseIndex + 1) / lesson.exercises.length) * 100
                  }%`,
                  background:
                    "linear-gradient(90deg, var(--csu-green), var(--csu-gold))",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)" }}>
              {currentExerciseIndex + 1} / {lesson.exercises.length} exercises
            </div>
          </Card>

          <Link to="/lessons">
            <Button
              style={{ width: "100%", marginTop: "16px" }}
              icon={<ArrowLeft size={16} />}
            >
              Back to Lessons
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
