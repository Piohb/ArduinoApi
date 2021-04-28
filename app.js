const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send("Welcome.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} ...`));