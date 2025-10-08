const Loan = require('../models/loan');
const Transaction = require('../models/transaction');
const User = require('../models/user');

// 1. Customer Apply Loan
exports.applyLoan = async (req, res) => {
    try {
        const { loanType, amount, interestRate } = req.body;

        const loan = new Loan({
            customerId: req.user.id, // from auth middleware
            loanType,
            amount,
            appliedAt: new Date(),
            interestRate,
            statusbar: 'pending'
        });

        await loan.save();
        res.json(loan);
    } catch (err) {
        res.json(err);
    }
};

// 2. Admin Approve Loan
exports.approveLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);

        loan.statusbar = 'approved';
        loan.approvedAt = new Date();
        await loan.save();

        res.json(loan);
    } catch (err) {
        res.json(err);
    }
};

// 3. Admin Reject Loan
exports.rejectLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);

        loan.statusbar = 'rejected';
        loan.rejectedAt = new Date();
        await loan.save();

        res.json({ loan });
    } catch (err) {
        res.json(err);
    }
};

// 5. Customer pays EMI Record Transaction
exports.payEMI = async (req, res) => {
    try {
        const { amount } = req.body;
        const loan = await Loan.findById(req.params.id);

        if (loan.statusbar !== 'active') {
            return res.status(400).json({ error: 'Loan is not active' });
        }

        // Record transaction
        const transaction = new Transaction({
            userId: loan.customerId,
            type: 'debit',
            amount,
            description: `EMI payment for loan ${loan._id}`
        });
        await transaction.save();

        res.json(loan);
    } catch (err) {
        res.json(err);
    }
};