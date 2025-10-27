# CSU Digital Academy: Advanced Querying Curriculum Map

## Overview

This comprehensive curriculum is designed for college-level ICT and Computer Science majors to master querying across multiple domains. The curriculum follows a progressive learning path from foundational SQL concepts to advanced topics in NoSQL, API querying, and natural language interfaces.

## Learning Domains

### 1. Core SQL Mastery (Foundation → Advanced)

### 2. NoSQL & Modern Datastores (Document, Key-Value, Graph)

### 3. API Querying & Data Access (REST, GraphQL, Authentication)

### 4. Natural Language & AI-Driven Querying

---

## Domain 1: Core SQL Mastery

### Module 1.1: Database Fundamentals & Design

**Prerequisites:** Basic programming concepts  
**Duration:** 2-3 weeks  
**Learning Objectives:**

- Understand relational database concepts and ACID properties
- Design normalized database schemas (1NF, 2NF, 3NF)
- Identify appropriate data types for different use cases
- Create and modify table structures

**Key Topics:**

- Entity-Relationship modeling
- Primary keys, foreign keys, constraints
- Data integrity and referential integrity
- Database normalization principles

**Platform Features:**

- Interactive ER diagram builder (Modal-based tool)
- Schema design challenges with validation
- Table creation playground with live DDL execution
- Progress tracking for normalization exercises

**Sample Activities:**

- Design a university course registration system
- Normalize a denormalized customer order dataset
- Create tables for a social media platform

---

### Module 1.2: Basic Query Construction

**Prerequisites:** Module 1.1  
**Duration:** 2 weeks  
**Learning Objectives:**

- Construct SELECT statements with proper syntax
- Apply WHERE clauses with multiple conditions
- Sort and limit result sets effectively
- Use aliases and expressions in queries

**Key Topics:**

- SELECT, FROM, WHERE syntax
- Comparison operators (=, <>, >, <, LIKE, IN)
- Boolean logic (AND, OR, NOT)
- ORDER BY, LIMIT, DISTINCT

**Platform Features:**

- Enhanced SQLPlayground with syntax highlighting
- Step-by-step query builder with visual feedback
- Interactive WHERE clause generator
- Real-time query result preview

**Sample Activities:**

- Query student records by GPA and major
- Find products within price ranges
- Search customer names with pattern matching

---

### Module 1.3: Data Aggregation & Grouping

**Prerequisites:** Module 1.2  
**Duration:** 2 weeks  
**Learning Objectives:**

- Use aggregate functions for data summarization
- Group data by multiple columns
- Apply HAVING clause for group filtering
- Create calculated fields and expressions

**Key Topics:**

- COUNT, SUM, AVG, MIN, MAX functions
- GROUP BY clause and grouping strategies
- HAVING vs WHERE differences
- Mathematical expressions and functions

**Platform Features:**

- Aggregation function playground with live charts
- GROUP BY visualizer showing data groupings
- HAVING clause interactive builder
- Chart.js integration for result visualization

**Sample Activities:**

- Calculate sales totals by region and quarter
- Find average student grades by department
- Identify top-performing products by category

---

### Module 1.4: Advanced SQL Joins

**Prerequisites:** Module 1.3  
**Duration:** 3 weeks  
**Learning Objectives:**

- Master all JOIN types and their use cases
- Understand join algorithms and performance implications
- Handle complex multi-table relationships
- Optimize join queries for performance

**Key Topics:**

- INNER JOIN, LEFT/RIGHT/FULL OUTER JOIN
- CROSS JOIN and Cartesian products
- SELF JOIN for hierarchical data
- JOIN optimization strategies

**Platform Features:**

- Interactive JOIN visualizer with Venn diagrams
- Multi-table relationship explorer
- Performance comparison tool for different JOIN types
- Step-by-step JOIN builder with explanations

**Sample Activities:**

- Employee-manager hierarchy queries
- Customer orders with product details
- Student enrollment across multiple semesters

---

### Module 1.5: Subqueries & Advanced Techniques

**Prerequisites:** Module 1.4  
**Duration:** 2 weeks  
**Learning Objectives:**

- Write correlated and non-correlated subqueries
- Use EXISTS, IN, and ALL/ANY operators
- Apply set operations (UNION, INTERSECT, EXCEPT)
- Handle NULL values appropriately

**Key Topics:**

- Scalar, row, and table subqueries
- Correlated vs non-correlated subqueries
- Set theory operations
- NULL handling (IS NULL, COALESCE, NULLIF)

**Platform Features:**

- Subquery execution visualizer
- Set operations interactive tool
- NULL value handling simulator
- Query optimization suggestions

**Sample Activities:**

- Find customers who never placed orders
- Compare performance between JOIN and subquery approaches
- Combine results from multiple related queries

---

### Module 1.6: Window Functions & Analytics

