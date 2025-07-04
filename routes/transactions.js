const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

// GET all transactions
router.get('/', getAllTransactions);

// POST new transaction
router.post('/', createTransaction);

// PUT update transaction
router.put('/:id', updateTransaction);

// DELETE transaction
router.delete('/:id', deleteTransaction);

module.exports = router; 