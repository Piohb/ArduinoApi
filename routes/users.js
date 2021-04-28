const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const DB_ADDRESS = "mongodb+srv://emeric:lamberte@cluster.ctaqe.mongodb.net/ArduinoApi?retryWrites=true&w=majority";

mongoose.connect(
    DB_ADDRESS,
    { useNewUrlParser : true},
    () => console.log('Connected to DB!')
);


router.get('/', (req, res) => {
    console.log('users');
    res.send('users');
});

router.get('/enter', (req, res) => {
    console.log('enter');
    res.send('enter');
});

module.exports = router;
