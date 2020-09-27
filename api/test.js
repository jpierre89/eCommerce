const { create } = require('./app');
const request = require('supertest');
const { expect, assert } = require('chai');


describe('/api', () => {    
    before((done) => {
        app = create();
        app.listen((err) => {
            if (err) { return done(err); }
            done();
        });
    });

    beforeEach(() => {});
    after(() => {});
    afterEach(() => {});

    it('GET 200', (done) => {
        request(app)
            .get('/api')
            .set('Content-Type', 'application/json')
            .expect(200, done);
    });
    
});