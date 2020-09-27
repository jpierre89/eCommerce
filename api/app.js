// External Dependencies
const express = require('express');
const cors = require('cors');

const create = () => {
    // Config
    const PORT = process.env.API_PORT || 8080;
    const HOST = '0.0.0.0';
    const PATH = '/api';

    // Express App
    const app = express();

    app.set('port', PORT);
    app.set('host', HOST);

    app.use(cors());
    app.use(express.json());
    app.use(PATH, require('./controllers'));



    app.run = () => {
        app.listen(
            PORT,
            HOST,      
        );
    };

    return app
};

exports.create = create;