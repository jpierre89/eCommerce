// External Dependencies
const express = require('express');
const cors = require('cors');

// Internal Dependencies
const populate = require('./populate');

const create = () => {
    // Express App
    const app = express();

    // Config
    const PORT = process.env.API_PORT || 8080;
    const HOST = '0.0.0.0';
    const PATH = '/api';

    app.set('port', PORT);
    app.set('host', HOST);

    // App Middleware
    app.use(cors());
    app.use(express.json());
    app.use(PATH, require('./controllers'));


    // Run Server Method
    app.run = () => {
        // Populate Data
        populate(app);
        console.log(`Server listening on ${HOST}:${PORT}`);
        app.listen(
            PORT,
            HOST,      
        );
    };

    return app
};

exports.create = create;