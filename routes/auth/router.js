const express = require('express');
const router = express.Router();

const registrations = require('./registrations')
const login = require('./login');
const checkOutAuth = require('./check_out_auth');
 

router.post('/registration', registrations.post)
      .post('/login', login.post)
      

module.exports = router;