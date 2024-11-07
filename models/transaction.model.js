const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    transactionDate: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        required: true 
    },
    transactionId: { 
        type: String, 
        required: true 
    },
    paymentMethod: { 
        type: String 
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);