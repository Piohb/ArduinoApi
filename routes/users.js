const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('users');
    res.send('users');
});

module.exports = router;
