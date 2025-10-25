import { useState } from "react";
import Card from "./Card.tsx";
import Button from "./Button.tsx";

interface QueryResult {
  [key: string]: string | number;
}

export default function SQLPlayground() {
  const [query, setQuery] = useState(
    "SELECT id, name, course FROM students WHERE year = 3;"
  );
  const [results, setResults] = useState<QueryResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const runQuery = () => {
    const q = query.trim();
    if (!q) {
      alert("Please type a query");
      return;
    }

    // Mock query execution - enhanced pattern matching
    let rows: QueryResult[] = [];
    let message = "";

    // INSERT queries
    if (/INSERT\s+INTO/i.test(q)) {
      message = "✓ 1 row inserted successfully (mock)";
      rows = [{ status: "success", message }];
    }
    // UPDATE queries
    else if (/UPDATE\s+\w+\s+SET/i.test(q)) {
      message = "✓ 2 rows updated successfully (mock)";
      rows = [{ status: "success", message }];
    }
    // DELETE queries
    else if (/DELETE\s+FROM/i.test(q)) {
      message = "✓ 1 row deleted successfully (mock)";
      rows = [{ status: "success", message }];
    }
    // JOIN queries
    else if (/JOIN/i.test(q)) {
      rows = [
        {
          student_id: 1,
          student_name: "Aldrin S.",
          course_name: "Information Technology",
          instructor: "Prof. Garcia",
        },
        {
          student_id: 2,
          student_name: "Bea M.",
          course_name: "Computer Science",
          instructor: "Prof. Santos",
        },
        {
          student_id: 3,
          student_name: "Carlo P.",
          course_name: "Education",
          instructor: "Prof. Reyes",
        },
      ];
    }
    // Aggregate functions (COUNT, SUM, AVG, etc.)
    else if (/COUNT|SUM|AVG|MIN|MAX/i.test(q)) {
      if (/COUNT/i.test(q)) {
        rows = [{ count: 15 }];
      } else if (/AVG/i.test(q)) {
        rows = [{ average: 88.5 }];
      } else if (/SUM/i.test(q)) {
        rows = [{ total: 450 }];
      } else {
        rows = [{ result: 42 }];
      }
    }
    // GROUP BY queries
    else if (/GROUP\s+BY/i.test(q)) {
      rows = [
        { course: "BSIT", count: 8 },
        { course: "BSCS", count: 5 },
        { course: "BSEd", count: 2 },
      ];
    }
    // ORDER BY queries
    else if (/ORDER\s+BY/i.test(q)) {
      rows = [
        { id: 1, name: "Aldrin S.", course: "BSIT", year: 3 },
        { id: 2, name: "Bea M.", course: "BSCS", year: 3 },
        { id: 3, name: "Carlo P.", course: "BSEd", year: 2 },
      ];
    }
    // WHERE with year = 3
    else if (/WHERE.*year.*=\s*3/i.test(q) || /year\s*=\s*3/i.test(q)) {
      rows = [
        { id: 1, name: "Aldrin S.", course: "BSIT", year: 3 },
        { id: 2, name: "Bea M.", course: "BSCS", year: 3 },
      ];
    }
    // WHERE with course filter
    else if (/WHERE.*course.*=.*'BSIT'/i.test(q)) {
      rows = [
        { id: 1, name: "Aldrin S.", course: "BSIT", year: 3 },
        { id: 4, name: "Diana L.", course: "BSIT", year: 2 },
      ];
    }
    // Basic SELECT from students
    else if (/FROM\s+students/i.test(q)) {
      rows = [
        { id: 1, name: "Aldrin S.", course: "BSIT", year: 3 },
        { id: 2, name: "Bea M.", course: "BSCS", year: 3 },
        { id: 3, name: "Carlo P.", course: "BSEd", year: 2 },
      ];
    }
    // Default fallback
    else {
      rows = [
        {
          info: "No matching mock results — this is a frontend demo. Try SELECT, INSERT, UPDATE, DELETE, JOIN, or aggregate functions.",
        },
      ];
    }

    setResults(rows);
    setShowResults(true);
  };

  const loadExample = () => {
    setQuery(
      "SELECT name, course, year FROM students WHERE course = 'BSIT' ORDER BY name;"
    );
  };

  const clearOutput = () => {
    setShowResults(false);
    setResults([]);
  };

  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>SQL Playground</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label style={{ fontWeight: 700 }}>
          Write a SQL query (sample table: students)
        </label>
        <textarea
          id="sqlInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            minHeight: "140px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e6e6e6",
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace',
            fontSize: "14px",
          }}
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button variant="primary" onClick={runQuery}>
            Run Query
          </Button>
          <Button onClick={loadExample}>Load Example</Button>
          <Button onClick={clearOutput}>Clear</Button>
        </div>

        {showResults && results.length > 0 && (
          <div
            style={{
              borderRadius: "8px",
              border: "1px solid #e9e9e9",
              padding: "12px",
              background: "linear-gradient(180deg, #ffffff, #f7fff7)",
              animation: "fadeIn 0.26s ease-out",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "8px" }}>
              Result (mock)
            </div>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th
                        key={key}
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #eee",
                          textAlign: "left",
                          fontWeight: 600,
                        }}
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((value, cellIdx) => (
                        <td
                          key={cellIdx}
                          style={{
                            padding: "8px",
                            borderBottom: "1px solid #eee",
                            textAlign: "left",
                          }}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
