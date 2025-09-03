# 🎨 EJS Tutorial - Learn Embedded JavaScript Templates

## 📚 Table of Contents

1. [What is EJS?](#what-is-ejs)
2. [Setup & Installation](#setup--installation)
3. [Basic Syntax](#basic-syntax)
4. [Variables & Data](#variables--data)
5. [Conditionals](#conditionals)
6. [Loops](#loops)
7. [Includes & Partials](#includes--partials)
8. [Forms & User Input](#forms--user-input)
9. [Express Integration](#express-integration)
10. [Best Practices](#best-practices)
11. [Common Patterns](#common-patterns)
12. [Hands-on Examples](#hands-on-examples)

---

## 🤔 What is EJS?

**EJS (Embedded JavaScript)** is a simple templating language that lets you generate HTML markup with plain JavaScript.

### Why Use EJS?

-   ✅ **Simple to learn** - Just HTML with JavaScript
-   ✅ **Server-side rendering** - Better SEO
-   ✅ **Dynamic content** - Data from your backend
-   ✅ **No new syntax** - Uses JavaScript you already know
-   ✅ **Fast rendering** - Compiled templates

### EJS vs Other Templates

```javascript
// EJS (feels like JavaScript)
<% if (user) { %>
  <h1>Hello <%= user.name %>!</h1>
<% } %>

// Handlebars (new syntax to learn)
{{#if user}}
  <h1>Hello {{user.name}}!</h1>
{{/if}}

// Pug (completely different syntax)
if user
  h1 Hello #{user.name}!
```

---

## ⚙️ Setup & Installation

### 1. Create New Project

```bash
mkdir ejs-tutorial
cd ejs-tutorial
npm init -y
```

### 2. Install Dependencies

```bash
npm install express ejs
```

### 3. Basic Server Setup

```javascript
// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Basic route
app.get("/", (req, res) => {
    res.render("index", { title: "My First EJS Page" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

### 4. Create Views Folder

```bash
mkdir views
```

---

## 📝 Basic Syntax

EJS has 3 main tags:

### 🏷️ Tag Types

```ejs
<!-- 1. Output Tag (escaped) - SAFE -->
<%= variable %>

<!-- 2. Raw Output Tag (unescaped) - CAREFUL! -->
<%- htmlContent %>

<!-- 3. Scriptlet Tag (logic) - NO OUTPUT -->
<% if (condition) { %>
```

### 🎯 Your First EJS File

Create `views/index.ejs`:

```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1>Welcome to EJS!</h1>
    <p>Today is <%= new Date().toDateString() %></p>
</body>
</html>
```

### 🚀 Test It

```bash
node server.js
# Visit http://localhost:3000
```

---

## 🔢 Variables & Data

### Passing Data from Server

```javascript
// server.js
app.get("/profile", (req, res) => {
    const user = {
        name: "John Doe",
        age: 25,
        email: "john@example.com",
        hobbies: ["reading", "gaming", "cooking"],
    };

    res.render("profile", {
        user: user,
        pageTitle: "User Profile",
        isLoggedIn: true,
    });
});
```

### Using Data in Template

```ejs
<!-- views/profile.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= pageTitle %></title>
</head>
<body>
    <h1><%= user.name %>'s Profile</h1>

    <!-- Safe output (escaped) -->
    <p>Age: <%= user.age %></p>
    <p>Email: <%= user.email %></p>

    <!-- You can use JavaScript expressions -->
    <p>Birth Year: <%= new Date().getFullYear() - user.age %></p>

    <!-- Arrays -->
    <p>Hobbies: <%= user.hobbies.join(', ') %></p>
</body>
</html>
```

### 🛡️ Safe vs Unsafe Output

```ejs
<%
    const safeText = "Hello World"
    const htmlContent = "<script>alert('XSS')</script>"
    const trustedHTML = "<strong>Bold Text</strong>"
%>

<!-- SAFE: HTML is escaped -->
<p><%= htmlContent %></p>
<!-- Output: &lt;script&gt;alert('XSS')&lt;/script&gt; -->

<!-- UNSAFE: HTML is rendered -->
<p><%- htmlContent %></p>
<!-- Output: Executes script! ⚠️ -->

<!-- SAFE USE: When you trust the content -->
<p><%- trustedHTML %></p>
<!-- Output: Bold Text -->
```

---

## ❓ Conditionals

### Basic If Statements

```ejs
<!-- views/dashboard.ejs -->
<% if (isLoggedIn) { %>
    <h1>Welcome back, <%= user.name %>!</h1>
    <p>You have <%= user.notifications || 0 %> new notifications</p>
<% } else { %>
    <h1>Please log in</h1>
    <a href="/login">Login Here</a>
<% } %>
```

### If-Else Chain

```ejs
<% if (user.role === 'admin') { %>
    <button class="btn-danger">Delete User</button>
<% } else if (user.role === 'moderator') { %>
    <button class="btn-warning">Edit User</button>
<% } else { %>
    <button class="btn-info">View Profile</button>
<% } %>
```

### Ternary Operator

```ejs
<!-- Short conditions -->
<p class="<%= user.isActive ? 'text-green' : 'text-red' %>">
    Status: <%= user.isActive ? 'Active' : 'Inactive' %>
</p>

<!-- With default values -->
<h1>Hello <%= user.name || 'Guest' %>!</h1>
```

### Complex Conditions

```ejs
<%
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6
    const hasPermission = user.role === 'admin' || user.role === 'moderator'
%>

<% if (isWeekend && hasPermission) { %>
    <div class="alert alert-info">
        Weekend admin access granted!
    </div>
<% } %>
```

---

## 🔄 Loops

### Array Loops with forEach

```ejs
<%
    const fruits = ['Apple', 'Banana', 'Orange', 'Grape']
    const users = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 30 },
        { name: 'Bob', age: 35 }
    ]
%>

<!-- Simple array loop -->
<ul>
<% fruits.forEach(fruit => { %>
    <li><%= fruit %></li>
<% }) %>
</ul>

<!-- Object array loop -->
<table>
    <tr><th>Name</th><th>Age</th></tr>
    <% users.forEach(user => { %>
        <tr>
            <td><%= user.name %></td>
            <td><%= user.age %></td>
        </tr>
    <% }) %>
</table>
```

### For Loop with Index

```ejs
<ol>
<% for (let i = 0; i < fruits.length; i++) { %>
    <li>
        #<%= i + 1 %>: <%= fruits[i] %>
        <% if (i === 0) { %>
            <span class="badge">First!</span>
        <% } %>
    </li>
<% } %>
</ol>
```

### Object Property Loops

```ejs
<%
    const userDetails = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        country: 'USA'
    }
%>

<dl>
<% Object.keys(userDetails).forEach(key => { %>
    <dt><%= key.charAt(0).toUpperCase() + key.slice(1) %></dt>
    <dd><%= userDetails[key] %></dd>
<% }) %>
</dl>
```

### Advanced Loop with Conditions

```ejs
<div class="user-grid">
<% users.forEach((user, index) => { %>
    <% if (user.isActive) { %>
        <div class="user-card <%= index % 2 === 0 ? 'even' : 'odd' %>">
            <h3><%= user.name %></h3>
            <p>Joined: <%= user.joinDate %></p>

            <% if (user.isPremium) { %>
                <span class="premium-badge">Premium</span>
            <% } %>
        </div>
    <% } %>
<% }) %>
</div>
```

---

## 📦 Includes & Partials

### Why Use Includes?

-   ✅ **Reusable components** (header, footer, navbar)
-   ✅ **Cleaner code** - no repetition
-   ✅ **Easy maintenance** - change once, update everywhere

### Create Partials

```ejs
<!-- views/partials/header.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title || 'My Website' %></title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <nav class="navbar">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <% if (user) { %>
            <a href="/profile">Profile</a>
            <a href="/logout">Logout</a>
        <% } else { %>
            <a href="/login">Login</a>
        <% } %>
    </nav>
```

```ejs
<!-- views/partials/footer.ejs -->
    <footer>
        <p>&copy; <%= new Date().getFullYear() %> My Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

### Using Includes

```ejs
<!-- views/home.ejs -->
<%- include('partials/header', { title: 'Home Page' }) %>

<main>
    <h1>Welcome to our website!</h1>
    <p>This is the main content.</p>
</main>

<%- include('partials/footer') %>
```

### Passing Data to Includes

```ejs
<!-- views/blog.ejs -->
<%- include('partials/header', {
    title: 'Blog - ' + post.title,
    description: post.excerpt
}) %>

<article>
    <h1><%= post.title %></h1>
    <p>By <%= post.author %> on <%= post.date %></p>
    <div class="content">
        <%- post.content %>
    </div>
</article>

<%- include('partials/footer') %>
```

### Component-like Partials

```ejs
<!-- views/partials/user-card.ejs -->
<div class="card">
    <img src="<%= user.avatar %>" alt="<%= user.name %>">
    <h3><%= user.name %></h3>
    <p><%= user.bio %></p>
    <% if (showEmail) { %>
        <p>Email: <%= user.email %></p>
    <% } %>
</div>
```

```ejs
<!-- views/team.ejs -->
<div class="team-grid">
<% team.forEach(member => { %>
    <%- include('partials/user-card', {
        user: member,
        showEmail: false
    }) %>
<% }) %>
</div>
```

---

## 📝 Forms & User Input

### Basic Form

```ejs
<!-- views/contact.ejs -->
<%- include('partials/header', { title: 'Contact Us' }) %>

<form action="/contact" method="POST">
    <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"
               value="<%= formData.name || '' %>" required>
    </div>

    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"
               value="<%= formData.email || '' %>" required>
    </div>

    <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" required><%= formData.message || '' %></textarea>
    </div>

    <button type="submit">Send Message</button>
</form>

<%- include('partials/footer') %>
```

### Form with Validation Errors

```ejs
<!-- views/register.ejs -->
<%- include('partials/header', { title: 'Register' }) %>

<% if (errors && errors.length > 0) { %>
    <div class="alert alert-danger">
        <ul>
        <% errors.forEach(error => { %>
            <li><%= error %></li>
        <% }) %>
        </ul>
    </div>
<% } %>

<% if (success) { %>
    <div class="alert alert-success">
        <%= success %>
    </div>
<% } %>

<form action="/register" method="POST">
    <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username"
               value="<%= formData.username || '' %>"
               class="<%= errors && errors.some(e => e.includes('username')) ? 'error' : '' %>">
    </div>

    <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <small>At least 8 characters</small>
    </div>

    <button type="submit">Register</button>
</form>

<%- include('partials/footer') %>
```

### Dynamic Select Options

```ejs
<select name="country">
    <option value="">Select Country</option>
    <% countries.forEach(country => { %>
        <option value="<%= country.code %>"
                <%= formData.country === country.code ? 'selected' : '' %>>
            <%= country.name %>
        </option>
    <% }) %>
</select>
```

### Checkbox and Radio Groups

```ejs
<!-- Checkboxes -->
<fieldset>
    <legend>Interests:</legend>
    <% interests.forEach(interest => { %>
        <label>
            <input type="checkbox" name="interests" value="<%= interest.id %>"
                   <%= (formData.interests || []).includes(interest.id) ? 'checked' : '' %>>
            <%= interest.name %>
        </label>
    <% }) %>
</fieldset>

<!-- Radio buttons -->
<fieldset>
    <legend>Gender:</legend>
    <% ['male', 'female', 'other'].forEach(gender => { %>
        <label>
            <input type="radio" name="gender" value="<%= gender %>"
                   <%= formData.gender === gender ? 'checked' : '' %>>
            <%= gender.charAt(0).toUpperCase() + gender.slice(1) %>
        </label>
    <% }) %>
</fieldset>
```

---

## 🚀 Express Integration

### Complete Express Setup

```javascript
// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// EJS Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sample data
const users = [
    { id: 1, name: "John", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane", email: "jane@example.com", role: "user" },
];

const posts = [
    {
        id: 1,
        title: "First Post",
        content: "This is my first post!",
        author: "John",
    },
    {
        id: 2,
        title: "Second Post",
        content: "Another great post!",
        author: "Jane",
    },
];

// Routes
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        message: "Welcome to our website!",
        posts: posts.slice(0, 3), // Latest 3 posts
    });
});

app.get("/users", (req, res) => {
    res.render("users", {
        title: "Users",
        users: users,
    });
});

app.get("/user/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
        return res.render("404", { title: "404 - User Not Found" });
    }

    res.render("user-detail", {
        title: user.name,
        user: user,
    });
});

// Form handling
app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact",
        formData: {},
        errors: null,
        success: null,
    });
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    const errors = [];

    // Validation
    if (!name) errors.push("Name is required");
    if (!email) errors.push("Email is required");
    if (!message) errors.push("Message is required");

    if (errors.length > 0) {
        return res.render("contact", {
            title: "Contact",
            formData: req.body,
            errors: errors,
            success: null,
        });
    }

    // Process form (save to database, send email, etc.)
    console.log("Contact form submitted:", { name, email, message });

    res.render("contact", {
        title: "Contact",
        formData: {},
        errors: null,
        success: "Thank you for your message! We'll get back to you soon.",
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

### Middleware for Template Data

```javascript
// Global template data middleware
app.use((req, res, next) => {
    res.locals.siteName = "My Awesome Site";
    res.locals.currentYear = new Date().getFullYear();
    res.locals.currentUser = req.user || null;
    res.locals.isProduction = process.env.NODE_ENV === "production";
    next();
});

// Now you can use these in any template without passing them
```

```ejs
<!-- Available in all templates -->
<title><%= title %> - <%= siteName %></title>
<footer>&copy; <%= currentYear %> <%= siteName %></footer>
```

---

## ✨ Best Practices

### 1. File Organization

```
views/
├── layouts/
│   ├── main.ejs
│   └── admin.ejs
├── partials/
│   ├── header.ejs
│   ├── footer.ejs
│   ├── navbar.ejs
│   └── sidebar.ejs
├── pages/
│   ├── home.ejs
│   ├── about.ejs
│   └── contact.ejs
├── components/
│   ├── user-card.ejs
│   ├── post-card.ejs
│   └── form-field.ejs
└── errors/
    ├── 404.ejs
    └── 500.ejs
```

### 2. Security Best Practices

```ejs
<!-- ✅ DO: Always escape user input -->
<p>Welcome <%= user.name %>!</p>

<!-- ❌ DON'T: Never use raw output for user data -->
<p>Welcome <%- user.name %>!</p>

<!-- ✅ DO: Validate data before using -->
<% if (user && user.name) { %>
    <p>Welcome <%= user.name %>!</p>
<% } %>

<!-- ✅ DO: Use default values -->
<p>Welcome <%= user.name || 'Guest' %>!</p>
```

### 3. Performance Tips

```javascript
// Enable view caching in production
if (process.env.NODE_ENV === "production") {
    app.set("view cache", true);
}

// Use res.locals for common data
app.use((req, res, next) => {
    res.locals.helpers = {
        formatDate: (date) => new Date(date).toLocaleDateString(),
        truncate: (text, length) =>
            text.length > length ? text.substring(0, length) + "..." : text,
    };
    next();
});
```

```ejs
<!-- Use helpers for common operations -->
<p>Posted: <%= helpers.formatDate(post.createdAt) %></p>
<p><%= helpers.truncate(post.content, 100) %></p>
```

### 4. Error Handling

```javascript
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("errors/500", {
        title: "Server Error",
        error: process.env.NODE_ENV === "development" ? err : null,
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("errors/404", {
        title: "Page Not Found",
        url: req.originalUrl,
    });
});
```

---

## 🎨 Common Patterns

### 1. Layout Pattern

```ejs
<!-- views/layouts/main.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %> - <%= siteName %></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <% if (typeof style !== 'undefined') { %>
        <link rel="stylesheet" href="<%= style %>">
    <% } %>
</head>
<body>
    <%- include('../partials/header') %>

    <main>
        <%- body %>
    </main>

    <%- include('../partials/footer') %>

    <% if (typeof script !== 'undefined') { %>
        <script src="<%= script %>"></script>
    <% } %>
</body>
</html>
```

### 2. Card Component Pattern

```ejs
<!-- views/components/card.ejs -->
<div class="card <%= cardClass || '' %>">
    <% if (image) { %>
        <img src="<%= image %>" alt="<%= title %>" class="card-image">
    <% } %>

    <div class="card-content">
        <h3 class="card-title"><%= title %></h3>

        <% if (subtitle) { %>
            <p class="card-subtitle"><%= subtitle %></p>
        <% } %>

        <div class="card-body">
            <%- content %>
        </div>

        <% if (actions && actions.length > 0) { %>
            <div class="card-actions">
                <% actions.forEach(action => { %>
                    <a href="<%= action.url %>" class="btn <%= action.class || 'btn-primary' %>">
                        <%= action.text %>
                    </a>
                <% }) %>
            </div>
        <% } %>
    </div>
</div>
```

### 3. Pagination Pattern

```ejs
<!-- views/partials/pagination.ejs -->
<% if (totalPages > 1) { %>
    <nav class="pagination">
        <!-- Previous -->
        <% if (currentPage > 1) { %>
            <a href="?page=<%= currentPage - 1 %>" class="page-link">← Previous</a>
        <% } %>

        <!-- Page numbers -->
        <% for (let i = 1; i <= totalPages; i++) { %>
            <% if (i === currentPage) { %>
                <span class="page-link current"><%= i %></span>
            <% } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) { %>
                <a href="?page=<%= i %>" class="page-link"><%= i %></a>
            <% } else if (i === currentPage - 3 || i === currentPage + 3) { %>
                <span class="page-link">...</span>
            <% } %>
        <% } %>

        <!-- Next -->
        <% if (currentPage < totalPages) { %>
            <a href="?page=<%= currentPage + 1 %>" class="page-link">Next →</a>
        <% } %>
    </nav>
<% } %>
```

### 4. Form Field Pattern

```ejs
<!-- views/components/form-field.ejs -->
<div class="form-group <%= hasError ? 'has-error' : '' %>">
    <label for="<%= name %>">
        <%= label %>
        <% if (required) { %>
            <span class="required">*</span>
        <% } %>
    </label>

    <% if (type === 'textarea') { %>
        <textarea id="<%= name %>" name="<%= name %>"
                  placeholder="<%= placeholder || '' %>"
                  <%= required ? 'required' : '' %>><%= value || '' %></textarea>
    <% } else if (type === 'select') { %>
        <select id="<%= name %>" name="<%= name %>" <%= required ? 'required' : '' %>>
            <% if (placeholder) { %>
                <option value=""><%= placeholder %></option>
            <% } %>
            <% options.forEach(option => { %>
                <option value="<%= option.value %>"
                        <%= value === option.value ? 'selected' : '' %>>
                    <%= option.text %>
                </option>
            <% }) %>
        </select>
    <% } else { %>
        <input type="<%= type || 'text' %>" id="<%= name %>" name="<%= name %>"
               value="<%= value || '' %>" placeholder="<%= placeholder || '' %>"
               <%= required ? 'required' : '' %>>
    <% } %>

    <% if (hasError && errorMessage) { %>
        <div class="error-message"><%= errorMessage %></div>
    <% } %>

    <% if (helpText) { %>
        <small class="help-text"><%= helpText %></small>
    <% } %>
</div>
```

---

## 🏆 Hands-on Examples

### Example 1: Simple Blog

```javascript
// server.js
const posts = [
    {
        id: 1,
        title: "Getting Started with EJS",
        content: "EJS is a simple templating language...",
        author: "John Doe",
        date: "2024-01-15",
        tags: ["tutorial", "ejs", "nodejs"],
    },
    // ... more posts
];

app.get("/blog", (req, res) => {
    res.render("blog/index", {
        title: "Blog",
        posts: posts,
    });
});

app.get("/blog/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).render("errors/404");
    }

    res.render("blog/post", {
        title: post.title,
        post: post,
    });
});
```

```ejs
<!-- views/blog/index.ejs -->
<%- include('../partials/header', { title: 'Blog' }) %>

<div class="blog-container">
    <h1>Latest Posts</h1>

    <div class="posts-grid">
        <% posts.forEach(post => { %>
            <article class="post-card">
                <h2><a href="/blog/<%= post.id %>"><%= post.title %></a></h2>
                <div class="post-meta">
                    By <%= post.author %> on <%= new Date(post.date).toLocaleDateString() %>
                </div>
                <p><%= post.content.substring(0, 150) %>...</p>

                <div class="post-tags">
                    <% post.tags.forEach(tag => { %>
                        <span class="tag">#<%= tag %></span>
                    <% }) %>
                </div>

                <a href="/blog/<%= post.id %>" class="read-more">Read More →</a>
            </article>
        <% }) %>
    </div>
</div>

<%- include('../partials/footer') %>
```

### Example 2: User Dashboard

```javascript
app.get("/dashboard", (req, res) => {
    const user = {
        name: "John Doe",
        email: "john@example.com",
        joinDate: "2023-01-15",
        stats: {
            posts: 25,
            comments: 130,
            likes: 456,
        },
        recentActivity: [
            {
                type: "post",
                text: 'Created new post "EJS Tutorial"',
                time: "2 hours ago",
            },
            {
                type: "comment",
                text: 'Commented on "Node.js Best Practices"',
                time: "1 day ago",
            },
            {
                type: "like",
                text: 'Liked "JavaScript Tips"',
                time: "2 days ago",
            },
        ],
    };

    res.render("dashboard", {
        title: "Dashboard",
        user: user,
    });
});
```

```ejs
<!-- views/dashboard.ejs -->
<%- include('partials/header', { title: 'Dashboard' }) %>

<div class="dashboard">
    <div class="welcome-section">
        <h1>Welcome back, <%= user.name %>!</h1>
        <p>Member since <%= new Date(user.joinDate).toLocaleDateString() %></p>
    </div>

    <div class="stats-grid">
        <div class="stat-card">
            <h3><%= user.stats.posts %></h3>
            <p>Posts</p>
        </div>
        <div class="stat-card">
            <h3><%= user.stats.comments %></h3>
            <p>Comments</p>
        </div>
        <div class="stat-card">
            <h3><%= user.stats.likes %></h3>
            <p>Likes</p>
        </div>
    </div>

    <div class="recent-activity">
        <h2>Recent Activity</h2>
        <% if (user.recentActivity.length > 0) { %>
            <ul class="activity-list">
                <% user.recentActivity.forEach(activity => { %>
                    <li class="activity-item">
                        <span class="activity-icon <%= activity.type %>"></span>
                        <div class="activity-content">
                            <p><%= activity.text %></p>
                            <small><%= activity.time %></small>
                        </div>
                    </li>
                <% }) %>
            </ul>
        <% } else { %>
            <p>No recent activity</p>
        <% } %>
    </div>
</div>

<%- include('partials/footer') %>
```

### Example 3: Product Catalog

```javascript
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        category: "Electronics",
        image: "/images/laptop.jpg",
        inStock: true,
        rating: 4.5,
        reviews: 120,
    },
    // ... more products
];

app.get("/products", (req, res) => {
    let filteredProducts = products;
    const { category, minPrice, maxPrice, search } = req.query;

    if (category) {
        filteredProducts = filteredProducts.filter(
            (p) => p.category === category
        );
    }

    if (search) {
        filteredProducts = filteredProducts.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.render("products", {
        title: "Products",
        products: filteredProducts,
        filters: { category, minPrice, maxPrice, search },
        categories: [...new Set(products.map((p) => p.category))],
    });
});
```

```ejs
<!-- views/products.ejs -->
<%- include('partials/header', { title: 'Products' }) %>

<div class="products-page">
    <!-- Filters -->
    <aside class="filters">
        <h3>Filters</h3>
        <form method="GET">
            <div class="filter-group">
                <label>Search:</label>
                <input type="text" name="search" value="<%= filters.search || '' %>">
            </div>

            <div class="filter-group">
                <label>Category:</label>
                <select name="category">
                    <option value="">All Categories</option>
                    <% categories.forEach(cat => { %>
                        <option value="<%= cat %>"
                                <%= filters.category === cat ? 'selected' : '' %>>
                            <%= cat %>
                        </option>
                    <% }) %>
                </select>
            </div>

            <button type="submit">Apply Filters</button>
        </form>
    </aside>

    <!-- Products Grid -->
    <main class="products-content">
        <h1>Products (<%= products.length %>)</h1>

        <% if (products.length > 0) { %>
            <div class="products-grid">
                <% products.forEach(product => { %>
                    <div class="product-card">
                        <img src="<%= product.image %>" alt="<%= product.name %>">

                        <div class="product-info">
                            <h3><%= product.name %></h3>
                            <p class="price">$<%= product.price.toFixed(2) %></p>

                            <div class="rating">
                                <% for (let i = 1; i <= 5; i++) { %>
                                    <span class="star <%= i <= product.rating ? 'filled' : '' %>">★</span>
                                <% } %>
                                <span>(<%= product.reviews %> reviews)</span>
                            </div>

                            <% if (product.inStock) { %>
                                <button class="btn btn-primary">Add to Cart</button>
                            <% } else { %>
                                <button class="btn btn-secondary" disabled>Out of Stock</button>
                            <% } %>
                        </div>
                    </div>
                <% }) %>
            </div>
        <% } else { %>
            <div class="no-products">
                <h2>No products found</h2>
                <p>Try adjusting your filters</p>
            </div>
        <% } %>
    </main>
</div>

<%- include('partials/footer') %>
```

---

## 🎯 Quick Reference

### Essential Tags

```ejs
<%= value %>          <!-- Escaped output -->
<%- html %>           <!-- Raw HTML output -->
<% code %>            <!-- JavaScript code -->
<%# comment %>        <!-- Comment (not rendered) -->
<%- include('file') %> <!-- Include another file -->
```

### Common Patterns

```ejs
<!-- Default values -->
<%= user.name || 'Guest' %>

<!-- Conditional classes -->
<div class="<%= isActive ? 'active' : 'inactive' %>">

<!-- Loop with index -->
<% items.forEach((item, index) => { %>
    <div class="item-<%= index %>"><%= item %></div>
<% }) %>

<!-- Safe property access -->
<% if (user && user.profile && user.profile.bio) { %>
    <p><%= user.profile.bio %></p>
<% } %>
```

### Useful JavaScript in Templates

```ejs
<!-- Date formatting -->
<%= new Date().toLocaleDateString() %>
<%= new Date(post.date).toDateString() %>

<!-- String manipulation -->
<%= text.substring(0, 100) + '...' %>
<%= name.charAt(0).toUpperCase() + name.slice(1) %>

<!-- Array operations -->
<%= tags.join(', ') %>
<%= items.length %>

<!-- Math operations -->
<%= Math.round(rating * 10) / 10 %>
<%= Math.max(...scores) %>
```

---

## 🎉 Congratulations!

You've learned EJS from basics to advanced patterns! You now know how to:

-   ✅ Set up EJS with Express
-   ✅ Use variables and data
-   ✅ Create conditionals and loops
-   ✅ Build reusable partials
-   ✅ Handle forms and user input
-   ✅ Implement common patterns
-   ✅ Follow best practices

### Next Steps:

1. **Practice** with your own projects
2. **Explore** advanced features like custom delimiters
3. **Combine** with frontend frameworks
4. **Optimize** for production
5. **Share** your knowledge with others!

Happy templating! 🚀
