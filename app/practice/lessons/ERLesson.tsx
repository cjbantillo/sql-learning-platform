"use client";

import MermaidDiagram from "@/app/components/visuals/MermaidDiagram";

const erCode = `
erDiagram
    STUDENT ||--o{ ENROLLMENT : "enrolls in"
    COURSE ||--o{ ENROLLMENT : "has"
    INSTRUCTOR ||--o{ COURSE : "teaches"
    
    STUDENT {
        int student_id PK
        string name
        string email
        date enrollment_date
    }
    COURSE {
        int course_id PK
        string title
        string code
        int credits
    }
    ENROLLMENT {
        int enrollment_id PK
        int student_id FK
        int course_id FK
        date enrolled_date
        string grade
    }
    INSTRUCTOR {
        int instructor_id PK
        string name
        string department
    }
`;

export default function ERLesson() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ER Modeling Basics
        </h2>
        <p className="text-gray-700 mb-4">
          Entity-Relationship (ER) modeling is a fundamental technique for
          designing databases. It helps you visualize the structure of your
          database before implementation.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Key Concepts</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Entities:</strong> Objects or concepts (e.g., Student,
            Course)
          </li>
          <li>
            <strong>Attributes:</strong> Properties of entities (e.g.,
            student_id, name)
          </li>
          <li>
            <strong>Relationships:</strong> Connections between entities (e.g.,
            Student enrolls in Course)
          </li>
          <li>
            <strong>Cardinality:</strong> One-to-One, One-to-Many, Many-to-Many
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          University Database Example
        </h3>
        <p className="text-gray-700 mb-4">
          Below is an ER diagram showing the relationship between Students,
          Courses, Enrollments, and Instructors:
        </p>
        <MermaidDiagram code={erCode} />
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          Understanding the Diagram
        </h3>
        <p className="text-gray-700 mb-2">Notice the notation:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <code>||--o&#123;</code> means &quot;one to many&quot;
          </li>
          <li>PK indicates Primary Key</li>
          <li>FK indicates Foreign Key</li>
        </ul>
      </div>
    </div>
  );
}