**Prerequisites:** Module 1.5  
**Duration:** 3 weeks  
**Learning Objectives:**

- Apply window functions for advanced analytics
- Use ranking and statistical functions
- Create running totals and moving averages
- Partition data for analytical queries

**Key Topics:**

- ROW_NUMBER(), RANK(), DENSE_RANK()
- LAG(), LEAD(), FIRST_VALUE(), LAST_VALUE()
- SUM() OVER, AVG() OVER with frames
- PARTITION BY and ORDER BY in window functions

**Platform Features:**

- Window function interactive playground
- Visual partitioning and framing tool
- Analytics dashboard creator
- Performance benchmarking for window queries

**Sample Activities:**

- Calculate running sales totals by salesperson
- Rank students by GPA within their major
- Create month-over-month growth reports

---

### Module 1.7: CTEs & Query Optimization

**Prerequisites:** Module 1.6  
**Duration:** 2 weeks  
**Learning Objectives:**

- Use Common Table Expressions for complex queries
- Apply recursive CTEs for hierarchical data
- Understand query execution plans
- Optimize queries for performance

**Key Topics:**

- WITH clause and CTE syntax
- Recursive CTEs for tree structures
- Execution plan analysis
- Index usage and query optimization

**Platform Features:**

- CTE builder with dependency visualization
- Recursive CTE simulator for hierarchical data
- Execution plan viewer (simplified)
- Query performance analyzer

**Sample Activities:**

- Build organizational hierarchy reports
- Calculate factorial using recursive CTEs
- Optimize slow-running analytical queries

---

### Module 1.8: Data Manipulation & Transactions

**Prerequisites:** Module 1.7  
**Duration:** 2 weeks  
**Learning Objectives:**

- Perform safe data modifications (INSERT, UPDATE, DELETE)
- Understand transaction management and ACID properties
- Handle concurrent access and locking
- Implement error handling and rollback strategies

**Key Topics:**

- INSERT with subqueries and multiple rows
- UPDATE with JOINs and conditional logic
- DELETE with referential integrity
- BEGIN, COMMIT, ROLLBACK transactions

**Platform Features:**

- Safe data modification sandbox
- Transaction simulator with rollback capability
- Concurrent access demonstration
- Error handling playground

**Sample Activities:**

- Bulk update customer records safely
- Insert order details with validation
- Handle transaction failures gracefully

---

## Domain 2: NoSQL & Modern Datastores

### Module 2.1: Key-Value Stores (Redis)

**Prerequisites:** Module 1.4 (SQL Joins)  
**Duration:** 1 week  
**Learning Objectives:**

- Understand key-value store concepts and use cases
- Perform basic Redis operations (GET, SET, DEL)
- Use Redis data structures (strings, lists, sets, hashes)
- Apply caching strategies with Redis

**Key Topics:**

- Key-value store architecture
- Redis data types and commands
- Expiration and TTL management
- Caching patterns and strategies

**Platform Features:**

- Redis command playground
- Data structure visualizer
- Caching strategy simulator
- Performance comparison with SQL

**Sample Activities:**

- Implement session storage with Redis
- Cache frequently accessed SQL query results
- Build a simple rate limiter

---

### Module 2.2: Document Stores (MongoDB)

**Prerequisites:** Module 2.1  
**Duration:** 2 weeks  
**Learning Objectives:**

- Model data using documents and collections
- Write MongoDB queries with find() and aggregation
- Understand embedded vs referenced document design
- Compare document store vs relational approaches

**Key Topics:**

- Document structure and BSON format
- MongoDB query operators ($eq, $gt, $in, $regex)
- Aggregation pipeline ($match, $group, $project)
- Document relationships and denormalization

**Platform Features:**

- MongoDB query playground
- Document structure designer
- Aggregation pipeline builder
- SQL-to-MongoDB query translator

**Sample Activities:**

- Design a blog post and comments system
- Query nested document structures
- Build aggregation reports on e-commerce data

---

### Module 2.3: Graph Databases & Relationships

**Prerequisites:** Module 2.2  
**Duration:** 1 week  
**Learning Objectives:**

- Model data as nodes and relationships
- Write basic graph traversal queries
- Understand when to use graph databases
- Compare graph vs relational modeling

**Key Topics:**

- Graph theory basics (nodes, edges, properties)
- Cypher query language fundamentals
- Path finding and graph algorithms
- Use cases: social networks, recommendation engines

**Platform Features:**

- Graph visualization tool
- Cypher query playground
- Relationship pattern builder
- Graph vs SQL comparison tool

**Sample Activities:**

- Model a social network with friends and follows
- Find shortest path between users
- Recommend connections based on mutual friends

---

## Domain 3: API Querying & Data Access

### Module 3.1: RESTful API Fundamentals

**Prerequisites:** Basic HTTP knowledge  
**Duration:** 1 week  
**Learning Objectives:**

