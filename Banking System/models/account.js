const mongoose = require('mongoose');
const loan=require("../models/loan");

const accountSchema = new mongoose.Schema({
    accountnumber: {
        type: String,
        required: true,
        unique: true
    },//show on last 4 digit
    accountType: {
        type: String,
        enum: ["savings", "current", "credit"],
        required: true
    },
    balance: { 
        type: Number, 
        required: true,
        min: 0 
    },
    type: { 
        type: String, 
        enum: ["Credit", "Debit", "Transfer", "Payment"], 
        required: true, 
    },
    amount: { 
        type: Number,
        required: true,
        min: 1 
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },    
    balanceAfter: { 
        type: Number, 
        required: true,
        min: 1 
        },
    loaninfo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'loan',
        required: false
    }

});
module.exports = mongoose.model('account', accountSchema);

