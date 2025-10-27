import type { Lesson } from "./lessons";

export const nosqlLessons: Lesson[] = [
  {
    id: "redis-basics",
    title: "Key-Value Stores with Redis",
    description:
      "Learn Redis fundamentals including data types, basic operations, and caching strategies for high-performance applications",
    difficulty: "Intermediate",
    category: "NoSQL",
    estimatedTime: 30,
    content: `
# Key-Value Stores with Redis - The Lightning-Fast Digital Vault

## 📖 Story Time: The CSU Campus Card System

Imagine CSU decides to upgrade their campus card system. Every time a student taps their card:
- At the cafeteria (check meal plan balance)
- At the library (verify student status) 
- At the gym (log entry time)
- At dorm buildings (access control)

The old system used a traditional database, but with 20,000+ students tapping cards thousands of times per day, it's getting slow. Long lines form as the system looks through tables with millions of records.

The IT director decides to implement Redis - a **lightning-fast digital vault** that keeps the most important information in the computer's **memory** (RAM) instead of on slow hard drives.

## 🎯 What is Redis?

Think of Redis as a **super-smart, super-fast filing cabinet** that:
- Keeps everything in **memory** (like having files in your hands instead of in a filing cabinet)
- Uses simple **key-value pairs** (like a dictionary: "word" → "definition")
- Never gets confused (single-threaded, no conflicts)
- Can remember things temporarily or permanently

**Real-world analogy**: It's like the difference between:
- **Traditional database**: Looking up a phone number in a phone book
- **Redis**: Having your most important contacts memorized

## ⚡ Why Redis is Lightning Fast

### In-Memory Storage Magic
- **RAM vs Hard Drive**: RAM is 1000x faster than even the fastest SSD
- **No disk seeking**: Information is instantly accessible
- **Atomic operations**: Each operation completes fully or not at all
- **Simple data structure**: No complex table relationships to navigate

### Perfect Use Cases at CSU
1. **Campus Card System**: Instant balance checks
2. **Course Registration**: Real-time seat availability 
3. **Library System**: Track book checkouts and returns
4. **Student Portal**: Keep login sessions active
5. **Event Ticketing**: Prevent overselling with real-time counts

## Basic Redis Commands

### String Operations
Redis strings are the most basic value type:

\`\`\`redis
-- Set a key-value pair
SET user:1001:name "John Smith"

-- Get a value by key
GET user:1001:name
-- Returns: "John Smith"

-- Set with expiration (TTL in seconds)
SETEX session:abc123 3600 "user_data_here"

-- Increment a counter
INCR page_views
-- Returns: 1 (first time), 2 (second time), etc.

-- Check if key exists
EXISTS user:1001:name
-- Returns: 1 (exists) or 0 (doesn't exist)

-- Delete a key
DEL user:1001:name
\`\`\`

### Expiration and TTL
Redis keys can automatically expire:

\`\`\`redis
-- Set expiration on existing key (in seconds)
EXPIRE user:session 1800  -- 30 minutes

-- Set expiration in milliseconds
PEXPIRE user:session 1800000

-- Check remaining time to live
TTL user:session
-- Returns: seconds remaining or -1 (no expiration) or -2 (doesn't exist)

-- Remove expiration
PERSIST user:session
\`\`\`

## Redis Data Types

### 1. Lists (Ordered collections)
\`\`\`redis
-- Push to left (beginning) of list
LPUSH recent_logins "user:1001" "user:1002"

-- Push to right (end) of list
RPUSH recent_logins "user:1003"

-- Get range of elements (0 = first, -1 = last)
LRANGE recent_logins 0 -1
-- Returns: ["user:1002", "user:1001", "user:1003"]

-- Get list length
LLEN recent_logins
-- Returns: 3

-- Pop from left
LPOP recent_logins
-- Returns: "user:1002"
\`\`\`

### 2. Sets (Unordered unique collections)
\`\`\`redis
-- Add members to set
SADD online_users "user:1001" "user:1002" "user:1003"

-- Check if member exists
SISMEMBER online_users "user:1001"
-- Returns: 1 (exists) or 0 (doesn't exist)

-- Get all members
SMEMBERS online_users
-- Returns: ["user:1001", "user:1002", "user:1003"]

-- Get set size
SCARD online_users
-- Returns: 3

-- Remove member
SREM online_users "user:1002"

-- Set operations
SADD group_a "user:1001" "user:1002" "user:1003"
SADD group_b "user:1002" "user:1003" "user:1004"

-- Intersection (common members)
SINTER group_a group_b
-- Returns: ["user:1002", "user:1003"]

-- Union (all unique members)
SUNION group_a group_b
-- Returns: ["user:1001", "user:1002", "user:1003", "user:1004"]
\`\`\`

### 3. Hashes (Field-value pairs within a key)
\`\`\`redis
-- Set hash fields
HSET user:1001 name "John Smith" email "john@example.com" age 25

-- Get specific field
HGET user:1001 name
-- Returns: "John Smith"

-- Get all fields and values
HGETALL user:1001
-- Returns: ["name", "John Smith", "email", "john@example.com", "age", "25"]

-- Get multiple fields
HMGET user:1001 name email
-- Returns: ["John Smith", "john@example.com"]

-- Increment numeric field
HINCRBY user:1001 login_count 1
\`\`\`

### 4. Sorted Sets (Ordered by score)
\`\`\`redis
-- Add members with scores (for leaderboards)
ZADD leaderboard 1500 "player:1001" 1200 "player:1002" 1800 "player:1003"

-- Get range by rank (highest scores first)
ZREVRANGE leaderboard 0 2 WITHSCORES
-- Returns: ["player:1003", "1800", "player:1001", "1500", "player:1002", "1200"]

-- Get rank of member (0-based, highest score = 0)
ZREVRANK leaderboard "player:1003"
-- Returns: 0 (first place)

-- Get score of member
ZSCORE leaderboard "player:1001"
-- Returns: "1500"

-- Increment member score
ZINCRBY leaderboard 100 "player:1002"
\`\`\`

## Redis vs SQL Comparison

| Feature | Redis | SQL Database |
|---------|-------|--------------|
| Data Structure | Key-Value pairs | Tables with rows/columns |
| Query Language | Redis commands | SQL |
| Relationships | Manual via key naming | Foreign keys, JOINs |
| Transactions | Limited (MULTI/EXEC) | Full ACID support |
| Persistence | Optional | Built-in |
| Performance | Ultra-fast (in-memory) | Fast (disk-based) |
| Scalability | Horizontal (clustering) | Vertical + Horizontal |

## Caching Strategies

### 1. Cache-Aside (Lazy Loading)
\`\`\`python
def get_user(user_id):
    # Check cache first
    user = redis.get(f"user:{user_id}")
    if user:
        return json.loads(user)
    
    # If not in cache, get from database
    user = database.get_user(user_id)
    
    # Store in cache for future requests
    redis.setex(f"user:{user_id}", 3600, json.dumps(user))
    return user
\`\`\`

### 2. Write-Through
\`\`\`python
def update_user(user_id, user_data):
    # Update database first
    database.update_user(user_id, user_data)
    
    # Update cache
    redis.setex(f"user:{user_id}", 3600, json.dumps(user_data))
\`\`\`

### 3. Write-Behind (Write-Back)
\`\`\`python
def update_user_async(user_id, user_data):
    # Update cache immediately
    redis.setex(f"user:{user_id}", 3600, json.dumps(user_data))
    
    # Queue database update for later
    task_queue.enqueue('update_user_db', user_id, user_data)
\`\`\`

## Real-World Examples

### Session Management
\`\`\`redis
-- Store user session
HSET session:abc123 user_id "1001" username "john_smith" role "admin" last_activity "1640995200"

-- Set session expiration (30 minutes)
EXPIRE session:abc123 1800

-- Check if session is valid
EXISTS session:abc123
HGET session:abc123 user_id

-- Update last activity
HSET session:abc123 last_activity "1640995800"
EXPIRE session:abc123 1800  -- Reset expiration
\`\`\`

### Rate Limiting
\`\`\`redis
-- API rate limiting (100 requests per hour per user)
SET rate_limit:user:1001 1 EX 3600  -- First request
INCR rate_limit:user:1001           -- Subsequent requests

-- Check current count
GET rate_limit:user:1001
-- If > 100, deny request
\`\`\`

### Real-time Leaderboard
\`\`\`redis
-- Game leaderboard
ZADD game:leaderboard 1500 "player1" 1200 "player2" 1800 "player3"

-- Player scores a point
ZINCRBY game:leaderboard 10 "player2"

-- Get top 10 players
ZREVRANGE game:leaderboard 0 9 WITHSCORES

-- Get player's rank
ZREVRANK game:leaderboard "player2"
\`\`\`

## Best Practices

### 1. Key Naming Conventions
- Use descriptive, hierarchical names: user:1001:profile
- Separate namespaces with colons: app:cache:user:1001
- Keep keys short but meaningful
- Use consistent patterns across your application

### 2. Memory Management
- Set appropriate TTL on keys to prevent memory bloat
- Use Redis memory optimization features
- Monitor memory usage with INFO memory command
- Consider data compression for large values

### 3. Performance Optimization
- Use pipelining for multiple commands
- Avoid blocking operations on large datasets
- Use appropriate data types for your use case
- Monitor slow queries with SLOWLOG command

### 4. Data Persistence
- Configure RDB snapshots for point-in-time recovery
- Enable AOF (Append Only File) for durability
- Test backup and recovery procedures
- Consider Redis Cluster for high availability
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "🎓 A student named Alice Johnson (ID: 1001) just logged into the student portal. Store her name in Redis with a 1-hour session timeout (3600 seconds). Use the key pattern 'user:1001:name'.",
        expectedQuery: 'SETEX user:1001:name 3600 "Alice Johnson"',
        hint: "Use SETEX to set a value WITH expiration: SETEX key seconds value",
        solution: 'SETEX user:1001:name 3600 "Alice Johnson"',
      },
      {
        id: "ex2",
        question:
          "🏆 Create a gaming leaderboard for the CSU Programming Contest. Add three contestants: player1 (1000 points), player2 (1500 points), player3 (800 points). Use 'leaderboard' as the key name.",
        expectedQuery:
          'ZADD leaderboard 1000 "player1" 1500 "player2" 800 "player3"',
        hint: "Use ZADD to create a sorted set: ZADD key score1 member1 score2 member2...",
        solution:
          'ZADD leaderboard 1000 "player1" 1500 "player2" 800 "player3"',
      },
      {
        id: "ex3",
        question:
          "👤 Store complete user profile information in Redis for quick access. Create a hash for user:1001 with name 'Bob', age 30, and email 'bob@csu.edu.ph'.",
        expectedQuery:
          'HSET user:1001 name "Bob" age 30 email "bob@csu.edu.ph"',
        hint: "Use HSET to store multiple fields: HSET key field1 value1 field2 value2...",
        solution: 'HSET user:1001 name "Bob" age 30 email "bob@csu.edu.ph"',
      },
    ],
  },

  {
    id: "mongodb-documents",
    title: "Document Databases with MongoDB",
    description:
      "Master MongoDB document modeling, queries, and aggregation pipelines for flexible data storage and retrieval",
    difficulty: "Intermediate",
    category: "NoSQL",
    estimatedTime: 40,
    content: `
# Document Databases with MongoDB

MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents with dynamic schemas.

## Document Database Concepts

### Documents vs Rows
Unlike SQL tables with fixed schemas, MongoDB documents can have varying structures:

\`\`\`json
// SQL approach - normalized tables
// users table: id, name, email
// addresses table: user_id, street, city, state

// MongoDB approach - embedded document
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Smith",
  "email": "john@example.com",
  "addresses": [
    {
      "type": "home",
      "street": "123 Main St",
      "city": "Springfield",
      "state": "IL"
    },
    {
      "type": "work", 
      "street": "456 Oak Ave",
      "city": "Chicago",
      "state": "IL"
    }
  ],
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
\`\`\`

### Collections and Documents
- **Collection**: Group of documents (like SQL table)
- **Document**: Individual record (like SQL row)
- **Field**: Key-value pair within document (like SQL column)
- **Embedded Document**: Document within another document
- **Array**: List of values or embedded documents

## Basic MongoDB Operations

### Creating Documents

\`\`\`javascript
// Insert single document
db.students.insertOne({
  name: "Alice Johnson",
  major: "Computer Science",
  gpa: 3.8,
  year: 3,
  courses: ["CS101", "CS201", "MATH301"],
  address: {
    street: "789 College Ave",
    city: "University Town",
    state: "CA"
  }
});

// Insert multiple documents
db.students.insertMany([
  {
    name: "Bob Wilson",
    major: "Mathematics", 
    gpa: 3.6,
    year: 2
  },
  {
    name: "Carol Brown",
    major: "Computer Science",
    gpa: 3.9,
    year: 4,
    courses: ["CS301", "CS401"]
  }
]);
\`\`\`

### Reading Documents

\`\`\`javascript
// Find all documents
db.students.find();

// Find with criteria
db.students.find({ major: "Computer Science" });

// Find with multiple criteria
db.students.find({ 
  major: "Computer Science", 
  gpa: { $gte: 3.5 } 
});

// Find one document
db.students.findOne({ name: "Alice Johnson" });

// Project specific fields
db.students.find(
  { major: "Computer Science" },
  { name: 1, gpa: 1, _id: 0 }  // 1 = include, 0 = exclude
);

// Sort results
db.students.find().sort({ gpa: -1 });  // -1 = descending

// Limit and skip
db.students.find().sort({ gpa: -1 }).limit(5).skip(10);
\`\`\`

### Query Operations

\`\`\`javascript
// Comparison operators
db.students.find({ gpa: { $gt: 3.5 } });           // Greater than
db.students.find({ gpa: { $gte: 3.5 } });          // Greater than or equal
db.students.find({ gpa: { $lt: 3.0 } });           // Less than
db.students.find({ gpa: { $lte: 3.0 } });          // Less than or equal
db.students.find({ gpa: { $ne: 3.0 } });           // Not equal
db.students.find({ year: { $in: [2, 3, 4] } });    // In array
db.students.find({ year: { $nin: [1, 2] } });      // Not in array

// Logical operators
db.students.find({
  $and: [
    { major: "Computer Science" },
    { gpa: { $gte: 3.5 } }
  ]
});

db.students.find({
  $or: [
    { major: "Computer Science" },
    { major: "Mathematics" }
  ]
});

db.students.find({
  gpa: { $not: { $lt: 3.0 } }  // NOT (gpa < 3.0) = gpa >= 3.0
});

// Array queries
db.students.find({ courses: "CS101" });                    // Has CS101 in courses array
db.students.find({ courses: { $all: ["CS101", "CS201"] } }); // Has both courses
db.students.find({ courses: { $size: 3 } });               // Exactly 3 courses

// Embedded document queries
db.students.find({ "address.city": "University Town" });
db.students.find({ "address.state": "CA" });

// Regular expressions
db.students.find({ name: /^Alice/ });           // Starts with "Alice"
db.students.find({ name: /Johnson$/i });        // Ends with "Johnson" (case insensitive)
\`\`\`

### Updating Documents

\`\`\`javascript
// Update single document
db.students.updateOne(
  { name: "Alice Johnson" },        // Filter
  { $set: { gpa: 3.9 } }           // Update operation
);

// Update multiple documents
db.students.updateMany(
  { major: "Computer Science" },
  { $inc: { year: 1 } }            // Increment year by 1
);

// Update operators
db.students.updateOne(
  { name: "Bob Wilson" },
  {
    $set: { email: "bob@university.edu" },    // Set field value
    $inc: { gpa: 0.1 },                      // Increment numeric value
    $push: { courses: "MATH201" },           // Add to array
    $addToSet: { skills: "JavaScript" },     // Add to array if not exists
    $unset: { temp_field: "" }               // Remove field
  }
);

// Array update operators
db.students.updateOne(
  { name: "Carol Brown" },
  { 
    $pull: { courses: "CS301" },             // Remove from array
    $pullAll: { courses: ["CS401", "CS501"] }, // Remove multiple from array
    $pop: { courses: 1 }                     // Remove last element (1) or first (-1)
  }
);

// Upsert (update or insert if not found)
db.students.updateOne(
  { name: "David Lee" },
  { $set: { major: "Physics", gpa: 3.4 } },
  { upsert: true }
);
\`\`\`

### Deleting Documents

\`\`\`javascript
// Delete single document
db.students.deleteOne({ name: "Bob Wilson" });

// Delete multiple documents
db.students.deleteMany({ gpa: { $lt: 2.0 } });

// Delete all documents in collection
db.students.deleteMany({});
\`\`\`

## MongoDB Aggregation Pipeline

The aggregation pipeline processes documents through multiple stages:

\`\`\`javascript
// Basic aggregation
db.students.aggregate([
  { $match: { major: "Computer Science" } },    // Filter (like WHERE)
  { $group: { 
      _id: "$year",                             // Group by year
      avgGpa: { $avg: "$gpa" },                // Average GPA
      count: { $sum: 1 }                       // Count students
    }
  },
  { $sort: { _id: 1 } }                        // Sort by year
]);

// Complex aggregation example
db.students.aggregate([
  // Stage 1: Filter active students
  { $match: { status: "active" } },
  
  // Stage 2: Add calculated fields
  { $addFields: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      gradeLevel: {
        $switch: {
          branches: [
            { case: { $eq: ["$year", 1] }, then: "Freshman" },
            { case: { $eq: ["$year", 2] }, then: "Sophomore" },
            { case: { $eq: ["$year", 3] }, then: "Junior" },
            { case: { $eq: ["$year", 4] }, then: "Senior" }
          ],
          default: "Graduate"
        }
      }
    }
  },
  
  // Stage 3: Group by major and grade level
  { $group: {
      _id: { major: "$major", grade: "$gradeLevel" },
      avgGpa: { $avg: "$gpa" },
      maxGpa: { $max: "$gpa" },
      minGpa: { $min: "$gpa" },
      studentCount: { $sum: 1 },
      students: { $push: "$fullName" }
    }
  },
  
  // Stage 4: Project final structure
  { $project: {
      _id: 0,
      major: "$_id.major",
      gradeLevel: "$_id.grade",
      statistics: {
        avgGpa: { $round: ["$avgGpa", 2] },
        maxGpa: "$maxGpa",
        minGpa: "$minGpa",
        count: "$studentCount"
      },
      topStudents: { $slice: ["$students", 3] }  // First 3 students
    }
  },
  
  // Stage 5: Sort results
  { $sort: { major: 1, gradeLevel: 1 } }
]);
\`\`\`

## Document Modeling Strategies

### Embedded vs Referenced Documents

**Embedded Documents (Denormalized):**
\`\`\`javascript
// Good for: 1-to-few relationships, data read together
{
  "_id": ObjectId("..."),
  "title": "Introduction to Databases",
  "instructor": {
    "name": "Dr. Smith",
    "email": "smith@university.edu",
    "department": "Computer Science"
  },
  "students": [
    { "name": "Alice", "grade": "A" },
    { "name": "Bob", "grade": "B+" }
  ]
}
\`\`\`

**Referenced Documents (Normalized):**
\`\`\`javascript
// Good for: 1-to-many, many-to-many relationships
// Courses collection
{
  "_id": ObjectId("course123"),
  "title": "Introduction to Databases",
  "instructor_id": ObjectId("instructor456")
}

// Instructors collection
{
  "_id": ObjectId("instructor456"),
  "name": "Dr. Smith",
  "email": "smith@university.edu",
  "courses": [ObjectId("course123"), ObjectId("course789")]
}
\`\`\`

### Schema Design Patterns

**1. Subset Pattern** (Large documents with frequently accessed subset):
\`\`\`javascript
// Main document with summary
{
  "_id": ObjectId("movie123"),
  "title": "The Matrix",
  "year": 1999,
  "topReviews": [  // Most recent/relevant reviews
    { "user": "alice", "rating": 5, "comment": "Amazing!" }
  ]
}

// Separate collection for all reviews
{
  "_id": ObjectId("..."),
  "movie_id": ObjectId("movie123"),
  "user": "bob",
  "rating": 4,
  "comment": "Good movie",
  "timestamp": ISODate("...")
}
\`\`\`

**2. Bucket Pattern** (Time series or similar data):
\`\`\`javascript
// Instead of one document per measurement
{
  "_id": ObjectId("..."),
  "sensor_id": "temp001",
  "date": "2023-12-01",
  "measurements": [
    { "time": "00:00", "value": 20.5 },
    { "time": "00:15", "value": 20.7 },
    { "time": "00:30", "value": 20.3 }
    // ... up to 96 measurements per day
  ],
  "summary": {
    "avg": 21.2,
    "min": 19.8,
    "max": 22.1
  }
}
\`\`\`

## MongoDB vs SQL Comparison

| Operation | SQL | MongoDB |
|-----------|-----|---------|
| Create | \`INSERT INTO users ...\` | \`db.users.insertOne({...})\` |
| Read | \`SELECT * FROM users WHERE ...\` | \`db.users.find({...})\` |
| Update | \`UPDATE users SET ... WHERE ...\` | \`db.users.updateOne({...}, {...})\` |
| Delete | \`DELETE FROM users WHERE ...\` | \`db.users.deleteOne({...})\` |
| Join | \`SELECT ... FROM a JOIN b\` | \`db.a.aggregate([{$lookup: ...}])\` |
| Group | \`GROUP BY\` | \`{$group: ...}\` |
| Sort | \`ORDER BY\` | \`.sort({...})\` |
| Limit | \`LIMIT 10\` | \`.limit(10)\` |

## Performance Considerations

### Indexing
\`\`\`javascript
// Create indexes for better query performance
db.students.createIndex({ major: 1 });                    // Single field
db.students.createIndex({ major: 1, gpa: -1 });          // Compound index
db.students.createIndex({ "address.city": 1 });          // Embedded field
db.students.createIndex({ courses: 1 });                 // Array field
db.students.createIndex({ name: "text" });               // Text search

// Explain query performance
db.students.find({ major: "CS" }).explain("executionStats");
\`\`\`

### Best Practices
1. **Design for your queries**: Structure documents based on access patterns
2. **Avoid deep nesting**: Limit to 2-3 levels for better performance
3. **Use appropriate data types**: ObjectId for references, ISODate for dates
4. **Index frequently queried fields**: Especially filter and sort fields
5. **Limit document size**: MongoDB has 16MB document size limit
6. **Use projection**: Only retrieve needed fields
7. **Consider read/write patterns**: Optimize for your most common operations
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Find all students with GPA greater than 3.5 and major 'Computer Science', showing only name and gpa fields",
        expectedQuery:
          "db.students.find({ gpa: { $gt: 3.5 }, major: 'Computer Science' }, { name: 1, gpa: 1, _id: 0 })",
        hint: "Use find() with query criteria and projection. Use $gt for greater than, 1 to include fields, 0 to exclude",
        solution:
          "db.students.find({ gpa: { $gt: 3.5 }, major: 'Computer Science' }, { name: 1, gpa: 1, _id: 0 });",
      },
      {
        id: "ex2",
        question:
          "Update student 'Alice Johnson' to add 'Python' to her skills array (use $addToSet)",
        expectedQuery:
          "db.students.updateOne({ name: 'Alice Johnson' }, { $addToSet: { skills: 'Python' } })",
        hint: "Use updateOne() with name filter and $addToSet to add to array without duplicates",
        solution:
          "db.students.updateOne({ name: 'Alice Johnson' }, { $addToSet: { skills: 'Python' } });",
      },
      {
        id: "ex3",
        question:
          "Create an aggregation to group students by major and calculate average GPA for each major",
        expectedQuery:
          "db.students.aggregate([{ $group: { _id: '$major', avgGpa: { $avg: '$gpa' } } }])",
        hint: "Use aggregate() with $group stage, group by $major field, and use $avg operator",
        solution:
          "db.students.aggregate([{ $group: { _id: '$major', avgGpa: { $avg: '$gpa' } } }]);",
      },
    ],
  },

  {
    id: "graph-databases",
    title: "Graph Databases & Relationships",
    description:
      "Explore graph database concepts with nodes, edges, and relationship queries for social networks and connected data",
    difficulty: "Advanced",
    category: "NoSQL",
    estimatedTime: 35,
    content: `
# Graph Databases & Relationships

Graph databases excel at managing and querying highly connected data through nodes (entities) and relationships (edges).

## Graph Database Concepts

### Nodes, Relationships, and Properties
\`\`\`cypher
// Node: A person with properties
(:Person {name: 'Alice', age: 28, city: 'San Francisco'})

// Relationship: Alice knows Bob
(:Person {name: 'Alice'})-[:KNOWS {since: '2020'}]->(:Person {name: 'Bob'})

// Complete pattern
(alice:Person {name: 'Alice'})-[:KNOWS {since: '2020'}]->(bob:Person {name: 'Bob'})
\`\`\`

### Graph vs Relational Model

**Relational (SQL) Approach:**
\`\`\`sql
-- Tables for social network
CREATE TABLE users (id, name, age, city);
CREATE TABLE friendships (user1_id, user2_id, since_date);
CREATE TABLE posts (id, user_id, content, timestamp);
CREATE TABLE likes (post_id, user_id);

-- Find friends of friends (2-hop query)
SELECT DISTINCT u3.name
FROM users u1
JOIN friendships f1 ON u1.id = f1.user1_id
JOIN friendships f2 ON f1.user2_id = f2.user1_id  
JOIN users u3 ON f2.user2_id = u3.id
WHERE u1.name = 'Alice' AND u3.id != u1.id;
\`\`\`

**Graph (Cypher) Approach:**
\`\`\`cypher
// Same query in graph database
MATCH (alice:Person {name: 'Alice'})-[:KNOWS*2]-(friend_of_friend)
WHERE friend_of_friend <> alice
RETURN DISTINCT friend_of_friend.name
\`\`\`

## Cypher Query Language Basics

### Creating Nodes and Relationships

\`\`\`cypher
// Create person nodes
CREATE (alice:Person {name: 'Alice', age: 28, city: 'San Francisco'})
CREATE (bob:Person {name: 'Bob', age: 32, city: 'New York'})
CREATE (carol:Person {name: 'Carol', age: 25, city: 'San Francisco'})

// Create relationships
MATCH (alice:Person {name: 'Alice'}), (bob:Person {name: 'Bob'})
CREATE (alice)-[:KNOWS {since: '2020-01-15'}]->(bob)

// Create multiple relationships at once
MATCH (alice:Person {name: 'Alice'}), (carol:Person {name: 'Carol'})
CREATE (alice)-[:KNOWS {since: '2019-06-10'}]->(carol)
CREATE (alice)-[:LIVES_IN]->(:City {name: 'San Francisco'})

// Create pattern in single statement
CREATE (alice:Person {name: 'Alice'})-[:KNOWS {since: '2020'}]->(bob:Person {name: 'Bob'})
\`\`\`

### Querying Patterns

\`\`\`cypher
// Find all people Alice knows
MATCH (alice:Person {name: 'Alice'})-[:KNOWS]->(friend)
RETURN friend.name, friend.age

// Find mutual friends
MATCH (alice:Person {name: 'Alice'})-[:KNOWS]-(mutual)-[:KNOWS]-(bob:Person {name: 'Bob'})
WHERE alice <> bob
RETURN mutual.name

// Variable length paths (friends up to 3 degrees)
MATCH (alice:Person {name: 'Alice'})-[:KNOWS*1..3]-(person)
RETURN DISTINCT person.name, length((alice)-[:KNOWS*]-(person)) as degrees

// Find shortest path
MATCH path = shortestPath((alice:Person {name: 'Alice'})-[:KNOWS*]-(bob:Person {name: 'Bob'}))
RETURN path, length(path)
\`\`\`

### Filtering and Conditions

\`\`\`cypher
// WHERE clause conditions
MATCH (p:Person)-[:KNOWS]->(friend)
WHERE p.age > 25 AND friend.city = 'San Francisco'
RETURN p.name, friend.name

// Relationship property filtering
MATCH (p:Person)-[rel:KNOWS]->(friend)
WHERE rel.since >= '2020-01-01'
RETURN p.name, friend.name, rel.since

// Pattern filtering
MATCH (p:Person)
WHERE (p)-[:KNOWS]->(:Person {city: 'New York'})
RETURN p.name

// NOT patterns
MATCH (p:Person)
WHERE NOT (p)-[:KNOWS]->(:Person {name: 'Alice'})
RETURN p.name
\`\`\`

## Complex Graph Queries

### Social Network Analysis

\`\`\`cypher
// Find influencers (people with many followers)
MATCH (person:Person)<-[:FOLLOWS]-(follower)
WITH person, count(follower) as followerCount
WHERE followerCount > 100
RETURN person.name, followerCount
ORDER BY followerCount DESC
LIMIT 10

// Find communities (groups of interconnected people)
MATCH (p1:Person)-[:KNOWS]-(p2:Person)-[:KNOWS]-(p3:Person)-[:KNOWS]-(p1)
WHERE p1.city = p2.city AND p2.city = p3.city
RETURN DISTINCT p1.city, collect(DISTINCT p1.name) as community
\`\`\`

### Recommendation System

\`\`\`cypher
// Friend recommendations (friends of friends who aren't already friends)
MATCH (user:Person {name: 'Alice'})-[:KNOWS*2]-(recommendation)
WHERE NOT (user)-[:KNOWS]-(recommendation) 
  AND user <> recommendation
WITH recommendation, count(*) as mutualFriends
RETURN recommendation.name, mutualFriends
ORDER BY mutualFriends DESC
LIMIT 5

// Content recommendations based on friend activity
MATCH (user:Person {name: 'Alice'})-[:KNOWS]-(friend)-[:LIKES]->(content)
WHERE NOT (user)-[:LIKES]->(content)
WITH content, count(friend) as friendLikes
RETURN content.title, friendLikes
ORDER BY friendLikes DESC
LIMIT 10
\`\`\`

### Graph Analytics

\`\`\`cypher
// PageRank-style centrality (simplified)
MATCH (p:Person)
WITH p, size((p)<-[:KNOWS]-()) as inDegree, size((p)-[:KNOWS]->()) as outDegree
RETURN p.name, inDegree, outDegree, (inDegree + outDegree) as totalConnections
ORDER BY totalConnections DESC

// Clustering coefficient (how interconnected are a person's friends)
MATCH (person:Person)-[:KNOWS]-(friend1)-[:KNOWS]-(friend2)-[:KNOWS]-(person)
WHERE friend1 <> friend2
WITH person, count(DISTINCT friend1) as triangles
MATCH (person)-[:KNOWS]-(friend)
WITH person, triangles, count(friend) as totalFriends
RETURN person.name, 
       triangles, 
       totalFriends, 
       (2.0 * triangles) / (totalFriends * (totalFriends - 1)) as clusteringCoeff
ORDER BY clusteringCoeff DESC
\`\`\`

## Graph Modeling Patterns

### Social Media Platform

\`\`\`cypher
// Users, posts, likes, comments
CREATE (alice:User {username: 'alice123', email: 'alice@email.com'})
CREATE (post:Post {content: 'Beautiful sunset today!', timestamp: datetime()})
CREATE (comment:Comment {text: 'Amazing photo!', timestamp: datetime()})

// Relationships
CREATE (alice)-[:POSTED]->(post)
CREATE (alice)-[:LIKES]->(post)
CREATE (alice)-[:COMMENTED]->(comment)
CREATE (comment)-[:ON_POST]->(post)

// Query: Find all posts liked by Alice's friends
MATCH (alice:User {username: 'alice123'})-[:FOLLOWS]->(friend)-[:LIKES]->(post)
RETURN post.content, friend.username, post.timestamp
ORDER BY post.timestamp DESC
\`\`\`

### Knowledge Graph

\`\`\`cypher
// Academic knowledge graph
CREATE (cs:Subject {name: 'Computer Science'})
CREATE (algo:Course {code: 'CS401', name: 'Algorithms'})
CREATE (db:Course {code: 'CS301', name: 'Database Systems'})
CREATE (alice:Student {name: 'Alice Johnson', studentId: '12345'})
CREATE (smith:Professor {name: 'Dr. Smith', department: 'CS'})

// Relationships with properties
CREATE (algo)-[:BELONGS_TO]->(cs)
CREATE (db)-[:BELONGS_TO]->(cs)
CREATE (alice)-[:ENROLLED_IN {semester: 'Fall 2023', grade: 'A'}]->(algo)
CREATE (smith)-[:TEACHES]->(algo)
CREATE (algo)-[:PREREQUISITE_FOR]->(db)

// Query: Find all courses Alice can take next semester
MATCH (alice:Student {name: 'Alice Johnson'})-[:ENROLLED_IN {grade: 'A'}]->(completed)
MATCH (available:Course)-[:PREREQUISITE_FOR*0..2]-(completed)
WHERE NOT (alice)-[:ENROLLED_IN]->(available)
RETURN DISTINCT available.code, available.name
\`\`\`

### Supply Chain Network

\`\`\`cypher
// Supply chain modeling
CREATE (supplier:Company {name: 'TechSupplier Inc', type: 'Supplier'})
CREATE (manufacturer:Company {name: 'GadgetCorp', type: 'Manufacturer'}) 
CREATE (retailer:Company {name: 'MegaStore', type: 'Retailer'})
CREATE (component:Product {name: 'CPU Chip', category: 'Electronics'})

CREATE (supplier)-[:SUPPLIES {leadTime: 14, cost: 50}]->(component)
CREATE (manufacturer)-[:USES {quantity: 2}]->(component)
CREATE (manufacturer)-[:SELLS_TO {terms: 'NET30'}]->(retailer)

// Query: Find supply chain bottlenecks
MATCH path = (supplier)-[:SUPPLIES*]-(retailer)
WITH relationships(path) as rels
UNWIND rels as rel
RETURN type(rel), avg(rel.leadTime) as avgLeadTime, count(*) as frequency
ORDER BY avgLeadTime DESC
\`\`\`

## Performance and Optimization

### Indexing
\`\`\`cypher
// Create indexes for faster lookups
CREATE INDEX FOR (p:Person) ON (p.name)
CREATE INDEX FOR (p:Person) ON (p.email)
CREATE INDEX FOR (u:User) ON (u.username)

// Composite index
CREATE INDEX FOR (p:Post) ON (p.timestamp, p.userId)

// Full-text search index
CREATE FULLTEXT INDEX postContent FOR (p:Post) ON EACH [p.content, p.title]

// Use full-text search
CALL db.index.fulltext.queryNodes('postContent', 'sunset OR beach') 
YIELD node, score
RETURN node.content, score
\`\`\`

### Query Optimization
\`\`\`cypher
// Use PROFILE to analyze performance
PROFILE
MATCH (alice:Person {name: 'Alice'})-[:KNOWS*2]-(friend)
RETURN friend.name

// Limit early in the query
MATCH (p:Person)
WHERE p.age > 25
WITH p LIMIT 100  // Limit before expensive operations
MATCH (p)-[:KNOWS*2]-(friend)
RETURN friend.name

// Use parameters for repeated queries
MATCH (person:Person {name: $personName})-[:KNOWS]-(friend)
RETURN friend.name
\`\`\`

## Graph Database Use Cases

### When to Use Graph Databases
1. **Social Networks**: Friend connections, recommendations
2. **Fraud Detection**: Pattern matching in financial transactions  
3. **Knowledge Graphs**: Semantic relationships, AI/ML features
4. **Recommendation Engines**: Content and product suggestions
5. **Network Analysis**: Infrastructure, supply chains
6. **Identity & Access Management**: Role-based permissions
7. **Master Data Management**: Entity relationships

### When NOT to Use Graph Databases
1. **Simple CRUD operations**: Traditional relational works better
2. **Heavy analytical workloads**: Data warehouses are more suitable
3. **Document-centric data**: MongoDB/document stores are better
4. **Simple key-value lookups**: Redis/key-value stores are faster
5. **Financial transactions**: ACID guarantees of SQL are important

## Graph Algorithms

### Pathfinding
\`\`\`cypher
// Shortest path between two nodes
MATCH path = shortestPath((start:Person {name: 'Alice'})-[:KNOWS*]-(end:Person {name: 'Bob'}))
RETURN length(path), nodes(path)

// All shortest paths
MATCH paths = allShortestPaths((start:Person {name: 'Alice'})-[:KNOWS*]-(end:Person {name: 'Bob'}))
RETURN paths

// Dijkstra's algorithm with weights
MATCH path = (start:Person {name: 'Alice'})-[:KNOWS*]-(end:Person {name: 'Bob'})
WITH path, reduce(cost = 0, rel in relationships(path) | cost + rel.weight) as totalCost
RETURN path, totalCost
ORDER BY totalCost
LIMIT 1
\`\`\`

### Community Detection
\`\`\`cypher
// Find triangles (3-node cycles)
MATCH (a:Person)-[:KNOWS]-(b:Person)-[:KNOWS]-(c:Person)-[:KNOWS]-(a)
WHERE id(a) < id(b) AND id(b) < id(c)
RETURN a.name, b.name, c.name

// Connected components
MATCH (p:Person)
WHERE NOT EXISTS((p)-[:KNOWS]-())
RETURN p.name as isolatedPerson

UNION

MATCH path = (start:Person)-[:KNOWS*]-(end:Person)
WITH collect(DISTINCT start) + collect(DISTINCT end) as component
RETURN size(component) as componentSize, component[0].name as representative
ORDER BY componentSize DESC
\`\`\`
    `,
    exercises: [
      {
        id: "ex1",
        question:
          "Find all people that Alice knows, returning their names and the year they met (relationship property 'since')",
        expectedQuery:
          "MATCH (alice:Person {name: 'Alice'})-[knows:KNOWS]->(friend) RETURN friend.name, knows.since",
        hint: "Use MATCH with relationship variable to access properties. Pattern: (alice)-[rel:KNOWS]->(friend)",
        solution:
          "MATCH (alice:Person {name: 'Alice'})-[knows:KNOWS]->(friend) RETURN friend.name, knows.since;",
      },
      {
        id: "ex2",
        question:
          "Find friends of friends of Alice (2-hop connections) who are not directly connected to Alice",
        expectedQuery:
          "MATCH (alice:Person {name: 'Alice'})-[:KNOWS*2]-(fof) WHERE NOT (alice)-[:KNOWS]-(fof) AND alice <> fof RETURN DISTINCT fof.name",
        hint: "Use variable length path [:KNOWS*2] and WHERE NOT to exclude direct connections",
        solution:
          "MATCH (alice:Person {name: 'Alice'})-[:KNOWS*2]-(fof) WHERE NOT (alice)-[:KNOWS]-(fof) AND alice <> fof RETURN DISTINCT fof.name;",
      },
      {
        id: "ex3",
        question:
          "Create a relationship where Alice FOLLOWS Bob with property 'since': '2023-01-01'",
        expectedQuery:
          "MATCH (alice:Person {name: 'Alice'}), (bob:Person {name: 'Bob'}) CREATE (alice)-[:FOLLOWS {since: '2023-01-01'}]->(bob)",
        hint: "Use MATCH to find existing nodes, then CREATE the relationship with properties",
        solution:
          "MATCH (alice:Person {name: 'Alice'}), (bob:Person {name: 'Bob'}) CREATE (alice)-[:FOLLOWS {since: '2023-01-01'}]->(bob);",
      },
    ],
  },
];

// Export utility functions
export function getNoSQLLessonById(id: string): Lesson | undefined {
  return nosqlLessons.find((lesson) => lesson.id === id);
}

export function getNoSQLLessonsByCategory(category: string): Lesson[] {
  return nosqlLessons.filter((lesson) => lesson.category === category);
}

export function getNoSQLLessonsByDifficulty(
  difficulty: Lesson["difficulty"]
): Lesson[] {
  return nosqlLessons.filter((lesson) => lesson.difficulty === difficulty);
}

export function getAllNoSQLLessons(): Lesson[] {
  return nosqlLessons;
}
