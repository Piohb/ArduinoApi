// init
const express = require('express');
const mongoose = require('mongoose');
const DB_ADDRESS = "mongodb+srv://emeric:lamberte@cluster.ctaqe.mongodb.net/ArduinoApi?retryWrites=true&w=majority";
const app = express();

app.use(express.json());

// connect to db
mongoose.set('returnOriginal', false);
mongoose.connect(
    DB_ADDRESS,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('connected to DB'))
    .catch(error => console.log(error));


// api routes
app.get('/', (req, res) => {
    console.log("welcome");
    res.send("Welcome.");
});

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);


//
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} ...`));