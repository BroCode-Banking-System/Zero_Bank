const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Create a new account
router.post('/accounts', accountController.createaccount);
// Get view all accounts
router.get('/accounts', accountController.getaccount);
// Update an account by ID
router.put('/accounts/:id', accountController.updateaccount);
// Delete an account by ID
router.delete('/accounts/:id', accountController.deleteaccount);
module.exports = router;