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
        function() { return this.role !== 'trainer'; } ,
    },
    remark: {
        type: String
    },
    subscriptionType: {
        type: String,
        function() { return this.role !== 'trainer'; } ,
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
    },
    expertise: { 
        type: [String] 
    },
    imagePath: { 
        type: String 
    }

});
module.exports = mongoose.model('User', userSchema);
