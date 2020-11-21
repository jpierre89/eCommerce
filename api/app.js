const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')
const jwt = require('jsonwebtoken');
const MongoStore = require('connect-mongo')(session); // MongoDB session store driver
const path = require('path');
const populate = require('./populate');





const init_app = async (env) => {
    /* environments
        - development (default)
            - memory database
        - testing
            - memory database
        - staging
            - production Cloud DB
        - production
            - production Cloud DB */

    const app = express();
    init_config(app, env);
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
    
    if (app.get('environment') === 'production' ||
        app.get('environment') === 'staging') {
        
        // Config for Cloud MongoDB
        db_url = app.get('db_url');
        db_config = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            autoIndex: false
        }
    } 
    else {
        // Config for In-Memory MongoDB
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

const init_config = (app, env) => {
    const ENVIRONMENT = process.env.ENVIRONMENT || env || 'development';
    const PORT = process.env.API_PORT || 8080;
    const HOST = '0.0.0.0';
    const DB_URL = process.env.DB_URL;
    const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';

    app.set('environment', ENVIRONMENT)
    app.set('port', PORT); // app server port
    app.set('host', HOST); // app server host
    app.set('db_url', DB_URL);  // full db url
    app.set('session_secret', SESSION_SECRET);
    app.set('jwt_secret', JWT_SECRET);

    console.log(`Environment set: ${app.get('environment')}`)
}

const init_middleware = (app) => {
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
    app.use(cors());
    app.use(express.json());


    // Adds user to request from verified jwt token
    // Adds jwt secret key to request
    app.use(async (req, res, next) => {
        req.jwt_secret = app.get('jwt_secret')

        const authHeader = req.headers.authorization;
        if (authHeader) {
            // Bearer eydhcj...
            const jwtToken = authHeader.split(' ')[1];
            const user = jwt.verify(jwtToken, app.get('jwt_secret'))
            req.user = user;
        }
        next();
    })

    // Any Middleware added after this router will not be called
    // for requests that target this router
    app.use('/api', require('./controllers'));

    // Serve react app
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
    })

}

exports.init_app = init_app;