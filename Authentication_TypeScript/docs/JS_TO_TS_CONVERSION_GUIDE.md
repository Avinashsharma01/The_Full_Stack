# Converting JavaScript to TypeScript - Step by Step Guide

## Table of Contents

1. [Pre-Conversion Checklist](#checklist)
2. [Step-by-Step Conversion Process](#process)
3. [Common Conversion Patterns](#patterns)
4. [Handling Dependencies](#dependencies)
5. [Database Integration](#database)
6. [Testing Migration](#testing)
7. [Real-World Example](#example)

---

## Pre-Conversion Checklist {#checklist}

### ✅ **Before You Start**

-   [ ] Backup your existing JavaScript project
-   [ ] Ensure all tests are passing
-   [ ] Document your current API endpoints
-   [ ] List all external dependencies
-   [ ] Plan your conversion strategy (gradual vs all-at-once)

### ✅ **Dependencies Audit**

```bash
# Check which packages need @types
npm list --depth=0
```

Common packages that need types:

-   `express` → `@types/express`
-   `mongoose` → `@types/mongoose` (often built-in)
-   `jsonwebtoken` → `@types/jsonwebtoken`
-   `bcrypt` → `@types/bcrypt`
-   `nodemailer` → `@types/nodemailer`
-   `cors` → `@types/cors`

---

## Step-by-Step Conversion Process {#process}

### Step 1: **Initialize TypeScript**

```bash
# Install TypeScript dependencies
npm install -D typescript @types/node nodemon ts-node

# Create tsconfig.json
npx tsc --init
```

### Step 2: **Configure tsconfig.json**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "node",
        "rootDir": "./src",
        "outDir": "./dist",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true,
        "allowJs": true, // Allow JS files during migration
        "checkJs": false // Don't type-check JS files initially
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

### Step 3: **Update package.json Scripts**

```json
{
    "scripts": {
        "build": "tsc",
        "start": "node dist/server.js",
        "dev": "nodemon --exec ts-node src/server.ts",
        "dev:js": "nodemon src/server.js", // Keep for gradual migration
        "type-check": "tsc --noEmit"
    }
}
```

### Step 4: **Rename Files Gradually**

```bash
# Start with main entry point
mv src/server.js src/server.ts

# Then move to models, controllers, etc.
mv src/models/user.js src/models/user.ts
mv src/controllers/userController.js src/controllers/userController.ts
```

---

## Common Conversion Patterns {#patterns}

### 1. **Express Server Conversion**

**Before (JavaScript):**

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

module.exports = app;
```

**After (TypeScript):**

```typescript
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World" });
});

export default app;
```

### 2. **Controller Function Conversion**

**Before (JavaScript):**

```javascript
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
```

**After (TypeScript):**

```typescript
import { Request, Response } from "express";

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

interface UserResponse {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

const registerUser = async (
    req: Request<{}, UserResponse, RegisterUserRequest>,
    res: Response<UserResponse | { message: string }>
) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
```

### 3. **Middleware Conversion**

**Before (JavaScript):**

```javascript
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
};
```

**After (TypeScript):**

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            email: string;
        };
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
```

### 4. **Database Model Conversion (Mongoose)**

**Before (JavaScript):**

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
```

**After (TypeScript):**

```typescript
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
```

---

## Handling Dependencies {#dependencies}

### 1. **Install Type Definitions**

```bash
# For your current project dependencies
npm install -D @types/express @types/jsonwebtoken @types/bcrypt @types/cors @types/nodemailer

# Check if types are needed
npm list @types/
```

### 2. **Module Import Conversion**

**CommonJS to ES Modules:**

```javascript
// Old way
const express = require("express");
const User = require("./models/User");

// New way
import express from "express";
import User from "./models/User.js"; // Note: .js extension for ES modules
```

### 3. **Environment Variables Typing**

```typescript
// Create types/environment.d.ts
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            PORT: string;
            MONGO_URL: string;
            JWT_SECRET: string;
            EMAIL_USER: string;
            EMAIL_PASS: string;
        }
    }
}

export {};
```

---

## Database Integration {#database}

### 1. **Mongoose with TypeScript**

```typescript
import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for the document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

// Interface for the model (static methods)
interface IUserModel extends Model<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

// Instance methods
userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Static methods
userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email });
};

export default mongoose.model<IUser, IUserModel>("User", userSchema);
```

### 2. **Database Operations with Types**

```typescript
// Service layer with proper typing
class UserService {
    async createUser(
        userData: Omit<IUser, "_id" | "createdAt" | "updatedAt">
    ): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async updateUser(
        id: string,
        updates: Partial<IUser>
    ): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updates, { new: true });
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await User.findByIdAndDelete(id);
        return !!result;
    }
}
```

---

## Testing Migration {#testing}

### 1. **Jest with TypeScript**

```bash
npm install -D jest @types/jest @types/supertest supertest ts-jest
```

### 2. **Jest Configuration (jest.config.js)**

```javascript
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};
```

### 3. **Test Example**

```typescript
import request from "supertest";
import app from "../app";
import User, { IUser } from "../models/User";

describe("User API", () => {
    let user: IUser;

    beforeEach(async () => {
        user = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "password123",
        });
    });

    it("should create a new user", async () => {
        const userData = {
            name: "New User",
            email: "new@example.com",
            password: "password123",
        };

        const response = await request(app)
            .post("/api/users")
            .send(userData)
            .expect(201);

        expect(response.body.user.email).toBe(userData.email);
    });
});
```

---

## Real-World Example: Authentication System {#example}

This is based on your actual project conversion. Here's how each file was converted:

### 1. **Server.ts Conversion**

```typescript
// Before: server.js
const express = require("express");
const connectToDB = require("./config/db");

// After: server.ts
import express from "express";
import connectToDB from "./config/db.js"; // Note .js extension for ES modules
```

### 2. **User Model Conversion**

```typescript
// Enhanced user model with proper TypeScript
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    tc: boolean;
    resetToken?: string | null;
    resetTokenExpire?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        tc: { type: Boolean, required: true },
        resetToken: String,
        resetTokenExpire: Date,
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
```

### 3. **Controller Conversion with Interfaces**

```typescript
// Define request/response types
interface UserRegistrationData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    tc: boolean;
}

// Enhanced controller with proper typing
export const Register = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
            password_confirmation,
            tc,
        }: UserRegistrationData = req.body;

        // Type-safe validation
        if (!name || !email || !password || !password_confirmation) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Type-safe database operation
        const user: IUser | null = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "Email already registered",
            });
        }

        // Continue with registration logic...
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
```

---

## Migration Checklist

### ✅ **Conversion Complete When:**

-   [ ] All `.js` files renamed to `.ts`
-   [ ] All imports converted to ES modules
-   [ ] Type definitions added for all functions
-   [ ] Interface definitions created for data structures
-   [ ] Database models properly typed
-   [ ] Middleware functions typed
-   [ ] Environment variables typed
-   [ ] Tests updated for TypeScript
-   [ ] Build process working (`npm run build`)
-   [ ] Development server working (`npm run dev`)
-   [ ] All TypeScript errors resolved
-   [ ] Strict mode passing (`tsc --strict --noEmit`)

### 🚀 **Next Steps After Conversion:**

1. Enable stricter TypeScript settings gradually
2. Add more specific types where `any` was used
3. Implement proper error handling with typed errors
4. Add API documentation with typed schemas
5. Set up pre-commit hooks for type checking

---

**Continue with:** [Advanced TypeScript Patterns](./ADVANCED_TYPESCRIPT_PATTERNS.md)
