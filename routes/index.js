const express = require('express');
const router = express.Router();
const transactionRoutes = require('./transactions');

// Mount transaction routes
router.use('/transactions', transactionRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = router; 