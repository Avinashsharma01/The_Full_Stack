# 🔐 Authentication App with EJS

A complete authentication system built with Node.js, Express, MongoDB, and EJS templating. Features secure user registration, login, password reset via email, and beautiful server-side rendered pages.

## ✨ Features

-   🔑 **User Registration & Login** with JWT authentication
-   📧 **Email-based Password Reset** with secure tokens
-   🎨 **Beautiful EJS Templates** with responsive design
-   🛡️ **Secure Password Hashing** with bcrypt
-   ⚡ **Real-time Form Validation** with AJAX
-   📱 **Mobile-Responsive Design** with CSS Grid & Flexbox
-   🔒 **JWT Token Management** with expiration
-   🚀 **Professional UI/UX** with animations

## 🏗️ Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Templating**: EJS (Embedded JavaScript)
-   **Authentication**: JWT, bcrypt
-   **Email**: Nodemailer
-   **Styling**: CSS3 with modern features

## 📁 Project Structure

```
Authentication/
├── 📄 server.js                    # Express server configuration
├── 📄 package.json                 # Dependencies and scripts
├── 📄 .env                         # Environment variables
├── 📁 views/                       # EJS templates
│   ├── 🏠 home.ejs                 # Landing page
│   ├── 📧 forgot-password.ejs      # Password reset request
│   └── 🔑 reset-password.ejs       # Password reset form
├── 📁 controller/
│   └── 👤 userController.js        # Authentication logic
├── 📁 route/
│   └── 🛣️ userRoute.js             # API routes
├── 📁 middleware/
│   └── 🛡️ authMiddleware.js        # JWT middleware
├── 📁 model/
│   └── 👥 user.js                  # User schema
├── 📁 config/
│   └── 🗄️ db.js                    # Database connection
├── 📁 utils/
│   └── 📧 sendEmail.js             # Email utility
└── 📁 public/                      # Static files
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

-   📖 **[Complete EJS Implementation Guide](./EJS_IMPLEMENTATION_DOCS.md)** - Detailed technical documentation
-   🚀 **[Quick Implementation Guide](./QUICK_IMPLEMENTATION_GUIDE.md)** - Step-by-step setup instructions

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
