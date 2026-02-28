// FinCustody Hub - Auth Service
// Main application entry point

const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware - parse incoming JSON requests
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Health check endpoint
// This is important - Kubernetes uses this to know if our service is alive
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[FinCustody] Auth Service running on port ${PORT}`);
  console.log(`[FinCustody] Health check: http://localhost:${PORT}/health`);
  console.log(`[FinCustody] Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;