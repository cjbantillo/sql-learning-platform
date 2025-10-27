import { useState, useEffect } from "react";
import Card from "./Card.tsx";
import Button from "./Button.tsx";

interface QueryResult {
  [key: string]: string | number | boolean | null;
}

interface QueryExecution {
  query: string;
  results: QueryResult[];
  executionTime: number;
  timestamp: Date;
  status: "success" | "error";
  errorMessage?: string;
}

type DatabaseType = "mysql" | "postgresql" | "sqlite";

interface SQLPlaygroundProps {
  databaseType?: DatabaseType;
  showAdvancedFeatures?: boolean;
  enableSaveShare?: boolean;
}

export default function SQLPlayground({
  databaseType = "mysql",
  showAdvancedFeatures = true,
  enableSaveShare = true,
}: SQLPlaygroundProps = {}) {
  const [query, setQuery] = useState(
    "SELECT id, name, course FROM students WHERE year = 3;"
  );
  const [results, setResults] = useState<QueryResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [queryHistory, setQueryHistory] = useState<QueryExecution[]>([]);
  const [syntaxErrors, setSyntaxErrors] = useState<string[]>([]);
  const [showExecutionPlan, setShowExecutionPlan] = useState(false);
  const [savedQueries, setSavedQueries] = useState<
    { name: string; query: string }[]
  >([]);
  const [queryName, setQueryName] = useState("");

  // Syntax validation function
  const validateQuery = (q: string): string[] => {
    const errors: string[] = [];

    // Basic syntax checks
    if (!q.trim()) {
      errors.push("Query cannot be empty");
      return errors;
    }

    // Check for balanced parentheses
    const openParens = (q.match(/\(/g) || []).length;
    const closeParens = (q.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push("Unbalanced parentheses");
    }

    // Check for basic SQL keywords
    const sqlKeywords =
      /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|EXPLAIN)/i;
    if (!sqlKeywords.test(q.trim())) {
      errors.push("Query must start with a valid SQL keyword");
    }

    // Check for missing semicolon (optional warning)
    if (!q.trim().endsWith(";")) {
      errors.push("Warning: Query should end with semicolon (;)");
    }

    return errors;
  };

  // Enhanced query execution with performance metrics
  const runQuery = () => {
    const q = query.trim();
    const startTime = performance.now();

    // Validate syntax first
    const errors = validateQuery(q);
    setSyntaxErrors(errors);

    if (errors.some((error) => !error.startsWith("Warning:"))) {
      setShowResults(false);
      return;
    }

    // Enhanced mock query execution with comprehensive lesson support
    let rows: QueryResult[] = [];
    let message = "";
    const status: "success" | "error" = "success";

    // === ADVANCED SQL PATTERNS ===

    // Recursive CTE queries (Advanced SQL)
    if (/WITH\s+RECURSIVE/i.test(q)) {
      if (/org_hierarchy|employee/i.test(q)) {
        rows = [
          {
            level: 1,
            employee_name: "Dr. Sarah Johnson",
            title: "President",
            department: "Executive",
            hierarchy_path: "Dr. Sarah Johnson",
          },
          {
            level: 2,
            employee_name: "Prof. Michael Chen",
            title: "VP Academic Affairs",
            department: "Academic",
            hierarchy_path: "Dr. Sarah Johnson → Prof. Michael Chen",
          },
          {
            level: 3,
            employee_name: "Dr. Emily Rodriguez",
            title: "Dean of Engineering",
            department: "Engineering",
            hierarchy_path:
              "Dr. Sarah Johnson → Prof. Michael Chen → Dr. Emily Rodriguez",
          },
          {
            level: 4,
            employee_name: "Prof. James Wilson",
            title: "CS Department Head",
            department: "Computer Science",
            hierarchy_path:
              "Dr. Sarah Johnson → Prof. Michael Chen → Dr. Emily Rodriguez → Prof. James Wilson",
          },
        ];
      } else if (/prereq|course/i.test(q)) {
        rows = [
          {
            root_course_name: "Advanced Algorithms",
            max_chain_length: 4,
            courses_in_chain: 5,
            contains_cycle: false,
            chain_complexity: "🔗 Long Chain",
          },
          {
            root_course_name: "Database Systems",
            max_chain_length: 2,
            courses_in_chain: 3,
            contains_cycle: false,
            chain_complexity: "📚 Moderate Chain",
          },
          {
            root_course_name: "Programming 101",
            max_chain_length: 0,
            courses_in_chain: 1,
            contains_cycle: false,
            chain_complexity: "🎯 Independent Course",
          },
        ];
      }
    }

    // Window Functions (Advanced SQL)
    else if (
      /ROW_NUMBER|RANK|DENSE_RANK|PERCENT_RANK|NTILE|LAG|LEAD/i.test(q)
    ) {
      if (/student.*rank/i.test(q) || /performance/i.test(q)) {
        rows = [
          {
            student_name: "Alice Chen",
            major: "Computer Science",
            gpa: 3.95,
            overall_rank: 1,
            major_rank: 1,
            percentile: 98.5,
            performance_tier: "🌟 Top 5%",
          },
          {
            student_name: "Bob Martinez",
            major: "Computer Science",
            gpa: 3.87,
            overall_rank: 2,
            major_rank: 2,
            percentile: 95.2,
            performance_tier: "⭐ Top 10%",
          },
          {
            student_name: "Carol Kim",
            major: "Information Technology",
            gpa: 3.82,
            overall_rank: 3,
            major_rank: 1,
            percentile: 92.1,
            performance_tier: "⭐ Top 10%",
          },
          {
            student_name: "David Lee",
            major: "Information Technology",
            gpa: 3.74,
            overall_rank: 4,
            major_rank: 2,
            percentile: 87.3,
            performance_tier: "✅ Top 25%",
          },
        ];
      } else if (/sales|revenue/i.test(q)) {
        rows = [
          {
            month: "2024-01",
            revenue: 125000,
            rank_in_month: 1,
            running_total: 125000,
            prev_month_growth: null,
          },
          {
            month: "2024-02",
            revenue: 142000,
            rank_in_month: 1,
            running_total: 267000,
            prev_month_growth: 13.6,
          },
          {
            month: "2024-03",
            revenue: 138000,
            rank_in_month: 2,
            running_total: 405000,
            prev_month_growth: -2.8,
          },
        ];
      }
    }

    // Stored Procedures (Advanced SQL)
    else if (/CREATE\s+PROCEDURE|EXEC|CALL|PROCEDURE/i.test(q)) {
      rows = [
        {
          status: "success",
          message: "✓ Stored procedure executed successfully",
          affected_rows: 3,
          execution_time_ms: 45,
        },
        {
          procedure_name: "update_student_gpa",
          parameters: "student_id=12345",
          result: "GPA updated from 3.2 to 3.4",
        },
      ];
    }

    // Database Views (Advanced SQL)
    else if (/CREATE\s+VIEW|VIEW/i.test(q)) {
      if (/student.*summary/i.test(q)) {
        rows = [
          {
            student_id: 1001,
            student_name: "Emma Thompson",
            total_credits: 84,
            current_gpa: 3.67,
            status: "On Track",
            graduation_semester: "Spring 2025",
          },
          {
            student_id: 1002,
            student_name: "Ryan O'Connor",
            total_credits: 72,
            current_gpa: 3.45,
            status: "On Track",
            graduation_semester: "Fall 2025",
          },
          {
            student_id: 1003,
            student_name: "Sofia Rodriguez",
            total_credits: 96,
            current_gpa: 3.89,
            status: "Ahead",
            graduation_semester: "Fall 2024",
          },
        ];
      } else if (/department.*performance/i.test(q)) {
        rows = [
          {
            department: "Computer Science",
            avg_gpa: 3.52,
            total_students: 245,
            graduation_rate: 87.3,
            performance_category: "🌟 Excellent",
          },
          {
            department: "Information Technology",
            avg_gpa: 3.41,
            total_students: 189,
            graduation_rate: 82.1,
            performance_category: "✅ Good",
          },
          {
            department: "Engineering",
            avg_gpa: 3.38,
            total_students: 156,
            graduation_rate: 79.8,
            performance_category: "✅ Good",
          },
        ];
      }
    }

    // === DATA ANALYSIS PATTERNS ===

    // Statistical Functions (Data Analysis)
    else if (/STDDEV|VARIANCE|CORR|PERCENTILE|MEDIAN|MODE/i.test(q)) {
      if (/gpa.*statistics/i.test(q) || /performance.*analysis/i.test(q)) {
        rows = [
          {
            department: "Computer Science",
            avg_gpa: 3.52,
            stddev_gpa: 0.34,
            median_gpa: 3.58,
            gpa_range: 2.1,
            coefficient_variation: 0.097,
          },
          {
            department: "Information Technology",
            avg_gpa: 3.41,
            stddev_gpa: 0.41,
            median_gpa: 3.44,
            gpa_range: 2.3,
            coefficient_variation: 0.12,
          },
          {
            department: "Business",
            avg_gpa: 3.28,
            stddev_gpa: 0.38,
            median_gpa: 3.31,
            gpa_range: 2.0,
            coefficient_variation: 0.116,
          },
        ];
      } else if (/correlation/i.test(q)) {
        rows = [
          {
            variable_pair: "Study Hours vs GPA",
            correlation: 0.73,
            strength: "Strong Positive",
            p_value: 0.001,
            significance: "Highly Significant",
          },
          {
            variable_pair: "Class Attendance vs GPA",
            correlation: 0.68,
            strength: "Moderate Positive",
            p_value: 0.003,
            significance: "Significant",
          },
          {
            variable_pair: "Social Media Usage vs GPA",
            correlation: -0.42,
            strength: "Moderate Negative",
            p_value: 0.012,
            significance: "Significant",
          },
        ];
      }
    }

    // Time Series Analysis (Data Analysis)
    else if (
      /DATE_TRUNC|EXTRACT|INTERVAL|LAG.*enrollment|time.*series|trend/i.test(q)
    ) {
      if (/enrollment.*trend/i.test(q) || /monthly.*analysis/i.test(q)) {
        rows = [
          {
            month: "2024-01",
            new_enrollments: 342,
            trend_3mo: 338,
            growth_rate: 5.2,
            enrollment_status: "📈 Growing",
            seasonal_factor: 1.15,
          },
          {
            month: "2024-02",
            new_enrollments: 298,
            trend_3mo: 325,
            growth_rate: -12.9,
            enrollment_status: "📉 Declining",
            seasonal_factor: 0.95,
          },
          {
            month: "2024-03",
            new_enrollments: 367,
            trend_3mo: 336,
            growth_rate: 23.2,
            enrollment_status: "📈 Growing",
            seasonal_factor: 1.08,
          },
          {
            month: "2024-04",
            new_enrollments: 389,
            trend_3mo: 351,
            growth_rate: 6.0,
            enrollment_status: "📈 Growing",
            seasonal_factor: 1.12,
          },
        ];
      } else if (/financial.*performance/i.test(q)) {
        rows = [
          {
            quarter: "Q1 2024",
            revenue: 2840000,
            yoy_growth: 8.3,
            moving_avg: 2765000,
            forecast_next: 2920000,
            trend: "📈 Positive",
          },
          {
            quarter: "Q2 2024",
            revenue: 2950000,
            yoy_growth: 12.1,
            moving_avg: 2840000,
            forecast_next: 3050000,
            trend: "📈 Positive",
          },
          {
            quarter: "Q3 2024",
            revenue: 3120000,
            yoy_growth: 15.7,
            moving_avg: 2970000,
            forecast_next: 3180000,
            trend: "📈 Positive",
          },
        ];
      }
    }

    // Data Mining Patterns (Data Analysis)
    else if (
      /association|market.*basket|clustering|CASE.*WHEN.*cluster/i.test(q)
    ) {
      if (/course.*association/i.test(q) || /enrollment.*pattern/i.test(q)) {
        rows = [
          {
            course_a: "Database Systems",
            course_b: "Web Development",
            together_count: 87,
            support_pct: 12.3,
            confidence_pct: 78.4,
            lift: 2.1,
            association_strength: "Strong Association",
          },
          {
            course_a: "Data Structures",
            course_b: "Algorithms",
            together_count: 124,
            support_pct: 17.6,
            confidence_pct: 89.2,
            lift: 3.4,
            association_strength: "Strong Association",
          },
          {
            course_a: "Statistics",
            course_b: "Machine Learning",
            together_count: 56,
            support_pct: 7.9,
            confidence_pct: 67.1,
            lift: 1.8,
            association_strength: "Moderate Association",
          },
        ];
      } else if (
        /student.*cluster/i.test(q) ||
        /performance.*cluster/i.test(q)
      ) {
        rows = [
          {
            performance_cluster: "High Achiever",
            student_count: 89,
            avg_gpa: 3.84,
            avg_a_grade_pct: 72.3,
            avg_poor_grade_pct: 2.1,
            avg_consistency: 0.31,
          },
          {
            performance_cluster: "Steady Performer",
            student_count: 156,
            avg_gpa: 3.42,
            avg_a_grade_pct: 45.7,
            avg_poor_grade_pct: 8.4,
            avg_consistency: 0.48,
          },
          {
            performance_cluster: "Inconsistent Performer",
            student_count: 73,
            avg_gpa: 3.15,
            avg_a_grade_pct: 38.2,
            avg_poor_grade_pct: 18.7,
            avg_consistency: 1.12,
          },
          {
            performance_cluster: "At Risk",
            student_count: 42,
            avg_gpa: 2.67,
            avg_a_grade_pct: 19.3,
            avg_poor_grade_pct: 34.8,
            avg_consistency: 1.45,
          },
        ];
      }
    }

    // Reporting & Dashboards (Data Analysis)
    else if (/KPI|dashboard|executive|report|metrics.*comparison/i.test(q)) {
      if (/executive.*KPI/i.test(q) || /institutional.*metrics/i.test(q)) {
        rows = [
          {
            kpi_name: "Active Students",
            current_value: 2847,
            previous_value: 2654,
            yoy_change_pct: 7.3,
            trend: "📈 Growing",
          },
          {
            kpi_name: "Institutional GPA",
            current_value: 3.42,
            previous_value: 3.38,
            yoy_change_pct: 1.2,
            trend: "📈 Improving",
          },
          {
            kpi_name: "Graduation Rate",
            current_value: 84.7,
            previous_value: 81.9,
            yoy_change_pct: 3.4,
            trend: "📈 Improving",
          },
          {
            kpi_name: "Revenue per Student",
            current_value: 18750,
            previous_value: 17890,
            yoy_change_pct: 4.8,
            trend: "📈 Growing",
          },
        ];
      } else if (/department.*scorecard/i.test(q)) {
        rows = [
          {
            department: "Computer Science",
            total_students: 245,
            avg_gpa: 3.52,
            pass_rate_pct: 91.3,
            retention_pct: 87.2,
            revenue_estimate: 1847500,
            performance_category: "🌟 Excellent",
          },
          {
            department: "Information Technology",
            total_students: 189,
            avg_gpa: 3.41,
            pass_rate_pct: 88.7,
            retention_pct: 84.6,
            revenue_estimate: 1423500,
            performance_category: "✅ Good",
          },
          {
            department: "Business Administration",
            total_students: 167,
            avg_gpa: 3.28,
            pass_rate_pct: 85.2,
            retention_pct: 79.8,
            revenue_estimate: 1258750,
            performance_category: "⚠️ Needs Improvement",
          },
        ];
      } else if (/system.*health/i.test(q) || /operational.*metrics/i.test(q)) {
        rows = [
          {
            report_time: "2024-10-27 14:30:00",
            monthly_new_students: 387,
            courses_current_semester: 142,
            enrollments_last_7_days: 43,
            active_students_today: 2234,
            weekly_revenue: 89500,
            enrollment_trend: "🟢 High Activity",
            data_quality_status: "✅ Good Data Quality",
            engagement_status: "✅ Normal Student Engagement",
          },
        ];
      }
    }

    // === FUNDAMENTALS PATTERNS ===

    // ORDER BY & LIMIT (Fundamentals)
    else if (/ORDER\s+BY.*LIMIT|LIMIT.*ORDER\s+BY|TOP.*students/i.test(q)) {
      if (/gpa.*DESC|highest.*gpa/i.test(q)) {
        rows = [
          {
            rank: 1,
            student_name: "Emma Chen",
            gpa: 3.97,
            major: "Computer Science",
            honors_status: "🏆 Summa Cum Laude Track",
          },
          {
            rank: 2,
            student_name: "Alexander Rodriguez",
            gpa: 3.94,
            major: "Engineering",
            honors_status: "🥈 Magna Cum Laude Track",
          },
          {
            rank: 3,
            student_name: "Sophia Kim",
            gpa: 3.92,
            major: "Information Technology",
            honors_status: "🥉 Magna Cum Laude Track",
          },
        ];
      } else if (/enrollment.*date|newest.*students/i.test(q)) {
        rows = [
          {
            student_name: "Jake Wilson",
            enrollment_date: "2024-08-15",
            major: "Business",
            status: "New Student",
            orientation_completed: "✅ Yes",
          },
          {
            student_name: "Maya Patel",
            enrollment_date: "2024-08-12",
            major: "Computer Science",
            status: "New Student",
            orientation_completed: "✅ Yes",
          },
          {
            student_name: "Connor Smith",
            enrollment_date: "2024-08-10",
            major: "Engineering",
            status: "New Student",
            orientation_completed: "⏳ Pending",
          },
        ];
      }
    }

    // Basic Functions (Fundamentals)
    else if (
      /UPPER|LOWER|SUBSTRING|CONCAT|LENGTH|ROUND|FLOOR|CEIL|NOW|CURRENT_DATE/i.test(
        q
      )
    ) {
      if (/string.*function|CONCAT|UPPER|LOWER/i.test(q)) {
        rows = [
          {
            student_name: "John Doe",
            formatted_name: "DOE, JOHN",
            email: "john.doe@csu.edu",
            name_length: 8,
            initials: "J.D.",
          },
          {
            student_name: "Jane Smith",
            formatted_name: "SMITH, JANE",
            email: "jane.smith@csu.edu",
            name_length: 10,
            initials: "J.S.",
          },
          {
            student_name: "Mike Johnson",
            formatted_name: "JOHNSON, MIKE",
            email: "mike.johnson@csu.edu",
            name_length: 12,
            initials: "M.J.",
          },
        ];
      } else if (/date.*function|enrollment.*age/i.test(q)) {
        rows = [
          {
            student_name: "Alice Brown",
            enrollment_date: "2022-08-15",
            days_enrolled: 804,
            academic_year: "Senior",
            semesters_completed: 6,
          },
          {
            student_name: "Bob Davis",
            enrollment_date: "2023-01-10",
            days_enrolled: 656,
            academic_year: "Junior",
            semesters_completed: 4,
          },
          {
            student_name: "Carol Wilson",
            enrollment_date: "2024-08-20",
            days_enrolled: 68,
            academic_year: "Freshman",
            semesters_completed: 1,
          },
        ];
      }
    }

    // Data Types & Constraints (Fundamentals)
    else if (
      /CREATE\s+TABLE|ALTER\s+TABLE|ADD\s+CONSTRAINT|PRIMARY\s+KEY|FOREIGN\s+KEY/i.test(
        q
      )
    ) {
      rows = [
        {
          action: "CREATE TABLE",
          table_name: "students",
          status: "✓ Created successfully",
          constraints_added: 5,
        },
        {
          constraint_type: "PRIMARY KEY",
          column: "student_id",
          status: "✓ Applied",
          description: "Ensures unique student identification",
        },
        {
          constraint_type: "FOREIGN KEY",
          column: "major_id",
          references: "majors(major_id)",
          status: "✓ Applied",
          description: "Links to valid academic programs",
        },
        {
          constraint_type: "CHECK",
          column: "gpa",
          condition: "gpa >= 0.0 AND gpa <= 4.0",
          status: "✓ Applied",
          description: "Validates GPA range",
        },
      ];
    }

    // Subqueries (Fundamentals)
    else if (/\(\s*SELECT.*\)|EXISTS.*SELECT|IN.*SELECT|subquery/i.test(q)) {
      if (/above.*average|gpa.*subquery/i.test(q)) {
        rows = [
          {
            student_name: "Emma Martinez",
            gpa: 3.87,
            above_avg_by: 0.45,
            percentile_rank: 89,
            performance_note: "Well above average",
          },
          {
            student_name: "David Kim",
            gpa: 3.76,
            above_avg_by: 0.34,
            percentile_rank: 82,
            performance_note: "Above average performer",
          },
          {
            student_name: "Sarah Connor",
            gpa: 3.68,
            above_avg_by: 0.26,
            percentile_rank: 76,
            performance_note: "Strong academic performance",
          },
        ];
      } else if (/course.*enrollment|popular.*courses/i.test(q)) {
        rows = [
          {
            course_name: "Introduction to Programming",
            enrollment_count: 156,
            capacity: 180,
            popularity_rank: 1,
            waitlist_count: 23,
          },
          {
            course_name: "Database Systems",
            enrollment_count: 142,
            capacity: 160,
            popularity_rank: 2,
            waitlist_count: 15,
          },
          {
            course_name: "Web Development",
            enrollment_count: 134,
            capacity: 150,
            popularity_rank: 3,
            waitlist_count: 8,
          },
        ];
      }
    }

    // === EXISTING PATTERNS (Enhanced) ===

    // INSERT queries
    else if (/INSERT\s+INTO/i.test(q)) {
      if (/student/i.test(q)) {
        message =
          "✓ New student record created successfully! Welcome to CSU! 🎉";
        rows = [
          {
            student_id: 2025001,
            status: "enrolled",
            message: "Student orientation scheduled for next week",
          },
        ];
      } else {
        message = "✓ 1 row inserted successfully (mock)";
        rows = [{ status: "success", message }];
      }
    }
    // UPDATE queries
    else if (/UPDATE\s+\w+\s+SET/i.test(q)) {
      if (/gpa|grade/i.test(q)) {
        message = "✓ Student grades updated successfully! 📚";
        rows = [
          {
            records_updated: 2,
            message: "GPA recalculated automatically",
            academic_status: "Updated",
          },
        ];
      } else {
        message = "✓ 2 rows updated successfully (mock)";
        rows = [{ status: "success", message }];
      }
    }
    // DELETE queries
    else if (/DELETE\s+FROM/i.test(q)) {
      message = "⚠️  1 record removed from database (mock)";
      rows = [
        {
          status: "deleted",
          message: "Remember: This action cannot be undone in production!",
        },
      ];
    }
    // JOIN queries (Enhanced with CSU context)
    else if (/JOIN/i.test(q)) {
      if (/student.*course|enrollment/i.test(q)) {
        rows = [
          {
            student_name: "Aldrin Santos",
            course_name: "Advanced Database Systems",
            instructor: "Prof. Maria Garcia",
            semester: "Fall 2024",
            grade: "A-",
          },
          {
            student_name: "Bea Mendoza",
            course_name: "Software Engineering",
            instructor: "Prof. Juan Santos",
            semester: "Fall 2024",
            grade: "B+",
          },
          {
            student_name: "Carlo Perez",
            course_name: "Educational Technology",
            instructor: "Prof. Ana Reyes",
            semester: "Fall 2024",
            grade: "A",
          },
          {
            student_name: "Diana Lopez",
            course_name: "Mobile App Development",
            instructor: "Prof. Carlos Rivera",
            semester: "Fall 2024",
            grade: "B",
          },
        ];
      } else {
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
    }
    // Aggregate functions (Enhanced)
    else if (/COUNT|SUM|AVG|MIN|MAX/i.test(q)) {
      if (/COUNT.*student/i.test(q)) {
        rows = [
          {
            total_students: 2847,
            active_students: 2634,
            new_this_semester: 387,
          },
        ];
      } else if (/AVG.*gpa/i.test(q)) {
        rows = [
          { institutional_gpa: 3.42, semester_gpa: 3.38, department_avg: 3.47 },
        ];
      } else if (/SUM.*credit/i.test(q)) {
        rows = [
          {
            total_credits: 89650,
            completed_credits: 82340,
            remaining_credits: 7310,
          },
        ];
      } else if (/COUNT/i.test(q)) {
        rows = [{ count: 15 }];
      } else if (/AVG/i.test(q)) {
        rows = [{ average: 88.5 }];
      } else if (/SUM/i.test(q)) {
        rows = [{ total: 450 }];
      } else {
        rows = [{ result: 42 }];
      }
    }
    // GROUP BY queries (Enhanced)
    else if (/GROUP\s+BY/i.test(q)) {
      if (/department|major/i.test(q)) {
        rows = [
          {
            major: "Computer Science",
            student_count: 245,
            avg_gpa: 3.52,
            graduation_rate: 87.3,
          },
          {
            major: "Information Technology",
            student_count: 189,
            avg_gpa: 3.41,
            graduation_rate: 82.1,
          },
          {
            major: "Business Administration",
            student_count: 167,
            avg_gpa: 3.28,
            graduation_rate: 79.8,
          },
          {
            major: "Engineering",
            student_count: 156,
            avg_gpa: 3.38,
            graduation_rate: 81.2,
          },
        ];
      } else {
        rows = [
          { course: "BSIT", count: 8 },
          { course: "BSCS", count: 5 },
          { course: "BSEd", count: 2 },
        ];
      }
    }
    // WHERE queries (Enhanced)
    else if (/WHERE.*year.*=\s*3/i.test(q) || /year\s*=\s*3/i.test(q)) {
      rows = [
        {
          id: 1,
          name: "Aldrin Santos",
          course: "BSIT",
          year: 3,
          gpa: 3.67,
          status: "Dean's List",
        },
        {
          id: 2,
          name: "Bea Mendoza",
          course: "BSCS",
          year: 3,
          gpa: 3.82,
          status: "Dean's List",
        },
      ];
    } else if (/WHERE.*course.*=.*'BSIT'/i.test(q)) {
      rows = [
        {
          id: 1,
          name: "Aldrin Santos",
          course: "BSIT",
          year: 3,
          gpa: 3.67,
          specialization: "Software Development",
        },
        {
          id: 4,
          name: "Diana Lopez",
          course: "BSIT",
          year: 2,
          gpa: 3.45,
          specialization: "Network Administration",
        },
      ];
    }
    // Basic SELECT from students (Enhanced)
    else if (/FROM\s+students/i.test(q)) {
      if (/\*/i.test(q)) {
        rows = [
          {
            id: 1,
            name: "Aldrin Santos",
            course: "BSIT",
            year: 3,
            gpa: 3.67,
            enrollment_date: "2022-08-15",
            status: "Active",
          },
          {
            id: 2,
            name: "Bea Mendoza",
            course: "BSCS",
            year: 3,
            gpa: 3.82,
            enrollment_date: "2022-08-12",
            status: "Active",
          },
          {
            id: 3,
            name: "Carlo Perez",
            course: "BSEd",
            year: 2,
            gpa: 3.45,
            enrollment_date: "2023-08-20",
            status: "Active",
          },
          {
            id: 4,
            name: "Diana Lopez",
            course: "BSIT",
            year: 2,
            gpa: 3.55,
            enrollment_date: "2023-08-18",
            status: "Active",
          },
        ];
      } else {
        rows = [
          { id: 1, name: "Aldrin Santos", course: "BSIT", year: 3 },
          { id: 2, name: "Bea Mendoza", course: "BSCS", year: 3 },
          { id: 3, name: "Carlo Perez", course: "BSEd", year: 2 },
        ];
      }
    }
    // Default fallback (Enhanced)
    else {
      rows = [
        {
          message:
            "🎓 Welcome to CSU SQL Playground! Try examples from our lessons:",
          examples:
            "SELECT * FROM students; | Window Functions | Recursive CTEs | Statistical Analysis",
          tip: "💡 Each lesson has specific query patterns - explore Advanced SQL and Data Analysis!",
        },
      ];
    }

    // Calculate execution time
    const endTime = performance.now();
    const execTime = endTime - startTime;
    setExecutionTime(execTime);

    // Add to query history
    const execution: QueryExecution = {
      query: q,
      results: rows,
      executionTime: execTime,
      timestamp: new Date(),
      status,
    };
    setQueryHistory((prev) => [execution, ...prev.slice(0, 9)]); // Keep last 10

    setResults(rows);
    setShowResults(true);
  };

  // Save query function
  const saveQuery = () => {
    if (!queryName.trim()) {
      alert("Please enter a name for this query");
      return;
    }

    const newSaved = { name: queryName, query: query.trim() };
    setSavedQueries((prev) => [...prev, newSaved]);
    setQueryName("");

    // Save to localStorage
    const saved = JSON.parse(
      localStorage.getItem("sqlPlaygroundQueries") || "[]"
    );
    saved.push(newSaved);
    localStorage.setItem("sqlPlaygroundQueries", JSON.stringify(saved));

    alert(`Query saved as "${queryName}"`);
  };

  // Load saved queries on component mount
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("sqlPlaygroundQueries") || "[]"
    );
    setSavedQueries(saved);
  }, []);

  // Database-specific query hints
  const getDatabaseHints = () => {
    switch (databaseType) {
      case "mysql":
        return [
          "Use LIMIT instead of TOP",
          "String comparison is case-insensitive",
          "Use backticks for reserved words",
        ];
      case "postgresql":
        return [
          "Use LIMIT instead of TOP",
          "String comparison is case-sensitive",
          "Use double quotes for identifiers",
        ];
      case "sqlite":
        return [
          "Limited data types",
          "No RIGHT JOIN support",
          "Use LIMIT for row limiting",
        ];
      default:
        return [];
    }
  };

  // Generate mock execution plan
  const generateExecutionPlan = () => {
    const q = query.trim().toLowerCase();
    const plans = [];

    if (q.includes("select")) {
      plans.push("1. Table Scan: students (cost=1.5, rows=100)");
      if (q.includes("where")) {
        plans.push("2. Filter: Apply WHERE conditions (cost=0.5, rows=25)");
      }
      if (q.includes("join")) {
        plans.push("3. Hash Join: students ⋈ courses (cost=2.1, rows=75)");
      }
      if (q.includes("order by")) {
        plans.push("4. Sort: ORDER BY clause (cost=1.2, rows=25)");
      }
      if (q.includes("group by")) {
        plans.push("4. HashAggregate: GROUP BY (cost=0.8, rows=10)");
      }
    }

    return plans.length > 0
      ? plans
      : ["No execution plan available for this query type"];
  };

  // Enhanced example queries based on lesson categories
  const loadExample = (category?: string) => {
    const examples = {
      fundamentals:
        "-- 📚 Fundamentals Example: Order students by GPA\nSELECT name, course, gpa, \n       CASE WHEN gpa >= 3.5 THEN 'Dean\\'s List' ELSE 'Regular' END as honors\nFROM students \nWHERE year = 3 \nORDER BY gpa DESC \nLIMIT 5;",

      advanced:
        "-- 🚀 Advanced SQL Example: Recursive organizational hierarchy\nWITH RECURSIVE org_hierarchy AS (\n    SELECT employee_id, employee_name, title, manager_id, 1 as level\n    FROM employees WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.employee_id, e.employee_name, e.title, e.manager_id, oh.level + 1\n    FROM employees e\n    JOIN org_hierarchy oh ON e.manager_id = oh.employee_id\n)\nSELECT level, employee_name, title FROM org_hierarchy ORDER BY level, employee_name;",

      dataAnalysis:
        "-- 📊 Data Analysis Example: Student performance analytics with window functions\nSELECT student_name, major, gpa,\n       RANK() OVER (ORDER BY gpa DESC) as overall_rank,\n       PERCENT_RANK() OVER (ORDER BY gpa) * 100 as percentile,\n       CASE WHEN PERCENT_RANK() OVER (ORDER BY gpa) >= 0.9 THEN '🌟 Top 10%'\n            WHEN PERCENT_RANK() OVER (ORDER BY gpa) >= 0.75 THEN '⭐ Top 25%'\n            ELSE '📈 Regular' END as performance_tier\nFROM students WHERE gpa IS NOT NULL ORDER BY gpa DESC LIMIT 10;",

      statistical:
        "-- 📈 Statistical Analysis Example: GPA distribution by department\nSELECT department,\n       COUNT(*) as student_count,\n       ROUND(AVG(gpa), 2) as avg_gpa,\n       ROUND(STDDEV(gpa), 3) as gpa_stddev,\n       ROUND(MIN(gpa), 2) as min_gpa,\n       ROUND(MAX(gpa), 2) as max_gpa\nFROM students \nGROUP BY department \nHAVING COUNT(*) >= 10 \nORDER BY avg_gpa DESC;",

      default:
        "-- 🎓 CSU Student Query Example\nSELECT id, name, course, year, gpa,\n       CASE WHEN gpa >= 3.5 THEN 'Dean\\'s List' \n            WHEN gpa >= 3.0 THEN 'Good Standing'\n            ELSE 'Academic Probation' END as academic_status\nFROM students \nWHERE year = 3 \nORDER BY gpa DESC;",
    };

    const selectedQuery =
      examples[category as keyof typeof examples] || examples.default;
    setQuery(selectedQuery);
  };

  const clearOutput = () => {
    setShowResults(false);
    setResults([]);
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Enhanced SQL Playground</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <span>Database:</span>
          <select
            value={databaseType}
            onChange={(e) => console.log("Database changed:", e.target.value)}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label style={{ fontWeight: 700 }}>
          Write a SQL query (sample table: students)
        </label>

        {/* Syntax Errors Display */}
        {syntaxErrors.length > 0 && (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              background: syntaxErrors.some((e) => !e.startsWith("Warning:"))
                ? "#fee"
                : "#fff4e6",
              border: `1px solid ${
                syntaxErrors.some((e) => !e.startsWith("Warning:"))
                  ? "#fcc"
                  : "#ffd700"
              }`,
              fontSize: "14px",
            }}
          >
            {syntaxErrors.map((error, idx) => (
              <div
                key={idx}
                style={{
                  color: error.startsWith("Warning:") ? "#b8860b" : "#d32f2f",
                  fontWeight: 500,
                }}
              >
                {error.startsWith("Warning:") ? "⚠️" : "❌"} {error}
              </div>
            ))}
          </div>
        )}

        {/* Database Hints */}
        {showAdvancedFeatures && (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              background: "#f0f8ff",
              border: "1px solid #b0d4f0",
              fontSize: "13px",
            }}
          >
            <strong>{databaseType.toUpperCase()} Tips:</strong>
            <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>
              {getDatabaseHints().map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        <textarea
          id="sqlInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          style={{
            width: "100%",
            minHeight: "140px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e6e6e6",
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace',
            fontSize: "14px",
            resize: "vertical",
          }}
        />

        {/* CSU Learning Context Panel */}
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #f0f8ff, #e6f3ff)",
            border: "1px solid #b3d9ff",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontSize: "16px" }}>🎓</span>
            <strong style={{ color: "var(--csu-green)", fontSize: "14px" }}>
              CSU SQL Learning Playground
            </strong>
          </div>
          <p
            style={{
              margin: "0",
              fontSize: "13px",
              color: "#495057",
              lineHeight: "1.4",
            }}
          >
            <strong>📖 Story Context:</strong> You're working as a data analyst
            at Colorado State University, helping administrators make
            data-driven decisions about student success, course planning, and
            institutional performance. Each query tells a story about our
            academic community!
          </p>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              gap: "12px",
              fontSize: "12px",
              flexWrap: "wrap",
            }}
          >
            <span>
              <strong>📚 Sample Tables:</strong> students, courses, enrollments,
              faculty
            </span>
            <span>
              <strong>🎯 Try:</strong> JOIN operations, window functions,
              statistical analysis
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button variant="primary" onClick={runQuery}>
            ▶️ Run Query
          </Button>
          <Button onClick={() => loadExample("default")}>
            📝 Basic Example
          </Button>
          <Button onClick={clearOutput}>🗑️ Clear</Button>
        </div>

        {/* Lesson Example Categories */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: "8px",
            padding: "8px",
            background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
            borderRadius: "6px",
            border: "1px solid #dee2e6",
          }}
        >
          <span
            style={{ fontSize: "13px", fontWeight: "600", color: "#495057" }}
          >
            🎓 Lesson Examples:
          </span>
          <Button
            onClick={() => loadExample("fundamentals")}
            style={{
              background: "var(--csu-green)",
              color: "white",
              fontSize: "12px",
              padding: "4px 8px",
            }}
          >
            📚 Fundamentals
          </Button>
          <Button
            onClick={() => loadExample("advanced")}
            style={{
              background: "var(--csu-gold)",
              color: "#1a1a1a",
              fontSize: "12px",
              padding: "4px 8px",
            }}
          >
            🚀 Advanced SQL
          </Button>
          <Button
            onClick={() => loadExample("dataAnalysis")}
            style={{
              background: "#6f42c1",
              color: "white",
              fontSize: "12px",
              padding: "4px 8px",
            }}
          >
            � Data Analysis
          </Button>
          <Button
            onClick={() => loadExample("statistical")}
            style={{
              background: "#20c997",
              color: "white",
              fontSize: "12px",
              padding: "4px 8px",
            }}
          >
            📈 Statistical
          </Button>
        </div>

        {/* Advanced Features Section */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {showAdvancedFeatures && (
            <>
              <Button onClick={() => setShowExecutionPlan(!showExecutionPlan)}>
                📊 {showExecutionPlan ? "Hide" : "Show"} Plan
              </Button>

              {enableSaveShare && (
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Query name..."
                    value={queryName}
                    onChange={(e) => setQueryName(e.target.value)}
                    style={{
                      padding: "6px 8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      width: "120px",
                    }}
                  />
                  <Button onClick={saveQuery}>💾 Save</Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Performance Metrics */}
        {showResults && showAdvancedFeatures && (
          <div
            style={{
              display: "flex",
              gap: "16px",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "#f8f9fa",
              border: "1px solid #e9ecef",
              fontSize: "13px",
            }}
          >
            <span>
              <strong>Execution Time:</strong> {executionTime.toFixed(2)}ms
            </span>
            <span>
              <strong>Rows:</strong> {results.length}
            </span>
            <span>
              <strong>Database:</strong> {databaseType.toUpperCase()}
            </span>
          </div>
        )}

        {/* Execution Plan */}
        {showExecutionPlan && showAdvancedFeatures && (
          <div
            style={{
              padding: "12px",
              borderRadius: "6px",
              background: "#f8f9fa",
              border: "1px solid #e9ecef",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Query Execution Plan</h4>
            <div style={{ fontFamily: "monospace", fontSize: "13px" }}>
              {generateExecutionPlan().map((step, idx) => (
                <div key={idx} style={{ padding: "2px 0" }}>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Queries */}
        {enableSaveShare && savedQueries.length > 0 && (
          <div
            style={{
              padding: "12px",
              borderRadius: "6px",
              background: "#f8f9fa",
              border: "1px solid #e9ecef",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Saved Queries</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {savedQueries.slice(-5).map((saved, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(saved.query)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #007bff",
                    background: "#e7f3ff",
                    color: "#0056b3",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                  title={saved.query}
                >
                  {saved.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Query Results */}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div style={{ fontWeight: 700 }}>
                Query Results ({results.length} row
                {results.length !== 1 ? "s" : ""})
              </div>
              {showAdvancedFeatures && (
                <div style={{ fontSize: "12px", color: "#666" }}>
                  Executed in {executionTime.toFixed(2)}ms • Mock Data
                </div>
              )}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    {Object.keys(results[0]).map((key) => (
                      <th
                        key={key}
                        style={{
                          padding: "8px 12px",
                          borderBottom: "2px solid #dee2e6",
                          textAlign: "left",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#495057",
                        }}
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        background: idx % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      }}
                    >
                      {Object.values(row).map((value, cellIdx) => (
                        <td
                          key={cellIdx}
                          style={{
                            padding: "8px 12px",
                            borderBottom: "1px solid #dee2e6",
                            textAlign: "left",
                            fontSize: "14px",
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

            {/* Results Interpretation Panel */}
            <div
              style={{
                marginTop: "12px",
                padding: "10px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #fff8e1, #fffbf0)",
                border: "1px solid #ffd54f",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "14px" }}>💡</span>
                <strong style={{ color: "#e65100", fontSize: "13px" }}>
                  What This Data Tells Us:
                </strong>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#5d4037",
                  lineHeight: "1.4",
                }}
              >
                {(() => {
                  const q = query.toLowerCase();
                  if (q.includes("recursive") || q.includes("hierarchy")) {
                    return "🏛️ This shows CSU's organizational structure, helping visualize reporting relationships and administrative levels for better decision-making.";
                  } else if (q.includes("rank") || q.includes("percentile")) {
                    return "🏆 These rankings help identify top performers and students who might need additional support, enabling targeted intervention programs.";
                  } else if (
                    q.includes("avg") ||
                    q.includes("stddev") ||
                    q.includes("correlation")
                  ) {
                    return "📊 Statistical analysis reveals patterns in student performance, helping CSU improve curriculum design and student success strategies.";
                  } else if (
                    q.includes("trend") ||
                    q.includes("time") ||
                    q.includes("growth")
                  ) {
                    return "📈 Time-based analysis shows enrollment and performance trends, crucial for strategic planning and resource allocation.";
                  } else if (
                    q.includes("association") ||
                    q.includes("cluster")
                  ) {
                    return "🔍 Data mining reveals hidden patterns in student behavior and course relationships, informing academic pathway recommendations.";
                  } else if (
                    q.includes("kpi") ||
                    q.includes("dashboard") ||
                    q.includes("executive")
                  ) {
                    return "📋 Executive dashboards provide leadership with key metrics for institutional decision-making and performance monitoring.";
                  } else if (q.includes("join")) {
                    return "🔗 Joining tables connects related information, showing relationships between students, courses, and faculty for comprehensive insights.";
                  } else if (q.includes("group by")) {
                    return "📂 Grouping data by categories (like major or department) helps identify patterns and compare performance across different segments.";
                  } else if (q.includes("order by") || q.includes("limit")) {
                    return "🎯 Sorting and limiting results helps focus on the most important data points, like top performers or recent enrollments.";
                  } else if (q.includes("where")) {
                    return "🔎 Filtering data with conditions helps answer specific questions about student subgroups and targeted analysis.";
                  } else if (
                    q.includes("function") ||
                    q.includes("concat") ||
                    q.includes("upper")
                  ) {
                    return "🛠️ SQL functions help clean, format, and transform data into more usable formats for reports and analysis.";
                  } else {
                    return "🎓 This query demonstrates SQL fundamentals essential for data analysis in educational institutions like CSU.";
                  }
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Query History */}
        {showAdvancedFeatures && queryHistory.length > 0 && (
          <div
            style={{
              padding: "12px",
              borderRadius: "6px",
              background: "#f8f9fa",
              border: "1px solid #e9ecef",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Recent Queries</h4>
            <div style={{ maxHeight: "150px", overflowY: "auto" }}>
              {queryHistory.slice(0, 5).map((exec, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "6px 8px",
                    margin: "4px 0",
                    borderRadius: "4px",
                    background: "#ffffff",
                    border: "1px solid #e0e0e0",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => setQuery(exec.query)}
                  title="Click to load this query"
                >
                  <div style={{ fontWeight: 500, marginBottom: "2px" }}>
                    {exec.query.substring(0, 50)}...
                  </div>
                  <div style={{ color: "#666", fontSize: "11px" }}>
                    {exec.timestamp.toLocaleTimeString()} •
                    {exec.executionTime.toFixed(1)}ms •{exec.results.length}{" "}
                    rows •
                    <span
                      style={{
                        color:
                          exec.status === "success" ? "#28a745" : "#dc3545",
                        fontWeight: 500,
                      }}
                    >
                      {exec.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
