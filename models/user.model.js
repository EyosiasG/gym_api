const mongoose = require('mongoose');
//
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    password: {
        type: String, 
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber : {
        type: String,
        required: true,
    },
    membershipType: {
        type: String,
        required: true,
    },
    remark: {
        type: String
    },
    subscriptionType: {
        type: String,
        required: true
    },
    emergencyContactName: {
        type: String,
        required: true
    },
    emergencyContactNumber: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'active'
    },
    role:{
        type: String,
        default: 'client'
    }
    

});
module.exports = mongoose.model('User', userSchema);
