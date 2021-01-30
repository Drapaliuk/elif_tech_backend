const mongoose = require('mongoose');


exports.UserSchema = new mongoose.Schema({
    auth: {
        login: String,
        password: String,
        refreshToken: String,
        role: {
            type: String, 
            default: 'user'
        }
    },
    
});


