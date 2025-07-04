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
    const { amount, date, description } = req.body;
    const transaction = new Transaction({ amount, date, description });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { amount, date, description } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, date, description },
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

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
}; 