const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const populate = require('./populate');


const init_app = async (env) => {
    const app = express();
    init_config(app);
    init_middleware(app);
    await init_db(app);

    app.populate_database = async () => {
        await populate(this);
    }

    app.start_server = () => {       
        app.listen(
            app.get('port'),
            app.get('host'),
            () => {
                console.log(
                    `Server listening on ${app.get('host')}:${app.get('port')}`
                );
            }            
        );

    };

    return app
};

const init_db = async (app) => {
    let db_url;
    let db_config;
    
    if (app.get('environment') === 'production') {
        db_url = app.get('db_url');
        db_config = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            autoIndex: false
        }
    } 
    else {
        db_url = await init_memory_db()
        db_config = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
        } 
    }

    console.log(`db url: ${db_url}`)
    const database = await mongoose.connect(
        db_url,
        db_config
    );

    const result = database ? 'Connected to DB' : 'DB Error'
    console.log(result)
}

const init_memory_db = async () => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongo = new MongoMemoryServer();
    const memory_db_url = await mongo.getUri();
    return memory_db_url
}

const init_config = (app) => {
    const ENVIRONMENT = process.env.ENVIRONMENT || 'local';
    const PORT = process.env.API_PORT || 8080;
    const HOST = '0.0.0.0';
    const DB_URL = process.env.DB_URL;

    app.set('environment', ENVIRONMENT)
    app.set('port', PORT);
    app.set('host', HOST);
    app.set('db_url', DB_URL)

    console.log(`ENV: ${app.get('environment')}`)
}

const init_middleware = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use('/api', require('./controllers'));
}

exports.init_app = init_app;