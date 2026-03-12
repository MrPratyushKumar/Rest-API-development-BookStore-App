# 📚 MongoDB & Mongoose - Complete Revision Notes

## 🎯 Table of Contents
1. [Setup & Connection](#setup--connection)
2. [Schema & Model](#schema--model)
3. [CRUD Operations](#crud-operations)
4. [Query Methods](#query-methods)
5. [Advanced Queries](#advanced-queries)
6. [Update Operations](#update-operations)
7. [Delete Operations](#delete-operations)
8. [Best Practices](#best-practices)

---

## 🔌 Setup & Connection

### Installation
```bash
npm install mongoose dotenv
```

### Basic Connection
```javascript
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://username:password@cluster.mongodb.net/databaseName")
  .then(() => console.log("Database Connected Successfully"))
  .catch((e) => console.log("Connection Error:", e));
```

### ✅ Secure Connection (Using Environment Variables)
```javascript
require('dotenv').config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Connected Successfully"))
  .catch((e) => console.log("Connection Error:", e));
```

**`.env` file:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/databaseName
```

---

## 📋 Schema & Model

### What is a Schema?
A **Schema** defines the structure of documents in a MongoDB collection (like a blueprint).

### What is a Model?
A **Model** is a class that allows you to interact with the database using the schema (like a factory based on the blueprint).

### Creating Schema & Model
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],                              // Array of strings
  createdAt: { type: Date, default: Date.now } // Default value
});

// Create Model - Entry point for all database operations
const User = mongoose.model("User", userSchema);
```

**⚠️ Common Mistake:**
```javascript
// ❌ WRONG - Passing string instead of schema object
const User = mongoose.model("User", "userSchema");

// ✅ CORRECT - Passing the schema object
const User = mongoose.model("User", userSchema);
```

---

## 📝 CRUD Operations

### 1️⃣ CREATE - Adding Documents

#### Method 1: Using `create()`
```javascript
const newUser = await User.create({
  name: 'Pratyush Pandey',
  email: 'pratyush@gmail.com',
  age: 23,
  isActive: true,
  tags: ['Developer', 'Engineer']
});
console.log('Created User:', newUser);
```

#### Method 2: Using `new` + `save()`
```javascript
const newUser = new User({
  name: 'Utkarsh Pandey',
  email: 'utkarsh@gmail.com',
  age: 25,
  isActive: true,
  tags: ['Designer', 'Artist']
});
await newUser.save();
console.log('Created User:', newUser);
```

**🔍 Difference:**
- `create()` - Shorthand, directly saves to DB
- `new` + `save()` - More control, you can modify before saving

---

## 🔎 Query Methods

### 2️⃣ READ - Finding Documents

#### Get All Users
```javascript
const allUsers = await User.find({});
console.log(allUsers); // Returns array of all users
```

#### Get Users with Specific Criteria
```javascript
// Get users where isActive is false
const inactiveUsers = await User.find({ isActive: false });
console.log(inactiveUsers);
```

#### Get First Matching Document - `findOne()`
```javascript
// Finds the FIRST user with name "John Doe"
const johnDoe = await User.findOne({ name: "John Doe" });
console.log(johnDoe);
```

**💡 Note:** If 5 users have the same name, `findOne()` returns only the first match.

#### Get User by ID - `findById()`
```javascript
// Find user by MongoDB _id
const user = await User.findById('69b2230749f8bffaad5ab30b');
console.log(user);

// Or using newly created user's ID
const lastUser = await User.findById(newUser._id);
console.log(lastUser);
```

---

## 🎯 Advanced Queries

### 7️⃣ SELECT Specific Fields - `.select()`

```javascript
// Get only name and email (exclude _id)
const selectedFields = await User.find().select('name email -_id');
console.log(selectedFields);
```

**Syntax:**
- `'name email'` - Include these fields
- `'-_id'` - Exclude _id field (minus sign means exclude)

**Output:**
```javascript
[
  { name: 'John', email: 'john@gmail.com' },
  { name: 'Jane', email: 'jane@gmail.com' }
]
```

---

### 8️⃣ PAGINATION - `.limit()` & `.skip()`

```javascript
// Get only 5 users, skip the first 1
const limitedUsers = await User.find().limit(5).skip(1);
console.log(limitedUsers);
```

**Use Case:** Pagination in web apps
- Page 1: `skip(0).limit(10)`
- Page 2: `skip(10).limit(10)`
- Page 3: `skip(20).limit(10)`

---

### 9️⃣ SORTING - `.sort()`

#### Sort by Age (Descending - Highest First)
```javascript
const sortedUsers = await User.find().sort({ age: -1 });
console.log(sortedUsers);
```

#### Sort by Age (Ascending - Lowest First)
```javascript
const sortedUsers = await User.find().sort({ age: 1 });
console.log(sortedUsers);
```

**Remember:**
- `-1` = Descending (Z to A, 100 to 1)
- `1` or `+1` = Ascending (A to Z, 1 to 100)

---

### 1️⃣1️⃣ COUNT Documents - `.countDocuments()`

```javascript
// Count inactive users
const count = await User.countDocuments({ isActive: false });
console.log(`Total inactive users: ${count}`);
```

---

## ✏️ Update Operations

### 1️⃣3️⃣ UPDATE by ID - `findByIdAndUpdate()`

```javascript
const updatedUser = await User.findByIdAndUpdate(
  newUser._id,              // User ID to update
  {
    $set: { age: 100 },     // Update age to 100
    $push: { tags: 'updated' } // Add 'updated' to tags array
  },
  { new: true }             // Return updated document (not old one)
);
console.log('Updated User:', updatedUser);
```

**Update Operators:**
- `$set` - Update/Set a field value
- `$push` - Add item to array
- `$pull` - Remove item from array
- `$inc` - Increment a number

**Options:**
- `{ new: true }` - Return the updated document (default returns old document)

#### More Update Examples
```javascript
// Increment age by 5
await User.findByIdAndUpdate(
  userId,
  { $inc: { age: 5 } }
);

// Remove a tag from array
await User.findByIdAndUpdate(
  userId,
  { $pull: { tags: 'Developer' } }
);

// Update multiple fields
await User.findByIdAndUpdate(
  userId,
  {
    $set: {
      name: 'New Name',
      email: 'newemail@gmail.com',
      isActive: false
    }
  },
  { new: true }
);
```

---

## 🗑️ Delete Operations

### 1️⃣2️⃣ DELETE by ID - `findByIdAndDelete()`

```javascript
const deletedUser = await User.findByIdAndDelete(newUser._id);
console.log('Deleted User:', deletedUser);
```

**Returns:** The deleted document (so you can see what was removed)

#### Other Delete Methods
```javascript
// Delete first matching document
await User.findOneAndDelete({ name: 'John Doe' });

// Delete multiple documents
await User.deleteMany({ isActive: false });

// Delete all documents (BE CAREFUL!)
await User.deleteMany({});
```

---

## 🎓 Complete Example Workflow

```javascript
require('dotenv').config();
const mongoose = require("mongoose");

// Schema Definition
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

// Model Creation
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    // 1. CREATE
    const newUser = await User.create({
      name: 'Test User',
      email: 'test@gmail.com',
      age: 25,
      isActive: true,
      tags: ['Developer']
    });

    // 2. READ ALL
    const allUsers = await User.find({});
    
    // 3. READ WITH FILTER
    const activeUsers = await User.find({ isActive: true });
    
    // 4. READ ONE
    const firstUser = await User.findOne({ name: 'Test User' });
    
    // 5. READ BY ID
    const userById = await User.findById(newUser._id);
    
    // 6. SELECT FIELDS
    const names = await User.find().select('name -_id');
    
    // 7. PAGINATION
    const page1 = await User.find().limit(10).skip(0);
    
    // 8. SORT
    const sorted = await User.find().sort({ age: -1 });
    
    // 9. COUNT
    const totalUsers = await User.countDocuments({});
    
    // 10. UPDATE
    const updated = await User.findByIdAndUpdate(
      newUser._id,
      { $set: { age: 30 }, $push: { tags: 'Senior' } },
      { new: true }
    );
    
    // 11. DELETE
    await User.findByIdAndDelete(newUser._id);

  } catch (error) {
    console.log("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

// Connection & Execution
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected");
    runQueryExamples();
  })
  .catch((e) => console.log(e));
```

---

## ✅ Best Practices

### 1. **Always Use Environment Variables**
```javascript
// ❌ BAD
mongoose.connect("mongodb+srv://user:pass@cluster.mongodb.net/");

// ✅ GOOD
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
```

### 2. **Wait for Connection Before Queries**
```javascript
// ❌ BAD - Query might run before connection
mongoose.connect(uri);
runQueries(); // Might fail!

// ✅ GOOD
mongoose.connect(uri)
  .then(() => runQueries())
  .catch(console.error);
```

### 3. **Always Handle Errors**
```javascript
try {
  const user = await User.findById(id);
} catch (error) {
  console.log("Error:", error);
}
```

### 4. **Close Connection When Done**
```javascript
finally {
  await mongoose.connection.close();
}
```

### 5. **Use Schema Validation**
```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,    // Field is mandatory
    unique: true,      // No duplicates
    lowercase: true    // Auto convert to lowercase
  },
  age: {
    type: Number,
    min: 0,           // Minimum value
    max: 120          // Maximum value
  }
});
```

---

## 🚨 Common Errors & Solutions

### Error 1: "Cannot use 'in' operator..."
**Cause:** Passing string instead of schema object
```javascript
// ❌ WRONG
const User = mongoose.model("User", "userSchema");

// ✅ CORRECT
const User = mongoose.model("User", userSchema);
```

### Error 2: "Buffering timed out"
**Cause:** Query executed before connection established
```javascript
// ✅ Solution: Wait for connection
mongoose.connect(uri)
  .then(() => runQueries());
```

### Error 3: "ECONNREFUSED"
**Causes:**
- No internet connection
- IP not whitelisted in MongoDB Atlas
- Wrong credentials

**Solution:** Check MongoDB Atlas Network Access settings

---

## 📊 Quick Reference Table

| Operation | Method | Returns |
|-----------|--------|---------|
| Create One | `User.create({})` | New document |
| Create One | `new User({}).save()` | New document |
| Get All | `User.find({})` | Array |
| Get Filtered | `User.find({ age: 25 })` | Array |
| Get One | `User.findOne({ name: 'John' })` | Single doc or null |
| Get By ID | `User.findById(id)` | Single doc or null |
| Update By ID | `User.findByIdAndUpdate(id, update, {new: true})` | Updated doc |
| Delete By ID | `User.findByIdAndDelete(id)` | Deleted doc |
| Count | `User.countDocuments({})` | Number |

---

## 🎯 Query Chaining Example

You can chain multiple methods together:

```javascript
const results = await User
  .find({ isActive: true })      // Filter active users
  .select('name email -_id')     // Only get name and email
  .sort({ age: -1 })             // Sort by age (descending)
  .limit(10)                     // Get only 10 results
  .skip(5);                      // Skip first 5 results

console.log(results);
```

**Execution Order:** Query building is lazy - it only executes when you `await` it!

---

## 💾 .env Setup

**`.env` file:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/databaseName
PORT=3000
NODE_ENV=development
```

**`.gitignore` file:**
```
node_modules/
.env
.DS_Store
```

**`.env.example` file (for team members):**
```
MONGODB_URI=your_mongodb_connection_string_here
PORT=3000
NODE_ENV=development
```

---

## 🎉 Summary

1. **Schema** = Blueprint of your data structure
2. **Model** = Factory to interact with database
3. **CRUD** = Create, Read, Update, Delete
4. **Chaining** = Combine `.find()`, `.sort()`, `.limit()`, `.select()` for powerful queries
5. **Security** = Always use `.env` for credentials
6. **Error Handling** = Always use try-catch blocks

---

**🔖 Pro Tip:** Bookmark this file and refer to it whenever you need a quick reminder!

**📚 Next Steps:**
- Learn about MongoDB Aggregation Pipeline
- Explore Mongoose Middleware (pre/post hooks)
- Study Mongoose Populate (for relationships)
- Master Mongoose Validation

---

*Happy Coding! 🚀*
