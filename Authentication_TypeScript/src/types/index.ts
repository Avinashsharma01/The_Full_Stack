import { Request } from 'express';

// Extend the Express Request interface to include user property
export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    name: string;
    email: string;
    tc: boolean;
  };
}

// JWT Payload interface
export interface JWTPayload {
  userID: string;
  iat?: number;
  exp?: number;
}

// User registration interface
export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  tc: boolean;
}

// User login interface
export interface UserLoginData {
  email: string;
  password: string;
}

// Change password interface
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  cfNewPassword: string;
}

// Reset password interface
export interface ResetPasswordData {
  password: string;
  password_confirmation: string;
}
