# 🚀 Quick Implementation Guide

## Prerequisites

-   Node.js installed
-   MongoDB running
-   Gmail account for email service

## 📦 Setup Instructions

### 1. Install Dependencies

```bash
npm install express ejs bcrypt jsonwebtoken mongoose nodemailer dotenv
```

### 2. Environment Configuration

Create `.env` file:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/AuthenticationDB
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Project Structure

```
project/
├── server.js
├── package.json
├── .env
├── views/
│   ├── home.ejs
│   ├── forgot-password.ejs
│   └── reset-password.ejs
├── controller/
│   └── userController.js
├── route/
│   └── userRoute.js
├── middleware/
│   └── authMiddleware.js
├── model/
│   └── user.js
├── config/
│   └── db.js
└── utils/
    └── sendEmail.js
```

## 🔧 Core Implementation Files

### Server Configuration (server.js)

```javascript
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
    res.render("home", { appName: "Your App" });
});

app.get("/forgot-password", (req, res) => {
    res.render("forgot-password", {
        appName: "Your App",
        error: null,
        success: null,
        email: null,
    });
});

app.get("/reset-password/:token", (req, res) => {
    res.render("reset-password", {
        token: req.params.token,
        appName: "Your App",
        error: null,
        success: null,
    });
});
```

### User Model (model/user.js)

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        resetToken: String,
        resetTokenExpire: Date,
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
```

### Email Utility (utils/sendEmail.js)

```javascript
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransporter({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({ to, subject, text });
};

export default sendEmail;
```

## 🎨 EJS Template Basics

### Basic EJS Syntax

```ejs
<!-- Variable Output -->
<h1><%= appName %></h1>

<!-- Conditional Rendering -->
<% if (error) { %>
    <div class="error"><%= error %></div>
<% } %>

<!-- Loop -->
<% users.forEach(user => { %>
    <p><%= user.name %></p>
<% }) %>

<!-- Raw HTML (unescaped) -->
<%- htmlContent %>
```

### Form with AJAX

```ejs
<form id="myForm">
    <input type="email" name="email" required>
    <button type="submit">Submit</button>
</form>

<script>
document.getElementById('myForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')

    try {
        const response = await fetch('/api/endpoint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        const data = await response.json()
        // Handle response
    } catch (error) {
        console.error('Error:', error)
    }
})
</script>
```

## 🔐 Security Implementation

### JWT Token Generation

```javascript
import jwt from "jsonwebtoken";

// Generate reset token
const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
});

// Verify token
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.userID);
} catch (error) {
    console.log("Invalid token");
}
```

### Password Hashing

```javascript
import bcrypt from "bcrypt";

// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Compare password
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

## 📱 Frontend Best Practices

### Loading States

```javascript
const submitButton = document.getElementById("submit");
const loadingDiv = document.getElementById("loading");

// Show loading
submitButton.disabled = true;
loadingDiv.style.display = "block";

// Hide loading
submitButton.disabled = false;
loadingDiv.style.display = "none";
```

### Error Handling

```javascript
try {
    const response = await fetch('/api/endpoint')
    if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`)
    }
    const data = await response.json()
    // Success handling
} catch (error) {
    // Error handling
    console.error('Request failed:', error)
}
```

## 🎯 Common Patterns

### Controller Pattern

```javascript
export const controllerFunction = async (req, res) => {
    try {
        // Validation
        const { field } = req.body;
        if (!field) {
            return res.status(400).json({ message: "Field required" });
        }

        // Business logic
        const result = await SomeModel.findOne({ field });

        // Response
        res.status(200).json({
            message: "Success",
            data: result,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
```

### Middleware Pattern

```javascript
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userID);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
```

## 📋 Testing Checklist

### Frontend Testing

-   [ ] Forms submit correctly
-   [ ] Validation messages appear
-   [ ] Loading states work
-   [ ] Error handling functions
-   [ ] Responsive design works
-   [ ] Navigation links work

### Backend Testing

-   [ ] API endpoints respond correctly
-   [ ] Database operations work
-   [ ] Email sending functions
-   [ ] Token validation works
-   [ ] Error handling covers edge cases

### Security Testing

-   [ ] Passwords are hashed
-   [ ] Tokens expire correctly
-   [ ] XSS protection works
-   [ ] Input validation functions
-   [ ] Rate limiting (if implemented)

## 🚨 Common Issues & Solutions

### Issue: EJS not rendering

**Solution**: Check view engine setup and file paths

```javascript
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
```

### Issue: CSS not loading

**Solution**: Configure static file serving

```javascript
app.use(express.static("public"));
```

### Issue: Token not working

**Solution**: Check JWT secret and expiration

```javascript
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
```

### Issue: Email not sending

**Solution**: Use Gmail App Password

1. Enable 2FA on Gmail
2. Generate App Password
3. Use App Password in EMAIL_PASS

## 🎉 Deployment Tips

### Production Considerations

-   Set NODE_ENV=production
-   Use environment variables for secrets
-   Enable HTTPS
-   Configure CORS properly
-   Set up proper logging
-   Use process managers (PM2)
-   Configure reverse proxy (Nginx)

### Performance Optimization

-   Enable EJS caching: `app.set('view cache', true)`
-   Compress responses: `app.use(compression())`
-   Use CDN for static assets
-   Implement caching strategies
-   Optimize database queries

This guide provides the foundation for implementing EJS-based authentication systems with modern best practices!
