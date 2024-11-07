const Transaction = require('../models/transaction.model');

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const transaction = new Transaction({
                userId: req.body.userId,
                amount: req.body.amount,
                transactionId: req.body.transactionId,
                paymentMethod: req.body.paymentMethod,
                status: 'pending'
            });

            await transaction.save();
            res.status(201).json({ message: 'Transaction recorded successfully' });
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllTransactions: async (req, res) => {
        try {
            // Parse limit and offset from query parameters, with defaults
            const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
            const offset = parseInt(req.query.offset) || 0; // Default offset to 0 if not provided

            // Fetch transactions with limit and offset
            const transactions = await Transaction.find().skip(offset).limit(limit);

            res.status(200).json(transactions);

        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getMonthlyAccumulatedAmount : async (req, res) => {
        try {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
    
            const monthlyAccumulatedAmounts = await Transaction.aggregate([
                {
                    $match: {
                        status: 'completed',  // Only include completed transactions
                        transactionDate: {
                            $gte: new Date(`${year}-01-01`),
                            $lte: new Date(`${year}-12-31`)
                        }
                    }
                },
                {
                    $group: {
                        _id: { month: { $month: "$transactionDate" }, year: { $year: "$transactionDate" } },
                        totalAmount: { $sum: "$amount" }
                    }
                },
                {
                    $sort: { "_id.month": 1 }  // Sort by month in ascending order
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        totalAmount: 1
                    }
                }
            ]);
    
            res.status(200).json(monthlyAccumulatedAmounts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve monthly accumulated amount' });
        }
    }

};