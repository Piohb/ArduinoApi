const mongoose = require('mongoose');

const StatSchema = mongoose.Schema({
    nb_clean: {
        type: Number,
        required: false
    },
    nb_enter: {
        type: Number,
        required: false
    },
    nb_in: {
        type: Number,
        required: false
    },
    nb_max: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Stat', StatSchema);