const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// POST /api/budgets - Add or update budget
router.post('/', async (req, res) => {
  const { category, amount, month } = req.body;

  try {
    const budget = await Budget.findOneAndUpdate(
      { category, month },
      { amount },
      { new: true, upsert: true }
    );
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save budget' });
  }
});

// GET /api/budgets?month=YYYY-MM
router.get('/', async (req, res) => {
  const { month } = req.query;
  try {
    const budgets = await Budget.find({ month });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch budgets' });
  }
});

// GET /api/budget-vs-actual?month=YYYY-MM
router.get('/budget-vs-actual', async (req, res) => {
  const { month } = req.query;
  const start = new Date(`${month}-01`);
  const end = new Date(new Date(start).setMonth(start.getMonth() + 1));

  try {
    const budgets = await Budget.find({ month });

    const transactions = await Transaction.find({
      date: { $gte: start, $lt: end }
    });

    const actuals = {};

    transactions.forEach(tx => {
      actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
    });

    const result = budgets.map(b => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to compute comparison' });
  }
});

module.exports = router; 