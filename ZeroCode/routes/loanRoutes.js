const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/apply', loanController.applyLoan); 
router.post('/approve/:id', loanController.approveLoan);
router.post('/reject/:id', loanController.rejectLoan);
router.post('/pay-emi/:id', loanController.payEMI); 
        
module.exports = router;