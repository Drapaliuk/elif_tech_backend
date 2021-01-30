const mongoose = require('mongoose');

const schemaOfBankIndicator = new mongoose.Schema({
    value: Number,
    units: String,
})

exports.BankSchema = new mongoose.Schema({
    bankName: String,
    interestRate: schemaOfBankIndicator,
    maximumLoan: schemaOfBankIndicator,
    minimumDownPayment: schemaOfBankIndicator,
    loanTerm: schemaOfBankIndicator
});



