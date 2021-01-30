const mongoose = require('mongoose');
const { ServiceSchema } = require('../bank_service');


exports.UserSchema = new mongoose.Schema({
    auth: {
        login: String,
        password: String,
        refreshToken: String,
        role: String
    },
    myCreatedBanksIds: [String], 
    balance: {
        type: Number,
        default: 0
    },
    activeBankServices:[ServiceSchema]

});


