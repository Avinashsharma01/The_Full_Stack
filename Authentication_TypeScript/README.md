# 🔐 TypeScript Authentication Backend

**Successfully converted from JavaScript to TypeScript!** 🎉

A complete authentication system built with Node.js, Express, MongoDB, and EJS templating - now with full TypeScript type safety and modern development practices.

## ✨ Features

-   🔑 **Type-### 🐳 **Docker Deployment\*\*

-   **[Docker Desktop Guide](./MD/DOCKER_DESKTOP_GUIDE.md)** - Complete Docker Desktop tutorial
-   **[Docker Beginner Guide](./MD/DOCKER_BEGINNER_GUIDE.md)** - Learn Docker from scratch
-   **[Docker Advanced Guide](./MD/DOCKER_ADVANCED_GUIDE.md)** - Production Docker patterns
-   **[Docker Learning Path](./MD/DOCKER_LEARNING_PATH.md)** - Structured learning roadmap
-   **[Docker Deployment Guide](./MD/DOCKER_DEPLOYMENT_GUIDE.md)** - Deploy this app with Dockeruthentication\*\* with JWT and TypeScript interfaces
-   📧 **Email-based Password Reset** with secure tokens
-   🎨 **Beautiful EJS Templates** with responsive design
-   🛡️ **Secure Password Hashing** with bcrypt
-   ⚡ **Compile-time Error Detection** with TypeScript
-   📱 **Mobile-Responsive Design** with CSS Grid & Flexbox
-   🔒 **JWT Token Management** with proper typing
-   🚀 **Professional Development Experience** with full IDE support

## 🏗️ Tech Stack

-   **Backend**: Node.js, Express.js with TypeScript
-   **Database**: MongoDB with Mongoose (typed)
-   **Templating**: EJS (Embedded JavaScript)
-   **Authentication**: JWT, bcrypt (type-safe)
-   **Email**: Nodemailer
-   **Styling**: CSS3 with modern features
-   **Development**: TypeScript 5.8.3, ES2020 modules

## 📁 Project Structure

```
Authentication_TypeScript/
├── 📄 server.ts                    # Express server (TypeScript)
├── 📄 package.json                 # Dependencies and TypeScript scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 .env                         # Environment variables
├── 📁 src/                         # TypeScript source files
│   ├── 📁 views/                   # EJS templates
│   │   ├── 🏠 home.ejs             # Landing page
│   │   ├── 📧 forgot-password.ejs  # Password reset request
│   │   └── 🔑 reset-password.ejs   # Password reset form
│   ├── 📁 controller/
│   │   └── 👤 userController.ts    # Authentication logic (typed)
│   ├── 📁 route/
│   │   └── 🛣️ userRoute.ts         # API routes (typed)
│   ├── 📁 middleware/
│   │   └── 🛡️ authMiddleware.ts    # JWT middleware (typed)
│   ├── 📁 model/
│   │   └── 👥 user.ts              # User schema with interfaces
│   ├── 📁 types/
│   │   └── 🎯 index.ts             # TypeScript type definitions
│   ├── 📁 config/
│   │   └── 🗄️ db.ts                # Database connection (typed)
│   ├── 📁 utils/
│   │   └── 📧 sendEmail.ts         # Email utility (typed)
│   └── 📁 public/                  # Static files
└── 📁 MD/                          # Documentation
    ├── 📚 TYPESCRIPT_BACKEND_GUIDE.md
    ├── 🔄 JS_TO_TS_CONVERSION_GUIDE.md
    ├── ⚡ ADVANCED_TYPESCRIPT_PATTERNS.md
    └── ✅ TYPESCRIPT_BEST_PRACTICES.md
```

## 🚀 Quick Start

### Prerequisites

-   Node.js (v14+)
-   MongoDB
-   Gmail account (for email service)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd Authentication
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create `.env` file:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/AuthenticationDB
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

4. **Start the server**

```bash
npm start
```

5. **Visit the application**
   Open `http://localhost:3000` in your browser

## 📋 API Endpoints

### Authentication Routes

| Method | Endpoint                        | Description            | Auth Required |
| ------ | ------------------------------- | ---------------------- | ------------- |
| POST   | `/api/v1/user/register`         | Register new user      | ❌            |
| POST   | `/api/v1/user/login`            | User login             | ❌            |
| POST   | `/api/v1/user/forgotPass`       | Request password reset | ❌            |
| POST   | `/api/v1/user/resetPass/:token` | Reset password         | ❌            |
| POST   | `/api/v1/user/changepass`       | Change password        | ✅            |
| GET    | `/api/v1/user/getme`            | Get user profile       | ✅            |

### Web Routes

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/`                      | Home page            |
| GET    | `/forgot-password`       | Forgot password form |
| GET    | `/reset-password/:token` | Reset password form  |

## 🧪 API Testing

### Register User

```bash
curl -X POST http://localhost:3000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "tc": true
  }'
```

### Login User

```bash
curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Forgot Password

```bash
curl -X POST http://localhost:3000/api/v1/user/forgotPass \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

### Change Password (requires JWT token)

```bash
curl -X POST http://localhost:3000/api/v1/user/changepass \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "currentPassword": "password123",
    "newPassword": "newpassword456",
    "cfNewPassword": "newpassword456"
  }'
