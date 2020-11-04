const { init_app } = require('./app');

(async () => {
    const app = await init_app();
    await app.populate_database();
    app.start_server();
}) ()
