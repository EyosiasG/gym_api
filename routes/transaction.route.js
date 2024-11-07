// routes/user.route.js
const express = require('express');
const TransactionController = require("../controllers/transaction.controller");

const router = express.Router();


router.post('/createTransaction', TransactionController.createTransaction); 
router.get('/getAllTransactions', TransactionController.getAllTransactions); 
router.get('/getMonthlyAccumulatedAmount', TransactionController.getMonthlyAccumulatedAmount); 

module.exports = router;