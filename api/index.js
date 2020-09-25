console.log("Starting api");

// External Dependencies
const express = require('express');
const cors = require('cors');

// Internal Dependencies
const { User, users } = require('./models/user.js')

// Express App
const app = express();
app.use(cors());

// Config
const PORT = process.env.API_PORT || 8080;
const HOST = '0.0.0.0';
const URL = '/api';

// Base URL Controller
app.get(URL, (req, res) => {
    res.status(200).send('API');
});

app.get(URL.concat('/user'), (req, res) => {
    console.log(req.query.id);
    res.send(req.query.id);
});

app.get(URL.concat('/user/list'), (req, res) => {
    res.status(200).send(JSON.stringify(users));
});

app.listen(PORT, HOST, () => {
    console.log(`User Service listening on port ${PORT}`);
});