const mongoose = require('mongoose');
//
const trainerSchema = mongoose.Schema({
    trainername: {
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
        required: function() { return this.role !== 'trainer'; } ,
    },
    remark: {
        type: String
    },
    subscriptionType: {
        type: String,
        required: function() { return this.role !== 'trainer'; } 
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
        enum: ['user', 'admin', 'trainer'],
        required: true,
        default: 'user',
    }
    

});
module.exports = mongoose.model('User', userSchema);