```

## 🎨 EJS Templates

### Home Page Features

-   🏠 Professional landing page
-   📊 Feature showcase cards
-   🔗 Navigation to authentication flows
-   📱 Responsive design

### Forgot Password Page Features

-   📧 Email input with validation
-   ⚡ Real-time feedback
-   🔄 Loading states
-   ✅ Success/error messages

### Reset Password Page Features

-   🔑 Secure token-based reset
-   🔒 Password strength validation
-   ✅ Confirmation matching
-   🎨 Professional UI

## 🛡️ Security Features

### Password Security

-   ✅ bcrypt hashing with salt
-   ✅ Minimum 8 characters requirement
-   ✅ Password confirmation validation
-   ✅ Current password verification for changes

### Token Security

-   ✅ JWT tokens with expiration (15 minutes for reset)
-   ✅ Server-side token validation
-   ✅ Database token storage for reset flow
-   ✅ Automatic token cleanup after use

### Input Validation

-   ✅ Server-side validation for all inputs
-   ✅ Client-side real-time validation
-   ✅ XSS protection via EJS escaping
-   ✅ Email format validation

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
    - Go to Google Account settings
    - Security → 2-Step Verification → App passwords
    - Generate a new app password
3. Use the app password in your `.env` file

### Email Features

-   📧 HTML email templates
-   🔗 Secure reset links
-   ⏰ Token expiration warnings
-   🎨 Professional formatting

## 🎯 User Flow

### Registration Flow

```
User visits home page
    ↓
Clicks register (API call)
    ↓
Enters details
    ↓
Account created
    ↓
Success response
```

### Password Reset Flow

```
User visits /forgot-password
    ↓
Enters email address
    ↓
System sends reset email
    ↓
User clicks email link
    ↓
Redirected to /reset-password/:token
    ↓
Enters new password
    ↓
Password updated successfully
```

## 🔧 Development

### Available Scripts

```bash
npm start          # Start the server with nodemon
npm run dev        # Development mode (if configured)
npm test           # Run tests (if configured)
```

### Environment Variables

| Variable     | Description               | Example                            |
| ------------ | ------------------------- | ---------------------------------- |
| `PORT`       | Server port               | `3000`                             |
| `MONGO_URL`  | MongoDB connection string | `mongodb://localhost:27017/AuthDB` |
| `JWT_SECRET` | JWT signing secret        | `your-secret-key`                  |
| `EMAIL_USER` | Gmail address             | `your-email@gmail.com`             |
| `EMAIL_PASS` | Gmail app password        | `abcd efgh ijkl mnop`              |

## 📚 Documentation

### 📖 **TypeScript Learning**

-   **[TypeScript Backend Guide](./MD/TYPESCRIPT_BACKEND_GUIDE.md)** - Complete TypeScript fundamentals
-   **[JS to TS Conversion Guide](./MD/JS_TO_TS_CONVERSION_GUIDE.md)** - Step-by-step migration process
-   **[Advanced TypeScript Patterns](./MD/ADVANCED_TYPESCRIPT_PATTERNS.md)** - Advanced TypeScript techniques
-   **[TypeScript Best Practices](./MD/TYPESCRIPT_BEST_PRACTICES.md)** - Production-ready practices

### � **Docker Deployment**

-   **[Docker Beginner Guide](./MD/DOCKER_BEGINNER_GUIDE.md)** - Learn Docker from scratch
-   **[Docker Advanced Guide](./MD/DOCKER_ADVANCED_GUIDE.md)** - Production Docker patterns
-   **[Docker Learning Path](./MD/DOCKER_LEARNING_PATH.md)** - Structured learning roadmap
-   **[Docker Deployment Guide](./MD/DOCKER_DEPLOYMENT_GUIDE.md)** - Deploy this app with Docker

### 🏗️ **Implementation Guides**

-   **[Complete EJS Implementation Guide](./MD/EJS_IMPLEMENTATION_DOCS.md)** - Detailed technical documentation
-   **[Quick Implementation Guide](./MD/QUICK_IMPLEMENTATION_GUIDE.md)** - Step-by-step setup instructions
-   **[EJS Tutorial](./MD/EJS_TUTORIAL.md)** - Learn EJS templating

## 🐛 Troubleshooting

### Common Issues

**Email not sending**

-   Check Gmail app password
-   Verify EMAIL_USER and EMAIL_PASS in .env
-   Ensure 2FA is enabled on Gmail

**JWT token errors**

-   Verify JWT_SECRET in .env
-   Check token expiration
-   Ensure proper Authorization header format

**Database connection failed**

-   Check MongoDB is running
-   Verify MONGO_URL in .env
-   Check network connectivity

**EJS templates not rendering**

-   Verify views directory path
-   Check EJS view engine setup
-   Ensure template files exist

## 🚀 Deployment

### Production Checklist

-   [ ] Set NODE_ENV=production
-   [ ] Use strong JWT_SECRET
-   [ ] Configure HTTPS
-   [ ] Set up reverse proxy (Nginx)
-   [ ] Enable CORS properly
-   [ ] Set up monitoring
-   [ ] Configure logging
-   [ ] Use process manager (PM2)

### Recommended Hosting

-   **Backend**: Heroku, DigitalOcean, AWS
-   **Database**: MongoDB Atlas
-   **Email**: Gmail SMTP or SendGrid

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

## 🔗 Links

-   [Live Demo](your-demo-url)
-   [Documentation](./EJS_IMPLEMENTATION_DOCS.md)
-   [Issues](your-issues-url)

---

⭐ **Star this repository if you found it helpful!**
