const mongoose = require('mongoose');



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
    }
});


