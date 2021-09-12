import express from 'express';
import { login, signup, generateRefreshToken, logout } from '../http/controllers/authController.js';

const router = express.Router();

// @route POST /api/auth/signup
// @access Public
router.post("/auth/signup", signup);
// @route POST /api/auth/login
// @access Public
router.post("/auth/login", login);
// @route POST /api/auth/refresh_token
// @access Public
router.post("/auth/refresh_token", generateRefreshToken);
// @route DELETE /api/auth/logout
// @access Public
router.delete("/auth/logout", logout);
//@route GET /api/protected_resource
//@access to only authenticated users