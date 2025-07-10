const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    loginId: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    nickName: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    name: { 
        type: String, 
        required: true, 
        trim: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    ddabong: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    point: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model("Users", userSchema, 'users');