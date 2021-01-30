const { model } = require("mongoose");
const { BankSchema } = require("../../schemas/bank/bank");

exports.Bank = model('bank', BankSchema);