- Understand REST architectural principles
- Make HTTP requests (GET, POST, PUT, DELETE)
- Handle API responses and error codes
- Work with JSON data format

**Key Topics:**

- HTTP methods and status codes
- REST resource design principles
- JSON parsing and manipulation
- Error handling and retry strategies

**Platform Features:**

- API request builder and tester
- JSON response visualizer
- HTTP status code reference
- Request/response logger

**Sample Activities:**

- Query a public weather API
- Build CRUD operations for a user management API
- Handle API rate limiting and pagination

---

### Module 3.2: API Authentication & Security

**Prerequisites:** Module 3.1  
**Duration:** 1 week  
**Learning Objectives:**

- Implement various authentication methods
- Secure API keys and tokens
- Handle OAuth 2.0 flows
- Apply security best practices

**Key Topics:**

- API keys, JWT tokens, OAuth 2.0
- Bearer token authentication
- CORS and security headers
- API security vulnerabilities

**Platform Features:**

- Authentication flow simulator
- Token management tool
- Security best practices checker
- OAuth playground

**Sample Activities:**

- Authenticate with GitHub API using OAuth
- Implement JWT-based API access
- Secure API calls in frontend applications

---

### Module 3.3: GraphQL Query Language

**Prerequisites:** Module 3.2  
**Duration:** 2 weeks  
**Learning Objectives:**

- Understand GraphQL schema and type system
- Write GraphQL queries and mutations
- Compare GraphQL vs REST approaches
- Handle GraphQL subscriptions

**Key Topics:**

- Schema definition and type system
- Query, mutation, and subscription operations
- Field selection and aliases
- Variables and fragments

**Platform Features:**

- GraphQL playground with schema explorer
- Query builder with autocomplete
- GraphQL vs REST comparison tool
- Real-time subscription simulator

**Sample Activities:**

- Query GitHub's GraphQL API for repository data
- Build a blog with posts and comments using GraphQL
- Implement real-time notifications with subscriptions

---

## Domain 4: Natural Language & AI-Driven Querying

### Module 4.1: Natural Language to SQL

**Prerequisites:** Module 1.6 (Window Functions)  
**Duration:** 1 week  
**Learning Objectives:**

- Understand NL-to-SQL conversion principles
- Use AI tools for query generation
- Validate and optimize AI-generated queries
- Handle ambiguous natural language requests

**Key Topics:**

- Natural language processing for databases
- AI-powered query generation
- Query validation and optimization
- Handling ambiguity and edge cases

**Platform Features:**

- NL-to-SQL converter powered by AI
- Query validation and suggestion engine
- Ambiguity resolution helper
- AI query explanation tool

**Sample Activities:**

- Convert business questions to SQL queries
- Validate AI-generated queries for correctness
- Handle ambiguous requests with clarification

---

### Module 4.2: AI-Assisted Data Analysis

**Prerequisites:** Module 4.1  
**Duration:** 1 week  
**Learning Objectives:**

- Use AI for data exploration and insights
- Generate automated reports and visualizations
- Apply machine learning concepts to querying
- Understand limitations of AI-driven analysis

**Key Topics:**

- AI-powered data exploration
- Automated insight generation
- ML-enhanced query optimization
- Ethical considerations in AI data analysis

**Platform Features:**

- AI data explorer with natural language interface
- Automated insight generator
- ML query optimizer
- Ethics and bias checker

**Sample Activities:**

- Analyze sales data using natural language queries
- Generate automated business intelligence reports
- Identify patterns and anomalies with AI assistance

---

## Platform Integration Features

### Enhanced Components

1. **Advanced SQLPlayground**

   - Multi-database support (MySQL, PostgreSQL, SQLite)
   - Syntax validation and error highlighting
   - Query execution planning visualization
   - Performance metrics and optimization suggestions
   - Save and share query functionality

2. **Interactive Assessment System**

   - Multiple-choice questions with explanations
   - Code submission with automated grading
   - Peer review and discussion forums
   - Adaptive difficulty based on performance

3. **Advanced Progress Tracking**

   - Detailed analytics dashboard
   - Skill mastery visualization
   - Learning path recommendations
   - Performance benchmarking

4. **Badge & Achievement System**
   - Progressive skill badges (Bronze, Silver, Gold)
   - Domain expertise certifications
   - Leaderboards and competitions
   - Portfolio integration for showcasing skills

### Accessibility & Responsive Design

- Full keyboard navigation support
- Screen reader compatibility
- Mobile-optimized interfaces
- Dark mode for all components
- Multi-language support (English, Filipino)

### Real-World Industry Integration

- Case studies from Philippine companies
- Guest expert interviews and insights
- Industry project simulations
- Certification pathways for employment

---

This curriculum provides a comprehensive foundation for ICT and Computer Science students to master querying across all major data access paradigms, preparing them for modern software development and data analysis roles.
