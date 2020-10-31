const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const populate = require('./populate');


const init_app = async (env) => {
    const app = express();
    init_config(app);
    init_middleware(app);
    await init_db(env);

    app.populate_database = async () => {
        await populate(this);
    }

    app.start_server = () => {       
        app.listen(
            app.get('port'),
            app.get('host'),            
        );
        console.log(
            `Server listening on ${app.get('host')}:${app.get('port')}`
        );
    };

    return app
};

const init_db = async (env) => {
    let db_url = null;
    if (env !== 'production') {
        db_url = await init_memory_db(env) 
    } 
    else {
        db_url = process.env.DB_URL;
    }

    console.log(`db url: ${db_url}`)

    const database = await mongoose.connect(
        db_url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    const result = database ? 'Connected to DB' : 'DB Error'
    console.log(result)
}

const init_memory_db = async (env) => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongo = new MongoMemoryServer();
    const memory_db_url = await mongo.getUri();
    return memory_db_url
}

const init_config = (app) => {
    const PORT = process.env.API_PORT || 8080;
    const HOST = '0.0.0.0';

    app.set('port', PORT);
    app.set('host', HOST);
}

const init_middleware = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use('/api', require('./controllers'));
}

exports.init_app = init_app;