// FinCustody Hub - Auth Service
// Authentication routes - Login and Token verification

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Mock users database
// In production this would connect to a real database
// For learning purposes we use an in-memory store
const users = [
  {
    id: 1,
    username: 'securities.ops',
    // Password: 'password123' (hashed with bcrypt)
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'securities',
    department: 'Securities Operations'
  },
  {
    id: 2,
    username: 'fx.ops',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'fx',
    department: 'FX Operations'
  },
  {
    id: 3,
    username: 'funding.ops',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'funding',
    department: 'Funding & Treasury'
  },
  {
    id: 4,
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'admin',
    department: 'Operations Management'
  }
];

// POST /auth/login
// Accepts username and password, returns JWT token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    // Think of this like issuing a tamper-proof access card
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        department: user.department
      },
      process.env.JWT_SECRET || 'fincustody-dev-secret',
      { expiresIn: process.env.JWT_EXPIRY || '8h' } // 8 hour trading day
    );

    // Return token
    res.status(200).json({
      success: true,
      message: `Welcome to FinCustody Hub, ${user.department}`,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        department: user.department
      }
    });

  } catch (error) {
    console.error('[FinCustody] Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /auth/verify
// Verifies a JWT token - used by other services
router.post('/verify', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    // Verify and decode token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fincustody-dev-secret'
    );

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: decoded
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

// GET /auth/users
// Returns list of users (admin only - we'll add proper auth middleware later)
router.get('/users', (req, res) => {
  const safeUsers = users.map(({ password, ...user }) => user);
  res.status(200).json({
    success: true,
    users: safeUsers
  });
});

module.exports = router;