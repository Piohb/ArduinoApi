const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    isHere: {
        type: Boolean,
        required: true
    },
    isClean: {
        type: Boolean,
        required: true
    },
    lastVisit: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);
