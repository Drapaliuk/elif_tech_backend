const express = require('express');
const router = express.Router();

const bank = require('./bank');
 
router.post('/', bank.post)
      .put('/', bank.updateIndicators)
      .delete('/', bank.delete)
      .get('/', bank.get)
      .put('/balance', bank.updateBalance)

module.exports = router;