const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true // You can use a string to represent time, or Date object as needed
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming the User model is defined elsewhere
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Session', sessionSchema);