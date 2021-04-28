const mongoose = require('mongoose');

const BasicSchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model('BasicObject', BasicSchema);
