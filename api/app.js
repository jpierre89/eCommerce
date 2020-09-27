// External Dependencies
const express = require('express');
const cors = require('cors');

// Internal Dependencies
const { User, users } = require('./models/user.js')

const create = () => {
    // Config
    const PORT = process.env.API_PORT || 8080;
    const HOST = '0.0.0.0';
    const URL = '/api';

    // Express App
    const app = express();
    app.use(cors());
    app.set('port', PORT);
    app.set('host', HOST)

    // Controllers
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

    app.run = () => {
        app.listen(
            PORT,
            HOST,      
        );
    };

    return app
};

// Exports
exports.create = create;