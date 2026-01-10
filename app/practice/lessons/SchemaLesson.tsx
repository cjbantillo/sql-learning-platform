"use client";

import MermaidDiagram from "@/app/components/visuals/MermaidDiagram";

const schemaCode = `
erDiagram
    CUSTOMER ||--o{ ORDER : "places"
    ORDER ||--o{ ORDER_ITEM : "contains"
    PRODUCT ||--o{ ORDER_ITEM : "included in"
    
    CUSTOMER {
        int customer_id PK
        string name
        string email
        string phone
    }
    ORDER {
        int order_id PK
        int customer_id FK
        date order_date
        decimal total_amount
    }
    ORDER_ITEM {
        int item_id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal price
    }
    PRODUCT {
        int product_id PK
        string name
        string category
        decimal price
    }
`;

export default function SchemaLesson() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          From ER Model to Database Schema
        </h2>
        <p className="text-gray-700 mb-4">
          Once you have an ER diagram, the next step is converting it into a
          relational database schema. This involves creating tables, defining
          columns, and establishing relationships through foreign keys.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">Conversion Steps</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Each entity becomes a table</li>
          <li>Attributes become columns</li>
          <li>Primary keys uniquely identify rows</li>
          <li>Foreign keys create relationships between tables</li>
          <li>Apply normalization rules to reduce redundancy</li>
        </ol>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          E-Commerce Schema Example
        </h3>
        <p className="text-gray-700 mb-4">
          This schema shows how customers place orders containing products:
        </p>
        <MermaidDiagram code={schemaCode} />
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="font-semibold text-gray-900 mb-2">
          Normalization Benefits
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Eliminates data redundancy</li>
          <li>Ensures data integrity</li>
          <li>Makes updates easier and safer</li>
          <li>Improves query performance</li>
        </ul>
      </div>

      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h4 className="text-yellow-400 mb-2">Example SQL Schema</h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`CREATE TABLE customer (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);`}</code>
        </pre>
      </div>
    </div>
  );
}
