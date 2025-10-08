const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    loanType: {
        type: String,
        enum: ['personal', 'home', 'car', 'education', 'business'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1000
    },
    statusbar: {
        type: String,
        enum: ['panding', 'approved', 'rejected', 'closed', 'active'],
        default: 'panding'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    interestRate: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('loan', loanSchema);