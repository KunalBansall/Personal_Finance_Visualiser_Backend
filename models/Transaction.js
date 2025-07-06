const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Food', 'Rent', 'Bills', 'Shopping', 'Travel', 'Others']
  }
});

module.exports = mongoose.model('Transaction', transactionSchema); 