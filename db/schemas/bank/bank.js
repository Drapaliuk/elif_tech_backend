const mongoose = require('mongoose');

exports.BankSchema = new mongoose.Schema({
    bankName: String,
    indicators: {
        interestRate: Number,
        maximumLoan: Number,
        minimumDownPayment: Number,
    }
    
});



