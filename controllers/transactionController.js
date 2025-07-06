const Transaction = require('../models/Transaction');

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const transaction = new Transaction({ amount, date, description, category });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, date, description, category },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get summary
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    
    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
    const recentTransactions = transactions.slice(0, 5);
    
    // Group by category
    const categoryBreakdown = transactions.reduce((acc, transaction) => {
      const category = transaction.category || 'Others';
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});
    
    // Convert to array format for frontend
    const categoryData = Object.entries(categoryBreakdown).map(([category, amount]) => ({
      category,
      amount
    }));
    
    res.json({
      totalExpenses,
      recentTransactions,
      categoryBreakdown: categoryData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary
}; 