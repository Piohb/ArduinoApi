const mongoose = require('mongoose');

const DateSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    dateEnter: {
        type: Date,
        required: true,
    },
    dateExit: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Date', DateSchema);