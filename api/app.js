const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session); // MongoDB session store driver
const populate = require('./populate');


const init_app = async (env) => {
    const app = express();
    init_config(app);
    await init_db(app);
    init_middleware(app);
    

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
    const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';

    app.set('environment', ENVIRONMENT)
    app.set('port', PORT); // app server port
    app.set('host', HOST); // app server host
    app.set('db_url', DB_URL);  // full db url
    app.set('session_secret', SESSION_SECRET);

    console.log(`ENV: ${app.get('environment')}`)
}

const init_middleware = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use('/api', require('./controllers'));

    const sess = {
        secret: app.get('session_secret'), 
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }

    if (app.get('environment') === 'production') {
        app.set('trust proxy', 1); // trust first proxy
        sess.cookie.secure = true; // serve secure cookies
    }

    app.use(session(sess));
    

}

exports.init_app = init_app;