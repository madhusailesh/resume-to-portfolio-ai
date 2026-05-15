const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }
}, { 
    strict: false, // Yeh line sabse important hai "SARA DATA" rakhne ke liye
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);